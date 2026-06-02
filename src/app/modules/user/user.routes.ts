import { Router } from "express";
import { UserControllers } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "@prisma/client";
import { validateRequest } from "../../middlewares/validateRequest";
import { UpdateUserZodSchemaValidation } from "./user.validation";
import { multerUpload } from "../../config/multer.config";

const router = Router();

router.get(
  "/my-profile",
  checkAuth(...Object.values(UserRole)),
  UserControllers.getMe,
);

router.get(
  "/all",
  checkAuth(UserRole.ADMIN),
  UserControllers.getAllFinviaUsers,
);

router.get("/:id", checkAuth(UserRole.USER), UserControllers.getSingleUser);

router.patch(
  "/update/:id",
  checkAuth(...Object.values(UserRole)),
  multerUpload.single("avatar"),
  validateRequest(UpdateUserZodSchemaValidation),
  UserControllers.updateUser,
);

router.patch(
  "/delete/:id",
  checkAuth(...Object.values(UserRole)),
  UserControllers.deleteUser,
);

export const UserRoutes = router;
