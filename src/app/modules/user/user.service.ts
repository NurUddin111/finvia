/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from "jsonwebtoken";
import { Prisma, User, UserRole } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import AppError from "../../errorHelpers/AppError";
import { HttpStatusCodes } from "../../utils/httpStatusCodes";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../utils/paginationHelper";
import { userSearchAbleFields } from "./user.constants";

const getAllFinviaUsers = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.UserWhereInput[] = [{ isDeleted: false }];

  if (searchTerm) {
    andConditions.push({
      OR: userSearchAbleFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const data = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      password: false,
      auths: true,
      isVerified: true,
      isActive: true,
      avatar: true,
      phone: true,
      address: true,
      createdAt: true,
      updatedAt: true,
      businessUsers: {
        include: {
          business: true,
        },
      },
    },
  });

  const total = await prisma.user.count({ where: whereConditions });
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data,
  };
};

const getSingleUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      auths: true,
    },
  });
  return user;
};

const getMe = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError(HttpStatusCodes.NOT_FOUND, "User Not Found!");
  }

  return {
    data: user,
  };
};

const updateUser = async (
  userId: string,
  payload: Partial<User>,
  decodedToken: JwtPayload
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError(HttpStatusCodes.NOT_FOUND, "User Not Found!");
  }

  if (
    decodedToken.role === UserRole.USER ||
    decodedToken.role === UserRole.BUSINESS_OWNER
  ) {
    if (userId !== decodedToken.userId) {
      throw new AppError(
        401,
        "It looks like you're trying to edit another user's profile. You can only make changes to your own profile."
      );
    }
  }

  if (payload.role && payload.role === UserRole.ADMIN) {
    if (decodedToken.role !== UserRole.ADMIN) {
      throw new AppError(
        HttpStatusCodes.FORBIDDEN,
        "Setting up Admin role is a restricted action. For security, only users with an existing Admin role can assign it to others."
      );
    }
  }

  if (payload.isActive || payload.isDeleted || payload.isVerified) {
    if (decodedToken.role !== UserRole.ADMIN) {
      throw new AppError(
        HttpStatusCodes.FORBIDDEN,
        "This is a restricted action. For security, only Admin can update these information."
      );
    }
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: payload,
  });

  return updatedUser;
};

const deleteUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
      isDeleted: false,
    },
  });

  if (!user) {
    throw new AppError(HttpStatusCodes.BAD_REQUEST, "No user found.");
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isDeleted: true,
    },
  });
};

export const UserServices = {
  getAllFinviaUsers,
  getSingleUser,
  getMe,
  updateUser,
  deleteUser,
};
