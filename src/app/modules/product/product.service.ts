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

const getAllProducts = async (userId: string) => {
  const isOwner = await prisma.businessUser.findFirst({
    where: { userId: userId, business: { isDeleted: false } },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "Only Business Owner or Admin can view products.",
    );
  }

  const products = await prisma.product.findMany({
    where: {
      businessId: isOwner.businessId,
      isDeleted: false,
    },
    orderBy: { createdAt: "desc" },
  });

  return products;
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
      select: { totalEarning: true, totalSold: true, pendingOrder: true },
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
  const totalSold = products.reduce((sum, p) => sum + p.totalSold, 0);
  const pendingOrdersValue = products.reduce(
    (sum, p) => sum + p.pendingOrder,
    0,
  );

  return {
    totalProducts: products.length,
    currentMonthProducts,
    totalEarning,
    totalSold,
    pendingOrders: products.filter((p) => p.pendingOrder > 0).length,
    pendingOrdersValue,
  };
};

export const ProductServices = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsStats,
};
