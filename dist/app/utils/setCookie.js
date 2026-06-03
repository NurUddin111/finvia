"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthCookie = exports.clearAuthCookies = exports.authCookies = void 0;
const env_1 = require("../config/env");
const baseCookieOptions = {
    httpOnly: true,
    secure: env_1.envVars.NODE_ENV === "production",
    sameSite: env_1.envVars.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
};
exports.authCookies = [
    "creationToken",
    "verifiedCreationToken",
    "accessToken",
    "refreshToken",
    "forgotPassToken",
    "inActiveToken",
    "blockedToken",
];
const clearAuthCookies = (res, cookies = exports.authCookies) => {
    cookies.forEach((cookieName) => {
        res.clearCookie(cookieName, baseCookieOptions);
    });
};
exports.clearAuthCookies = clearAuthCookies;
const setAuthCookie = (req, res, tokenInfo) => {
    if (tokenInfo.creationToken) {
        (0, exports.clearAuthCookies)(res, ["creationToken"]);
        res.cookie("creationToken", tokenInfo.creationToken, {
            ...baseCookieOptions,
            maxAge: 2 * 60 * 1000,
        });
    }
    if (tokenInfo.verifiedCreationToken) {
        (0, exports.clearAuthCookies)(res, ["creationToken", "verifiedCreationToken"]);
        res.cookie("verifiedCreationToken", tokenInfo.verifiedCreationToken, {
            ...baseCookieOptions,
            maxAge: 30 * 60 * 1000,
        });
    }
    if (tokenInfo.accessToken) {
        (0, exports.clearAuthCookies)(res, [
            "accessToken",
            "verifiedCreationToken",
            "inActiveToken",
            "blockedToken",
        ]);
        res.cookie("accessToken", tokenInfo.accessToken, {
            ...baseCookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    }
    if (tokenInfo.refreshToken) {
        (0, exports.clearAuthCookies)(res, ["refreshToken"]);
        res.cookie("refreshToken", tokenInfo.refreshToken, {
            ...baseCookieOptions,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
    }
    if (tokenInfo.forgotPassToken) {
        (0, exports.clearAuthCookies)(res, ["forgotPassToken"]);
        res.cookie("forgotPassToken", tokenInfo.forgotPassToken, {
            ...baseCookieOptions,
            maxAge: 10 * 60 * 1000,
        });
    }
    if (tokenInfo.inActiveToken) {
        (0, exports.clearAuthCookies)(res, ["inActiveToken"]);
        res.cookie("inActiveToken", tokenInfo.inActiveToken, {
            ...baseCookieOptions,
        });
    }
    if (tokenInfo.blockedToken) {
        (0, exports.clearAuthCookies)(res, ["blockedToken"]);
        res.cookie("blockedToken", tokenInfo.blockedToken, {
            ...baseCookieOptions,
        });
    }
};
exports.setAuthCookie = setAuthCookie;
