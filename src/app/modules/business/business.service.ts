import { JwtPayload } from "jsonwebtoken";
import {
  Business,
  BusinessRole,
  MemberStatus,
  User,
  UserRole,
} from "../../../generated/prisma";
import { prisma } from "../../../lib/prisma";
import AppError from "../../errorHelpers/AppError";
import { HttpStatusCodes } from "../../utils/httpStatusCodes";
import { createUserTokens } from "../../utils/userTokens";
import { setAuthCookie } from "../../utils/setCookie";
import { Request, Response } from "express";
import { sendEmail } from "../../utils/sendEmail";
import { OfferingRole } from "../../interfaces/enums";
import { envVars } from "../../config/env";
import { generateToken, verifyToken } from "../../utils/jwt";

const addBusiness = async (
  req: Request,
  res: Response,
  userId: string,
  payload: Business
) => {
  const isOwner = await prisma.businessUser.findFirst({
    where: { userId, business: { isDeleted: false } },
  });

  if (isOwner) {
    throw new AppError(
      HttpStatusCodes.BAD_REQUEST,
      "You already belong to a business"
    );
  }

  const result = await prisma.$transaction(async (tx) => {
    const business = await tx.business.create({
      data: {
        name: payload.name,
        category: payload.category,
        email: payload.email || null,
        phone: payload.phone || null,
        address: payload.address || null,
        website: payload.website || null,
      },
    });

    await tx.businessUser.create({
      data: {
        userId,
        businessId: business.id,
        role: BusinessRole.BUSINESS_OWNER,
        status: MemberStatus.ACTIVE,
      },
    });

    await tx.user.update({
      where: { id: userId },
      data: { role: "BUSINESS_OWNER" },
    });

    const user = (await tx.user.findUnique({
      where: { id: userId },
    })) as User;

    const userTokens = createUserTokens(user);

    setAuthCookie(req, res, userTokens);

    return business;
  });

  return result;
};

const getSinglBusiness = async (businessId: string) => {
  const business = await prisma.business.findUnique({
    where: {
      id: businessId,
    },
    include: {
      members: true,
    },
  });
  return business;
};

const getMyBusiness = async (userId: string) => {
  const isOwner = await prisma.businessUser.findFirst({
    where: { userId: userId, business: { isDeleted: false } },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "You do not belong to any business"
    );
  }

  const business = await prisma.business.findFirst({
    where: {
      id: isOwner.businessId,
      isDeleted: false,
    },
    include: {
      members: {
        select: {
          userId: true,
        },
      },
    },
  });

  if (!business) {
    throw new AppError(HttpStatusCodes.BAD_REQUEST, "You");
  }

  return {
    data: business,
  };
};

const updateBusiness = async (
  businessId: string,
  payload: Business,
  decodedToken: JwtPayload
) => {
  const userId = decodedToken.userId;

  const isOwner = await prisma.businessUser.findFirst({
    where: { userId, business: { isDeleted: false } },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "You do not belong to any business"
    );
  }

  if (businessId !== isOwner.businessId) {
    throw new AppError(
      HttpStatusCodes.UNAUTHORIZED,
      "It looks like you're trying to edit another user's business. You can only make changes to your own business."
    );
  }

  const updatedBusiness = await prisma.business.update({
    where: {
      id: businessId,
      isDeleted: false,
    },
    data: payload,
  });

  return updatedBusiness;
};

const deleteBusiness = async (
  req: Request,
  res: Response,
  businessId: string,
  decodedToken: JwtPayload
) => {
  const userId = decodedToken.userId;

  const isOwner = await prisma.businessUser.findFirst({
    where: { userId, business: { isDeleted: false } },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "You do not belong to any business"
    );
  }

  if (businessId !== isOwner.businessId) {
    throw new AppError(
      HttpStatusCodes.UNAUTHORIZED,
      "It looks like you're trying to delete another user's business. You can only make changes to your own business."
    );
  }

  await prisma.$transaction(async (tx) => {
    await tx.business.update({
      where: {
        id: businessId,
        isDeleted: false,
      },
      data: {
        isDeleted: true,
      },
    });

    await tx.user.update({
      where: { id: userId },
      data: {
        role: UserRole.USER,
      },
    });

    const user = (await tx.user.findUnique({
      where: { id: userId },
    })) as User;

    const userTokens = createUserTokens(user);

    setAuthCookie(req, res, userTokens);
  });
};

const addBusinessOwnerOrAdmin = async (
  name: string,
  email: string,
  role: OfferingRole,
  decodedToken: JwtPayload
) => {
  const userId = decodedToken.userId;

  const isOwner = await prisma.businessUser.findFirst({
    where: { userId, business: { isDeleted: false } },
    include: {
      business: {
        select: {
          id: true,
          name: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "You do not belong to any business"
    );
  }

  const newOwnerCheck = await prisma.businessUser.findFirst({
    where: {
      user: {
        email: email,
      },
    },
  });

  if (newOwnerCheck) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      `User is already a ${newOwnerCheck.role}`
    );
  }

  const payload = {
    email: email,
    bsId: isOwner.business.id,
    role: role,
  };

  const invitationToken = generateToken(
    payload,
    envVars.JWT_INVITATION_SECRET,
    envVars.JWT_INVITATION_EXPIRES
  );

  const inviteLink = `${envVars.FRONTEND_URL}/business?token=${invitationToken}`;

  await sendEmail({
    to: email,
    subject: `${isOwner.business.name} inviting you!`,
    templateName: "addAuthority",
    templateData: {
      businessName: isOwner.business.name,
      receiverName: name,
      inviterName: isOwner.user.name,
      role: role,
      inviteLink: inviteLink,
    },
  });
};

const joinBusinessOwnerOrAdmin = async (
  req: Request,
  res: Response,
  decodedToken: JwtPayload,
  invitationToken: string
) => {
  const verifiedInvToken = verifyToken(
    invitationToken,
    envVars.JWT_INVITATION_SECRET
  ) as JwtPayload;

  if (!verifiedInvToken) {
    throw new AppError(
      HttpStatusCodes.BAD_REQUEST,
      "Invitation link has expired!"
    );
  }

  const userEmail = decodedToken.email;
  const invReceiverEmail = verifiedInvToken.email;

  if (userEmail !== invReceiverEmail) {
    throw new AppError(
      HttpStatusCodes.UNAUTHORIZED,
      "You're not the user who was invited to join!"
    );
  }

  const userId = decodedToken.userId;
  const bsId = verifiedInvToken.bsId;
  const role = verifiedInvToken.role;

  const result = await prisma.$transaction(async (tx) => {
    await tx.businessUser.create({
      data: {
        userId,
        businessId: bsId,
        role:
          role === "OWNER"
            ? BusinessRole.BUSINESS_OWNER
            : BusinessRole.BUSINESS_ADMIN,
        status: MemberStatus.ACTIVE,
      },
    });

    await tx.user.update({
      where: { id: userId },
      data: {
        role:
          role === "OWNER" ? UserRole.BUSINESS_OWNER : UserRole.BUSINESS_ADMIN,
      },
    });

    const user = (await tx.user.findUnique({
      where: { id: userId },
    })) as User;

    const userTokens = createUserTokens(user);

    setAuthCookie(req, res, userTokens);

    const business = await tx.business.findUnique({
      where: {
        id: bsId,
      },
      include: {
        members: true,
      },
    });

    return business;
  });

  return result;
};

export const BusinessServices = {
  addBusiness,
  getSinglBusiness,
  getMyBusiness,
  updateBusiness,
  deleteBusiness,
  addBusinessOwnerOrAdmin,
  joinBusinessOwnerOrAdmin,
};
