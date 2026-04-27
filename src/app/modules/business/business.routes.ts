import { validateRequest } from "./../../middlewares/validateRequest";
import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "@prisma/client";
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
  BusinessController.addBusiness,
);

router.get(
  "/my-business",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  BusinessController.getMyBusiness,
);

router.get(
  "/kpi-card-details",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  BusinessController.getKPICardDetails,
);

router.get(
  "/monthly-revenue",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  BusinessController.getMonthlyRevenue,
);

router.get(
  "/top-clients",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  BusinessController.getTopClients,
);

router.get(
  "/recent-transactions",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  BusinessController.getRecentTransactions,
);

router.get(
  "/overdue-invoices",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  BusinessController.getOverdueInvoices,
);

router.post(
  "/add-authority",
  checkAuth(UserRole.BUSINESS_OWNER),
  BusinessController.addBusinessOwnerOrAdmin,
);

router.post(
  "/join",
  checkAuth(UserRole.USER),
  BusinessController.joinBusinessOwnerOrAdmin,
);

router.get(
  "/:id",
  checkAuth(UserRole.ADMIN),
  BusinessController.getSingleBusiness,
);

router.patch(
  "/edit/:id",
  validateRequest(UpdateBusinessZodSchemaValidation),
  checkAuth(UserRole.BUSINESS_OWNER),
  BusinessController.updateBusiness,
);

router.patch(
  "/delete/:id",
  checkAuth(UserRole.BUSINESS_OWNER),
  BusinessController.deleteBusiness,
);

export const BusinessRoutes = router;
