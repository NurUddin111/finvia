"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const business_service_1 = require("./business.service");
const sendResponse_1 = require("../../utils/sendResponse");
const httpStatusCodes_1 = require("../../utils/httpStatusCodes");
const addBusiness = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const user = req.user;
    const userId = user.userId;
    const payload = req.body;
    const business = await business_service_1.BusinessServices.addBusiness(req, res, userId, payload);
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
    const verifiedToken = req.user;
    const business = await business_service_1.BusinessServices.updateBusiness(id, payload, verifiedToken);
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
exports.BusinessController = {
    addBusiness,
    getSingleBusiness,
    getMyBusiness,
    updateBusiness,
    deleteBusiness,
    addBusinessOwnerOrAdmin,
    joinBusinessOwnerOrAdmin,
};
