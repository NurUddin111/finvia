"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const passport_local_1 = require("passport-local");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_1 = __importDefault(require("passport"));
const checkUserStatus_1 = require("../utils/checkUserStatus");
const prisma_1 = require("../../lib/prisma");
const env_1 = require("./env");
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
}, async (req, email, password, done) => {
    try {
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                email: email,
                isDeleted: false,
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
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: env_1.envVars.GOOGLE_STRATEGY.GOOGLE_CLIENT_ID,
    clientSecret: env_1.envVars.GOOGLE_STRATEGY.GOOGLE_CLIENT_SECRET,
    callbackURL: env_1.envVars.GOOGLE_STRATEGY.GOOGLE_CALLBACK_URL,
}, async (_accessToken, _refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0]?.value;
        if (!email)
            return done(new Error("No email from Google"), undefined);
        let user = await prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (user?.isDeleted) {
            await prisma_1.prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    isDeleted: false,
                },
            });
        }
        const existingAuth = await prisma_1.prisma.authProvider.findUnique({
            where: {
                provider_providerId: {
                    provider: "google",
                    providerId: profile.id,
                },
            },
            include: { user: true },
        });
        if (existingAuth) {
            return done(null, existingAuth.user);
        }
        if (user) {
            await prisma_1.prisma.authProvider.create({
                data: {
                    provider: "google",
                    providerId: profile.id,
                    userId: user.id,
                },
            });
        }
        else {
            user = await prisma_1.prisma.user.create({
                data: {
                    name: profile.displayName,
                    email,
                    password: "",
                    isVerified: true,
                    avatar: profile.photos?.[0]?.value ?? null,
                    auths: {
                        create: {
                            provider: "google",
                            providerId: profile.id,
                        },
                    },
                },
            });
        }
        return done(null, user);
    }
    catch (err) {
        console.error("Google OAuth strategy error:", err);
        return done(err, undefined);
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
