"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const passport_local_1 = require("passport-local");
const passport_1 = __importDefault(require("passport"));
const checkUserStatus_1 = require("../utils/checkUserStatus");
const prisma_1 = require("../../lib/prisma");
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
}, async (req, email, password, done) => {
    try {
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                email: email,
            },
            include: {
                auths: true,
            },
        });
        if (!user) {
            return done(null, false, {
                message: "No user found with this email",
            });
        }
        (0, checkUserStatus_1.checkUserStatus)(req, user, email);
        const isGoogleAuthenticated = user.auths.some((providerObject) => providerObject.provider === "google");
        if (isGoogleAuthenticated && !user.password) {
            return done(null, false, {
                message: "The email address you entered is associated with an account created using 'Log in with Google'. To access your account, please click the Google button. If you'd like to set a password for future logins, you can do so in your account settings after logging in.",
            });
        }
        const isPasswordMatched = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordMatched) {
            return done(null, false, { message: "Incorrect Password" });
        }
        return done(null, user);
    }
    catch (error) {
        done(error);
    }
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser(async (id, done) => {
    try {
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                id: id,
            },
            include: {
                auths: true,
            },
        });
        done(null, user);
    }
    catch (error) {
        done(error);
    }
});
