import { validateRequest } from "./../../middlewares/validateRequest";
import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "@prisma/client";
import { BusinessController } from "./business.controller";
import {
  CreateBusinessZodSchemaValidation,
  UpdateBusinessZodSchemaValidation,
} from "./business.validation";
import { multerUpload } from "../../config/multer.config";

const router = Router();

router.post(
  "/add",
  checkAuth(UserRole.USER),
  multerUpload.single("logo"),
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

router.get(
  "/upcoming-overdue-invoices",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  BusinessController.getUpcomingOverdueInvoices,
);

router.get(
  "/clients-pie-chart",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  BusinessController.getClientPieChartData,
);

router.get(
  "/clients-by-month",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  BusinessController.getClientsNumByMonth,
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
  "/update/:id",
  checkAuth(UserRole.BUSINESS_OWNER),
  multerUpload.single("logo"),
  validateRequest(UpdateBusinessZodSchemaValidation),
  BusinessController.updateBusiness,
);

router.patch(
  "/delete/:id",
  checkAuth(UserRole.BUSINESS_OWNER),
  BusinessController.deleteBusiness,
);

export const BusinessRoutes = router;
