import { prisma } from "../../../lib/prisma";
import AppError from "../../errorHelpers/AppError";
import { HttpStatusCodes } from "../httpStatusCodes";

export const validateBusinessOwner = async (
  userId: string,
  message = "Unauthorized access.",
) => {
  const businessUser = await prisma.businessUser.findFirst({
    where: {
      userId,
      business: {
        isDeleted: false,
      },
    },
  });

  if (!businessUser) {
    throw new AppError(HttpStatusCodes.NOT_FOUND, message);
  }

  return businessUser;
};
