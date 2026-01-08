"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPServices = void 0;
const crypto_1 = __importDefault(require("crypto"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const redis_config_1 = require("../../config/redis.config");
const sendEmail_1 = require("../../utils/sendEmail");
const generateOTP = (length = 6) => {
    const otp = crypto_1.default.randomInt(10 ** (length - 1), 10 ** length).toString();
    return otp;
};
const sendOTP = async (email, sub, tempName, tempData, OTP_EXPIRATION) => {
    const otp = generateOTP();
    const redisKey = `otp:${email}`;
    await redis_config_1.redisClient.set(redisKey, otp, {
        expiration: {
            type: "EX",
            value: OTP_EXPIRATION,
        },
    });
    await (0, sendEmail_1.sendEmail)({
        to: email,
        subject: `${otp} is your ${sub}`,
        templateName: `${tempName}`,
        templateData: {
            otp: otp,
            ...tempData,
        },
    });
};
const verifyOTP = async (email, otp) => {
    const redisKey = `otp:${email}`;
    const savedOtp = await redis_config_1.redisClient.get(redisKey);
    console.log(email, otp, "Insideeeeeee");
    if (!savedOtp) {
        throw new AppError_1.default(401, "Invalid OTP");
    }
    if (savedOtp !== otp) {
        throw new AppError_1.default(401, "Invalid OTP");
    }
    await redis_config_1.redisClient.del(redisKey);
};
exports.OTPServices = {
    sendOTP,
    verifyOTP,
};
