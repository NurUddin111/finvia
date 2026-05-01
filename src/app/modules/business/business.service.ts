import { JwtPayload } from "jsonwebtoken";
import {
  Business,
  BusinessRole,
  InvoiceStatus,
  MemberStatus,
  User,
  UserRole,
} from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import AppError from "../../errorHelpers/AppError";
import { HttpStatusCodes } from "../../utils/httpStatusCodes";
import { createUserTokens } from "../../utils/userTokens";
import { setAuthCookie } from "../../utils/setCookie";
import { Request, Response } from "express";
import { sendEmail } from "../../utils/sendEmail";
import { OfferingRole } from "../../interfaces/enums";
import { envVars } from "../../config/env";
import { generateToken, verifyToken } from "../../utils/jwt";
import { formatDateTime } from "../../utils/formatDT";

const addBusiness = async (
  req: Request,
  res: Response,
  userId: string,
  payload: Business,
) => {
  const isOwner = await prisma.businessUser.findFirst({
    where: { userId, business: { isDeleted: false } },
  });

  if (isOwner) {
    throw new AppError(
      HttpStatusCodes.BAD_REQUEST,
      "You already belong to a business",
    );
  }

  const result = await prisma.$transaction(async (tx) => {
    const business = await tx.business.create({
      data: {
        name: payload.name,
        category: payload.category,
        email: payload.email || null,
        phone: payload.phone || null,
        address: payload.address || null,
        website: payload.website || null,
      },
    });

    await tx.businessUser.create({
      data: {
        userId,
        businessId: business.id,
        role: BusinessRole.BUSINESS_OWNER,
        status: MemberStatus.ACTIVE,
      },
    });

    await tx.user.update({
      where: { id: userId },
      data: { role: "BUSINESS_OWNER" },
    });

    const user = (await tx.user.findUnique({
      where: { id: userId },
    })) as User;

    const userTokens = createUserTokens(user);

    setAuthCookie(req, res, userTokens);

    return business;
  });

  return result;
};

const getSinglBusiness = async (businessId: string) => {
  const business = await prisma.business.findUnique({
    where: {
      id: businessId,
    },
    include: {
      members: true,
    },
  });
  return business;
};

const getMyBusiness = async (userId: string) => {
  const isOwner = await prisma.businessUser.findFirst({
    where: { userId: userId, business: { isDeleted: false } },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "You do not belong to any business",
    );
  }

  const business = await prisma.business.findFirst({
    where: {
      id: isOwner.businessId,
      isDeleted: false,
    },
    include: {
      members: {
        select: {
          userId: true,
        },
      },
    },
  });

  if (!business) {
    throw new AppError(HttpStatusCodes.BAD_REQUEST, "You");
  }

  return {
    data: business,
  };
};

const updateBusiness = async (
  businessId: string,
  payload: Business,
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

  if (businessId !== isOwner.businessId) {
    throw new AppError(
      HttpStatusCodes.UNAUTHORIZED,
      "It looks like you're trying to edit another user's business. You can only make changes to your own business.",
    );
  }

  const updatedBusiness = await prisma.business.update({
    where: {
      id: businessId,
      isDeleted: false,
    },
    data: payload,
  });

  return updatedBusiness;
};

const deleteBusiness = async (
  req: Request,
  res: Response,
  businessId: string,
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

  if (businessId !== isOwner.businessId) {
    throw new AppError(
      HttpStatusCodes.UNAUTHORIZED,
      "It looks like you're trying to delete another user's business. You can only make changes to your own business.",
    );
  }

  await prisma.$transaction(async (tx) => {
    await tx.business.update({
      where: {
        id: businessId,
        isDeleted: false,
      },
      data: {
        isDeleted: true,
      },
    });

    await tx.user.update({
      where: { id: userId },
      data: {
        role: UserRole.USER,
      },
    });

    const user = (await tx.user.findUnique({
      where: { id: userId },
    })) as User;

    const userTokens = createUserTokens(user);

    setAuthCookie(req, res, userTokens);
  });
};

const addBusinessOwnerOrAdmin = async (
  name: string,
  email: string,
  role: OfferingRole,
  decodedToken: JwtPayload,
) => {
  const userId = decodedToken.userId;

  const isOwner = await prisma.businessUser.findFirst({
    where: { userId, business: { isDeleted: false } },
    include: {
      business: {
        select: {
          id: true,
          name: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "You do not belong to any business",
    );
  }

  const newOwnerCheck = await prisma.businessUser.findFirst({
    where: {
      user: {
        email: email,
      },
    },
  });

  if (newOwnerCheck) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      `User is already a ${newOwnerCheck.role}`,
    );
  }

  const payload = {
    email: email,
    bsId: isOwner.business.id,
    role: role,
  };

  const invitationToken = generateToken(
    payload,
    envVars.JWT_INVITATION_SECRET,
    envVars.JWT_INVITATION_EXPIRES,
  );

  const inviteLink = `${envVars.FRONTEND_URL}/business?token=${invitationToken}`;

  await sendEmail({
    to: email,
    subject: `${isOwner.business.name} inviting you!`,
    templateName: "addAuthority",
    templateData: {
      businessName: isOwner.business.name,
      receiverName: name,
      inviterName: isOwner.user.name,
      role: role,
      inviteLink: inviteLink,
    },
  });
};

const joinBusinessOwnerOrAdmin = async (
  req: Request,
  res: Response,
  decodedToken: JwtPayload,
  invitationToken: string,
) => {
  const verifiedInvToken = verifyToken(
    invitationToken,
    envVars.JWT_INVITATION_SECRET,
  ) as JwtPayload;

  if (!verifiedInvToken) {
    throw new AppError(
      HttpStatusCodes.BAD_REQUEST,
      "Invitation link has expired!",
    );
  }

  const userEmail = decodedToken.email;
  const invReceiverEmail = verifiedInvToken.email;

  if (userEmail !== invReceiverEmail) {
    throw new AppError(
      HttpStatusCodes.UNAUTHORIZED,
      "You're not the user who was invited to join!",
    );
  }

  const userId = decodedToken.userId;
  const bsId = verifiedInvToken.bsId;
  const role = verifiedInvToken.role;

  const result = await prisma.$transaction(async (tx) => {
    await tx.businessUser.create({
      data: {
        userId,
        businessId: bsId,
        role:
          role === "OWNER"
            ? BusinessRole.BUSINESS_OWNER
            : BusinessRole.BUSINESS_ADMIN,
        status: MemberStatus.ACTIVE,
      },
    });

    await tx.user.update({
      where: { id: userId },
      data: {
        role:
          role === "OWNER" ? UserRole.BUSINESS_OWNER : UserRole.BUSINESS_ADMIN,
      },
    });

    const user = (await tx.user.findUnique({
      where: { id: userId },
    })) as User;

    const userTokens = createUserTokens(user);

    setAuthCookie(req, res, userTokens);

    const business = await tx.business.findUnique({
      where: {
        id: bsId,
      },
      include: {
        members: true,
      },
    });

    return business;
  });

  return result;
};

const getKPICardDetails = async (userId: string) => {
  const business = await prisma.businessUser.findFirst({
    where: { userId, business: { isDeleted: false } },
  });

  if (!business) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "You do not belong to any business",
    );
  }

  const now = new Date();

  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const startOfThisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const startOfLastWeek = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  const baseWhere = { businessId: business.businessId };
  const activeWhere = {
    ...baseWhere,
    status: {
      notIn: [InvoiceStatus.PAID, InvoiceStatus.DRAFT] as InvoiceStatus[],
    },
  };

  const [
    allInvoices,
    totalInvoices,
    pendingInvoices,
    draftedInvoices,
    paidInvoices,
    totalOverdueInvoices,
    currentWeekCount,
    lastWeekCount,
  ] = await Promise.all([
    prisma.invoice.findMany({ where: baseWhere }),
    prisma.invoice.count({ where: baseWhere }),
    prisma.invoice.count({ where: activeWhere }),
    prisma.invoice.count({
      where: { ...baseWhere, status: InvoiceStatus.DRAFT },
    }),
    prisma.invoice.count({
      where: { ...baseWhere, status: InvoiceStatus.PAID },
    }),
    prisma.invoice.count({
      where: { ...activeWhere, dueDate: { lt: now } },
    }),
    prisma.invoice.count({
      where: {
        ...activeWhere,
        issueDate: { gte: startOfThisWeek },
        dueDate: { lt: now },
      },
    }),
    prisma.invoice.count({
      where: {
        ...activeWhere,
        issueDate: { gte: startOfLastWeek, lt: startOfThisWeek },
        dueDate: { lt: now },
      },
    }),
  ]);

  // Single pass revenue calculation
  let totalRevenue = 0;
  let thisMonthRevenue = 0;
  let lastMonthRevenue = 0;

  for (const inv of allInvoices) {
    if (inv.status !== InvoiceStatus.PAID) continue;

    totalRevenue += inv.subtotal;

    if (inv.issueDate >= startOfThisMonth) {
      thisMonthRevenue += inv.subtotal;
    } else if (inv.issueDate >= startOfLastMonth) {
      lastMonthRevenue += inv.subtotal;
    }
  }

  const revenueDiff = thisMonthRevenue - lastMonthRevenue;
  const revenueDiffInPercentage =
    lastMonthRevenue > 0
      ? Math.abs(Number(((revenueDiff / lastMonthRevenue) * 100).toFixed(2)))
      : 0;

  const billableInvoices = totalInvoices - draftedInvoices;
  const collectionRate =
    billableInvoices > 0
      ? Math.round((paidInvoices / billableInvoices) * 100)
      : 0;

  const paidInvPer =
    totalInvoices > 0 ? Math.round((paidInvoices / totalInvoices) * 100) : 0;
  const pendingInvPer =
    totalInvoices > 0 ? Math.round((pendingInvoices / totalInvoices) * 100) : 0;
  const draftedInvPer =
    totalInvoices > 0 ? Math.round((draftedInvoices / totalInvoices) * 100) : 0;

  const overdueInvDiff = currentWeekCount - lastWeekCount;

  return {
    totalRevenue,
    revenueDiff,
    revenueDiffInPercentage,
    totalInvoices,
    pendingInvoices,
    pendingInvPer,
    paidInvoices,
    collectionRate,
    paidInvPer,
    draftedInvoices,
    draftedInvPer,
    totalOverdueInvoices,
    overdueInvDiff,
  };
};

const getMonthlyRevenue = async (userId: string) => {
  const business = await prisma.businessUser.findFirst({
    where: { userId: userId, business: { isDeleted: false } },
  });

  if (!business) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "You do not belong to any business",
    );
  }

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyRevenue: Record<string, number> = {};
  const currentMonth = new Date().getMonth();

  for (let i = 0; i <= currentMonth; i++) {
    monthlyRevenue[months[i]] = 0;
  }

  const currentYear = new Date().getFullYear();
  const allInvoices = await prisma.invoice.findMany({
    where: {
      businessId: business.businessId,
      status: "PAID",
      issueDate: {
        gte: new Date(`${currentYear}-01-01T00:00:00Z`),
        lte: new Date(), // Up to right now
      },
    },
  });

  allInvoices.forEach((inv) => {
    const monthIndex = inv.issueDate.getMonth();
    const monthName = months[monthIndex];

    if (monthlyRevenue[monthName] !== undefined) {
      monthlyRevenue[monthName] += inv.subtotal;
    }
  });

  return monthlyRevenue;
};

const getTopClients = async (userId: string) => {
  const business = await prisma.businessUser.findFirst({
    where: { userId: userId, business: { isDeleted: false } },
  });

  if (!business) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "You do not belong to any business",
    );
  }

  const topClients = await prisma.client.findMany({
    where: {
      isDeleted: false,
    },
    orderBy: {
      totalSpent: "desc",
    },
    take: 5,
    select: {
      name: true,
      totalSpent: true,
      totalInvoices: true,
    },
  });

  const formattedClients = topClients.map((client) => ({
    ...client,
    status: "ACTIVE",
  }));

  return formattedClients;
};

const getRecentTransactions = async (userId: string) => {
  const business = await prisma.businessUser.findFirst({
    where: { userId: userId, business: { isDeleted: false } },
  });

  if (!business) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "You do not belong to any business",
    );
  }

  const recentTransactions = await prisma.invoice.findMany({
    where: {
      status: { not: "DRAFT" },
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 5,
    select: {
      client: {
        select: {
          name: true,
        },
      },
      items: {
        select: {
          name: true,
          quantity: true,
        },
      },
      subtotal: true,
      status: true,
      totalItems: true,
      updatedAt: true,
    },
  });

  const formattedTransactions = recentTransactions.map((tx) => ({
    ...tx,
    formattedDate: formatDateTime(new Date(tx.updatedAt)),
  }));

  return formattedTransactions;
};

const getOverdueInvoices = async (userId: string) => {
  const business = await prisma.businessUser.findFirst({
    where: { userId: userId, business: { isDeleted: false } },
  });

  if (!business) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "You do not belong to any business",
    );
  }

  const overDueInvoices = await prisma.invoice.findMany({
    where: {
      businessId: business.businessId,
      status: { notIn: ["DRAFT", "PAID"] },
      dueDate: { lt: new Date() },
    },
    orderBy: {
      dueDate: "desc",
    },
    select: {
      client: {
        select: {
          name: true,
        },
      },
      invoiceNumber: true,
      dueDate: true,
      total: true,
    },
  });

  const formattedOverdueInvoices = overDueInvoices.map((tx) => ({
    ...tx,
    formattedDueDate: formatDateTime(new Date(tx.dueDate)),
    daysAgo: Math.floor(
      (new Date().getTime() - new Date(tx.dueDate).getTime()) /
        (24 * 60 * 60 * 1000),
    ),
  }));

  return formattedOverdueInvoices;
};

const getUpcomingOverdueInvoices = async (userId: string) => {
  const business = await prisma.businessUser.findFirst({
    where: { userId: userId, business: { isDeleted: false } },
  });

  if (!business) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "You do not belong to any business",
    );
  }

  const now = new Date();
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(now.getDate() + 7);

  const upcomingOverDueInvoices = await prisma.invoice.findMany({
    where: {
      businessId: business.businessId,
      status: { notIn: ["DRAFT", "PAID"] },
      dueDate: {
        gte: now,
        lte: sevenDaysFromNow,
      },
    },
    orderBy: {
      dueDate: "asc",
    },
    select: {
      client: {
        select: {
          name: true,
        },
      },
      invoiceNumber: true,
      status: true,
      dueDate: true,
      total: true,
    },
  });

  const formattedUpcomingOverdueInvoices = upcomingOverDueInvoices.map(
    (tx) => ({
      ...tx,
      formattedDueDate: formatDateTime(new Date(tx.dueDate)),
    }),
  );

  return formattedUpcomingOverdueInvoices;
};

const getClientPieChartData = async (userId: string) => {
  const business = await prisma.businessUser.findFirst({
    where: { userId: userId, business: { isDeleted: false } },
  });

  if (!business) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "You do not belong to any business",
    );
  }

  const now = new Date();
  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const newClientsThisMonth = await prisma.businessClient.count({
    where: {
      businessId: business.businessId,
      createdAt: {
        gte: startOfThisMonth,
      },
      client: {
        invoices: {
          some: {
            createdAt: {
              gte: startOfThisMonth,
            },
            status: { not: "DRAFT" },
          },
        },
      },
    },
  });

  const newClientsLastMonth = await prisma.businessClient.count({
    where: {
      businessId: business.businessId,
      createdAt: {
        gte: startOfLastMonth,
        lt: startOfThisMonth,
      },
      client: {
        invoices: {
          some: {
            createdAt: {
              gte: startOfLastMonth,
              lt: startOfThisMonth,
            },
            status: { not: "DRAFT" },
          },
        },
      },
    },
  });

  const oldClientsThisMonth = await prisma.businessClient.count({
    where: {
      businessId: business.businessId,
      createdAt: {
        lt: startOfThisMonth,
      },
      client: {
        invoices: {
          some: {
            createdAt: {
              gte: startOfThisMonth,
            },
            status: { not: "DRAFT" },
          },
        },
      },
    },
  });

  const oldClientsLastMonth = await prisma.businessClient.count({
    where: {
      businessId: business.businessId,
      createdAt: {
        lt: startOfLastMonth,
      },
      client: {
        invoices: {
          some: {
            createdAt: {
              gte: startOfLastMonth,
              lt: startOfThisMonth,
            },
            status: { not: "DRAFT" },
          },
        },
      },
    },
  });

  const totalClientsCurrentMonth = newClientsThisMonth + oldClientsThisMonth;

  const newClientsPercentage =
    totalClientsCurrentMonth > 0
      ? Math.round((newClientsThisMonth / totalClientsCurrentMonth) * 100)
      : 0;

  const oldClientsPercentage =
    totalClientsCurrentMonth > 0
      ? Math.round((oldClientsThisMonth / totalClientsCurrentMonth) * 100)
      : 0;

  const newClientsDiff = newClientsThisMonth - newClientsLastMonth;
  const oldClientsDiff = oldClientsThisMonth - oldClientsLastMonth;

  return {
    newClientsThisMonth,
    newClientsDiff,
    oldClientsThisMonth,
    oldClientsDiff,
    newClientsPercentage,
    oldClientsPercentage,
  };
};

const getClientsNumByMonth = async (userId: string) => {
  const business = await prisma.businessUser.findFirst({
    where: { userId: userId, business: { isDeleted: false } },
  });

  if (!business) {
    throw new Error("Business not found");
  }

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // 1. Get the base count (clients added before this year)
  const previousClientsCount = await prisma.businessClient.count({
    where: {
      businessId: business.businessId,
      createdAt: { lt: new Date(`${currentYear}-01-01T00:00:00Z`) },
    },
  });

  // 2. Get all clients added this year
  const clientsThisYear = await prisma.businessClient.findMany({
    where: {
      businessId: business.businessId,
      createdAt: {
        gte: new Date(`${currentYear}-01-01T00:00:00Z`),
        lte: new Date(),
      },
    },
    select: { createdAt: true },
  });

  // 3. Group new clients by month
  const monthlyNewClients: Record<string, number> = {};
  months.forEach((m) => (monthlyNewClients[m] = 0));

  clientsThisYear.forEach((client) => {
    const monthName = months[client.createdAt.getMonth()];
    monthlyNewClients[monthName]++;
  });

  // 4. Calculate cumulative total
  const cumulativeData: Record<string, number> = {};
  let runningTotal = previousClientsCount;

  for (let i = 0; i <= currentMonth; i++) {
    const monthName = months[i];
    runningTotal += monthlyNewClients[monthName];
    cumulativeData[monthName] = runningTotal;
  }

  return cumulativeData;
};

export const BusinessServices = {
  addBusiness,
  getSinglBusiness,
  getMyBusiness,
  updateBusiness,
  deleteBusiness,
  addBusinessOwnerOrAdmin,
  joinBusinessOwnerOrAdmin,
  getKPICardDetails,
  getMonthlyRevenue,
  getTopClients,
  getRecentTransactions,
  getOverdueInvoices,
  getUpcomingOverdueInvoices,
  getClientPieChartData,
  getClientsNumByMonth,
};
