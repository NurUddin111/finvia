"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const httpStatusCodes_1 = require("../../utils/httpStatusCodes");
const otp_service_1 = require("../otp/otp.service");
const jwt_1 = require("../../utils/jwt");
const env_1 = require("../../config/env");
const setCookie_1 = require("../../utils/setCookie");
const prisma_1 = require("../../../lib/prisma");
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userTokens_1 = require("../../utils/userTokens");
const checkUserStatus_1 = require("../../utils/checkUserStatus");
const sendEmail_1 = require("../../utils/sendEmail");
const createUserRequest = async (req, res, name, email) => {
    if (!name) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "Please Enter Your Name");
    }
    if (!email) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "Please enter a valid email address!");
    }
    const isUserExist = await prisma_1.prisma.user.findUnique({
        where: {
            email: email,
            isDeleted: false,
        },
    });
    if (isUserExist) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "User already exists");
    }
    const sub = "Account Verification Code";
    const temp = "accountVerificationOtp";
    const tempData = {
        name,
    };
    const OTP_EXPIRATION = 2 * 60;
    await otp_service_1.OTPServices.sendOTP(email, sub, temp, tempData, OTP_EXPIRATION);
    const jwtPayload = {
        name: name,
        email: email,
    };
    const creationToken = (0, jwt_1.generateToken)(jwtPayload, env_1.envVars.JWT_CREATION_SECRET, env_1.envVars.JWT_CREATION_EXPIRES);
    if (!creationToken) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.INTERNAL_SERVER_ERROR, "Failed to create CREATION_TOKEN");
    }
    (0, setCookie_1.setAuthCookie)(req, res, { creationToken: creationToken });
};
const createUserVerification = async (req, res, creationToken, otp) => {
    if (!creationToken) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED, "No CREATION_TOKEN recieved");
    }
    const verifiedToken = (0, jwt_1.verifyToken)(creationToken, env_1.envVars.JWT_CREATION_SECRET);
    const { name, email } = verifiedToken;
    if (!name || !email) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.INTERNAL_SERVER_ERROR, "Failed to decode Name and Email from CREATION_TOKEN");
    }
    await otp_service_1.OTPServices.verifyOTP(email, otp);
    const jwtPayload = {
        name: name,
        email: email,
    };
    const verifiedCreationToken = (0, jwt_1.generateToken)(jwtPayload, env_1.envVars.JWT_VERIFIED_CREATION_SECRET, env_1.envVars.JWT_VERIFIED_CREATION_EXPIRES);
    if (!verifiedCreationToken) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.INTERNAL_SERVER_ERROR, "Failed to create VERIFIED_CREATION_TOKEN");
    }
    (0, setCookie_1.setAuthCookie)(req, res, { verifiedCreationToken: verifiedCreationToken });
};
const createUserSuccess = async (res, verifiedCreationToken, payload) => {
    if (!verifiedCreationToken) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED, "No VERIFIED_CREATION_TOKEN received.Please verify your email first!");
    }
    const verifiedToken = (0, jwt_1.verifyToken)(verifiedCreationToken, env_1.envVars.JWT_VERIFIED_CREATION_SECRET);
    const { name, email } = verifiedToken;
    if (!name || !email) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.INTERNAL_SERVER_ERROR, "Failed to decode Name and Email from VERIFIED_CREATION_TOKEN");
    }
    const { password } = payload;
    if (!password) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.INTERNAL_SERVER_ERROR, "Plase set a password");
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    const authProvider = {
        provider: "credentials",
        providerId: email,
    };
    const user = await prisma_1.prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            isVerified: true,
            auths: {
                create: {
                    provider: authProvider.provider,
                    providerId: authProvider.providerId,
                },
            },
        },
        include: {
            auths: true,
        },
    });
    res.clearCookie("verifiedCreationToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    return user;
};
const getNewAccessToken = async (refreshToken) => {
    const newAccessToken = await (0, userTokens_1.createNewAccessTokenWithRefreshToken)(refreshToken);
    return {
        accessToken: newAccessToken,
        refreshToken,
    };
};
const changePassword = async (oldPass, newPass, confirmNewPass, decodedToken) => {
    const userId = decodedToken.userId;
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "User already exists");
    }
    if (!user.password) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "User don't have a password.Please set a password first.");
    }
    if (!oldPass) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "Please provide current password.");
    }
    if (!newPass) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "Please provide a new password.");
    }
    if (!confirmNewPass) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "Please provide confirmed password.");
    }
    const oldPassMatching = await bcryptjs_1.default.compare(oldPass, user.password);
    if (!oldPassMatching) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED, "Old Password does not match");
    }
    if (oldPass === newPass) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "Please set a new password!");
    }
    if (newPass !== confirmNewPass) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "New password and confirmation do not match.");
    }
    const hashedPassword = await bcryptjs_1.default.hash(newPass, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    await prisma_1.prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
    });
};
const forgotPassword = async (req, res, email) => {
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
        const verifiedAccessToken = (0, jwt_1.verifyToken)(accessToken, env_1.envVars.JWT_ACCESS_SECRET);
        if (verifiedAccessToken) {
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED, "A logged in user can't request for forget password.You can request for change password.");
        }
    }
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            email: email,
            isDeleted: false,
        },
    });
    if (!user) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "No User Found");
    }
    (0, checkUserStatus_1.checkUserStatus)(req, user, email);
    if (!user.password) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "You didn't set any password previously.");
    }
    const jwtPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
    };
    const resetToken = (0, jwt_1.generateToken)(jwtPayload, env_1.envVars.JWT_ACCESS_SECRET, "10m");
    const resetUILink = `${env_1.envVars.FRONTEND_URL}/reset-password?id=${user.id}&token=${resetToken}`;
    await (0, sendEmail_1.sendEmail)({
        to: user.email,
        subject: "Forgot Password?",
        templateName: "forgotPassword",
        templateData: {
            name: user.name,
            resetUILink,
        },
    });
};
const resetPassword = async (res, userId, forgotPassToken, newPass, confirmNewPass) => {
    if (forgotPassToken) {
        const verifiedAccessToken = (0, jwt_1.verifyToken)(forgotPassToken, env_1.envVars.JWT_ACCESS_SECRET);
        if (!verifiedAccessToken) {
            throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED, "Forgot password token is expired.Please Request again.");
        }
    }
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "No User Found.");
    }
    if (!newPass) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "Please provide a new password.");
    }
    if (!confirmNewPass) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "Please provide confirmed password.");
    }
    if (newPass !== confirmNewPass) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "New password and confirmation does not match.");
    }
    const hashedPassword = await bcryptjs_1.default.hash(newPass, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    await prisma_1.prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
    });
};
const addFinviaAdmin = async (name, email, role, decodedToken) => {
    const userId = decodedToken.userId;
    const isAdmin = await prisma_1.prisma.user.findFirst({
        where: { id: userId, role: "ADMIN" },
    });
    if (!isAdmin) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "You're not an Admin.");
    }
    const newAdminCheck = await prisma_1.prisma.businessUser.findFirst({
        where: {
            user: {
                email: email,
            },
        },
    });
    if (newAdminCheck) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, `A ${newAdminCheck.role} can't be added as an Admin of Finvia`);
    }
    const payload = {
        email: email,
        role: role,
    };
    const invitationToken = (0, jwt_1.generateToken)(payload, env_1.envVars.JWT_INVITATION_SECRET, env_1.envVars.JWT_INVITATION_EXPIRES);
    const inviteLink = `${env_1.envVars.FRONTEND_URL}?token=${invitationToken}`;
    await (0, sendEmail_1.sendEmail)({
        to: email,
        subject: "FINVIA is inviting you!",
        templateName: "addAuthority",
        templateData: {
            businessName: "FINVIA",
            receiverName: name,
            inviterName: isAdmin.name,
            role: role,
            inviteLink: inviteLink,
        },
    });
};
const joinFinvia = async (req, res, decodedToken, invitationToken) => {
    const verifiedInvToken = (0, jwt_1.verifyToken)(invitationToken, env_1.envVars.JWT_INVITATION_SECRET);
    if (!verifiedInvToken) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, "Invitation link has expired!");
    }
    const userEmail = decodedToken.email;
    const invitationReceiver = verifiedInvToken.email;
    if (userEmail !== invitationReceiver) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED, "You're not the user who was invited to join!");
    }
    const userId = decodedToken.userId;
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        await tx.user.update({
            where: { id: userId },
            data: {
                role: client_1.UserRole.ADMIN,
            },
        });
        const user = (await tx.user.findUnique({
            where: { id: userId },
        }));
        const userTokens = (0, userTokens_1.createUserTokens)(user);
        (0, setCookie_1.setAuthCookie)(req, res, userTokens);
        return user;
    });
    return result;
};
exports.AuthServices = {
    createUserRequest,
    createUserVerification,
    createUserSuccess,
    getNewAccessToken,
    changePassword,
    forgotPassword,
    resetPassword,
    addFinviaAdmin,
    joinFinvia,
};
