/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { sendResponse } from "../../utils/sendResponse";
import { HttpStatusCodes } from "../../utils/httpStatusCodes";
import { ClientServices } from "./client.service";
import pick from "../../utils/pick";
import { clientFilterableFields } from "./client.constants";

const addClient = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload;
    const userId = user.userId;
    const payload = req.body;

    const business = await ClientServices.addClient(userId, payload);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.CREATED,
      message: "Client added successfully",
      data: business,
    });
  }
);

const getAllClients = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload;
    const userId = user.userId;
    const filters = pick(req.query, clientFilterableFields);
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

    const business = await ClientServices.getAllClients(userId);
    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.OK,
      message: "All Clients details retrieved successfully",
      data: business,
    });
  }
);

const getSingleClient = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const business = await ClientServices.getSingleClient(id);
    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.OK,
      message: "Client details retrieved successfully",
      data: business,
    });
  }
);

const getMyClient = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const userId = decodedToken.userId;
    const clientId = req.params.id;
    const result = await ClientServices.getMyClient(userId, clientId);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.OK,
      message: "Your Client Details Retrieved Successfully",
      data: result.data,
    });
  }
);

const updateClient = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const clientId = req.params.id;
    const payload = req.body;
    const verifiedToken = req.user as JwtPayload;
    const client = await ClientServices.updateClient(
      clientId,
      payload,
      verifiedToken
    );
    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.OK,
      message: "Client details updated successfully",
      data: client,
    });
  }
);

const deleteClient = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const clientId = req.params.id;
    await ClientServices.deleteClient(clientId, decodedToken);
    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.OK,
      message: "Client deleted successfully",
      data: null,
    });
  }
);

export const ClientController = {
  addClient,
  getAllClients,
  getSingleClient,
  getMyClient,
  updateClient,
  deleteClient,
};
