"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
const user_routes_1 = require("../modules/user/user.routes");
const business_routes_1 = require("../modules/business/business.routes");
const client_routes_1 = require("../modules/client/client.routes");
const invoice_routes_1 = require("../modules/invoice/invoice.routes");
const payment_routes_1 = require("../modules/payment/payment.routes");
exports.router = (0, express_1.Router)();
const apiRoutes = [
    {
        path: "/auth",
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: "/user",
        route: user_routes_1.UserRoutes,
    },
    {
        path: "/business",
        route: business_routes_1.BusinessRoutes,
    },
    {
        path: "/client",
        route: client_routes_1.ClientRoutes,
    },
    {
        path: "/invoice",
        route: invoice_routes_1.InvoiceRoutes,
    },
    {
        path: "/payment",
        route: payment_routes_1.PaymentRoutes,
    },
];
apiRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
