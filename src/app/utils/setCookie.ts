import { Request, Response } from "express";
import { envVars } from "../config/env";

export interface IAuthTokens {
  creationToken?: string;
  verifiedCreationToken?: string;
  accessToken?: string;
  refreshToken?: string;
  forgotPassToken?: string;
  inActiveToken?: string;
  blockedToken?: string;
}

export const clearAllCookies = (req: Request, res: Response, options = {}) => {
  const defaultOptions = {
    httpOnly: true,
    secure: false,
  };

  const finalOptions = { ...defaultOptions, ...options };

  Object.keys(req.cookies || {}).forEach((cookieName) => {
    res.clearCookie(cookieName, { ...finalOptions, sameSite: "lax" });
  });
};

export const setAuthCookie = (
  req: Request,
  res: Response,
  tokenInfo: IAuthTokens
) => {
  if (tokenInfo.creationToken) {
    clearAllCookies(req, res);
    res.cookie("creationToken", tokenInfo.creationToken, {
      httpOnly: true,
      secure: envVars.NODE_ENV === "production" ? true : false,
      sameSite: envVars.NODE_ENV === "production" ? "none" : "lax",
      // maxAge: 2 * 60 * 1000,
    });
  }

  if (tokenInfo.verifiedCreationToken) {
    clearAllCookies(req, res);
    res.cookie("verifiedCreationToken", tokenInfo.verifiedCreationToken, {
      httpOnly: true,
      secure: envVars.NODE_ENV === "production" ? true : false,
      sameSite: envVars.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 10 * 60 * 1000,
    });
  }

  if (tokenInfo.accessToken) {
    clearAllCookies(req, res);
    res.cookie("accessToken", tokenInfo.accessToken, {
      httpOnly: true,
      secure: envVars.NODE_ENV === "production" ? true : false,
      sameSite: envVars.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
  }

  if (tokenInfo.refreshToken) {
    res.cookie("refreshToken", tokenInfo.refreshToken, {
      httpOnly: true,
      secure: envVars.NODE_ENV === "production" ? true : false,
      sameSite: envVars.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  }

  if (tokenInfo.inActiveToken) {
    res.cookie("inActiveToken", tokenInfo.inActiveToken, {
      httpOnly: true,
      secure: envVars.NODE_ENV === "production" ? true : false,
      sameSite: envVars.NODE_ENV === "production" ? "none" : "lax",
    });
  }

  if (tokenInfo.blockedToken) {
    res.cookie("blockedToken", tokenInfo.blockedToken, {
      httpOnly: true,
      secure: envVars.NODE_ENV === "production" ? true : false,
      sameSite: envVars.NODE_ENV === "production" ? "none" : "lax",
    });
  }
};
