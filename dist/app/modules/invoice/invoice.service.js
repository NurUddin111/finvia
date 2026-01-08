"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceServices = void 0;
const prisma_1 = require("../../../lib/prisma");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const httpStatusCodes_1 = require("../../utils/httpStatusCodes");
const generateInvRcNb_1 = require("../../utils/generateInvRcNb");
const crypto_1 = require("crypto");
const createInvoice = async (decodedToken, email, dueDays, items, taxRate, notes) => {
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
                email: email,
            },
        },
        select: {
            clientId: true,
        },
    });
    if (!client) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Client not found");
    }
    const invNb = await (0, generateInvRcNb_1.generateInvoiceNumber)(isOwner.businessId);
    dueDays = Number.isNaN(dueDays) ? 3 : dueDays;
    const dueDate = new Date(Date.now() + dueDays * 24 * 60 * 60 * 1000);
    const subtotal = items.reduce((sum, item) => {
        return sum + Number(item.pricePerUnit) * Number(item.quantity);
    }, 0);
    taxRate = Number.isNaN(taxRate) ? 0.15 : taxRate / 100;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const invoice = await tx.invoice.create({
            data: {
                businessId: isOwner.businessId,
                clientId: client.clientId,
                createdById: isOwner.userId,
                invoiceNumber: invNb,
                dueDate: dueDate,
                subtotal: subtotal,
                tax: tax,
                total: total,
                notes: notes,
            },
        });
        await tx.invoiceItem.createMany({
            data: items.map((item) => ({
                invoiceId: invoice.id,
                name: item.name,
                quantity: item.quantity,
                pricePerUnit: item.pricePerUnit,
                total: item.pricePerUnit * item.quantity,
            })),
        });
        const transactionId = `TXN_${(0, crypto_1.randomUUID)()}`;
        await tx.payment.create({
            data: {
                invoiceId: invoice.id,
                tran_id: transactionId,
                amount: invoice.total,
                currency: invoice.currency,
            },
        });
        return invoice;
    });
    return result;
};
const getAllInvoices = async (userId) => {
    const isOwner = await prisma_1.prisma.businessUser.findFirst({
        where: { userId: userId, business: { isDeleted: false } },
    });
    if (!isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Only Business Owner or Admin can view all clients.");
    }
    const invoices = await prisma_1.prisma.invoice.findMany({
        where: {
            businessId: isOwner.businessId,
        },
        include: {
            client: {
                select: {
                    email: true,
                },
            },
        },
    });
    return invoices;
};
const getSingleInvoice = async (userId, invId) => {
    const isOwner = await prisma_1.prisma.businessUser.findFirst({
        where: { userId: userId, business: { isDeleted: false } },
    });
    if (!isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Only Business Owner or Admin can view all clients.");
    }
    const invoice = await prisma_1.prisma.invoice.findFirst({
        where: {
            id: invId,
            businessId: isOwner.businessId,
        },
        include: {
            client: {
                select: {
                    email: true,
                },
            },
            items: true,
        },
    });
    return invoice;
};
exports.InvoiceServices = {
    createInvoice,
    getAllInvoices,
    getSingleInvoice,
};
