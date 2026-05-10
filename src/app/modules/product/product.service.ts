import { Prisma } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import AppError from "../../errorHelpers/AppError";
import { HttpStatusCodes } from "../../utils/httpStatusCodes";

const addProduct = async (userId: string, productsName: { name: string }[]) => {
  const isOwner = await prisma.businessUser.findFirst({
    where: { userId: userId, business: { isDeleted: false } },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "Only Business Owner or Admin can add products.",
    );
  }

  const existingProducts = await prisma.product.findMany({
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
    throw new AppError(
      HttpStatusCodes.CONFLICT,
      `These products already exist: ${duplicates}`,
    );
  }

  const products = await prisma.product.createMany({
    data: productsName.map((product) => ({
      businessId: isOwner.businessId,
      name: product.name,
    })),
  });

  return products;
};

const getAllProducts = async (
  userId: string,
  query: {
    page?: string;
    search?: string;
    sortBy?: string;
    order?: string;
  },
) => {
  const isOwner = await prisma.businessUser.findFirst({
    where: { userId: userId, business: { isDeleted: false } },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "Only Business Owner or Admin can view products.",
    );
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
  const where: Prisma.ProductWhereInput = {
    businessId: isOwner.businessId,
    isDeleted: false,

    // Search by name only — that's the only text field on this model
    ...(search && {
      name: { contains: search, mode: "insensitive" },
    }),
  };

  // ── Count + Find ──────────────────────────────────────────────────────────
  const [total, products] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
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

const getProductById = async (userId: string, productId: string) => {
  const isOwner = await prisma.businessUser.findFirst({
    where: { userId: userId, business: { isDeleted: false } },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.UNAUTHORIZED,
      "Only Business Owner or Admin can view products.",
    );
  }

  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      businessId: isOwner.businessId,
      isDeleted: false,
    },
  });

  if (!product) {
    throw new AppError(HttpStatusCodes.NOT_FOUND, "Product not found.");
  }

  return product;
};

const updateProduct = async (
  userId: string,
  productId: string,
  name: string,
) => {
  const isOwner = await prisma.businessUser.findFirst({
    where: { userId: userId, business: { isDeleted: false } },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.UNAUTHORIZED,
      "Only Business Owner or Admin can update products.",
    );
  }

  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      businessId: isOwner.businessId,
    },
  });

  if (!product) {
    throw new AppError(HttpStatusCodes.NOT_FOUND, "Product not found.");
  }

  const nameConflict = await prisma.product.findFirst({
    where: {
      businessId: isOwner.businessId,
      name: { equals: name, mode: "insensitive" },
      NOT: { id: productId },
    },
  });

  if (nameConflict) {
    throw new AppError(
      HttpStatusCodes.CONFLICT,
      `A product with the name "${name}" already exists.`,
    );
  }

  const updatedProduct = await prisma.product.update({
    where: { id: productId },
    data: { name },
  });

  return updatedProduct;
};

const deleteProduct = async (userId: string, productId: string) => {
  const isOwner = await prisma.businessUser.findFirst({
    where: { userId: userId, business: { isDeleted: false } },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.UNAUTHORIZED,
      "Only Business Owner or Admin can delete products.",
    );
  }

  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      businessId: isOwner.businessId,
      isDeleted: false,
    },
  });

  if (!product) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "Product not found or already deleted.",
    );
  }

  const deletedProduct = await prisma.product.update({
    where: { id: productId },
    data: { isDeleted: true },
  });

  return deletedProduct;
};

const getProductsStats = async (userId: string) => {
  const isOwner = await prisma.businessUser.findFirst({
    where: { userId: userId, business: { isDeleted: false } },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.UNAUTHORIZED,
      "Only Business Owner or Admin can view product stats.",
    );
  }

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [products, currentMonthProducts] = await Promise.all([
    prisma.product.findMany({
      where: { businessId: isOwner.businessId, isDeleted: false },
      select: {
        name: true,
        totalEarning: true,
        totalSold: true,
        pendingOrder: true,
      },
    }),
    prisma.product.count({
      where: {
        businessId: isOwner.businessId,
        isDeleted: false,
        createdAt: { gte: startOfMonth },
      },
    }),
  ]);

  const totalEarning = products.reduce((sum, p) => sum + p.totalEarning, 0);
  const pendingOrdersValue = products.reduce(
    (sum, p) => sum + p.pendingOrder,
    0,
  );

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

const getTopProducts = async (userId: string) => {
  const isOwner = await prisma.businessUser.findFirst({
    where: { userId, business: { isDeleted: false } },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "You do not belong to any business",
    );
  }

  const products = await prisma.product.findMany({
    where: { businessId: isOwner.businessId, isDeleted: false },
    orderBy: { totalSold: "desc" },
    take: 5,
    select: { name: true, totalSold: true },
  });

  return products;
};

export const ProductServices = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsStats,
  getTopProducts,
};
