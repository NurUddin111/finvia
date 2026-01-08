"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserStatus = void 0;
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const httpStatusCodes_1 = require("./httpStatusCodes");
const jwt_1 = require("./jwt");
const prisma_1 = require("../../generated/prisma");
const prisma_2 = require("../../lib/prisma");
const checkUserStatus = async (req, user, email) => {
    if (!user) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "User does not exist");
    }
    if (user.isDeleted) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.FORBIDDEN, "User is deleted");
    }
    if (!user.isVerified) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.FORBIDDEN, "User is not verified");
    }
    const blockedToken = req.cookies.blockedToken;
    const inActiveToken = req.cookies.inActiveToken;
    if (blockedToken) {
        const verifiedBlockedToken = (0, jwt_1.verifyToken)(blockedToken, email);
        if (!verifiedBlockedToken) {
            await prisma_2.prisma.user.update({
                where: { id: user.id },
                data: { isActive: prisma_1.IsActive.ACTIVE },
            });
        }
    }
    if (!blockedToken && user.isActive === prisma_1.IsActive.BLOCKED) {
        await prisma_2.prisma.user.update({
            where: { id: user.id },
            data: { isActive: prisma_1.IsActive.ACTIVE },
        });
    }
    if (inActiveToken) {
        const verifiedInActiveToken = (0, jwt_1.verifyToken)(inActiveToken, email);
        if (!verifiedInActiveToken) {
            await prisma_2.prisma.user.update({
                where: { id: user.id },
                data: { isActive: prisma_1.IsActive.ACTIVE },
            });
        }
    }
    if (user.isActive === prisma_1.IsActive.BLOCKED) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.FORBIDDEN, `User is ${user.isActive}`);
    }
};
exports.checkUserStatus = checkUserStatus;
