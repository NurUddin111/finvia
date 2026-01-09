"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../middlewares/checkAuth");
const client_1 = require("@prisma/client");
const client_controller_1 = require("./client.controller");
const client_validation_1 = require("./client.validation");
const validateRequest_1 = require("../../middlewares/validateRequest");
const router = (0, express_1.Router)();
router.post("/add", (0, checkAuth_1.checkAuth)(client_1.UserRole.BUSINESS_OWNER, client_1.UserRole.BUSINESS_ADMIN), (0, validateRequest_1.validateRequest)(client_validation_1.AddClientZodSchemaValidation), client_controller_1.ClientController.addClient);
router.get("/all", (0, checkAuth_1.checkAuth)(client_1.UserRole.BUSINESS_OWNER, client_1.UserRole.BUSINESS_ADMIN), client_controller_1.ClientController.getAllClients);
router.get("/:id", (0, checkAuth_1.checkAuth)(client_1.UserRole.BUSINESS_OWNER, client_1.UserRole.BUSINESS_ADMIN), client_controller_1.ClientController.getMyClient);
// router.get(
//   "/:id",
//   checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
//   ClientController.getSingleClient
// );
router.patch("/edit/:id", (0, validateRequest_1.validateRequest)(client_validation_1.UpdateClientZodSchemaValidation), (0, checkAuth_1.checkAuth)(client_1.UserRole.BUSINESS_OWNER, client_1.UserRole.BUSINESS_ADMIN), client_controller_1.ClientController.updateClient);
router.patch("/delete/:id", (0, checkAuth_1.checkAuth)(client_1.UserRole.BUSINESS_OWNER, client_1.UserRole.BUSINESS_ADMIN), client_controller_1.ClientController.deleteClient);
exports.ClientRoutes = router;
