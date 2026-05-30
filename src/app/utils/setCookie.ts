import { CookieOptions, Request, Response } from "express";
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

const baseCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: envVars.NODE_ENV === "production",
  sameSite: envVars.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
};

export const authCookies = [
  "creationToken",
  "verifiedCreationToken",
  "accessToken",
  "refreshToken",
  "forgotPassToken",
  "inActiveToken",
  "blockedToken",
];

export const clearAuthCookies = (
  res: Response,
  cookies: string[] = authCookies,
) => {
  cookies.forEach((cookieName) => {
    res.clearCookie(cookieName, baseCookieOptions);
  });
};

export const setAuthCookie = (
  req: Request,
  res: Response,
  tokenInfo: IAuthTokens,
) => {
  if (tokenInfo.creationToken) {
    clearAuthCookies(res, ["creationToken"]);

    res.cookie("creationToken", tokenInfo.creationToken, {
      ...baseCookieOptions,
      maxAge: 2 * 60 * 1000,
    });
  }

  if (tokenInfo.verifiedCreationToken) {
    clearAuthCookies(res, ["creationToken", "verifiedCreationToken"]);

    res.cookie("verifiedCreationToken", tokenInfo.verifiedCreationToken, {
      ...baseCookieOptions,
      maxAge: 10 * 60 * 1000,
    });
  }

  if (tokenInfo.accessToken) {
    clearAuthCookies(res, [
      "accessToken",
      "verifiedCreationToken",
      "inActiveToken",
      "blockedToken",
    ]);

    res.cookie("accessToken", tokenInfo.accessToken, {
      ...baseCookieOptions,
      maxAge: 24 * 60 * 60 * 1000,
    });
  }

  if (tokenInfo.refreshToken) {
    clearAuthCookies(res, ["refreshToken"]);

    res.cookie("refreshToken", tokenInfo.refreshToken, {
      ...baseCookieOptions,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  }

  if (tokenInfo.forgotPassToken) {
    clearAuthCookies(res, ["forgotPassToken"]);

    res.cookie("forgotPassToken", tokenInfo.forgotPassToken, {
      ...baseCookieOptions,
      maxAge: 10 * 60 * 1000,
    });
  }

  if (tokenInfo.inActiveToken) {
    clearAuthCookies(res, ["inActiveToken"]);

    res.cookie("inActiveToken", tokenInfo.inActiveToken, {
      ...baseCookieOptions,
    });
  }

  if (tokenInfo.blockedToken) {
    clearAuthCookies(res, ["blockedToken"]);

    res.cookie("blockedToken", tokenInfo.blockedToken, {
      ...baseCookieOptions,
    });
  }
};
