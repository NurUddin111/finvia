import AppError from "../errorHelpers/AppError";

import { HttpStatusCodes } from "./httpStatusCodes";
import { verifyToken } from "./jwt";
import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";
import { IsActive, User } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export const checkUserStatus = async (
  req: Request,
  user: User,
  email: string
) => {
  if (!user) {
    throw new AppError(HttpStatusCodes.NOT_FOUND, "User does not exist");
  }
  if (user.isDeleted) {
    throw new AppError(HttpStatusCodes.FORBIDDEN, "User is deleted");
  }
  if (!user.isVerified) {
    throw new AppError(HttpStatusCodes.FORBIDDEN, "User is not verified");
  }
  const blockedToken = req.cookies.blockedToken;
  const inActiveToken = req.cookies.inActiveToken;

  if (blockedToken) {
    const verifiedBlockedToken = verifyToken(blockedToken, email) as JwtPayload;
    if (!verifiedBlockedToken) {
      await prisma.user.update({
        where: { id: user.id },
        data: { isActive: IsActive.ACTIVE },
      });
    }
  }

  if (!blockedToken && user.isActive === IsActive.BLOCKED) {
    await prisma.user.update({
      where: { id: user.id },
      data: { isActive: IsActive.ACTIVE },
    });
  }

  if (inActiveToken) {
    const verifiedInActiveToken = verifyToken(
      inActiveToken,
      email
    ) as JwtPayload;

    if (!verifiedInActiveToken) {
      await prisma.user.update({
        where: { id: user.id },
        data: { isActive: IsActive.ACTIVE },
      });
    }
  }

  if (user.isActive === IsActive.BLOCKED) {
    throw new AppError(HttpStatusCodes.FORBIDDEN, `User is ${user.isActive}`);
  }
};
