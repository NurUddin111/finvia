"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const prisma_1 = require("../../../lib/prisma");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const httpStatusCodes_1 = require("../../utils/httpStatusCodes");
const addProduct = async (userId, productsName) => {
    const isOwner = await prisma_1.prisma.businessUser.findFirst({
        where: { userId: userId, business: { isDeleted: false } },
    });
    if (!isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Only Business Owner or Admin can add products.");
    }
    const existingProducts = await prisma_1.prisma.product.findMany({
        where: {
            businessId: isOwner.businessId,
            name: {
                in: productsName.map((p) => p.name),
                mode: "insensitive",
            },
        },
        select: { name: true },
    });
    if (existingProducts.length > 0) {
        const duplicates = existingProducts.map((p) => p.name).join(", ");
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.CONFLICT, `These products already exist: ${duplicates}`);
    }
    const products = await prisma_1.prisma.product.createMany({
        data: productsName.map((product) => ({
            businessId: isOwner.businessId,
            name: product.name,
        })),
    });
    return products;
};
const getAllProducts = async (userId, query) => {
    const isOwner = await prisma_1.prisma.businessUser.findFirst({
        where: { userId: userId, business: { isDeleted: false } },
    });
    if (!isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Only Business Owner or Admin can view products.");
    }
    // ── Parse ─────────────────────────────────────────────────────────────────
    const page = Math.max(1, parseInt(query.page || "1"));
    const limit = 10;
    const skip = (page - 1) * limit;
    const search = query.search?.trim() || undefined;
    // Products can be sorted by name, earnings, sold count, or date
    const ALLOWED_SORT = ["name", "totalEarning", "totalSold", "createdAt"];
    const rawSortBy = query.sortBy || "createdAt";
    const sortBy = ALLOWED_SORT.includes(rawSortBy) ? rawSortBy : "createdAt";
    const order = query.order === "asc" ? "asc" : "desc";
    // ── WHERE ─────────────────────────────────────────────────────────────────
    const where = {
        businessId: isOwner.businessId,
        isDeleted: false,
        // Search by name only — that's the only text field on this model
        ...(search && {
            name: { contains: search, mode: "insensitive" },
        }),
    };
    // ── Count + Find ──────────────────────────────────────────────────────────
    const [total, products] = await Promise.all([
        prisma_1.prisma.product.count({ where }),
        prisma_1.prisma.product.findMany({
            where,
            skip,
            take: limit,
            orderBy: { [sortBy]: order },
        }),
    ]);
    // ── Return ────────────────────────────────────────────────────────────────
    return {
        data: products,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasNextPage: page < Math.ceil(total / limit),
            hasPrevPage: page > 1,
        },
    };
};
const getProductById = async (userId, productId) => {
    const isOwner = await prisma_1.prisma.businessUser.findFirst({
        where: { userId: userId, business: { isDeleted: false } },
    });
    if (!isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED, "Only Business Owner or Admin can view products.");
    }
    const product = await prisma_1.prisma.product.findFirst({
        where: {
            id: productId,
            businessId: isOwner.businessId,
            isDeleted: false,
        },
    });
    if (!product) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Product not found.");
    }
    return product;
};
const updateProduct = async (userId, productId, name) => {
    const isOwner = await prisma_1.prisma.businessUser.findFirst({
        where: { userId: userId, business: { isDeleted: false } },
    });
    if (!isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED, "Only Business Owner or Admin can update products.");
    }
    const product = await prisma_1.prisma.product.findFirst({
        where: {
            id: productId,
            businessId: isOwner.businessId,
        },
    });
    if (!product) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Product not found.");
    }
    const nameConflict = await prisma_1.prisma.product.findFirst({
        where: {
            businessId: isOwner.businessId,
            name: { equals: name, mode: "insensitive" },
            NOT: { id: productId },
        },
    });
    if (nameConflict) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.CONFLICT, `A product with the name "${name}" already exists.`);
    }
    const updatedProduct = await prisma_1.prisma.product.update({
        where: { id: productId },
        data: { name },
    });
    return updatedProduct;
};
const deleteProduct = async (userId, productId) => {
    const isOwner = await prisma_1.prisma.businessUser.findFirst({
        where: { userId: userId, business: { isDeleted: false } },
    });
    if (!isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED, "Only Business Owner or Admin can delete products.");
    }
    const product = await prisma_1.prisma.product.findFirst({
        where: {
            id: productId,
            businessId: isOwner.businessId,
            isDeleted: false,
        },
    });
    if (!product) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "Product not found or already deleted.");
    }
    const deletedProduct = await prisma_1.prisma.product.update({
        where: { id: productId },
        data: { isDeleted: true },
    });
    return deletedProduct;
};
const getProductsStats = async (userId) => {
    const isOwner = await prisma_1.prisma.businessUser.findFirst({
        where: { userId: userId, business: { isDeleted: false } },
    });
    if (!isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED, "Only Business Owner or Admin can view product stats.");
    }
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const [products, currentMonthProducts] = await Promise.all([
        prisma_1.prisma.product.findMany({
            where: { businessId: isOwner.businessId, isDeleted: false },
            select: {
                name: true,
                totalEarning: true,
                totalSold: true,
                pendingOrder: true,
            },
        }),
        prisma_1.prisma.product.count({
            where: {
                businessId: isOwner.businessId,
                isDeleted: false,
                createdAt: { gte: startOfMonth },
            },
        }),
    ]);
    const totalEarning = products.reduce((sum, p) => sum + p.totalEarning, 0);
    const pendingOrdersValue = products.reduce((sum, p) => sum + p.pendingOrder, 0);
    const topSellingProduct = products.length
        ? products.reduce((top, p) => (p.totalSold > top.totalSold ? p : top))
        : null;
    return {
        totalProducts: products.length,
        currentMonthProducts,
        totalEarning,
        topSellingProduct: topSellingProduct
            ? { name: topSellingProduct.name, totalSold: topSellingProduct.totalSold }
            : null,
        pendingOrders: products.filter((p) => p.pendingOrder > 0).length,
        pendingOrdersValue,
    };
};
const getTopProducts = async (userId) => {
    const isOwner = await prisma_1.prisma.businessUser.findFirst({
        where: { userId, business: { isDeleted: false } },
    });
    if (!isOwner) {
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, "You do not belong to any business");
    }
    const products = await prisma_1.prisma.product.findMany({
        where: { businessId: isOwner.businessId, isDeleted: false },
        orderBy: { totalSold: "desc" },
        take: 5,
        select: { name: true, totalSold: true },
    });
    return products;
};
exports.ProductServices = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsStats,
    getTopProducts,
};
