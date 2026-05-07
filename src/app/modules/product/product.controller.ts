/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import { ProductServices } from "./product.service";

const addProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload;
    const userId = user.userId;
    const { productsName }: { productsName: { name: string }[] } = req.body;

    const invoices = await ProductServices.addProduct(userId, productsName);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Products added successfully!",
      data: invoices,
    });
  },
);

const getAllProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload;
    const userId = user.userId;

    const query = {
      page: req.query.page as string | undefined,
      search: req.query.search as string | undefined,
      sortBy: req.query.sortBy as string | undefined,
      order: req.query.order as string | undefined,
    };

    const result = await ProductServices.getAllProducts(userId, query);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  },
);

const getProductById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload;
    const userId = user.userId;
    const { productId } = req.params;

    const result = await ProductServices.getProductById(userId, productId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  },
);

const updateProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload;
    const userId = user.userId;
    const { productId } = req.params;
    const { name }: { name: string } = req.body;

    const result = await ProductServices.updateProduct(userId, productId, name);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  },
);

const deleteProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload;
    const userId = user.userId;
    const { productId } = req.params;

    await ProductServices.deleteProduct(userId, productId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  },
);

const getProductsStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload;
    const userId = user.userId;

    const result = await ProductServices.getProductsStats(userId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Product stats fetched successfully!",
      data: result,
    });
  },
);

export const ProductController = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsStats,
};
