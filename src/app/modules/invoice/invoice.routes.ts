import { Router } from "express";
import { UserRole } from "@prisma/client";
import { checkAuth } from "../../middlewares/checkAuth";
import { InvoiceController } from "./invoice.controller";
import { PaymentController } from "../payment/payment.controller";

const router = Router();

router.post(
  "/create",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  InvoiceController.createInvoice,
);

router.get(
  "/all",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  InvoiceController.getAllInvoices,
);

router.get(
  "/stats",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  InvoiceController.getInvoicesStats,
);

router.patch(
  "/update-status",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  InvoiceController.setOverdueStatus,
);

router.get(
  "/:id",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  InvoiceController.getSingleInvoice,
);

router.post(
  "/send/:id",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  PaymentController.initPayment,
);

export const InvoiceRoutes = router;
