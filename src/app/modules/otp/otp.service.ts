import crypto from "crypto";
import AppError from "../../errorHelpers/AppError";

import { redisClient } from "../../config/redis.config";
import { sendEmail } from "../../utils/sendEmail";

const generateOTP = (length = 6) => {
  const otp = crypto.randomInt(10 ** (length - 1), 10 ** length).toString();

  return otp;
};

const sendOTP = async (
  email: string,
  sub: string,
  tempName: string,
  tempData: Record<string, unknown>,
  OTP_EXPIRATION: number
) => {
  const otp = generateOTP();

  const redisKey = `otp:${email}`;

  await redisClient.set(redisKey, otp, {
    expiration: {
      type: "EX",
      value: OTP_EXPIRATION,
    },
  });

  await sendEmail({
    to: email,
    subject: `${otp} is your ${sub}`,
    templateName: `${tempName}`,
    templateData: {
      otp: otp,
      ...tempData,
    },
  });
};

const verifyOTP = async (email: string, otp: string) => {
  const redisKey = `otp:${email}`;

  const savedOtp = await redisClient.get(redisKey);

  if (!savedOtp) {
    throw new AppError(401, "Invalid OTP");
  }

  if (savedOtp !== otp) {
    throw new AppError(401, "Invalid OTP");
  }

  await redisClient.del(redisKey);
};

export const OTPServices = {
  sendOTP,
  verifyOTP,
};
