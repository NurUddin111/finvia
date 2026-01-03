import { userFilterableFields } from "./user.constants";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { HttpStatusCodes } from "../../utils/httpStatusCodes";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../../../generated/prisma";
import pick from "../../utils/pick";

const getAllFinviaUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, userFilterableFields);
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

    const result = await UserServices.getAllFinviaUsers(filters, options);

    sendResponse(res, {
      statusCode: HttpStatusCodes.OK,
      success: true,
      message: "Users data retrieved succcessfully!",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const user = await UserServices.getSingleUser(id);
    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.OK,
      message: "User retrieved successfully",
      data: user,
    });
  }
);

const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const result = await UserServices.getMe(decodedToken.userId);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.CREATED,
      message: "Your profile Retrieved Successfully",
      data: result.data,
    });
  }
);

const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const payload: Partial<User> = req.body;
    const verifiedToken = req.user as JwtPayload;
    const user = await UserServices.updateUser(id, payload, verifiedToken);
    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.OK,
      message: "User updated successfully",
      data: user,
    });
  }
);

const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const user = await UserServices.deleteUser(id);
    sendResponse(res, {
      success: true,
      statusCode: HttpStatusCodes.OK,
      message: "User deleted successfully",
      data: null,
    });
  }
);

export const UserControllers = {
  getAllFinviaUsers,
  getSingleUser,
  getMe,
  updateUser,
  deleteUser,
};
