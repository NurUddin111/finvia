"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientServices = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../../lib/prisma");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const httpStatusCodes_1 = require("../../utils/httpStatusCodes");
const formatDT_1 = require("../../utils/formatDT");
const validateBusinessOwner_1 = require("../../utils/business/validateBusinessOwner");
const pagination_1 = require("../../utils/query/pagination");
const sorting_1 = require("../../utils/query/sorting");
const meta_1 = require("../../utils/query/meta");
const addClient = async (userId, payload) => {
    const isOwner = await prisma_1.prisma.businessUser.findFirst({
        where: { userId, business: { isDeleted: false } },
    });
    if (!isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "You have to own a business to add client!");
    }
    const { name, email, phone, address } = payload;
    const existingClient = await prisma_1.prisma.businessClient.findFirst({
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
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "You can't duplicate client.");
    }
    const result = await prisma_1.prisma.$transaction(async (tx) => {
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
const getAllClients = async (userId, query) => {
    const isOwner = await (0, validateBusinessOwner_1.validateBusinessOwner)(userId, "Only Business Owner or Admin can view all clients.");
    const { page, limit, skip } = (0, pagination_1.calculatePagination)(query.page, query.limit);
    const { sortBy, order } = (0, sorting_1.calculateSorting)(query.sortBy, query.order, ["name", "createdAt"], "createdAt", "desc");
    const search = query.search?.trim();
    const status = query.status === "ACTIVE" || query.status === "INACTIVE"
        ? query.status
        : undefined;
    const where = {
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
        prisma_1.prisma.client.count({ where }),
        prisma_1.prisma.client.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                [sortBy]: order,
            },
        }),
    ]);
    const formattedClients = clients.map((client) => ({
        ...client,
        formattedDate: (0, formatDT_1.formatDateTime)(new Date(client.createdAt)),
    }));
    const metaData = (0, meta_1.createPaginationMeta)(total, page, limit);
    return {
        data: formattedClients,
        meta: metaData,
    };
};
const getSingleClient = async (clientId) => {
    const client = await prisma_1.prisma.client.findUnique({
        where: {
            id: clientId,
        },
        include: {
            links: true,
        },
    });
    return client;
};
const getMyClient = async (userId, clientId) => {
    const isOwner = await prisma_1.prisma.businessUser.findFirst({
        where: { userId: userId, business: { isDeleted: false } },
    });
    if (!isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "You do not belong to any business");
    }
    const client = await prisma_1.prisma.businessClient.findFirst({
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
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "Client not found.");
    }
    const myClient = await prisma_1.prisma.client.findFirst({
        where: {
            id: client.clientId,
        },
    });
    return {
        data: myClient,
    };
};
const getClientsStats = async (userId) => {
    const isOwner = await prisma_1.prisma.businessUser.findFirst({
        where: { userId: userId, business: { isDeleted: false } },
    });
    if (!isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Only Business Owner or Admin can view all clients.");
    }
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const baseWhere = {
        businessId: isOwner.businessId,
        client: { isDeleted: false },
    };
    const [totalClients, currentMonthClients, activeClients, neverBilledClients] = await Promise.all([
        prisma_1.prisma.businessClient.count({
            where: baseWhere,
        }),
        prisma_1.prisma.businessClient.count({
            where: {
                ...baseWhere,
                createdAt: {
                    gte: startOfMonth,
                    lt: startOfNextMonth,
                },
            },
        }),
        prisma_1.prisma.businessClient.count({
            where: {
                ...baseWhere,
                client: {
                    status: client_1.ClientStatus.ACTIVE,
                },
            },
        }),
        prisma_1.prisma.client.count({
            where: {
                links: {
                    some: { businessId: isOwner.businessId },
                },
                totalInvoices: 0,
                isDeleted: false,
            },
        }),
    ]);
    const activeClientPercentage = totalClients > 0 ? Math.round((activeClients / totalClients) * 100) : 0;
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
const updateClient = async (clientId, payload, decodedToken) => {
    const userId = decodedToken.userId;
    const isOwner = await prisma_1.prisma.businessUser.findFirst({
        where: { userId, business: { isDeleted: false } },
    });
    if (!isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "You do not belong to any business");
    }
    const client = await prisma_1.prisma.businessClient.findFirst({
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
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "Client not found.");
    }
    const updatedClient = await prisma_1.prisma.client.update({
        where: {
            id: clientId,
            isDeleted: false,
        },
        data: payload,
    });
    return updatedClient;
};
const updateClientStatus = async (userId) => {
    const isOwner = await prisma_1.prisma.businessUser.findFirst({
        where: { userId, business: { isDeleted: false } },
    });
    if (!isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "You do not belong to any business");
    }
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const updatedClientStatus = await prisma_1.prisma.client.updateMany({
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
            status: client_1.ClientStatus.ACTIVE,
        },
        data: {
            status: client_1.ClientStatus.INACTIVE,
        },
    });
    return updatedClientStatus;
};
const deleteClient = async (clientId, decodedToken) => {
    const userId = decodedToken.userId;
    const isOwner = await prisma_1.prisma.businessUser.findFirst({
        where: { userId, business: { isDeleted: false } },
    });
    if (!isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "You do not belong to any business");
    }
    const client = await prisma_1.prisma.businessClient.findFirst({
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
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "Client not found.");
    }
    await prisma_1.prisma.client.update({
        where: {
            id: clientId,
            isDeleted: false,
        },
        data: {
            isDeleted: true,
        },
    });
};
exports.ClientServices = {
    addClient,
    getAllClients,
    getSingleClient,
    getMyClient,
    getClientsStats,
    updateClient,
    updateClientStatus,
    deleteClient,
};
