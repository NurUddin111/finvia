import { JwtPayload } from "jsonwebtoken";
import { Client } from "../../../generated/prisma";
import { prisma } from "../../../lib/prisma";
import AppError from "../../errorHelpers/AppError";
import { HttpStatusCodes } from "../../utils/httpStatusCodes";

const addClient = async (userId: string, payload: Client) => {
  const isOwner = await prisma.businessUser.findFirst({
    where: { userId, business: { isDeleted: false } },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.BAD_REQUEST,
      "You have to own a business to add client!"
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
      "You can't duplicate client."
    );
  }

  const result = await prisma.$transaction(async (tx) => {
    const client = await tx.client.create({
      data: {
        name: name,
        email: email,
        phone: phone || null,
        address: address || null,
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
      "You do not belong to any business"
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

const updateClient = async (
  clientId: string,
  payload: Client,
  decodedToken: JwtPayload
) => {
  const userId = decodedToken.userId;

  const isOwner = await prisma.businessUser.findFirst({
    where: { userId, business: { isDeleted: false } },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "You do not belong to any business"
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

const deleteClient = async (clientId: string, decodedToken: JwtPayload) => {
  const userId = decodedToken.userId;

  const isOwner = await prisma.businessUser.findFirst({
    where: { userId, business: { isDeleted: false } },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "You do not belong to any business"
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
  getSingleClient,
  getMyClient,
  updateClient,
  deleteClient,
};
