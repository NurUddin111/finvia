/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import { HttpStatusCodes } from "../../utils/httpStatusCodes";
import passport from "passport";
import AppError from "../../errorHelpers/AppError";
import { createUserTokens } from "../../utils/userTokens";
import { clearAllCookies, setAuthCookie } from "../../utils/setCookie";
import { User } from "../../../generated/prisma";
import { JwtPayload } from "jsonwebtoken";

const createUserRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email } = req.body;
    await AuthServices.createUserRequest(req, res, name, email);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "OTP sent successfully",
      data: null,
    });
  }
);

const createUserVerification = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const creationToken = req.cookies.creationToken;
    const { otp } = req.body;
    await AuthServices.createUserVerification(req, res, creationToken, otp);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "OTP verified successfully",
      data: null,
    });
  }
);

const createUserSuccess = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const verifiedCreationToken = req.cookies.verifiedCreationToken;
    const password = req.body.password;
    const payload = {
      password: password,
    };

    const user = await AuthServices.createUserSuccess(
      res,
      verifiedCreationToken,
      payload
    );

    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.CREATED,
      message: "User created successfully",
      data: user,
    });
  }
);

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", async (err: any, user: User, info: any) => {
      if (err) {
        return next(new AppError(HttpStatusCodes.UNAUTHORIZED, err));
      }

      if (!user) {
        return next(new AppError(HttpStatusCodes.UNAUTHORIZED, info.message));
      }

      const userTokens = createUserTokens(user);

      const { password, ...rest } = user;

      setAuthCookie(req, res, userTokens);

      sendResponse(res, {
        success: true,
        statusCode: HttpStatusCodes.OK,
        message: "User logged in successfully",
        data: {
          acceessToken: userTokens.accessToken,
          refreshToken: userTokens.refreshToken,
          user: rest,
        },
      });
    })(req, res, next);
  }
);

const getNewAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError(
        HttpStatusCodes.BAD_REQUEST,
        "No refresh token recieved from cookies"
      );
    }

    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken);

    setAuthCookie(req, res, tokenInfo);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.OK,
      message: "New Access Token Retrived Successfully",
      data: tokenInfo,
    });
  }
);

const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    clearAllCookies(req, res);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.OK,
      message: "User Logged Out Successfully",
      data: null,
    });
  }
);

const changePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const oldPass = req.body.oldPass;
    const newPass = req.body.newPass;
    const confirmNewPass = req.body.confirmNewPass;
    const decodedToken = req.user as JwtPayload;

    await AuthServices.changePassword(
      oldPass,
      newPass,
      confirmNewPass,
      decodedToken
    );

    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.OK,
      message: "Password Changed Successfully",
      data: null,
    });
  }
);

const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;

    await AuthServices.forgotPassword(req, res, email);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.OK,
      message: "Email Sent Successfully",
      data: null,
    });
  }
);

const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.query.id as string;
    const forgotPassToken = req.query.token as string;
    const newPass = req.body.newPass;
    const confirmNewPass = req.body.confirmNewPass;

    if (!userId || !forgotPassToken) {
      throw new AppError(
        HttpStatusCodes.UNAUTHORIZED,
        "No user id or forgot pass token found from query."
      );
    }

    await AuthServices.resetPassword(
      res,
      userId,
      forgotPassToken,
      newPass,
      confirmNewPass
    );

    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.OK,
      message: "Password Changed Successfully.Please login with new password",
      data: null,
    });
  }
);

export const AuthControllers = {
  createUserRequest,
  createUserVerification,
  createUserSuccess,
  credentialsLogin,
  getNewAccessToken,
  logout,
  changePassword,
  forgotPassword,
  resetPassword,
};
