"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const business_service_1 = require("./business.service");
const sendResponse_1 = require("../../utils/sendResponse");
const httpStatusCodes_1 = require("../../utils/httpStatusCodes");
const cloudinary_config_1 = require("../../config/cloudinary.config");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const addBusiness = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const user = req.user;
    const userId = user.userId;
    const payload = req.body;
    let logoUrl;
    if (req.file) {
        const uploadResult = await (0, cloudinary_config_1.uploadBufferToCloudinary)(req.file.buffer, "business-logo", "logos");
        if (!uploadResult) {
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "Failed to upload business logo");
        }
        logoUrl = uploadResult.secure_url;
    }
    const business = await business_service_1.BusinessServices.addBusiness(req, res, userId, payload, logoUrl);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.CREATED,
        message: "Business created successfully",
        data: business,
    });
});
const getSingleBusiness = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const id = req.params.id;
    const business = await business_service_1.BusinessServices.getSinglBusiness(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "Business retrieved successfully",
        data: business,
    });
});
const getMyBusiness = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const decodedToken = req.user;
    const result = await business_service_1.BusinessServices.getMyBusiness(decodedToken.userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.CREATED,
        message: "Your Business Retrieved Successfully",
        data: result.data,
    });
});
const updateBusiness = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const id = req.params.id;
    const payload = req.body;
    const user = req.user;
    const userId = user.userId;
    let logoUrl;
    if (req.file) {
        const uploadResult = await (0, cloudinary_config_1.uploadBufferToCloudinary)(req.file.buffer, "business-logo", "logos");
        if (!uploadResult) {
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "Failed to upload business logo");
        }
        logoUrl = uploadResult.secure_url;
    }
    const business = await business_service_1.BusinessServices.updateBusiness(id, payload, userId, logoUrl);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "Business details updated successfully",
        data: business,
    });
});
const deleteBusiness = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const businessId = req.params.id;
    const decodedToken = req.user;
    await business_service_1.BusinessServices.deleteBusiness(req, res, businessId, decodedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "Business deleted successfully",
        data: null,
    });
});
const addBusinessOwnerOrAdmin = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const decodedToken = req.user;
    const { name, email, role } = req.body;
    await business_service_1.BusinessServices.addBusinessOwnerOrAdmin(name, email, role, decodedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "Invitation sent successfully.",
        data: null,
    });
});
const joinBusinessOwnerOrAdmin = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const decodedToken = req.user;
    const { invitationToken } = req.body;
    const business = await business_service_1.BusinessServices.joinBusinessOwnerOrAdmin(req, res, decodedToken, invitationToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "Joined Business successfully.",
        data: business,
    });
});
const getKPICardDetails = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const decodedToken = req.user;
    const userId = decodedToken.userId;
    const businessDetails = await business_service_1.BusinessServices.getKPICardDetails(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "KPI card details retrieved successfully!",
        data: businessDetails,
    });
});
const getMonthlyRevenue = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const decodedToken = req.user;
    const userId = decodedToken.userId;
    const monthlyRevenue = await business_service_1.BusinessServices.getMonthlyRevenue(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "Monthly revenue retrieved successfully!",
        data: monthlyRevenue,
    });
});
const getTopClients = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const decodedToken = req.user;
    const userId = decodedToken.userId;
    const topClients = await business_service_1.BusinessServices.getTopClients(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "Top five clients retrieved successfully!",
        data: topClients,
    });
});
const getRecentTransactions = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const decodedToken = req.user;
    const userId = decodedToken.userId;
    const recentTransactions = await business_service_1.BusinessServices.getRecentTransactions(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "Recent tracnsactions retrieved successfully!",
        data: recentTransactions,
    });
});
const getOverdueInvoices = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const decodedToken = req.user;
    const userId = decodedToken.userId;
    const overdueInvoices = await business_service_1.BusinessServices.getOverdueInvoices(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "Overdue Invoices details retrieved successfully!",
        data: overdueInvoices,
    });
});
const getUpcomingOverdueInvoices = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const decodedToken = req.user;
    const userId = decodedToken.userId;
    const upcomingOverdueInvoices = await business_service_1.BusinessServices.getUpcomingOverdueInvoices(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "Upcoming Overdue Invoices details retrieved successfully!",
        data: upcomingOverdueInvoices,
    });
});
const getClientPieChartData = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const decodedToken = req.user;
    const userId = decodedToken.userId;
    const clientPieChartData = await business_service_1.BusinessServices.getClientPieChartData(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "Clients pie chart details retrieved successfully!",
        data: clientPieChartData,
    });
});
const getClientsNumByMonth = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const decodedToken = req.user;
    const userId = decodedToken.userId;
    const clientsNumByMonth = await business_service_1.BusinessServices.getClientsNumByMonth(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "Clients number retrieved successfully!",
        data: clientsNumByMonth,
    });
});
exports.BusinessController = {
    addBusiness,
    getSingleBusiness,
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
