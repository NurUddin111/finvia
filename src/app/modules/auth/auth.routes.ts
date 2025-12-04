import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "../../../generated/prisma";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  RegisterRequestZodSchemaValidation,
  RegisterSuccessZodSchemaValidation,
  RegisterVerificationZodSchemaValidation,
} from "./auth.validation";

const router = Router();

router.post(
  "/register-request",
  validateRequest(RegisterRequestZodSchemaValidation),
  AuthControllers.createUserRequest
);

router.post(
  "/register-verification",
  validateRequest(RegisterVerificationZodSchemaValidation),
  AuthControllers.createUserVerification
);

router.post(
  "/register-success",
  validateRequest(RegisterSuccessZodSchemaValidation),
  AuthControllers.createUserSuccess
);

router.post("/login", AuthControllers.credentialsLogin);

router.post(
  "/refresh-token",
  checkAuth(...Object.values(UserRole)),
  AuthControllers.getNewAccessToken
);

router.post("/logout",checkAuth(...Object.values(UserRole)), AuthControllers.logout);

router.post(
  "/change-password",
  checkAuth(...Object.values(UserRole)),
  AuthControllers.changePassword
);

router.post("/forgot-password", AuthControllers.forgotPassword);

router.post("/reset-password", AuthControllers.resetPassword);

export const AuthRoutes = router;
