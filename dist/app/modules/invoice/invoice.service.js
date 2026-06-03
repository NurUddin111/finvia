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
const client_1 = require("@prisma/client");
const rcpPdf_1 = require("../../utils/rcpPdf");
const cloudinary_config_1 = require("../../config/cloudinary.config");
const sendEmail_1 = require("../../utils/sendEmail");
const formatDT_1 = require("../../utils/formatDT");
const createInvoice = async (decodedToken, email, dueDays, method, items, taxRate, notes) => {
    const userId = decodedToken.userId;
    const isOwner = await prisma_1.prisma.businessUser.findFirst({
        where: { userId, business: { isDeleted: false } },
    });
    if (!isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "You do not belong to any business");
    }
    const businessClient = await prisma_1.prisma.businessClient.findFirst({
        where: {
            business: { id: isOwner.businessId },
            client: { email },
        },
        select: { clientId: true },
    });
    if (!businessClient) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Client not found");
    }
    const invNb = await (0, generateInvRcNb_1.generateInvoiceNumber)(isOwner.businessId);
    dueDays = Number.isNaN(dueDays) ? 3 : dueDays;
    const subtotal = items.reduce((sum, item) => sum + Number(item.pricePerUnit) * Number(item.quantity), 0);
    taxRate = Number.isNaN(taxRate) ? 0 : taxRate / 100;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    // ── ONLINE: existing flow, return early ───────────────────────────────────
    if (method === "ONLINE") {
        const invoice = await prisma_1.prisma.$transaction(async (tx) => {
            const invoice = await tx.invoice.create({
                data: {
                    businessId: isOwner.businessId,
                    clientId: businessClient.clientId,
                    createdById: isOwner.userId,
                    invoiceNumber: invNb,
                    dueDays,
                    subtotal,
                    totalItems,
                    tax,
                    total,
                    notes,
                },
            });
            await tx.invoiceItem.createMany({
                data: items.map((item) => ({
                    invoiceId: invoice.id,
                    name: item.name,
                    productId: item.productId,
                    quantity: item.quantity,
                    pricePerUnit: item.pricePerUnit,
                    total: item.pricePerUnit * item.quantity,
                })),
            });
            await Promise.all(items.map((item) => tx.product.update({
                where: { id: item.productId },
                data: {
                    pendingOrder: { increment: item.quantity },
                },
            })));
            await tx.payment.create({
                data: {
                    invoiceId: invoice.id,
                    tran_id: `TXN_${(0, crypto_1.randomUUID)()}`,
                    amount: total,
                    currency: invoice.currency,
                    method: "ONLINE",
                    status: "PENDING",
                },
            });
            return invoice;
        });
        return invoice;
    }
    // ── CASH: mark paid, skip invoice PDF, send receipt directly ──────────────
    const { invoice, payment, client, business } = await prisma_1.prisma.$transaction(async (tx) => {
        const rcpNb = await (0, generateInvRcNb_1.generateReceiptNumber)(isOwner.businessId);
        const invoice = await tx.invoice.create({
            data: {
                businessId: isOwner.businessId,
                clientId: businessClient.clientId,
                createdById: isOwner.userId,
                invoiceNumber: invNb,
                dueDays,
                subtotal,
                totalItems,
                tax,
                total,
                notes,
                status: "PAID",
                issueDate: new Date(),
                dueDate: new Date(Date.now() + dueDays * 24 * 60 * 60 * 1000),
            },
        });
        await tx.invoiceItem.createMany({
            data: items.map((item) => ({
                invoiceId: invoice.id,
                name: item.name,
                productId: item.productId,
                quantity: item.quantity,
                pricePerUnit: item.pricePerUnit,
                total: item.pricePerUnit * item.quantity,
            })),
        });
        const payment = await tx.payment.create({
            data: {
                invoiceId: invoice.id,
                tran_id: `TXN_${(0, crypto_1.randomUUID)()}`,
                amount: total,
                currency: invoice.currency,
                method: "CASH",
                status: "SUCCESS",
                rcpNumber: rcpNb,
            },
        });
        await Promise.all(items.map((item) => tx.product.update({
            where: { id: item.productId },
            data: {
                totalSold: { increment: item.quantity },
                totalEarning: { increment: item.pricePerUnit * item.quantity },
            },
        })));
        await tx.client.update({
            where: { id: businessClient.clientId },
            data: { totalInvoices: { increment: 1 } },
        });
        const [client, business] = await Promise.all([
            tx.client.findUnique({ where: { id: businessClient.clientId } }),
            tx.business.findUnique({ where: { id: isOwner.businessId } }),
        ]);
        if (!client)
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Client not found");
        if (!business)
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Business not found");
        return { invoice, payment, client, business };
    });
    // No invoice PDF — go straight to receipt
    const rcpPdf = await (0, rcpPdf_1.generateRcpPdf)(invoice);
    if (!rcpPdf) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "Failed to create receipt PDF");
    }
    const cloudinaryResult = await (0, cloudinary_config_1.uploadBufferToCloudinary)(rcpPdf, "receipt", "pdf");
    if (!cloudinaryResult) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "Failed to upload receipt PDF to Cloudinary");
    }
    await prisma_1.prisma.payment.update({
        where: { id: payment.id },
        data: { rcpPdfUrl: cloudinaryResult.secure_url },
    });
    await (0, sendEmail_1.sendEmail)({
        to: client.email,
        subject: "Receipt",
        templateName: "receipt",
        templateData: {
            clientName: client.name,
            receiptNumber: payment.rcpNumber,
            invoiceNumber: invoice.invoiceNumber,
            paymentDate: (0, formatDT_1.formatDateTime)(new Date()),
            paymentMethod: "Cash",
            transactionId: payment.tran_id,
            currency: payment.currency,
            amount: payment.amount,
            receiptPdfLink: cloudinaryResult.secure_url,
            businessEmail: business.email,
            businessName: business.name,
        },
        attachments: [
            {
                fileName: `Receipt-${payment.rcpNumber}.pdf`,
                content: rcpPdf,
                contentType: "application/pdf",
            },
        ],
    });
    return invoice;
};
const getAllInvoices = async (userId, query) => {
    const isOwner = await prisma_1.prisma.businessUser.findFirst({
        where: { userId: userId, business: { isDeleted: false } },
    });
    if (!isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Only Business Owner or Admin can view all invoices.");
    }
    // ── STEP 1: Parse ─────────────────────────────────────────────────────────
    const page = Math.max(1, parseInt(query.page || "1"));
    const limit = 10;
    const skip = (page - 1) * limit;
    const search = query.search?.trim() || undefined;
    const VALID_STATUSES = [
        "DRAFT",
        "SENT",
        "PAID",
        "FAILED",
        "CANCELLED",
        "OVERDUE",
    ];
    const rawStatus = query.status || "";
    const status = VALID_STATUSES.includes(rawStatus)
        ? rawStatus
        : undefined;
    const ALLOWED_SORT = ["createdAt", "dueDate", "total"];
    const rawSortBy = query.sortBy || "createdAt";
    const sortBy = ALLOWED_SORT.includes(rawSortBy) ? rawSortBy : "createdAt";
    const order = query.order === "asc" ? "asc" : "desc";
    // Parse year — must be a valid 4-digit number, otherwise ignore it
    const rawYear = parseInt(query.year || "");
    const year = !isNaN(rawYear) && rawYear > 2000 ? rawYear : undefined;
    // ── STEP 2: Build WHERE ───────────────────────────────────────────────────
    const where = {
        businessId: isOwner.businessId,
        ...(status && { status }),
        ...(search && {
            OR: [
                { invoiceNumber: { contains: search, mode: "insensitive" } },
                { client: { email: { contains: search, mode: "insensitive" } } },
            ],
        }),
        // Year filter — if year=2025, fetch invoices where:
        // createdAt >= 2025-01-01 00:00:00  AND  createdAt < 2026-01-01 00:00:00
        ...(year && {
            createdAt: {
                gte: new Date(`${year}-01-01`), // Jan 1st of selected year
                lt: new Date(`${year + 1}-01-01`), // Jan 1st of NEXT year (not Dec 31!)
                // We use `lt` (less than) instead of `lte` Dec 31
                // because Dec 31 23:59:59 would still be missed with lte on a date
            },
        }),
    };
    // ── STEP 3: Get available years for this business ─────────────────────────
    // We need to know which years actually have invoices
    // so the frontend can build the dropdown dynamically
    //
    // This raw query asks PostgreSQL:
    // "Give me each unique year that appears in createdAt for this business"
    const yearRows = await prisma_1.prisma.$queryRaw `
    SELECT DISTINCT EXTRACT(YEAR FROM "createdAt")::int AS year
    FROM "Invoice"
    WHERE "businessId" = ${isOwner.businessId}
    ORDER BY year DESC
  `;
    // EXTRACT(YEAR FROM "createdAt") → pulls just the year number e.g. 2024, 2025
    // ::int → casts it from decimal to integer
    // DISTINCT → removes duplicates (many invoices in 2025 → appears once)
    // ORDER BY year DESC → newest year first in dropdown
    // Convert the raw rows into a plain number array e.g. [2026, 2025, 2024]
    const availableYears = yearRows.map((row) => row.year);
    // ── STEP 4: Count + Find in parallel ─────────────────────────────────────
    const [total, invoices] = await Promise.all([
        prisma_1.prisma.invoice.count({ where }),
        prisma_1.prisma.invoice.findMany({
            where,
            skip,
            take: limit,
            orderBy: { [sortBy]: order },
            include: {
                client: { select: { name: true, email: true } },
                items: true,
            },
        }),
    ]);
    return {
        data: invoices,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasNextPage: page < Math.ceil(total / limit),
            hasPrevPage: page > 1,
            availableYears,
        },
    };
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
const getInvoicesStats = async (userId) => {
    const isOwner = await prisma_1.prisma.businessUser.findFirst({
        where: { userId: userId, business: { isDeleted: false } },
    });
    if (!isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Only Business Owner or Admin can view invoices stats!");
    }
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    const invoices = await prisma_1.prisma.invoice.findMany({
        where: { businessId: isOwner.businessId },
        select: {
            status: true,
            total: true,
            subtotal: true,
            tax: true,
            createdAt: true,
        },
    });
    // ── Totals ──────────────────────────────────────────────────────────────────
    const totalInvoices = invoices.length;
    const draftedInvoices = invoices.filter((inv) => inv.status === client_1.InvoiceStatus.DRAFT).length;
    const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.total ?? 0), 0);
    // ── This month (PAID invoices within current month) ─────────────────────────
    const paidThisMonth = invoices.filter((inv) => inv.status === client_1.InvoiceStatus.PAID &&
        inv.createdAt >= startOfMonth &&
        inv.createdAt <= endOfMonth);
    const thisMonthEarnings = paidThisMonth.reduce((sum, inv) => sum + (inv.total ?? 0), 0);
    const thisMonthPaidCount = paidThisMonth.length;
    // ── Outstanding (everything except PAID and DRAFT) ──────────────────────────
    const EXCLUDED = [
        client_1.InvoiceStatus.PAID,
        client_1.InvoiceStatus.DRAFT,
        client_1.InvoiceStatus.CANCELLED,
        client_1.InvoiceStatus.FAILED,
    ];
    const outstandingInvoices = invoices.filter((inv) => !EXCLUDED.includes(inv.status));
    const outstandingAmount = outstandingInvoices.reduce((sum, inv) => sum + (inv.total ?? 0), 0);
    const outstandingCount = outstandingInvoices.length;
    return {
        data: {
            totalInvoices,
            draftedInvoices,
            totalRevenue,
            thisMonth: {
                earnings: thisMonthEarnings,
                paidCount: thisMonthPaidCount,
            },
            outstanding: {
                amount: outstandingAmount,
                count: outstandingCount,
            },
        },
    };
};
const setOverdueStatus = async (userId) => {
    const isOwner = await prisma_1.prisma.businessUser.findFirst({
        where: { userId: userId, business: { isDeleted: false } },
    });
    if (!isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Only Business Owner or Admin can set ivoices status!");
    }
    const invoices = await prisma_1.prisma.invoice.updateMany({
        where: {
            businessId: isOwner.businessId,
            status: { notIn: ["DRAFT", "PAID", "OVERDUE"] },
            dueDate: {
                lt: new Date(),
            },
        },
        data: {
            status: client_1.InvoiceStatus.OVERDUE,
        },
    });
    return invoices;
};
exports.InvoiceServices = {
    createInvoice,
    getAllInvoices,
    getSingleInvoice,
    getInvoicesStats,
    setOverdueStatus,
};
