import { Router } from "express";
import { UserRole } from "@prisma/client";
import { checkAuth } from "../../middlewares/checkAuth";
import { InvoiceController } from "./invoice.controller";
import { PaymentController } from "../payment/payment.controller";

const router = Router();

router.post(
  "/create",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.USER),
  InvoiceController.createInvoice
);

router.get(
  "/all",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  InvoiceController.getAllInvoices
);

router.get(
  "/:id",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  InvoiceController.getSingleInvoice
);

router.post(
  "/send/:id",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.USER),
  PaymentController.initPayment
);

export const InvoiceRoutes = router;
