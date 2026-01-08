"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientServices = void 0;
const prisma_1 = require("../../../lib/prisma");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const httpStatusCodes_1 = require("../../utils/httpStatusCodes");
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
const getAllClients = async (userId) => {
    const isOwner = await prisma_1.prisma.businessUser.findFirst({
        where: { userId: userId, business: { isDeleted: false } },
    });
    if (!isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Only Business Owner or Admin can view all clients.");
    }
    const clients = await prisma_1.prisma.businessClient.findMany({
        where: {
            businessId: isOwner.businessId,
            client: {
                isDeleted: false,
            },
        },
        include: {
            client: true,
        },
    });
    if (!clients) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "No clients found.");
    }
    return clients;
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
    updateClient,
    deleteClient,
};
