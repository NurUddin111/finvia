"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const httpStatusCodes_1 = require("../utils/httpStatusCodes");
const jwt_1 = require("../utils/jwt");
const env_1 = require("../config/env");
const checkUserStatus_1 = require("../utils/checkUserStatus");
const prisma_1 = require("../../lib/prisma");
const checkAuth = (...authRoles) => (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED, "No access token received.Please login get new access token...");
    }
    const verifiedAccessToken = (0, jwt_1.verifyToken)(accessToken, env_1.envVars.JWT_ACCESS_SECRET);
    const userRole = verifiedAccessToken.role;
    const userId = verifiedAccessToken.userId;
    if (!authRoles.includes(userRole)) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED, "You are not permitted to view this route!!!");
    }
    const email = verifiedAccessToken.email;
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "No User Found!");
    }
    (0, checkUserStatus_1.checkUserStatus)(req, user, email);
    req.user = verifiedAccessToken;
    next();
});
exports.checkAuth = checkAuth;
