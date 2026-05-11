import { Router } from "express";
import { PaymentController } from "./payment.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post("/success", PaymentController.successPayment);
router.post("/fail", PaymentController.failPayment);
router.post("/cancel", PaymentController.cancelPayment);
router.get(
  "/method-stats",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  PaymentController.getPaymentMethodStats,
);

export const PaymentRoutes = router;
