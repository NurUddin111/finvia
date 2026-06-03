"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const client_1 = require("@prisma/client");
const validateRequest_1 = require("../../middlewares/validateRequest");
const auth_validation_1 = require("./auth.validation");
const passport_1 = __importDefault(require("passport"));
const userTokens_1 = require("../../utils/userTokens");
const env_1 = require("../../config/env");
const router = (0, express_1.Router)();
router.post("/signup", (0, validateRequest_1.validateRequest)(auth_validation_1.RegisterRequestZodSchemaValidation), auth_controller_1.AuthControllers.createUserRequest);
router.post("/signup/verify", (0, validateRequest_1.validateRequest)(auth_validation_1.RegisterVerificationZodSchemaValidation), auth_controller_1.AuthControllers.createUserVerification);
router.post("/signup/password", (0, validateRequest_1.validateRequest)(auth_validation_1.RegisterSuccessZodSchemaValidation), auth_controller_1.AuthControllers.createUserSuccess);
router.post("/login", auth_controller_1.AuthControllers.credentialsLogin);
router.get("/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
}));
router.get("/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: `${env_1.envVars.FRONTEND_URL}/login?error=google_failed`,
    failureMessage: true,
    session: false,
}), (req, res) => {
    const user = req.user;
    const userTokens = (0, userTokens_1.createUserTokens)(user);
    const params = new URLSearchParams(userTokens);
    res.redirect(`${env_1.envVars.FRONTEND_URL}/api/auth/callback/google?${params}`);
});
router.post("/refresh-token", (0, checkAuth_1.checkAuth)(...Object.values(client_1.UserRole)), auth_controller_1.AuthControllers.getNewAccessToken);
router.post("/logout", (0, checkAuth_1.checkAuth)(...Object.values(client_1.UserRole)), auth_controller_1.AuthControllers.logout);
router.post("/change-password", (0, checkAuth_1.checkAuth)(...Object.values(client_1.UserRole)), auth_controller_1.AuthControllers.changePassword);
router.post("/forgot-password", auth_controller_1.AuthControllers.forgotPassword);
router.post("/reset-password", auth_controller_1.AuthControllers.resetPassword);
router.post("/add-admin", (0, checkAuth_1.checkAuth)(client_1.UserRole.ADMIN), auth_controller_1.AuthControllers.addFinviaAdmin);
router.post("/join-finvia", (0, checkAuth_1.checkAuth)(client_1.UserRole.USER), auth_controller_1.AuthControllers.joinFinvia);
exports.AuthRoutes = router;
