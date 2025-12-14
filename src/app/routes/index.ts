import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { UserRoutes } from "../modules/user/user.routes";
import { BusinessRoutes } from "../modules/business/business.routes";
import { ClientRoutes } from "../modules/client/client.routes";
import { InvoiceRoutes } from "../modules/invoice/invoice.routes";
import { PaymentRoutes } from "../modules/payment/payment.routes";

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
  {
    path: "/client",
    route: ClientRoutes,
  },
  {
    path: "/invoice",
    route: InvoiceRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
];

apiRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
