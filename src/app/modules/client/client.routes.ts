import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "../../../generated/prisma";
import { ClientController } from "./client.controller";
import {
  AddClientZodSchemaValidation,
  UpdateClientZodSchemaValidation,
} from "./client.validation";
import { validateRequest } from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/add",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  validateRequest(AddClientZodSchemaValidation),
  ClientController.addClient
);

router.get(
  "/all",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  ClientController.getAllClients
);

router.get(
  "/:id",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  ClientController.getMyClient
);

// router.get(
//   "/:id",
//   checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
//   ClientController.getSingleClient
// );

router.patch(
  "/edit/:id",
  validateRequest(UpdateClientZodSchemaValidation),
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  ClientController.updateClient
);

router.patch(
  "/delete/:id",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  ClientController.deleteClient
);

export const ClientRoutes = router;
