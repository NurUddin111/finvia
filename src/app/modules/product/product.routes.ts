import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "@prisma/client";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  AddProductZodSchemaValidation,
  UpdateProductZodSchemaValidation,
} from "./product.validation";
import { ProductController } from "./product.controller";

const router = Router();

router.post(
  "/add",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  validateRequest(AddProductZodSchemaValidation),
  ProductController.addProduct,
);

router.get(
  "/",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  ProductController.getAllProducts,
);

router.get(
  "/stats",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  ProductController.getProductsStats,
);

router.get(
  "/top",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  ProductController.getTopProducts,
);

router.get(
  "/:productId",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  ProductController.getProductById,
);

router.patch(
  "/:productId",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  validateRequest(UpdateProductZodSchemaValidation),
  ProductController.updateProduct,
);

router.delete(
  "/:productId",
  checkAuth(UserRole.BUSINESS_OWNER, UserRole.BUSINESS_ADMIN),
  ProductController.deleteProduct,
);

export const ProductRoutes = router;
