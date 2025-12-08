import { validateRequest } from "./../../middlewares/validateRequest";
import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "../../../generated/prisma";
import { BusinessController } from "./business.controller";
import {
  CreateBusinessZodSchemaValidation,
  UpdateBusinessZodSchemaValidation,
} from "./business.validation";

const router = Router();

router.post(
  "/add",
  checkAuth(UserRole.USER),
  validateRequest(CreateBusinessZodSchemaValidation),
  BusinessController.addBusiness
);

router.get(
  "/my-business",
  checkAuth(UserRole.BUSINESS_OWNER),
  BusinessController.getMyBusiness
);

router.post(
  "/add-authority",
  checkAuth(UserRole.BUSINESS_OWNER),
  BusinessController.addBusinessOwnerOrAdmin
);

router.post(
  "/join-business",
  checkAuth(UserRole.USER),
  BusinessController.joinBusinessOwnerOrAdmin
);

router.get(
  "/:id",
  checkAuth(UserRole.ADMIN),
  BusinessController.getSingleBusiness
);

router.patch(
  "/edit/:id",
  validateRequest(UpdateBusinessZodSchemaValidation),
  checkAuth(UserRole.BUSINESS_OWNER),
  BusinessController.updateBusiness
);

router.patch(
  "/delete/:id",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.ADMIN),
  BusinessController.deleteBusiness
);

export const BusinessRoutes = router;
