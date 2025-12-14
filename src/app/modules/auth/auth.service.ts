import { Request, Response } from "express";
import AppError from "../../errorHelpers/AppError";
import { HttpStatusCodes } from "../../utils/httpStatusCodes";
import { OTPServices } from "../otp/otp.service";
import { generateToken, verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { setAuthCookie } from "../../utils/setCookie";
import { prisma } from "../../../lib/prisma";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../../../generated/prisma";
import bcrypt from "bcryptjs";
import { createNewAccessTokenWithRefreshToken } from "../../utils/userTokens";
import { checkUserStatus } from "../../utils/checkUserStatus";
import { sendEmail } from "../../utils/sendEmail";
import { IAuthProvider } from "./auth.interface";

const createUserRequest = async (
  req: Request,
  res: Response,
  name: string,
  email: string
) => {
  if (!name) {
    throw new AppError(HttpStatusCodes.BAD_REQUEST, "Please Enter Your Name");
  }

  if (!email) {
    throw new AppError(
      HttpStatusCodes.BAD_REQUEST,
      "Please enter a valid email address!"
    );
  }

  const isUserExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (isUserExist) {
    throw new AppError(HttpStatusCodes.BAD_REQUEST, "User already exists");
  }

  const sub = "Account Verification Code";
  const temp = "accountVerificationOtp";
  const tempData = {
    name,
  };
  const OTP_EXPIRATION = 2 * 60;

  await OTPServices.sendOTP(email, sub, temp, tempData, OTP_EXPIRATION);

  const jwtPayload = {
    name: name,
    email: email,
  };

  const creationToken = generateToken(
    jwtPayload,
    envVars.JWT_CREATION_SECRET,
    envVars.JWT_CREATION_EXPIRES
  );

  if (!creationToken) {
    throw new AppError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to create CREATION_TOKEN"
    );
  }

  setAuthCookie(req, res, { creationToken: creationToken });
};

const createUserVerification = async (
  req: Request,
  res: Response,
  creationToken: string,
  otp: string
) => {
  if (!creationToken) {
    throw new AppError(
      HttpStatusCodes.UNAUTHORIZED,
      "No CREATION_TOKEN recieved"
    );
  }

  const verifiedToken = verifyToken(
    creationToken,
    envVars.JWT_CREATION_SECRET
  ) as JwtPayload;

  const { name, email } = verifiedToken;

  if (!name || !email) {
    throw new AppError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to decode Name and Email from CREATION_TOKEN"
    );
  }

  await OTPServices.verifyOTP(email, otp);

  const jwtPayload = {
    name: name,
    email: email,
  };

  const verifiedCreationToken = generateToken(
    jwtPayload,
    envVars.JWT_VERIFIED_CREATION_SECRET,
    envVars.JWT_VERIFIED_CREATION_EXPIRES
  );

  if (!verifiedCreationToken) {
    throw new AppError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to create VERIFIED_CREATION_TOKEN"
    );
  }

  setAuthCookie(req, res, { verifiedCreationToken: verifiedCreationToken });
};

const createUserSuccess = async (
  res: Response,
  verifiedCreationToken: string,
  payload: Partial<User>
) => {
  if (!verifiedCreationToken) {
    throw new AppError(
      HttpStatusCodes.UNAUTHORIZED,
      "No VERIFIED_CREATION_TOKEN received.Please verify your email first!"
    );
  }

  const verifiedToken = verifyToken(
    verifiedCreationToken,
    envVars.JWT_VERIFIED_CREATION_SECRET
  ) as JwtPayload;

  const { name, email } = verifiedToken;

  if (!name || !email) {
    throw new AppError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to decode Name and Email from VERIFIED_CREATION_TOKEN"
    );
  }
  const { password } = payload;

  if (!password) {
    throw new AppError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "Plase set a password"
    );
  }

  const hashedPassword = await bcrypt.hash(
    password as string,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };

  const user = await prisma.user.create({
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

const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = await createNewAccessTokenWithRefreshToken(
    refreshToken
  );

  return {
    accessToken: newAccessToken,
    refreshToken,
  };
};

const changePassword = async (
  oldPass: string,
  newPass: string,
  confirmNewPass: string,
  decodedToken: JwtPayload
) => {
  const userId = decodedToken.userId;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError(HttpStatusCodes.BAD_REQUEST, "User already exists");
  }

  if (!user.password) {
    throw new AppError(
      HttpStatusCodes.BAD_REQUEST,
      "User don't have a password.Please set a password first."
    );
  }

  if (!oldPass) {
    throw new AppError(
      HttpStatusCodes.BAD_REQUEST,
      "Please provide current password."
    );
  }

  if (!newPass) {
    throw new AppError(
      HttpStatusCodes.BAD_REQUEST,
      "Please provide a new password."
    );
  }

  if (!confirmNewPass) {
    throw new AppError(
      HttpStatusCodes.BAD_REQUEST,
      "Please provide confirmed password."
    );
  }

  const oldPassMatching = await bcrypt.compare(
    oldPass,
    user.password as string
  );

  if (!oldPassMatching) {
    throw new AppError(
      HttpStatusCodes.UNAUTHORIZED,
      "Old Password does not match"
    );
  }

  if (oldPass === newPass) {
    throw new AppError(
      HttpStatusCodes.BAD_REQUEST,
      "Please set a new password!"
    );
  }

  if (newPass !== confirmNewPass) {
    throw new AppError(
      HttpStatusCodes.BAD_REQUEST,
      "New password and confirmation do not match."
    );
  }

  const hashedPassword = await bcrypt.hash(
    newPass,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });
};

const forgotPassword = async (req: Request, res: Response, email: string) => {
  const accessToken = req.cookies.accessToken;

  if (accessToken) {
    const verifiedAccessToken = verifyToken(
      accessToken,
      envVars.JWT_ACCESS_SECRET
    ) as JwtPayload;
    if (verifiedAccessToken) {
      throw new AppError(
        HttpStatusCodes.UNAUTHORIZED,
        "A logged in user can't request for forget password.You can request for change password."
      );
    }
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
      isDeleted: false,
    },
  });

  if (!user) {
    throw new AppError(HttpStatusCodes.BAD_REQUEST, "No User Found");
  }

  checkUserStatus(req, user, email);

  if (!user.password) {
    throw new AppError(
      HttpStatusCodes.BAD_REQUEST,
      "You didn't set any password previously."
    );
  }

  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const resetToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    "10m"
  );

  const resetUILink = `${envVars.FRONTEND_URL}/reset-password?id=${user.id}&token=${resetToken}`;

  await sendEmail({
    to: user.email,
    subject: "Forgot Password?",
    templateName: "forgotPassword",
    templateData: {
      name: user.name,
      resetUILink,
    },
  });
};

const resetPassword = async (
  res: Response,
  userId: string,
  forgotPassToken: string,
  newPass: string,
  confirmNewPass: string
) => {
  if (forgotPassToken) {
    const verifiedAccessToken = verifyToken(
      forgotPassToken,
      envVars.JWT_ACCESS_SECRET
    ) as JwtPayload;
    if (!verifiedAccessToken) {
      throw new AppError(
        HttpStatusCodes.UNAUTHORIZED,
        "Forgot password token is expired.Please Request again."
      );
    }
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError(HttpStatusCodes.BAD_REQUEST, "No User Found.");
  }

  if (!newPass) {
    throw new AppError(
      HttpStatusCodes.BAD_REQUEST,
      "Please provide a new password."
    );
  }

  if (!confirmNewPass) {
    throw new AppError(
      HttpStatusCodes.BAD_REQUEST,
      "Please provide confirmed password."
    );
  }

  if (newPass !== confirmNewPass) {
    throw new AppError(
      HttpStatusCodes.BAD_REQUEST,
      "New password and confirmation does not match."
    );
  }

  const hashedPassword = await bcrypt.hash(
    newPass,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });
};

export const AuthServices = {
  createUserRequest,
  createUserVerification,
  createUserSuccess,
  getNewAccessToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
