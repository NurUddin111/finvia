import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";
import AppError from "../../errorHelpers/AppError";
import { HttpStatusCodes } from "../../utils/httpStatusCodes";
import { generateInvoiceNumber } from "../../utils/generateInvRcNb";
import { IItems } from "./invoice.interface";
import { randomUUID } from "crypto";
import { InvoiceStatus } from "@prisma/client";

const createInvoice = async (
  decodedToken: JwtPayload,
  email: string,
  dueDays: number,
  items: IItems[],
  taxRate: number,
  notes?: string,
) => {
  const userId = decodedToken.userId;

  const isOwner = await prisma.businessUser.findFirst({
    where: { userId, business: { isDeleted: false } },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "You do not belong to any business",
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

  const subtotal = items.reduce((sum, item) => {
    return sum + Number(item.pricePerUnit) * Number(item.quantity);
  }, 0);

  taxRate = Number.isNaN(taxRate) ? 0 : taxRate / 100;

  const tax = subtotal * taxRate;

  const total = subtotal + tax;

  let totalItems = 0;

  items.map((item) => {
    totalItems += item.quantity;
  });

  const result = await prisma.$transaction(async (tx) => {
    const invoice = await tx.invoice.create({
      data: {
        businessId: isOwner.businessId,
        clientId: client.clientId,
        createdById: isOwner.userId,
        invoiceNumber: invNb,
        dueDays: dueDays,
        subtotal: subtotal,
        totalItems: totalItems,
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
      "Only Business Owner or Admin can view all clients.",
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
      items: true,
    },
    orderBy: {
      dueDate: "desc",
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
      "Only Business Owner or Admin can view all clients.",
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

const getInvoicesStats = async (userId: string) => {
  const isOwner = await prisma.businessUser.findFirst({
    where: { userId: userId, business: { isDeleted: false } },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "Only Business Owner or Admin can view invoices stats!",
    );
  }

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999,
  );

  const invoices = await prisma.invoice.findMany({
    where: { businessId: isOwner.businessId },
    select: {
      status: true,
      total: true,
      subtotal: true,
      tax: true,
      createdAt: true,
    },
  });

  // ── Totals ──────────────────────────────────────────────────────────────────

  const totalInvoices = invoices.length;

  const draftedInvoices = invoices.filter(
    (inv) => inv.status === InvoiceStatus.DRAFT,
  ).length;

  const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.total ?? 0), 0);

  // ── This month (PAID invoices within current month) ─────────────────────────

  const paidThisMonth = invoices.filter(
    (inv) =>
      inv.status === InvoiceStatus.PAID &&
      inv.createdAt >= startOfMonth &&
      inv.createdAt <= endOfMonth,
  );

  const thisMonthEarnings = paidThisMonth.reduce(
    (sum, inv) => sum + (inv.total ?? 0),
    0,
  );

  const thisMonthPaidCount = paidThisMonth.length;

  // ── Outstanding (everything except PAID and DRAFT) ──────────────────────────

  const EXCLUDED: InvoiceStatus[] = [
    InvoiceStatus.PAID,
    InvoiceStatus.DRAFT,
    InvoiceStatus.CANCELLED,
    InvoiceStatus.FAILED,
  ];

  const outstandingInvoices = invoices.filter(
    (inv) => !EXCLUDED.includes(inv.status as InvoiceStatus),
  );

  const outstandingAmount = outstandingInvoices.reduce(
    (sum, inv) => sum + (inv.total ?? 0),
    0,
  );

  const outstandingCount = outstandingInvoices.length;

  return {
    data: {
      totalInvoices,
      draftedInvoices,
      totalRevenue,
      thisMonth: {
        earnings: thisMonthEarnings,
        paidCount: thisMonthPaidCount,
      },
      outstanding: {
        amount: outstandingAmount,
        count: outstandingCount,
      },
    },
  };
};

const setOverdueStatus = async (userId: string) => {
  const isOwner = await prisma.businessUser.findFirst({
    where: { userId: userId, business: { isDeleted: false } },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "Only Business Owner or Admin can set ivoices status!",
    );
  }

  const invoices = await prisma.invoice.updateMany({
    where: {
      businessId: isOwner.businessId,
      status: { notIn: ["DRAFT", "PAID", "OVERDUE"] },
      dueDate: {
        lt: new Date(),
      },
    },
    data: {
      status: InvoiceStatus.OVERDUE,
    },
  });

  return invoices;
};

export const InvoiceServices = {
  createInvoice,
  getAllInvoices,
  getSingleInvoice,
  getInvoicesStats,
  setOverdueStatus,
};
