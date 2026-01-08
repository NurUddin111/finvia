"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const prisma_1 = require("../../../generated/prisma");
const prisma_2 = require("../../../lib/prisma");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const httpStatusCodes_1 = require("../../utils/httpStatusCodes");
const paginationHelper_1 = require("../../utils/paginationHelper");
const user_constants_1 = require("./user.constants");
const getAllFinviaUsers = async (params, options) => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm, ...filterData } = params;
    const andConditions = [{ isDeleted: false }];
    if (searchTerm) {
        andConditions.push({
            OR: user_constants_1.userSearchAbleFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const data = await prisma_2.prisma.user.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            password: false,
            auths: true,
            isVerified: true,
            isActive: true,
            avatar: true,
            phone: true,
            address: true,
            createdAt: true,
            updatedAt: true,
            businessUsers: {
                include: {
                    business: true,
                },
            },
        },
    });
    const total = await prisma_2.prisma.user.count({ where: whereConditions });
    const totalPage = Math.ceil(total / limit);
    return {
        meta: {
            page,
            limit,
            total,
            totalPage,
        },
        data,
    };
};
const getSingleUser = async (userId) => {
    const user = await prisma_2.prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            auths: true,
        },
    });
    return user;
};
const getMe = async (userId) => {
    const user = await prisma_2.prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "User Not Found!");
    }
    return {
        data: user,
    };
};
const updateUser = async (userId, payload, decodedToken) => {
    const user = await prisma_2.prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "User Not Found!");
    }
    if (decodedToken.role === prisma_1.UserRole.USER ||
        decodedToken.role === prisma_1.UserRole.BUSINESS_OWNER) {
        if (userId !== decodedToken.userId) {
            throw new AppError_1.default(401, "It looks like you're trying to edit another user's profile. You can only make changes to your own profile.");
        }
    }
    if (payload.role && payload.role === prisma_1.UserRole.ADMIN) {
        if (decodedToken.role !== prisma_1.UserRole.ADMIN) {
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.FORBIDDEN, "Setting up Admin role is a restricted action. For security, only users with an existing Admin role can assign it to others.");
        }
    }
    if (payload.isActive || payload.isDeleted || payload.isVerified) {
        if (decodedToken.role !== prisma_1.UserRole.ADMIN) {
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.FORBIDDEN, "This is a restricted action. For security, only Admin can update these information.");
        }
    }
    const updatedUser = await prisma_2.prisma.user.update({
        where: {
            id: userId,
        },
        data: payload,
    });
    return updatedUser;
};
const deleteUser = async (userId) => {
    const user = await prisma_2.prisma.user.findUnique({
        where: {
            id: userId,
            isDeleted: false,
        },
    });
    if (!user) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "No user found.");
    }
    await prisma_2.prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            isDeleted: true,
        },
    });
};
exports.UserServices = {
    getAllFinviaUsers,
    getSingleUser,
    getMe,
    updateUser,
    deleteUser,
};
