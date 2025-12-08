import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../errorHelpers/AppError";
import { HttpStatusCodes } from "../utils/httpStatusCodes";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { checkUserStatus } from "../utils/checkUserStatus";
import { prisma } from "../../lib/prisma";

export const checkAuth = (...authRoles: string[]) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      throw new AppError(
        HttpStatusCodes.UNAUTHORIZED,
        "No access token received.Please login get new access token..."
      );
    }

    const verifiedAccessToken = verifyToken(
      accessToken,
      envVars.JWT_ACCESS_SECRET
    ) as JwtPayload;

    const userRole = verifiedAccessToken.role;
    const userId = verifiedAccessToken.userId;

    if (!authRoles.includes(userRole)) {
      throw new AppError(
        HttpStatusCodes.UNAUTHORIZED,
        "You are not permitted to view this route!!!"
      );
    }

    const email = verifiedAccessToken.email;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new AppError(HttpStatusCodes.BAD_REQUEST, "No User Found!");
    }

    checkUserStatus(req, user, email);

    req.user = verifiedAccessToken;
    next();
  });
