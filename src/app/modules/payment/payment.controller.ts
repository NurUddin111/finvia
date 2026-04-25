/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { HttpStatusCodes } from "../../utils/httpStatusCodes";
import { PaymentServices } from "./payment.service";
import { envVars } from "../../config/env";

const initPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const invId = req.params.id;
    const paymentUrl = await PaymentServices.initPayment(invId);
    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.OK,
      message: "Email sent successfully with invoice pdf and payment url.",
      data: paymentUrl,
    });
  },
);

const successPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await PaymentServices.successPayment(
      query as Record<string, string>,
    );

    if (result.success) {
      // res.redirect(
      //   `${envVars.SSL.SSL_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`
      // );
      res.redirect(`${envVars.SSL.SSL_SUCCESS_FRONTEND_URL}`);
    }
  },
);

const failPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await PaymentServices.failPayment(
      query as Record<string, string>,
    );

    if (!result.success) {
      res.redirect(
        `${envVars.SSL.SSL_FAIL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`,
      );
    }
  },
);

const cancelPayment = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await PaymentServices.cancelPayment(
    query as Record<string, string>,
  );

  if (!result.success) {
    res.redirect(
      `${envVars.SSL.SSL_CANCEL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`,
    );
  }
});

export const PaymentController = {
  initPayment,
  successPayment,
  failPayment,
  cancelPayment,
};
