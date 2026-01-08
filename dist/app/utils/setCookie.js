"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthCookie = exports.clearAllCookies = void 0;
const env_1 = require("../config/env");
const clearAllCookies = (req, res, options = {}) => {
    const defaultOptions = {
        httpOnly: true,
        secure: false,
    };
    const finalOptions = { ...defaultOptions, ...options };
    Object.keys(req.cookies || {}).forEach((cookieName) => {
        res.clearCookie(cookieName, { ...finalOptions, sameSite: "lax" });
    });
};
exports.clearAllCookies = clearAllCookies;
const setAuthCookie = (req, res, tokenInfo) => {
    if (tokenInfo.creationToken) {
        (0, exports.clearAllCookies)(req, res);
        res.cookie("creationToken", tokenInfo.creationToken, {
            httpOnly: true,
            secure: env_1.envVars.NODE_ENV === "production" ? true : false,
            sameSite: env_1.envVars.NODE_ENV === "production" ? "none" : "lax",
            // maxAge: 2 * 60 * 1000,
        });
    }
    if (tokenInfo.verifiedCreationToken) {
        (0, exports.clearAllCookies)(req, res);
        res.cookie("verifiedCreationToken", tokenInfo.verifiedCreationToken, {
            httpOnly: true,
            secure: env_1.envVars.NODE_ENV === "production" ? true : false,
            sameSite: env_1.envVars.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 10 * 60 * 1000,
        });
    }
    if (tokenInfo.accessToken) {
        (0, exports.clearAllCookies)(req, res);
        res.cookie("accessToken", tokenInfo.accessToken, {
            httpOnly: true,
            secure: env_1.envVars.NODE_ENV === "production" ? true : false,
            sameSite: env_1.envVars.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });
    }
    if (tokenInfo.refreshToken) {
        res.cookie("refreshToken", tokenInfo.refreshToken, {
            httpOnly: true,
            secure: env_1.envVars.NODE_ENV === "production" ? true : false,
            sameSite: env_1.envVars.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
    }
    if (tokenInfo.inActiveToken) {
        res.cookie("inActiveToken", tokenInfo.inActiveToken, {
            httpOnly: true,
            secure: env_1.envVars.NODE_ENV === "production" ? true : false,
            sameSite: env_1.envVars.NODE_ENV === "production" ? "none" : "lax",
        });
    }
    if (tokenInfo.blockedToken) {
        res.cookie("blockedToken", tokenInfo.blockedToken, {
            httpOnly: true,
            secure: env_1.envVars.NODE_ENV === "production" ? true : false,
            sameSite: env_1.envVars.NODE_ENV === "production" ? "none" : "lax",
        });
    }
};
exports.setAuthCookie = setAuthCookie;
