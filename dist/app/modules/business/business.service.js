"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessServices = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../../lib/prisma");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const httpStatusCodes_1 = require("../../utils/httpStatusCodes");
const userTokens_1 = require("../../utils/userTokens");
const setCookie_1 = require("../../utils/setCookie");
const sendEmail_1 = require("../../utils/sendEmail");
const env_1 = require("../../config/env");
const jwt_1 = require("../../utils/jwt");
const formatDT_1 = require("../../utils/formatDT");
const addBusiness = async (req, res, userId, payload, logoUrl) => {
    const isOwner = await prisma_1.prisma.businessUser.findFirst({
        where: { userId, isExist: true, business: { isDeleted: false } },
    });
    if (isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "You already belong to a business");
    }
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const business = await tx.business.create({
            data: {
                name: payload.name,
                category: payload.category,
                email: payload.email || null,
                phone: payload.phone || null,
                address: payload.address || null,
                website: payload.website || null,
                logoUrl: logoUrl || null,
            },
        });
        await tx.businessUser.create({
            data: {
                userId,
                businessId: business.id,
                role: client_1.BusinessRole.BUSINESS_OWNER,
                status: client_1.MemberStatus.ACTIVE,
            },
        });
        await tx.user.update({
            where: { id: userId },
            data: { role: "BUSINESS_OWNER" },
        });
        const user = (await tx.user.findUnique({
            where: { id: userId },
        }));
        const userTokens = (0, userTokens_1.createUserTokens)(user);
        (0, setCookie_1.setAuthCookie)(req, res, userTokens);
        return business;
    });
    return result;
};
const getSinglBusiness = async (businessId) => {
    const business = await prisma_1.prisma.business.findUnique({
        where: {
            id: businessId,
        },
        include: {
            members: true,
        },
    });
    return business;
};
const getMyBusiness = async (userId) => {
    const isOwner = await prisma_1.prisma.businessUser.findFirst({
        where: { userId: userId, isExist: true, business: { isDeleted: false } },
    });
    if (!isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "You do not belong to any business");
    }
    const business = await prisma_1.prisma.business.findFirst({
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
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "You");
    }
    return {
        data: business,
    };
};
const updateBusiness = async (businessId, payload, userId, logoUrl) => {
    const isOwner = await prisma_1.prisma.businessUser.findFirst({
        where: { userId, business: { isDeleted: false } },
    });
    if (!isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "You do not belong to any business");
    }
    if (businessId !== isOwner.businessId) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED, "It looks like you're trying to edit another user's business. You can only make changes to your own business.");
    }
    const updatedBusiness = await prisma_1.prisma.business.update({
        where: {
            id: businessId,
            isDeleted: false,
        },
        data: {
            ...payload,
            ...(logoUrl !== undefined ? { logoUrl } : {}),
        },
    });
    return updatedBusiness;
};
const deleteBusiness = async (req, res, businessId, decodedToken) => {
    const userId = decodedToken.userId;
    const isOwner = await prisma_1.prisma.businessUser.findFirst({
        where: { userId, isExist: true, business: { isDeleted: false } },
    });
    if (!isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "You do not belong to any business");
    }
    if (businessId !== isOwner.businessId) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED, "It looks like you're trying to delete another user's business. You can only make changes to your own business.");
    }
    await prisma_1.prisma.$transaction(async (tx) => {
        await tx.business.update({
            where: {
                id: businessId,
                isDeleted: false,
            },
            data: {
                isDeleted: true,
            },
        });
        await tx.businessUser.update({
            where: {
                userId_businessId: {
                    userId,
                    businessId,
                },
            },
            data: {
                isExist: false,
            },
        });
        await tx.user.update({
            where: { id: userId },
            data: {
                role: client_1.UserRole.USER,
            },
        });
        const user = (await tx.user.findUnique({
            where: { id: userId },
        }));
        const userTokens = (0, userTokens_1.createUserTokens)(user);
        (0, setCookie_1.setAuthCookie)(req, res, userTokens);
    });
};
const addBusinessOwnerOrAdmin = async (name, email, role, decodedToken) => {
    const userId = decodedToken.userId;
    const isOwner = await prisma_1.prisma.businessUser.findFirst({
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
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "You do not belong to any business");
    }
    const newOwnerCheck = await prisma_1.prisma.businessUser.findFirst({
        where: {
            user: {
                email: email,
            },
        },
    });
    if (newOwnerCheck) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, `User is already a ${newOwnerCheck.role}`);
    }
    const payload = {
        email: email,
        bsId: isOwner.business.id,
        role: role,
    };
    const invitationToken = (0, jwt_1.generateToken)(payload, env_1.envVars.JWT_INVITATION_SECRET, env_1.envVars.JWT_INVITATION_EXPIRES);
    const inviteLink = `${env_1.envVars.FRONTEND_URL}/business?token=${invitationToken}`;
    await (0, sendEmail_1.sendEmail)({
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
const joinBusinessOwnerOrAdmin = async (req, res, decodedToken, invitationToken) => {
    const verifiedInvToken = (0, jwt_1.verifyToken)(invitationToken, env_1.envVars.JWT_INVITATION_SECRET);
    if (!verifiedInvToken) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "Invitation link has expired!");
    }
    const userEmail = decodedToken.email;
    const invReceiverEmail = verifiedInvToken.email;
    if (userEmail !== invReceiverEmail) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED, "You're not the user who was invited to join!");
    }
    const userId = decodedToken.userId;
    const bsId = verifiedInvToken.bsId;
    const role = verifiedInvToken.role;
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        await tx.businessUser.create({
            data: {
                userId,
                businessId: bsId,
                role: role === "OWNER"
                    ? client_1.BusinessRole.BUSINESS_OWNER
                    : client_1.BusinessRole.BUSINESS_ADMIN,
                status: client_1.MemberStatus.ACTIVE,
            },
        });
        await tx.user.update({
            where: { id: userId },
            data: {
                role: role === "OWNER" ? client_1.UserRole.BUSINESS_OWNER : client_1.UserRole.BUSINESS_ADMIN,
            },
        });
        const user = (await tx.user.findUnique({
            where: { id: userId },
        }));
        const userTokens = (0, userTokens_1.createUserTokens)(user);
        (0, setCookie_1.setAuthCookie)(req, res, userTokens);
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
const getKPICardDetails = async (userId) => {
    const business = await prisma_1.prisma.businessUser.findFirst({
        where: { userId, business: { isDeleted: false } },
    });
    if (!business) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "You do not belong to any business");
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
            notIn: [client_1.InvoiceStatus.PAID, client_1.InvoiceStatus.DRAFT],
        },
    };
    const [allInvoices, totalInvoices, pendingInvoices, draftedInvoices, paidInvoices, totalOverdueInvoices, currentWeekCount, lastWeekCount,] = await Promise.all([
        prisma_1.prisma.invoice.findMany({ where: baseWhere }),
        prisma_1.prisma.invoice.count({ where: baseWhere }),
        prisma_1.prisma.invoice.count({ where: activeWhere }),
        prisma_1.prisma.invoice.count({
            where: { ...baseWhere, status: client_1.InvoiceStatus.DRAFT },
        }),
        prisma_1.prisma.invoice.count({
            where: { ...baseWhere, status: client_1.InvoiceStatus.PAID },
        }),
        prisma_1.prisma.invoice.count({
            where: { ...activeWhere, dueDate: { lt: now } },
        }),
        prisma_1.prisma.invoice.count({
            where: {
                ...activeWhere,
                issueDate: { gte: startOfThisWeek },
                dueDate: { lt: now },
            },
        }),
        prisma_1.prisma.invoice.count({
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
        if (inv.status !== client_1.InvoiceStatus.PAID)
            continue;
        totalRevenue += inv.subtotal;
        if (inv.issueDate) {
            if (inv.issueDate >= startOfThisMonth) {
                thisMonthRevenue += inv.subtotal;
            }
            else if (inv.issueDate >= startOfLastMonth) {
                lastMonthRevenue += inv.subtotal;
            }
        }
    }
    const revenueDiff = thisMonthRevenue - lastMonthRevenue;
    const revenueDiffInPercentage = lastMonthRevenue > 0
        ? Math.abs(Number(((revenueDiff / lastMonthRevenue) * 100).toFixed(2)))
        : 0;
    const billableInvoices = totalInvoices - draftedInvoices;
    const collectionRate = billableInvoices > 0
        ? Math.round((paidInvoices / billableInvoices) * 100)
        : 0;
    const paidInvPer = totalInvoices > 0 ? Math.round((paidInvoices / totalInvoices) * 100) : 0;
    const pendingInvPer = totalInvoices > 0 ? Math.round((pendingInvoices / totalInvoices) * 100) : 0;
    const draftedInvPer = totalInvoices > 0 ? Math.round((draftedInvoices / totalInvoices) * 100) : 0;
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
const getMonthlyRevenue = async (userId) => {
    const business = await prisma_1.prisma.businessUser.findFirst({
        where: { userId: userId, business: { isDeleted: false } },
    });
    if (!business) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "You do not belong to any business");
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
    const monthlyRevenue = {};
    const currentMonth = new Date().getMonth();
    for (let i = 0; i <= currentMonth; i++) {
        monthlyRevenue[months[i]] = 0;
    }
    const currentYear = new Date().getFullYear();
    const allInvoices = await prisma_1.prisma.invoice.findMany({
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
        if (inv.issueDate) {
            const monthIndex = inv.issueDate.getMonth();
            const monthName = months[monthIndex];
            if (monthlyRevenue[monthName] !== undefined) {
                monthlyRevenue[monthName] += inv.subtotal;
            }
        }
    });
    return monthlyRevenue;
};
const getTopClients = async (userId) => {
    const business = await prisma_1.prisma.businessUser.findFirst({
        where: { userId: userId, business: { isDeleted: false } },
    });
    if (!business) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "You do not belong to any business");
    }
    const topClients = await prisma_1.prisma.client.findMany({
        where: {
            isDeleted: false,
            links: {
                some: {
                    businessId: business.businessId,
                },
            },
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
const getRecentTransactions = async (userId) => {
    const business = await prisma_1.prisma.businessUser.findFirst({
        where: { userId: userId, business: { isDeleted: false } },
    });
    if (!business) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "You do not belong to any business");
    }
    const recentTransactions = await prisma_1.prisma.invoice.findMany({
        where: {
            status: { not: "DRAFT" },
            businessId: business.businessId,
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
        formattedDate: (0, formatDT_1.formatDateTime)(new Date(tx.updatedAt)),
    }));
    return formattedTransactions;
};
const getOverdueInvoices = async (userId) => {
    const business = await prisma_1.prisma.businessUser.findFirst({
        where: { userId: userId, business: { isDeleted: false } },
    });
    if (!business) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "You do not belong to any business");
    }
    const overDueInvoices = await prisma_1.prisma.invoice.findMany({
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
        formattedDueDate: (0, formatDT_1.formatDateTime)(new Date(tx.dueDate)),
        daysAgo: Math.floor((new Date().getTime() - new Date(tx.dueDate).getTime()) /
            (24 * 60 * 60 * 1000)),
    }));
    return formattedOverdueInvoices;
};
const getUpcomingOverdueInvoices = async (userId) => {
    const business = await prisma_1.prisma.businessUser.findFirst({
        where: { userId: userId, business: { isDeleted: false } },
    });
    if (!business) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "You do not belong to any business");
    }
    const now = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(now.getDate() + 7);
    const upcomingOverDueInvoices = await prisma_1.prisma.invoice.findMany({
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
    const formattedUpcomingOverdueInvoices = upcomingOverDueInvoices.map((tx) => ({
        ...tx,
        formattedDueDate: (0, formatDT_1.formatDateTime)(new Date(tx.dueDate)),
    }));
    return formattedUpcomingOverdueInvoices;
};
const getClientPieChartData = async (userId) => {
    const business = await prisma_1.prisma.businessUser.findFirst({
        where: { userId: userId, business: { isDeleted: false } },
    });
    if (!business) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "You do not belong to any business");
    }
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const newClientsThisMonth = await prisma_1.prisma.businessClient.count({
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
    const newClientsLastMonth = await prisma_1.prisma.businessClient.count({
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
    const oldClientsThisMonth = await prisma_1.prisma.businessClient.count({
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
    const oldClientsLastMonth = await prisma_1.prisma.businessClient.count({
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
    const newClientsPercentage = totalClientsCurrentMonth > 0
        ? Math.round((newClientsThisMonth / totalClientsCurrentMonth) * 100)
        : 0;
    const oldClientsPercentage = totalClientsCurrentMonth > 0
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
const getClientsNumByMonth = async (userId) => {
    const business = await prisma_1.prisma.businessUser.findFirst({
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
    const previousClientsCount = await prisma_1.prisma.businessClient.count({
        where: {
            businessId: business.businessId,
            createdAt: { lt: new Date(`${currentYear}-01-01T00:00:00Z`) },
        },
    });
    // 2. Get all clients added this year
    const clientsThisYear = await prisma_1.prisma.businessClient.findMany({
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
    const monthlyNewClients = {};
    months.forEach((m) => (monthlyNewClients[m] = 0));
    clientsThisYear.forEach((client) => {
        const monthName = months[client.createdAt.getMonth()];
        monthlyNewClients[monthName]++;
    });
    // 4. Calculate cumulative total
    const cumulativeData = {};
    let runningTotal = previousClientsCount;
    for (let i = 0; i <= currentMonth; i++) {
        const monthName = months[i];
        runningTotal += monthlyNewClients[monthName];
        cumulativeData[monthName] = runningTotal;
    }
    return cumulativeData;
};
exports.BusinessServices = {
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
