/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { HttpStatusCodes } from "../../utils/httpStatusCodes";
import { InvoiceServices } from "./invoice.service";
import { JwtPayload } from "jsonwebtoken";

const createInvoice = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const { email, dueDays, items, taxRate, notes } = req.body;

    const invoice = await InvoiceServices.createInvoice(
      decodedToken,
      email,
      Number(dueDays),
      items,
      Number(taxRate),
      notes
    );

    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.CREATED,
      message: "Invoice created successfully",
      data: invoice,
    });
  }
);

export const InvoiceController = { createInvoice };
