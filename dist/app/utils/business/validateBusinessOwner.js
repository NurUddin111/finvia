"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBusinessOwner = void 0;
const prisma_1 = require("../../../lib/prisma");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const httpStatusCodes_1 = require("../httpStatusCodes");
const validateBusinessOwner = async (userId, message = "Unauthorized access.") => {
    const businessUser = await prisma_1.prisma.businessUser.findFirst({
        where: {
            userId,
            business: {
                isDeleted: false,
            },
        },
    });
    if (!businessUser) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, message);
    }
    return businessUser;
};
exports.validateBusinessOwner = validateBusinessOwner;
