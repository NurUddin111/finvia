"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const httpStatusCodes_1 = require("../../utils/httpStatusCodes");
const invoice_service_1 = require("./invoice.service");
const createInvoice = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const decodedToken = req.user;
    const { email, dueDays, method, items, taxRate, notes, } = req.body;
    const invoice = await invoice_service_1.InvoiceServices.createInvoice(decodedToken, email, Number(dueDays), method, items, Number(taxRate), notes);
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
    const query = {
        page: req.query.page,
        search: req.query.search,
        status: req.query.status,
        sortBy: req.query.sortBy,
        order: req.query.order,
        year: req.query.year,
    };
    const invoices = await invoice_service_1.InvoiceServices.getAllInvoices(userId, query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
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
const getInvoicesStats = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const user = req.user;
    const userId = user.userId;
    const InvoicesStats = await invoice_service_1.InvoiceServices.getInvoicesStats(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.CREATED,
        message: "Invoices stats retrieved successfully",
        data: InvoicesStats.data,
    });
});
const setOverdueStatus = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const user = req.user;
    const userId = user.userId;
    const overdueInvoices = await invoice_service_1.InvoiceServices.setOverdueStatus(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.CREATED,
        message: "Invoices stats retrieved successfully",
        data: overdueInvoices,
    });
});
exports.InvoiceController = {
    createInvoice,
    getAllInvoices,
    getSingleInvoice,
    getInvoicesStats,
    setOverdueStatus,
};
