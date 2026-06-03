"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const httpStatusCodes_1 = require("../../utils/httpStatusCodes");
const payment_service_1 = require("./payment.service");
const env_1 = require("../../config/env");
const initPayment = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const invId = req.params.id;
    const paymentUrl = await payment_service_1.PaymentServices.initPayment(invId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "Email sent successfully with invoice pdf and payment url.",
        data: paymentUrl,
    });
});
const successPayment = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const query = req.query;
    const result = await payment_service_1.PaymentServices.successPayment(query);
    if (result.success) {
        // res.redirect(
        //   `${envVars.SSL.SSL_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`
        // );
        res.redirect(`${env_1.envVars.SSL.SSL_SUCCESS_FRONTEND_URL}`);
    }
});
const failPayment = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const query = req.query;
    const result = await payment_service_1.PaymentServices.failPayment(query);
    if (!result.success) {
        res.redirect(`${env_1.envVars.SSL.SSL_FAIL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`);
    }
});
const cancelPayment = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const query = req.query;
    const result = await payment_service_1.PaymentServices.cancelPayment(query);
    if (!result.success) {
        res.redirect(`${env_1.envVars.SSL.SSL_CANCEL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`);
    }
});
const getPaymentMethodStats = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const user = req.user;
    const userId = user.userId;
    const result = await payment_service_1.PaymentServices.getPaymentMethodStats(userId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Payment method stats fetched successfully!",
        data: result,
    });
});
exports.PaymentController = {
    initPayment,
    successPayment,
    failPayment,
    cancelPayment,
    getPaymentMethodStats,
};
