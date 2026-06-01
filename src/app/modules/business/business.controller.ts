/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { BusinessServices } from "./business.service";
import { sendResponse } from "../../utils/sendResponse";
import { HttpStatusCodes } from "../../utils/httpStatusCodes";
import { uploadBufferToCloudinary } from "../../config/cloudinary.config";
import AppError from "../../errorHelpers/AppError";

const addBusiness = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload;
    const userId = user.userId;
    const payload = req.body;

    let logoUrl: string | undefined;

    if (req.file) {
      const uploadResult = await uploadBufferToCloudinary(
        req.file.buffer,
        "business-logo",
        "logos",
      );

      if (!uploadResult) {
        throw new AppError(
          HttpStatusCodes.BAD_REQUEST,
          "Failed to upload business logo",
        );
      }

      logoUrl = uploadResult.secure_url;
    }

    const business = await BusinessServices.addBusiness(
      req,
      res,
      userId,
      payload,
      logoUrl,
    );

    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.CREATED,
      message: "Business created successfully",
      data: business,
    });
  },
);

const getSingleBusiness = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const business = await BusinessServices.getSinglBusiness(id);
    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.OK,
      message: "Business retrieved successfully",
      data: business,
    });
  },
);

const getMyBusiness = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const result = await BusinessServices.getMyBusiness(decodedToken.userId);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.CREATED,
      message: "Your Business Retrieved Successfully",
      data: result.data,
    });
  },
);

const updateBusiness = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const payload = req.body;
    const verifiedToken = req.user as JwtPayload;
    const business = await BusinessServices.updateBusiness(
      id,
      payload,
      verifiedToken,
    );
    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.OK,
      message: "Business details updated successfully",
      data: business,
    });
  },
);

const deleteBusiness = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const businessId = req.params.id;
    const decodedToken = req.user as JwtPayload;
    await BusinessServices.deleteBusiness(req, res, businessId, decodedToken);
    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.OK,
      message: "Business deleted successfully",
      data: null,
    });
  },
);

const addBusinessOwnerOrAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const { name, email, role } = req.body;

    await BusinessServices.addBusinessOwnerOrAdmin(
      name,
      email,
      role,
      decodedToken,
    );
    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.OK,
      message: "Invitation sent successfully.",
      data: null,
    });
  },
);

const joinBusinessOwnerOrAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const { invitationToken } = req.body;

    const business = await BusinessServices.joinBusinessOwnerOrAdmin(
      req,
      res,
      decodedToken,
      invitationToken,
    );

    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.OK,
      message: "Joined Business successfully.",
      data: business,
    });
  },
);

const getKPICardDetails = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const userId = decodedToken.userId;

    const businessDetails = await BusinessServices.getKPICardDetails(userId);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.OK,
      message: "KPI card details retrieved successfully!",
      data: businessDetails,
    });
  },
);

const getMonthlyRevenue = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const userId = decodedToken.userId;

    const monthlyRevenue = await BusinessServices.getMonthlyRevenue(userId);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.OK,
      message: "Monthly revenue retrieved successfully!",
      data: monthlyRevenue,
    });
  },
);

const getTopClients = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const userId = decodedToken.userId;

    const topClients = await BusinessServices.getTopClients(userId);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.OK,
      message: "Top five clients retrieved successfully!",
      data: topClients,
    });
  },
);

const getRecentTransactions = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const userId = decodedToken.userId;

    const recentTransactions =
      await BusinessServices.getRecentTransactions(userId);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.OK,
      message: "Recent tracnsactions retrieved successfully!",
      data: recentTransactions,
    });
  },
);

const getOverdueInvoices = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const userId = decodedToken.userId;

    const overdueInvoices = await BusinessServices.getOverdueInvoices(userId);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.OK,
      message: "Overdue Invoices details retrieved successfully!",
      data: overdueInvoices,
    });
  },
);

const getUpcomingOverdueInvoices = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const userId = decodedToken.userId;

    const upcomingOverdueInvoices =
      await BusinessServices.getUpcomingOverdueInvoices(userId);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.OK,
      message: "Upcoming Overdue Invoices details retrieved successfully!",
      data: upcomingOverdueInvoices,
    });
  },
);

const getClientPieChartData = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const userId = decodedToken.userId;

    const clientPieChartData =
      await BusinessServices.getClientPieChartData(userId);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.OK,
      message: "Clients pie chart details retrieved successfully!",
      data: clientPieChartData,
    });
  },
);

const getClientsNumByMonth = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const userId = decodedToken.userId;

    const clientsNumByMonth =
      await BusinessServices.getClientsNumByMonth(userId);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.OK,
      message: "Clients number retrieved successfully!",
      data: clientsNumByMonth,
    });
  },
);

export const BusinessController = {
  addBusiness,
  getSingleBusiness,
  getMyBusiness,
  updateBusiness,
  deleteBusiness,
  addBusinessOwnerOrAdmin,
  joinBusinessOwnerOrAdmin,
  getKPICardDetails,
  getMonthlyRevenue,
  getTopClients,
  getRecentTransactions,
  getOverdueInvoices,
  getUpcomingOverdueInvoices,
  getClientPieChartData,
  getClientsNumByMonth,
};
