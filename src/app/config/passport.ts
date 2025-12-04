/* eslint-disable @typescript-eslint/no-explicit-any */

import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import { checkUserStatus } from "../utils/checkUserStatus";
import { Request } from "express";
import { prisma } from "../../lib/prisma";

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
          (providerObject) => providerObject.provider === "google"
        );

        if (isGoogleAuthenticated && !user.password) {
          return done(null, false, {
            message:
              "The email address you entered is associated with an account created using 'Log in with Google'. To access your account, please click the Google button. If you'd like to set a password for future logins, you can do so in your account settings after logging in.",
          });
        }

        const isPasswordMatched = await bcrypt.compare(
          password,
          user.password as string
        );

        if (!isPasswordMatched) {
          return done(null, false, { message: "Incorrect Password" });
        }
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
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
  }
);
