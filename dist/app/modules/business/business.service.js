"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessServices = void 0;
const prisma_1 = require("../../../generated/prisma");
const prisma_2 = require("../../../lib/prisma");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const httpStatusCodes_1 = require("../../utils/httpStatusCodes");
const userTokens_1 = require("../../utils/userTokens");
const setCookie_1 = require("../../utils/setCookie");
const sendEmail_1 = require("../../utils/sendEmail");
const env_1 = require("../../config/env");
const jwt_1 = require("../../utils/jwt");
const addBusiness = async (req, res, userId, payload) => {
    const isOwner = await prisma_2.prisma.businessUser.findFirst({
        where: { userId, business: { isDeleted: false } },
    });
    if (isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "You already belong to a business");
    }
    const result = await prisma_2.prisma.$transaction(async (tx) => {
        const business = await tx.business.create({
            data: {
                name: payload.name,
                category: payload.category,
                email: payload.email || null,
                phone: payload.phone || null,
                address: payload.address || null,
                website: payload.website || null,
            },
        });
        await tx.businessUser.create({
            data: {
                userId,
                businessId: business.id,
                role: prisma_1.BusinessRole.BUSINESS_OWNER,
                status: prisma_1.MemberStatus.ACTIVE,
            },
        });
        await tx.user.update({
            where: { id: userId },
            data: { role: "BUSINESS_OWNER" },
        });
        const user = (await tx.user.findUnique({
            where: { id: userId },
        }));
        const userTokens = (0, userTokens_1.createUserTokens)(user);
        (0, setCookie_1.setAuthCookie)(req, res, userTokens);
        return business;
    });
    return result;
};
const getSinglBusiness = async (businessId) => {
    const business = await prisma_2.prisma.business.findUnique({
        where: {
            id: businessId,
        },
        include: {
            members: true,
        },
    });
    return business;
};
const getMyBusiness = async (userId) => {
    const isOwner = await prisma_2.prisma.businessUser.findFirst({
        where: { userId: userId, business: { isDeleted: false } },
    });
    if (!isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "You do not belong to any business");
    }
    const business = await prisma_2.prisma.business.findFirst({
        where: {
            id: isOwner.businessId,
            isDeleted: false,
        },
        include: {
            members: {
                select: {
                    userId: true,
                },
            },
        },
    });
    if (!business) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "You");
    }
    return {
        data: business,
    };
};
const updateBusiness = async (businessId, payload, decodedToken) => {
    const userId = decodedToken.userId;
    const isOwner = await prisma_2.prisma.businessUser.findFirst({
        where: { userId, business: { isDeleted: false } },
    });
    if (!isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "You do not belong to any business");
    }
    if (businessId !== isOwner.businessId) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED, "It looks like you're trying to edit another user's business. You can only make changes to your own business.");
    }
    const updatedBusiness = await prisma_2.prisma.business.update({
        where: {
            id: businessId,
            isDeleted: false,
        },
        data: payload,
    });
    return updatedBusiness;
};
const deleteBusiness = async (req, res, businessId, decodedToken) => {
    const userId = decodedToken.userId;
    const isOwner = await prisma_2.prisma.businessUser.findFirst({
        where: { userId, business: { isDeleted: false } },
    });
    if (!isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "You do not belong to any business");
    }
    if (businessId !== isOwner.businessId) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED, "It looks like you're trying to delete another user's business. You can only make changes to your own business.");
    }
    await prisma_2.prisma.$transaction(async (tx) => {
        await tx.business.update({
            where: {
                id: businessId,
                isDeleted: false,
            },
            data: {
                isDeleted: true,
            },
        });
        await tx.user.update({
            where: { id: userId },
            data: {
                role: prisma_1.UserRole.USER,
            },
        });
        const user = (await tx.user.findUnique({
            where: { id: userId },
        }));
        const userTokens = (0, userTokens_1.createUserTokens)(user);
        (0, setCookie_1.setAuthCookie)(req, res, userTokens);
    });
};
const addBusinessOwnerOrAdmin = async (name, email, role, decodedToken) => {
    const userId = decodedToken.userId;
    const isOwner = await prisma_2.prisma.businessUser.findFirst({
        where: { userId, business: { isDeleted: false } },
        include: {
            business: {
                select: {
                    id: true,
                    name: true,
                },
            },
            user: {
                select: {
                    name: true,
                },
            },
        },
    });
    if (!isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "You do not belong to any business");
    }
    const newOwnerCheck = await prisma_2.prisma.businessUser.findFirst({
        where: {
            user: {
                email: email,
            },
        },
    });
    if (newOwnerCheck) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, `User is already a ${newOwnerCheck.role}`);
    }
    const payload = {
        email: email,
        bsId: isOwner.business.id,
        role: role,
    };
    const invitationToken = (0, jwt_1.generateToken)(payload, env_1.envVars.JWT_INVITATION_SECRET, env_1.envVars.JWT_INVITATION_EXPIRES);
    const inviteLink = `${env_1.envVars.FRONTEND_URL}/business?token=${invitationToken}`;
    await (0, sendEmail_1.sendEmail)({
        to: email,
        subject: `${isOwner.business.name} inviting you!`,
        templateName: "addAuthority",
        templateData: {
            businessName: isOwner.business.name,
            receiverName: name,
            inviterName: isOwner.user.name,
            role: role,
            inviteLink: inviteLink,
        },
    });
};
const joinBusinessOwnerOrAdmin = async (req, res, decodedToken, invitationToken) => {
    const verifiedInvToken = (0, jwt_1.verifyToken)(invitationToken, env_1.envVars.JWT_INVITATION_SECRET);
    if (!verifiedInvToken) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "Invitation link has expired!");
    }
    const userEmail = decodedToken.email;
    const invReceiverEmail = verifiedInvToken.email;
    if (userEmail !== invReceiverEmail) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED, "You're not the user who was invited to join!");
    }
    const userId = decodedToken.userId;
    const bsId = verifiedInvToken.bsId;
    const role = verifiedInvToken.role;
    const result = await prisma_2.prisma.$transaction(async (tx) => {
        await tx.businessUser.create({
            data: {
                userId,
                businessId: bsId,
                role: role === "OWNER"
                    ? prisma_1.BusinessRole.BUSINESS_OWNER
                    : prisma_1.BusinessRole.BUSINESS_ADMIN,
                status: prisma_1.MemberStatus.ACTIVE,
            },
        });
        await tx.user.update({
            where: { id: userId },
            data: {
                role: role === "OWNER" ? prisma_1.UserRole.BUSINESS_OWNER : prisma_1.UserRole.BUSINESS_ADMIN,
            },
        });
        const user = (await tx.user.findUnique({
            where: { id: userId },
        }));
        const userTokens = (0, userTokens_1.createUserTokens)(user);
        (0, setCookie_1.setAuthCookie)(req, res, userTokens);
        const business = await tx.business.findUnique({
            where: {
                id: bsId,
            },
            include: {
                members: true,
            },
        });
        return business;
    });
    return result;
};
exports.BusinessServices = {
    addBusiness,
    getSinglBusiness,
    getMyBusiness,
    updateBusiness,
    deleteBusiness,
    addBusinessOwnerOrAdmin,
    joinBusinessOwnerOrAdmin,
};
