import { JwtPayload } from "jsonwebtoken";
import { Client, ClientStatus, Prisma } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import AppError from "../../errorHelpers/AppError";
import { HttpStatusCodes } from "../../utils/httpStatusCodes";
import { formatDateTime } from "../../utils/formatDT";

const addClient = async (userId: string, payload: Client) => {
  const isOwner = await prisma.businessUser.findFirst({
    where: { userId, business: { isDeleted: false } },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.BAD_REQUEST,
      "You have to own a business to add client!",
    );
  }

  const { name, email, phone, address } = payload;

  const existingClient = await prisma.businessClient.findFirst({
    where: {
      business: {
        id: isOwner.businessId,
        isDeleted: false,
      },
      client: {
        email: email,
      },
    },
  });

  if (existingClient) {
    throw new AppError(
      HttpStatusCodes.BAD_REQUEST,
      "You can't duplicate client.",
    );
  }

  const result = await prisma.$transaction(async (tx) => {
    const client = await tx.client.create({
      data: {
        name: name,
        email: email,
        phone: phone || null,
        address: address || null,
        totalInvoices: 0,
        totalSpent: 0,
      },
    });

    await tx.businessClient.create({
      data: {
        businessId: isOwner.businessId,
        clientId: client.id,
      },
    });

    return client;
  });

  return result;
};

const getAllClients = async (
  userId: string,
  query: {
    page?: string;
    limit?: string;
    search?: string;
    status?: string;
    sortBy?: string;
    order?: string;
  },
) => {
  const isOwner = await prisma.businessUser.findFirst({
    where: { userId: userId, business: { isDeleted: false } },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "Only Business Owner or Admin can view all clients.",
    );
  }

  const page = Math.max(1, parseInt(query.page || "1"));

  const limit = Math.min(100, parseInt(query.limit || "10"));

  const skip = (page - 1) * limit;

  const search = query.search?.trim() || undefined;

  const status =
    query.status === "ACTIVE" || query.status === "INACTIVE"
      ? (query.status as ClientStatus)
      : undefined;

  const ALLOWED_SORT = ["name", "createdAt"];
  const rawSortBy = query.sortBy || "createdAt";

  const sortBy = ALLOWED_SORT.includes(rawSortBy) ? rawSortBy : "createdAt";

  const order = query.order === "desc" ? "desc" : "asc";

  const where: Prisma.ClientWhereInput = {
    links: {
      some: { businessId: isOwner.businessId },
    },

    isDeleted: false,

    ...(status && { status }),

    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  const [total, clients] = await Promise.all([
    prisma.client.count({ where }),

    prisma.client.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: order },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        totalInvoices: true,
        totalSpent: true,
        status: true,
        isDeleted: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
  ]);

  const formattedClients = clients.map((client) => ({
    ...client,
    formattedDate: formatDateTime(new Date(client.createdAt)),
  }));

  return {
    data: formattedClients,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    },
  };
};

const getSingleClient = async (clientId: string) => {
  const client = await prisma.client.findUnique({
    where: {
      id: clientId,
    },
    include: {
      links: true,
    },
  });
  return client;
};

const getMyClient = async (userId: string, clientId: string) => {
  const isOwner = await prisma.businessUser.findFirst({
    where: { userId: userId, business: { isDeleted: false } },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "You do not belong to any business",
    );
  }

  const client = await prisma.businessClient.findFirst({
    where: {
      business: {
        id: isOwner.businessId,
      },
      client: {
        id: clientId,
      },
    },
  });

  if (!client) {
    throw new AppError(HttpStatusCodes.BAD_REQUEST, "Client not found.");
  }

  const myClient = await prisma.client.findFirst({
    where: {
      id: client.clientId,
    },
  });

  return {
    data: myClient,
  };
};

const getClientsStats = async (userId: string) => {
  const isOwner = await prisma.businessUser.findFirst({
    where: { userId: userId, business: { isDeleted: false } },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "Only Business Owner or Admin can view all clients.",
    );
  }

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const baseWhere = {
    businessId: isOwner.businessId,
    client: { isDeleted: false },
  };

  const [totalClients, currentMonthClients, activeClients, neverBilledClients] =
    await Promise.all([
      prisma.businessClient.count({
        where: baseWhere,
      }),
      prisma.businessClient.count({
        where: {
          ...baseWhere,
          createdAt: {
            gte: startOfMonth,
            lt: startOfNextMonth,
          },
        },
      }),
      prisma.businessClient.count({
        where: {
          ...baseWhere,
          client: {
            status: ClientStatus.ACTIVE,
          },
        },
      }),
      prisma.client.count({
        where: {
          links: {
            some: { businessId: isOwner.businessId },
          },
          totalInvoices: 0,
          isDeleted: false,
        },
      }),
    ]);

  const activeClientPercentage =
    totalClients > 0 ? Math.round((activeClients / totalClients) * 100) : 0;

  const inactiveClients = totalClients > 0 ? totalClients - activeClients : 0;

  return {
    totalClients,
    currentMonthClients,
    activeClients,
    activeClientPercentage,
    inactiveClients,
    neverBilledClients,
  };
};

const updateClient = async (
  clientId: string,
  payload: Client,
  decodedToken: JwtPayload,
) => {
  const userId = decodedToken.userId;

  const isOwner = await prisma.businessUser.findFirst({
    where: { userId, business: { isDeleted: false } },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "You do not belong to any business",
    );
  }

  const client = await prisma.businessClient.findFirst({
    where: {
      business: {
        id: isOwner.businessId,
      },
      client: {
        id: clientId,
      },
    },
  });

  if (!client) {
    throw new AppError(HttpStatusCodes.BAD_REQUEST, "Client not found.");
  }

  const updatedClient = await prisma.client.update({
    where: {
      id: clientId,
      isDeleted: false,
    },
    data: payload,
  });

  return updatedClient;
};

const updateClientStatus = async (userId: string) => {
  const isOwner = await prisma.businessUser.findFirst({
    where: { userId, business: { isDeleted: false } },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "You do not belong to any business",
    );
  }

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const updatedClientStatus = await prisma.client.updateMany({
    where: {
      links: {
        some: { businessId: isOwner.businessId },
      },
      invoices: {
        none: {
          businessId: isOwner.businessId,
          createdAt: { gte: thirtyDaysAgo },
        },
      },
      isDeleted: false,
      status: ClientStatus.ACTIVE,
    },
    data: {
      status: ClientStatus.INACTIVE,
    },
  });

  return updatedClientStatus;
};

const deleteClient = async (clientId: string, decodedToken: JwtPayload) => {
  const userId = decodedToken.userId;

  const isOwner = await prisma.businessUser.findFirst({
    where: { userId, business: { isDeleted: false } },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "You do not belong to any business",
    );
  }

  const client = await prisma.businessClient.findFirst({
    where: {
      business: {
        id: isOwner.businessId,
      },
      client: {
        id: clientId,
      },
    },
  });

  if (!client) {
    throw new AppError(HttpStatusCodes.BAD_REQUEST, "Client not found.");
  }

  await prisma.client.update({
    where: {
      id: clientId,
      isDeleted: false,
    },
    data: {
      isDeleted: true,
    },
  });
};

export const ClientServices = {
  addClient,
  getAllClients,
  getSingleClient,
  getMyClient,
  getClientsStats,
  updateClient,
  updateClientStatus,
  deleteClient,
};
