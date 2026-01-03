import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";
import AppError from "../../errorHelpers/AppError";
import { HttpStatusCodes } from "../../utils/httpStatusCodes";
import { generateInvoiceNumber } from "../../utils/generateInvRcNb";
import { IItems } from "./invoice.interface";
import { randomUUID } from "crypto";

const createInvoice = async (
  decodedToken: JwtPayload,
  email: string,
  dueDays: number,
  items: IItems[],
  taxRate: number,
  notes?: string
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

  const client = await prisma.businessClient.findFirst({
    where: {
      business: {
        id: isOwner.businessId,
      },
      client: {
        email: email,
      },
    },
    select: {
      clientId: true,
    },
  });

  if (!client) {
    throw new AppError(HttpStatusCodes.NOT_FOUND, "Client not found");
  }

  const invNb = await generateInvoiceNumber(isOwner.businessId);

  dueDays = Number.isNaN(dueDays) ? 3 : dueDays;

  const dueDate = new Date(Date.now() + dueDays * 24 * 60 * 60 * 1000);

  const subtotal = items.reduce((sum, item) => {
    return sum + Number(item.pricePerUnit) * Number(item.quantity);
  }, 0);

  taxRate = Number.isNaN(taxRate) ? 0.15 : taxRate / 100;

  const tax = subtotal * taxRate;

  const total = subtotal + tax;

  const result = await prisma.$transaction(async (tx) => {
    const invoice = await tx.invoice.create({
      data: {
        businessId: isOwner.businessId,
        clientId: client.clientId,
        createdById: isOwner.userId,
        invoiceNumber: invNb,
        dueDate: dueDate,
        subtotal: subtotal,
        tax: tax,
        total: total,
        notes: notes,
      },
    });

    await tx.invoiceItem.createMany({
      data: items.map((item) => ({
        invoiceId: invoice.id,
        name: item.name,
        quantity: item.quantity,
        pricePerUnit: item.pricePerUnit,
        total: item.pricePerUnit * item.quantity,
      })),
    });

    const transactionId = `TXN_${randomUUID()}`;

    await tx.payment.create({
      data: {
        invoiceId: invoice.id,
        tran_id: transactionId,
        amount: invoice.total,
        currency: invoice.currency,
      },
    });

    return invoice;
  });

  return result;
};

const getAllInvoices = async (userId: string) => {
  const isOwner = await prisma.businessUser.findFirst({
    where: { userId: userId, business: { isDeleted: false } },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "Only Business Owner or Admin can view all clients."
    );
  }

  const invoices = await prisma.invoice.findMany({
    where: {
      businessId: isOwner.businessId,
    },
    include: {
      client: {
        select: {
          email: true,
        },
      },
    },
  });

  return invoices;
};

const getSingleInvoice = async (userId: string, invId: string) => {
  const isOwner = await prisma.businessUser.findFirst({
    where: { userId: userId, business: { isDeleted: false } },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "Only Business Owner or Admin can view all clients."
    );
  }

  const invoice = await prisma.invoice.findFirst({
    where: {
      id: invId,
      businessId: isOwner.businessId,
    },
    include: {
      client: {
        select: {
          email: true,
        },
      },
      items: true,
    },
  });

  return invoice;
};

export const InvoiceServices = {
  createInvoice,
  getAllInvoices,
  getSingleInvoice,
};
