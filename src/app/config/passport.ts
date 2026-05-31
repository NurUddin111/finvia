/* eslint-disable @typescript-eslint/no-explicit-any */

import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { checkUserStatus } from "../utils/checkUserStatus";
import { Request } from "express";
import { prisma } from "../../lib/prisma";
import { envVars } from "./env";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req: Request, email: string, password: string, done: any) => {
      try {
        const user = await prisma.user.findUnique({
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

        checkUserStatus(req, user, email);

        const isGoogleAuthenticated = user.auths.some(
          (providerObject) => providerObject.provider === "google",
        );

        if (isGoogleAuthenticated && !user.password) {
          return done(null, false, {
            message:
              "The email address you entered is associated with an account created using 'Log in with Google'. To access your account, please click the Google button. If you'd like to set a password for future logins, you can do so in your account settings after logging in.",
          });
        }

        const isPasswordMatched = await bcrypt.compare(
          password,
          user.password as string,
        );

        if (!isPasswordMatched) {
          return done(null, false, { message: "Incorrect Password" });
        }
        return done(null, user);
      } catch (error) {
        done(error);
      }
    },
  ),
);

passport.use(
  new GoogleStrategy(
    {
      clientID: envVars.GOOGLE_STRATEGY.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_STRATEGY.GOOGLE_CLIENT_SECRET,
      callbackURL: envVars.GOOGLE_STRATEGY.GOOGLE_CALLBACK_URL,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) return done(new Error("No email from Google"), undefined);

        const existingAuth = await prisma.authProvider.findUnique({
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

        let user = await prisma.user.findUnique({ where: { email } });

        if (user) {
          await prisma.authProvider.create({
            data: {
              provider: "google",
              providerId: profile.id,
              userId: user.id,
            },
          });
        } else {
          user = await prisma.user.create({
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
      } catch (err) {
        console.error("Google Strategy Error:", err);
        return done(err, undefined);
      }
    },
  ),
);

passport.serializeUser((user: any, done: (err: any, id?: string) => void) => {
  done(null, user.id);
});

passport.deserializeUser(
  async (id: string, done: (err: any, user?: any) => void) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
        include: {
          auths: true,
        },
      });
      done(null, user);
    } catch (error) {
      done(error);
    }
  },
);
