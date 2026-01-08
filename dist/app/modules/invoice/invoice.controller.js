"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const httpStatusCodes_1 = require("../../utils/httpStatusCodes");
const invoice_service_1 = require("./invoice.service");
const createInvoice = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const decodedToken = req.user;
    const { email, dueDays, items, taxRate, notes } = req.body;
    const invoice = await invoice_service_1.InvoiceServices.createInvoice(decodedToken, email, Number(dueDays), items, Number(taxRate), notes);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.CREATED,
        message: "Invoice created successfully",
        data: invoice,
    });
});
const getAllInvoices = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const user = req.user;
    const userId = user.userId;
    const invoices = await invoice_service_1.InvoiceServices.getAllInvoices(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.CREATED,
        message: "All Invoices retrieved successfully",
        data: invoices,
    });
});
const getSingleInvoice = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const user = req.user;
    const userId = user.userId;
    const invId = req.params.id;
    const invoice = await invoice_service_1.InvoiceServices.getSingleInvoice(userId, invId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.CREATED,
        message: "Invoice retrieved successfully",
        data: invoice,
    });
});
exports.InvoiceController = { createInvoice, getAllInvoices, getSingleInvoice };
