import { JwtPayload } from "jsonwebtoken";
import { User, UserRole } from "../../../generated/prisma";
import { prisma } from "../../../lib/prisma";
import AppError from "../../errorHelpers/AppError";
import { HttpStatusCodes } from "../../utils/httpStatusCodes";

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
  getSingleUser,
  getMe,
  updateUser,
  deleteUser,
};
