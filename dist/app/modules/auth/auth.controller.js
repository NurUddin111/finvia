"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const auth_service_1 = require("./auth.service");
const httpStatusCodes_1 = require("../../utils/httpStatusCodes");
const passport_1 = __importDefault(require("passport"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const userTokens_1 = require("../../utils/userTokens");
const setCookie_1 = require("../../utils/setCookie");
const createUserRequest = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const { name, email } = req.body;
    await auth_service_1.AuthServices.createUserRequest(req, res, name, email);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "OTP sent successfully",
        data: null,
    });
});
const createUserVerification = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const creationToken = req.cookies.creationToken;
    const { otp } = req.body;
    await auth_service_1.AuthServices.createUserVerification(req, res, creationToken, otp);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "OTP verified successfully",
        data: null,
    });
});
const createUserSuccess = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const verifiedCreationToken = req.cookies.verifiedCreationToken;
    const password = req.body.password;
    const payload = {
        password: password,
    };
    const user = await auth_service_1.AuthServices.createUserSuccess(res, verifiedCreationToken, payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.CREATED,
        message: "User created successfully",
        data: user,
    });
});
const credentialsLogin = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    passport_1.default.authenticate("local", async (err, user, info) => {
        if (err) {
            return next(new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED, err));
        }
        if (!user) {
            return next(new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED, info.message));
        }
        const userTokens = (0, userTokens_1.createUserTokens)(user);
        const { password, ...rest } = user;
        (0, setCookie_1.setAuthCookie)(req, res, userTokens);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
            message: "User logged in successfully",
            data: {
                acceessToken: userTokens.accessToken,
                refreshToken: userTokens.refreshToken,
                user: rest,
            },
        });
    })(req, res, next);
});
const getNewAccessToken = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "No refresh token recieved from cookies");
    }
    const tokenInfo = await auth_service_1.AuthServices.getNewAccessToken(refreshToken);
    (0, setCookie_1.setAuthCookie)(req, res, tokenInfo);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "New Access Token Retrived Successfully",
        data: tokenInfo,
    });
});
const logout = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    (0, setCookie_1.clearAuthCookies)(res, setCookie_1.authCookies);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "User Logged Out Successfully",
        data: null,
    });
});
const changePassword = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const oldPass = req.body.oldPass;
    const newPass = req.body.newPass;
    const confirmNewPass = req.body.confirmNewPass;
    const decodedToken = req.user;
    await auth_service_1.AuthServices.changePassword(oldPass, newPass, confirmNewPass, decodedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "Password Changed Successfully",
        data: null,
    });
});
const forgotPassword = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const email = req.body.email;
    await auth_service_1.AuthServices.forgotPassword(req, res, email);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "Email Sent Successfully",
        data: null,
    });
});
const resetPassword = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const userId = req.query.id;
    const forgotPassToken = req.query.token;
    const newPass = req.body.newPass;
    const confirmNewPass = req.body.confirmNewPass;
    if (!userId || !forgotPassToken) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED, "No user id or forgot pass token found from query.");
    }
    await auth_service_1.AuthServices.resetPassword(res, userId, forgotPassToken, newPass, confirmNewPass);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "Password Changed Successfully.Please login with new password",
        data: null,
    });
});
const addFinviaAdmin = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const decodedToken = req.user;
    const { name, email } = req.body;
    const role = "ADMIN";
    await auth_service_1.AuthServices.addFinviaAdmin(name, email, role, decodedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "Invitation sent successfully.",
        data: null,
    });
});
const joinFinvia = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const decodedToken = req.user;
    const { invitationToken } = req.body;
    const newAdmin = await auth_service_1.AuthServices.joinFinvia(req, res, decodedToken, invitationToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "Joined Finvia successfully.",
        data: newAdmin,
    });
});
exports.AuthControllers = {
    createUserRequest,
    createUserVerification,
    createUserSuccess,
    credentialsLogin,
    getNewAccessToken,
    logout,
    changePassword,
    forgotPassword,
    resetPassword,
    addFinviaAdmin,
    joinFinvia,
};
