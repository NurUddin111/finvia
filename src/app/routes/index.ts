import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { UserRoutes } from "../modules/user/user.routes";
import { BusinessRoutes } from "../modules/business/business.routes";

export const router = Router();

const apiRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/business",
    route: BusinessRoutes,
  },
];

apiRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
