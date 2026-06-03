"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentServices = void 0;
const prisma_1 = require("../../../lib/prisma");
const cloudinary_config_1 = require("../../config/cloudinary.config");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const formatDT_1 = require("../../utils/formatDT");
const generateInvRcNb_1 = require("../../utils/generateInvRcNb");
const httpStatusCodes_1 = require("../../utils/httpStatusCodes");
const invPdf_1 = require("../../utils/invPdf");
const rcpPdf_1 = require("../../utils/rcpPdf");
const sendEmail_1 = require("../../utils/sendEmail");
const ssl_service_1 = require("../sslCommerz/ssl.service");
const initPayment = async (invId) => {
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const invoice = await tx.invoice.findFirst({
            where: { id: invId },
        });
        if (!invoice) {
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Invoice not found");
        }
        if (invoice.status === "PAID") {
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "This invoice is already paid");
        }
        if (invoice.status === "CANCELLED") {
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "This invoice has been cancelled");
        }
        const dueDate = new Date(Date.now() + invoice.dueDays * 24 * 60 * 60 * 1000);
        const [updatedInvoice, client, business, payment] = await Promise.all([
            tx.invoice.update({
                where: { id: invId },
                data: {
                    status: "SENT",
                    issueDate: new Date(),
                    dueDate,
                },
            }),
            tx.client.findUnique({ where: { id: invoice.clientId } }),
            tx.business.findUnique({ where: { id: invoice.businessId } }),
            tx.payment.findFirst({ where: { invoiceId: invoice.id } }),
        ]);
        if (!client) {
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Client not found");
        }
        if (!business) {
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Business details not found");
        }
        if (!payment) {
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Payment details not found");
        }
        const [updatedClient, updatedPayment] = await Promise.all([
            tx.client.update({
                where: { id: client.id },
                data: { totalInvoices: { increment: 1 } }, // safer than client.totalInvoices + 1
            }),
            tx.payment.update({
                where: { id: payment.id },
                data: {
                    status: "INITIATED",
                    method: "ONLINE",
                    provider: "SSLCOMMERZ",
                },
            }),
        ]);
        return {
            invoice: updatedInvoice,
            client: updatedClient,
            business,
            payment: updatedPayment,
        };
    });
    const { invoice, client, business, payment } = result;
    const invPdf = await (0, invPdf_1.generateInvPdf)(invoice);
    if (!invPdf) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "Failed to create invoice PDF");
    }
    const cloudinaryResult = await (0, cloudinary_config_1.uploadBufferToCloudinary)(invPdf, "invoice", "pdf");
    if (!cloudinaryResult) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "Failed to upload invoice PDF to Cloudinary");
    }
    const sslPayload = {
        address: client.address || "Bangladesh",
        email: client.email,
        phoneNumber: client.phone || "",
        name: client.name,
        amount: invoice.total,
        transactionId: payment.tran_id,
    };
    const sslPayment = await ssl_service_1.SSLService.sslPaymentInit(sslPayload);
    await Promise.all([
        prisma_1.prisma.invoice.update({
            where: { id: invId },
            data: { invPdfUrl: cloudinaryResult.secure_url },
        }),
        prisma_1.prisma.payment.update({
            where: { id: payment.id },
            data: {
                metadata: {
                    gatewayPageURL: sslPayment.GatewayPageURL,
                },
            },
        }),
    ]);
    try {
        await (0, sendEmail_1.sendEmail)({
            to: client.email,
            subject: "Invoice",
            templateName: "invoice",
            templateData: {
                invoiceNumber: invoice.invoiceNumber,
                businessName: business.name,
                clientName: client.name,
                issueDate: (0, formatDT_1.formatDateTime)(invoice.issueDate),
                dueDate: (0, formatDT_1.formatDateTime)(invoice.dueDate),
                currency: invoice.currency,
                totalAmount: invoice.total,
                paymentLink: sslPayment.GatewayPageURL,
                invoicePdfLink: cloudinaryResult.secure_url,
                supportEmail: business.email,
            },
            attachments: [
                {
                    fileName: `Invoice-${invoice.invoiceNumber}.pdf`,
                    content: invPdf,
                    contentType: "application/pdf",
                },
            ],
        });
    }
    catch (emailError) {
        console.error("Failed to send invoice email:", emailError);
        // Revert everything back to pre-send state
        await Promise.all([
            prisma_1.prisma.invoice.update({
                where: { id: invId },
                data: {
                    status: "DRAFT",
                    issueDate: null,
                    dueDate: null,
                },
            }),
            prisma_1.prisma.payment.update({
                where: { id: payment.id },
                data: {
                    status: "PENDING",
                    provider: null,
                    method: "ONLINE",
                },
            }),
            prisma_1.prisma.client.update({
                where: { id: client.id },
                data: { totalInvoices: { decrement: 1 } },
            }),
        ]);
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.INTERNAL_SERVER_ERROR, "Failed to send invoice email. Invoice reverted to draft.");
    }
    return {
        invPdfUrl: cloudinaryResult.secure_url,
        gatewayPageURL: sslPayment.GatewayPageURL,
    };
};
const successPayment = async (query) => {
    const { transactionId } = query;
    // ── 1. Atomic DB writes (payment, invoice, products) ──────────────────────
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const payment = await tx.payment.findFirst({
            where: { tran_id: transactionId },
        });
        if (!payment)
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Payment not found");
        const invoice = await tx.invoice.findFirst({
            where: { id: payment.invoiceId },
            include: { items: true }, // ← fetch line items to match products
        });
        if (!invoice)
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Invoice not found");
        // Run independent lookups in parallel
        const [business, client] = await Promise.all([
            tx.business.findUnique({ where: { id: invoice.businessId } }),
            tx.client.findUnique({ where: { id: invoice.clientId } }),
        ]);
        if (!business)
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Business not found");
        if (!client)
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Client not found");
        const rcpNb = await (0, generateInvRcNb_1.generateReceiptNumber)(business.id);
        // Update payment + invoice in parallel
        const [updatedPayment, updatedInvoice] = await Promise.all([
            tx.payment.update({
                where: { id: payment.id },
                data: { status: "SUCCESS", rcpNumber: rcpNb },
            }),
            tx.invoice.update({
                where: { id: invoice.id },
                data: { status: "PAID" },
            }),
        ]);
        // ── Update products by name ────────────────────────────────────────────
        await Promise.all(invoice.items.map((item) => tx.product.update({
            where: { id: item.productId },
            data: {
                totalSold: { increment: item.quantity },
                totalEarning: { increment: item.total },
                pendingOrder: { decrement: item.quantity },
            },
        })));
        return {
            payment: updatedPayment,
            invoice: updatedInvoice,
            client,
            business,
        };
    });
    const { invoice, payment, client, business } = result;
    // ── 2. Generate & upload receipt PDF ──────────────────────────────────────
    const rcpPdf = await (0, rcpPdf_1.generateRcpPdf)(invoice);
    if (!rcpPdf) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "Failed to create receipt PDF");
    }
    const cloudinaryResult = await (0, cloudinary_config_1.uploadBufferToCloudinary)(rcpPdf, "receipt", "pdf");
    if (!cloudinaryResult) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "Failed to upload receipt PDF to Cloudinary");
    }
    // Persist the PDF URL (non-critical, outside main transaction intentionally)
    await prisma_1.prisma.payment.update({
        where: { id: payment.id },
        data: { rcpPdfUrl: cloudinaryResult.secure_url },
    });
    // ── 3. Send receipt email ──────────────────────────────────────────────────
    await (0, sendEmail_1.sendEmail)({
        to: client.email,
        subject: "Receipt",
        templateName: "receipt",
        templateData: {
            clientName: client.name,
            receiptNumber: payment.rcpNumber,
            invoiceNumber: invoice.invoiceNumber,
            paymentDate: (0, formatDT_1.formatDateTime)(new Date()),
            paymentMethod: payment.provider,
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
    return { success: true, message: "Payment completed successfully" };
};
const failPayment = async (query) => {
    const transactionId = query.transactionId;
    await prisma_1.prisma.$transaction(async (tx) => {
        const payment = await tx.payment.findFirst({
            where: {
                tran_id: transactionId,
            },
        });
        if (!payment) {
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Payment Details Not Found");
        }
        const invoice = await tx.invoice.findUnique({
            where: {
                id: payment.invoiceId,
            },
        });
        if (!invoice) {
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Invoice Details Not Found");
        }
        await tx.payment.update({
            where: {
                id: payment.id,
            },
            data: {
                status: "FAILED",
            },
        });
        await tx.invoice.update({
            where: {
                id: invoice.id,
            },
            data: {
                status: "FAILED",
            },
        });
    });
    return { success: false, message: "Payment Failed" };
};
const cancelPayment = async (query) => {
    const transactionId = query.transactionId;
    await prisma_1.prisma.$transaction(async (tx) => {
        const payment = await tx.payment.findFirst({
            where: {
                tran_id: transactionId,
            },
        });
        if (!payment) {
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Payment Details Not Found");
        }
        const invoice = await tx.invoice.findUnique({
            where: {
                id: payment.invoiceId,
            },
        });
        if (!invoice) {
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Invoice Details Not Found");
        }
        await tx.payment.update({
            where: {
                id: payment.id,
            },
            data: {
                status: "CANCELLED",
            },
        });
        await tx.invoice.update({
            where: {
                id: invoice.id,
            },
            data: {
                status: "CANCELLED",
            },
        });
    });
    return { success: false, message: "Payment Failed" };
};
const getPaymentMethodStats = async (userId) => {
    const isOwner = await prisma_1.prisma.businessUser.findFirst({
        where: { userId, business: { isDeleted: false } },
    });
    if (!isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "You do not belong to any business");
    }
    const where = {
        invoice: { businessId: isOwner.businessId },
        status: "SUCCESS",
    };
    const [online, cash] = await Promise.all([
        prisma_1.prisma.payment.count({ where: { ...where, method: "ONLINE" } }),
        prisma_1.prisma.payment.count({ where: { ...where, method: "CASH" } }),
    ]);
    const total = online + cash;
    return {
        online: total ? Math.round((online / total) * 100) : 0,
        cash: total ? Math.round((cash / total) * 100) : 0,
        total,
    };
};
const updatePaymentMethod = async () => {
    await prisma_1.prisma.payment.updateMany({ data: { method: "ONLINE" } });
};
exports.PaymentServices = {
    initPayment,
    successPayment,
    failPayment,
    cancelPayment,
    updatePaymentMethod,
    getPaymentMethodStats,
};
