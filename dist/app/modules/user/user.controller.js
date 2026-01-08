"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const user_constants_1 = require("./user.constants");
const catchAsync_1 = require("../../utils/catchAsync");
const user_service_1 = require("./user.service");
const sendResponse_1 = require("../../utils/sendResponse");
const httpStatusCodes_1 = require("../../utils/httpStatusCodes");
const pick_1 = __importDefault(require("../../utils/pick"));
const getAllFinviaUsers = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const filters = (0, pick_1.default)(req.query, user_constants_1.userFilterableFields);
    const options = (0, pick_1.default)(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const result = await user_service_1.UserServices.getAllFinviaUsers(filters, options);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        success: true,
        message: "Users data retrieved succcessfully!",
        meta: result.meta,
        data: result.data,
    });
});
const getSingleUser = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const id = req.params.id;
    const user = await user_service_1.UserServices.getSingleUser(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "User retrieved successfully",
        data: user,
    });
});
const getMe = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const decodedToken = req.user;
    const result = await user_service_1.UserServices.getMe(decodedToken.userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.CREATED,
        message: "Your profile Retrieved Successfully",
        data: result.data,
    });
});
const updateUser = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const id = req.params.id;
    const payload = req.body;
    const verifiedToken = req.user;
    const user = await user_service_1.UserServices.updateUser(id, payload, verifiedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "User updated successfully",
        data: user,
    });
});
const deleteUser = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const id = req.params.id;
    const user = await user_service_1.UserServices.deleteUser(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "User deleted successfully",
        data: null,
    });
});
exports.UserControllers = {
    getAllFinviaUsers,
    getSingleUser,
    getMe,
    updateUser,
    deleteUser,
};
