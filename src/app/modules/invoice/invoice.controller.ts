/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { HttpStatusCodes } from "../../utils/httpStatusCodes";
import { InvoiceServices } from "./invoice.service";
import { JwtPayload } from "jsonwebtoken";
import { IItems } from "./invoice.interface";

const createInvoice = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const {
      email,
      dueDays,
      items,
      taxRate,
      notes,
    }: {
      email: string;
      dueDays: number;
      items: IItems[];
      taxRate: number;
      notes?: string;
    } = req.body;

    const invoice = await InvoiceServices.createInvoice(
      decodedToken,
      email,
      Number(dueDays),
      items,
      Number(taxRate),
      notes,
    );

    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.CREATED,
      message: "Invoice created successfully",
      data: invoice,
    });
  },
);

const getAllInvoices = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload;
    const userId = user.userId;

    const invoices = await InvoiceServices.getAllInvoices(userId);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.CREATED,
      message: "All Invoices retrieved successfully",
      data: invoices,
    });
  },
);

const getSingleInvoice = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload;
    const userId = user.userId;
    const invId = req.params.id;

    const invoice = await InvoiceServices.getSingleInvoice(userId, invId);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.CREATED,
      message: "Invoice retrieved successfully",
      data: invoice,
    });
  },
);

const getInvoicesStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload;
    const userId = user.userId;

    const InvoicesStats = await InvoiceServices.getInvoicesStats(userId);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.CREATED,
      message: "Invoices stats retrieved successfully",
      data: InvoicesStats.data,
    });
  },
);

const setOverdueStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload;
    const userId = user.userId;

    const overdueInvoices = await InvoiceServices.setOverdueStatus(userId);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.CREATED,
      message: "Invoices stats retrieved successfully",
      data: overdueInvoices,
    });
  },
);

export const InvoiceController = {
  createInvoice,
  getAllInvoices,
  getSingleInvoice,
  getInvoicesStats,
  setOverdueStatus,
};
