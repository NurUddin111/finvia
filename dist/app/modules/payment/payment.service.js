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
        let invoice = await tx.invoice.findFirst({
            where: {
                id: invId,
                status: {
                    not: "PAID",
                },
            },
        });
        if (!invoice) {
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "This invoice is PAID!");
        }
        const delay = Date.now() - new Date(invoice.issueDate).getTime();
        invoice = await tx.invoice.update({
            where: {
                id: invId,
            },
            data: {
                status: "SENT",
                issueDate: new Date(Date.now()),
                dueDate: new Date(new Date(invoice.dueDate).getTime() + delay),
            },
        });
        let client = await tx.client.findUnique({
            where: { id: invoice.clientId },
        });
        if (!client) {
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Client not found");
        }
        client = await tx.client.update({
            where: {
                id: client.id,
            },
            data: {
                totalInvoices: client.totalInvoices + 1,
            },
        });
        const business = await tx.business.findUnique({
            where: {
                id: invoice.businessId,
            },
        });
        if (!business) {
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Business details not found");
        }
        let payment = await tx.payment.findFirst({
            where: {
                invoiceId: invoice.id,
            },
        });
        if (!payment) {
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Payment details not found");
        }
        payment = await tx.payment.update({
            where: { id: payment.id },
            data: {
                status: "INITIATED",
            },
        });
        return { invoice, client, business, payment };
    });
    const { invoice, client, business, payment } = result;
    const invPdf = await (0, invPdf_1.generateInvPdf)(invoice);
    if (!invPdf) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "Failed to create Invoice PDF");
    }
    const cloudinaryResult = await (0, cloudinary_config_1.uploadBufferToCloudinary)(invPdf, "invoice");
    if (!cloudinaryResult) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "Failed to upload invoice pdf at cloudinary");
    }
    await prisma_1.prisma.invoice.update({
        where: {
            id: invId,
        },
        data: {
            invPdfUrl: cloudinaryResult.secure_url,
        },
    });
    const sslPayload = {
        address: client.address || "Bangladesh",
        email: client.email,
        phoneNumber: client.phone || "",
        name: client.name,
        amount: invoice.total,
        transactionId: payment.tran_id,
    };
    const sslPayment = await ssl_service_1.SSLService.sslPaymentInit(sslPayload);
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
                fileName: `Invoice-${invoice.invoiceNumber}`,
                content: invPdf,
                contentType: "application/pdf",
            },
        ],
    });
    return {
        CloudinaryResult: cloudinaryResult.secure_url,
        SSLCOMMERZ: sslPayment.GatewayPageURL,
    };
};
const successPayment = async (query) => {
    const transactionId = query.transactionId;
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        let payment = await tx.payment.findFirst({
            where: {
                tran_id: transactionId,
            },
        });
        if (!payment) {
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Payment not found");
        }
        let invoice = await tx.invoice.findFirst({
            where: {
                id: payment.invoiceId,
            },
        });
        if (!invoice) {
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Invoice not found");
        }
        const business = await tx.business.findUnique({
            where: {
                id: invoice.businessId,
            },
        });
        if (!business) {
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Business details not found");
        }
        const client = await tx.client.findUnique({
            where: { id: invoice.clientId },
        });
        if (!client) {
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Client not found");
        }
        const rcpNb = await (0, generateInvRcNb_1.generateReceiptNumber)(business.id);
        payment = await tx.payment.update({
            where: {
                id: payment.id,
            },
            data: {
                status: "SUCCESS",
                rcpNumber: rcpNb,
            },
        });
        invoice = await tx.invoice.update({
            where: {
                id: invoice.id,
            },
            data: {
                status: "PAID",
            },
        });
        return { payment, invoice, client, business };
    });
    const { invoice, payment, client, business } = result;
    const rcpPdf = await (0, rcpPdf_1.generateRcpPdf)(invoice);
    if (!rcpPdf) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "Failed to create Invoice PDF");
    }
    const cloudinaryResult = await (0, cloudinary_config_1.uploadBufferToCloudinary)(rcpPdf, "receipt");
    if (!cloudinaryResult) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "Failed to upload receipt pdf at cloudinary");
    }
    await prisma_1.prisma.payment.update({
        where: {
            id: payment.id,
        },
        data: {
            rcpPdfUrl: cloudinaryResult.secure_url,
        },
    });
    await (0, sendEmail_1.sendEmail)({
        to: client.email,
        subject: "Receipt",
        templateName: "receipt",
        templateData: {
            clientName: client.name,
            receiptNumber: payment.rcpNumber,
            invoiceNumber: invoice.invoiceNumber,
            paymentDate: (0, formatDT_1.formatDateTime)(new Date(Date.now())),
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
                fileName: `Receipt-${payment.rcpNumber}`,
                content: rcpPdf,
                contentType: "application/pdf",
            },
        ],
    });
    return { success: true, message: "Payment Completed Successfully" };
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
exports.PaymentServices = {
    initPayment,
    successPayment,
    failPayment,
    cancelPayment,
};
