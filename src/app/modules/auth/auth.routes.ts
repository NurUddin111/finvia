import { Request, Response, Router } from "express";
import { AuthControllers } from "./auth.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { User, UserRole } from "@prisma/client";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  RegisterRequestZodSchemaValidation,
  RegisterSuccessZodSchemaValidation,
  RegisterVerificationZodSchemaValidation,
} from "./auth.validation";
import passport from "passport";
import { setAuthCookie } from "../../utils/setCookie";
import { createUserTokens } from "../../utils/userTokens";
import { envVars } from "../../config/env";

const router = Router();

router.post(
  "/signup",
  validateRequest(RegisterRequestZodSchemaValidation),
  AuthControllers.createUserRequest,
);

router.post(
  "/signup/verify",
  validateRequest(RegisterVerificationZodSchemaValidation),
  AuthControllers.createUserVerification,
);

router.post(
  "/signup/password",
  validateRequest(RegisterSuccessZodSchemaValidation),
  AuthControllers.createUserSuccess,
);

router.post("/login", AuthControllers.credentialsLogin);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${envVars.FRONTEND_URL}/login?error=google_failed`,
    session: false,
  }),
  (req: Request, res: Response) => {
    const user = req.user as User;

    const userTokens = createUserTokens(user);

    setAuthCookie(req, res, userTokens);

    res.redirect(`${envVars.FRONTEND_URL}/auth/google/callback`);
  },
);

router.post(
  "/refresh-token",
  checkAuth(...Object.values(UserRole)),
  AuthControllers.getNewAccessToken,
);

router.post(
  "/logout",
  checkAuth(...Object.values(UserRole)),
  AuthControllers.logout,
);

router.post(
  "/change-password",
  checkAuth(...Object.values(UserRole)),
  AuthControllers.changePassword,
);

router.post("/forgot-password", AuthControllers.forgotPassword);

router.post("/reset-password", AuthControllers.resetPassword);

router.post(
  "/add-admin",
  checkAuth(UserRole.ADMIN),
  AuthControllers.addFinviaAdmin,
);

router.post(
  "/join-finvia",
  checkAuth(UserRole.USER),
  AuthControllers.joinFinvia,
);

export const AuthRoutes = router;
