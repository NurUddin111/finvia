import { Router } from "express";
import { UserRole } from "../../../generated/prisma";
import { checkAuth } from "../../middlewares/checkAuth";
import { InvoiceController } from "./invoice.controller";
import { PaymentController } from "../payment/payment.controller";

const router = Router();

router.post(
  "/create",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.USER),
  //   validateRequest(AddClientZodSchemaValidation),
  InvoiceController.createInvoice
);

router.post(
  "/sent/:id",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.USER),
  PaymentController.initPayment
);

export const InvoiceRoutes = router;
