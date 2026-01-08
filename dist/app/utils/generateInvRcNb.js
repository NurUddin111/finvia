"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReceiptNumber = exports.generateInvoiceNumber = void 0;
const prisma_1 = require("../../lib/prisma");
const generateInvoiceNumber = async (businessId) => {
    const year = new Date().getFullYear();
    const count = await prisma_1.prisma.invoice.count({
        where: { businessId, issueDate: { gte: new Date(`${year}-01-01`) } },
    });
    return `INV-${year}-${String(count + 1).padStart(5, "0")}`;
};
exports.generateInvoiceNumber = generateInvoiceNumber;
const generateReceiptNumber = async (businessId) => {
    const year = new Date().getFullYear();
    const count = await prisma_1.prisma.payment.count({
        where: {
            invoice: {
                businessId: businessId,
                status: "PAID",
            },
            createdAt: { gte: new Date(`${year}-01-01`) },
        },
    });
    return `RCP-${year}-${String(count + 1).padStart(5, "0")}`;
};
exports.generateReceiptNumber = generateReceiptNumber;
