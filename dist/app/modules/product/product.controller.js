"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const product_service_1 = require("./product.service");
const addProduct = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const user = req.user;
    const userId = user.userId;
    const { productsName } = req.body;
    const invoices = await product_service_1.ProductServices.addProduct(userId, productsName);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Products added successfully!",
        data: invoices,
    });
});
const getAllProducts = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const user = req.user;
    const userId = user.userId;
    const query = {
        page: req.query.page,
        search: req.query.search,
        sortBy: req.query.sortBy,
        order: req.query.order,
    };
    const result = await product_service_1.ProductServices.getAllProducts(userId, query);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Products fetched successfully!",
        data: result,
    });
});
const getProductById = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const user = req.user;
    const userId = user.userId;
    const { productId } = req.params;
    const result = await product_service_1.ProductServices.getProductById(userId, productId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Product fetched successfully!",
        data: result,
    });
});
const updateProduct = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const user = req.user;
    const userId = user.userId;
    const { productId } = req.params;
    const { name } = req.body;
    const result = await product_service_1.ProductServices.updateProduct(userId, productId, name);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Product updated successfully!",
        data: result,
    });
});
const deleteProduct = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const user = req.user;
    const userId = user.userId;
    const { productId } = req.params;
    await product_service_1.ProductServices.deleteProduct(userId, productId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Product deleted successfully!",
        data: null,
    });
});
const getProductsStats = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const user = req.user;
    const userId = user.userId;
    const result = await product_service_1.ProductServices.getProductsStats(userId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Product stats fetched successfully!",
        data: result,
    });
});
const getTopProducts = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const user = req.user;
    const result = await product_service_1.ProductServices.getTopProducts(user.userId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Top products fetched successfully!",
        data: result,
    });
});
exports.ProductController = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsStats,
    getTopProducts,
};
