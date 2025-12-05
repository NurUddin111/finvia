import { Router } from "express";
import { UserControllers } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "../../../generated/prisma";
import { validateRequest } from "../../middlewares/validateRequest";
import { UpdateUserZodSchemaValidation } from "./user.validation";

const router = Router();

router.get(
  "/my-profile",
  checkAuth(...Object.values(UserRole)),
  UserControllers.getMe
);

router.get("/:id", checkAuth(UserRole.USER), UserControllers.getSingleUser);

router.patch(
  "/:id",
  validateRequest(UpdateUserZodSchemaValidation),
  checkAuth(...Object.values(UserRole)),
  UserControllers.updateUser
);

router.patch(
  "/delete/:id",
  checkAuth(...Object.values(UserRole)),
  UserControllers.deleteUser
);

export const UserRoutes = router;
