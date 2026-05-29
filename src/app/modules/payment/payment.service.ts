import { prisma } from "../../../lib/prisma";
import { uploadBufferToCloudinary } from "../../config/cloudinary.config";
import AppError from "../../errorHelpers/AppError";
import { formatDateTime } from "../../utils/formatDT";
import { generateReceiptNumber } from "../../utils/generateInvRcNb";
import { HttpStatusCodes } from "../../utils/httpStatusCodes";
import { generateInvPdf } from "../../utils/invPdf";
import { generateRcpPdf } from "../../utils/rcpPdf";
import { sendEmail } from "../../utils/sendEmail";
import { ISSLCommerz } from "../sslCommerz/ssl.interface";
import { SSLService } from "../sslCommerz/ssl.service";

const initPayment = async (invId: string) => {
  // ── 1. Atomic DB writes ────────────────────────────────────────────────────
  const result = await prisma.$transaction(async (tx) => {
    const invoice = await tx.invoice.findFirst({
      where: { id: invId },
    });

    if (!invoice) {
      throw new AppError(HttpStatusCodes.NOT_FOUND, "Invoice not found");
    }

    // More precise status guard — not just "not PAID"
    if (invoice.status === "PAID") {
      throw new AppError(
        HttpStatusCodes.BAD_REQUEST,
        "This invoice is already paid",
      );
    }
    if (invoice.status === "CANCELLED") {
      throw new AppError(
        HttpStatusCodes.BAD_REQUEST,
        "This invoice has been cancelled",
      );
    }

    const dueDate = new Date(
      Date.now() + invoice.dueDays * 24 * 60 * 60 * 1000,
    );

    // Run independent lookups in parallel
    const [updatedInvoice, client, business, payment] = await Promise.all([
      tx.invoice.update({
        where: { id: invId },
        data: {
          status: "SENT",
          issueDate: new Date(),
          dueDate,
        },
      }),
      tx.client.findUnique({ where: { id: invoice.clientId } }),
      tx.business.findUnique({ where: { id: invoice.businessId } }),
      tx.payment.findFirst({ where: { invoiceId: invoice.id } }),
    ]);

    if (!client) {
      throw new AppError(HttpStatusCodes.NOT_FOUND, "Client not found");
    }
    if (!business) {
      throw new AppError(
        HttpStatusCodes.NOT_FOUND,
        "Business details not found",
      );
    }
    if (!payment) {
      throw new AppError(
        HttpStatusCodes.NOT_FOUND,
        "Payment details not found",
      );
    }

    // Run independent writes in parallel
    const [updatedClient, updatedPayment] = await Promise.all([
      tx.client.update({
        where: { id: client.id },
        data: { totalInvoices: { increment: 1 } }, // safer than client.totalInvoices + 1
      }),
      tx.payment.update({
        where: { id: payment.id },
        data: {
          status: "INITIATED",
          method: "ONLINE", // ← new field
          provider: "SSLCOMMERZ", // ← now set here, not at creation
        },
      }),
    ]);

    return {
      invoice: updatedInvoice,
      client: updatedClient,
      business,
      payment: updatedPayment,
    };
  });

  const { invoice, client, business, payment } = result;

  // ── 2. Generate & upload invoice PDF ──────────────────────────────────────
  const invPdf = await generateInvPdf(invoice);
  if (!invPdf) {
    throw new AppError(
      HttpStatusCodes.BAD_REQUEST,
      "Failed to create invoice PDF",
    );
  }

  const cloudinaryResult = await uploadBufferToCloudinary(invPdf, "invoice");
  if (!cloudinaryResult) {
    throw new AppError(
      HttpStatusCodes.BAD_REQUEST,
      "Failed to upload invoice PDF to Cloudinary",
    );
  }

  // ── 3. Initiate SSL payment ────────────────────────────────────────────────

  const sslPayload: ISSLCommerz = {
    address: client.address || "Bangladesh",
    email: client.email,
    phoneNumber: client.phone || "",
    name: client.name,
    amount: invoice.total,
    transactionId: payment.tran_id,
  };

  const sslPayment = await SSLService.sslPaymentInit(sslPayload);

  // ── 4. Persist URLs (non-critical, outside transaction) ───────────────────
  await Promise.all([
    prisma.invoice.update({
      where: { id: invId },
      data: { invPdfUrl: cloudinaryResult.secure_url },
    }),
    prisma.payment.update({
      where: { id: payment.id },
      data: {
        metadata: {
          gatewayPageURL: sslPayment.GatewayPageURL,
        },
      },
    }),
  ]);

  // ── 5. Send invoice email ──────────────────────────────────────────────────
  await sendEmail({
    to: client.email,
    subject: "Invoice",
    templateName: "invoice",
    templateData: {
      invoiceNumber: invoice.invoiceNumber,
      businessName: business.name,
      clientName: client.name,
      issueDate: formatDateTime(invoice.issueDate),
      dueDate: formatDateTime(invoice.dueDate),
      currency: invoice.currency,
      totalAmount: invoice.total,
      paymentLink: sslPayment.GatewayPageURL,
      invoicePdfLink: cloudinaryResult.secure_url,
      supportEmail: business.email,
    },
    attachments: [
      {
        fileName: `Invoice-${invoice.invoiceNumber}.pdf`,
        content: invPdf,
        contentType: "application/pdf",
      },
    ],
  });

  return {
    invPdfUrl: cloudinaryResult.secure_url,
    gatewayPageURL: sslPayment.GatewayPageURL,
  };
};

const successPayment = async (query: Record<string, string>) => {
  const { transactionId } = query;

  // ── 1. Atomic DB writes (payment, invoice, products) ──────────────────────
  const result = await prisma.$transaction(async (tx) => {
    const payment = await tx.payment.findFirst({
      where: { tran_id: transactionId },
    });
    if (!payment)
      throw new AppError(HttpStatusCodes.NOT_FOUND, "Payment not found");

    const invoice = await tx.invoice.findFirst({
      where: { id: payment.invoiceId },
      include: { items: true }, // ← fetch line items to match products
    });
    if (!invoice)
      throw new AppError(HttpStatusCodes.NOT_FOUND, "Invoice not found");

    // Run independent lookups in parallel
    const [business, client] = await Promise.all([
      tx.business.findUnique({ where: { id: invoice.businessId } }),
      tx.client.findUnique({ where: { id: invoice.clientId } }),
    ]);

    if (!business)
      throw new AppError(HttpStatusCodes.NOT_FOUND, "Business not found");
    if (!client)
      throw new AppError(HttpStatusCodes.NOT_FOUND, "Client not found");

    const rcpNb = await generateReceiptNumber(business.id);

    // Update payment + invoice in parallel
    const [updatedPayment, updatedInvoice] = await Promise.all([
      tx.payment.update({
        where: { id: payment.id },
        data: { status: "SUCCESS", rcpNumber: rcpNb },
      }),
      tx.invoice.update({
        where: { id: invoice.id },
        data: { status: "PAID" },
      }),
    ]);

    // ── Update products by name ────────────────────────────────────────────
    await Promise.all(
      invoice.items.map((item) =>
        tx.product.update({
          where: { id: item.productId },
          data: {
            totalSold: { increment: item.quantity },
            totalEarning: { increment: item.total },
            pendingOrder: { decrement: item.quantity },
          },
        }),
      ),
    );

    return {
      payment: updatedPayment,
      invoice: updatedInvoice,
      client,
      business,
    };
  });

  const { invoice, payment, client, business } = result;

  // ── 2. Generate & upload receipt PDF ──────────────────────────────────────
  const rcpPdf = await generateRcpPdf(invoice);
  if (!rcpPdf) {
    throw new AppError(
      HttpStatusCodes.BAD_REQUEST,
      "Failed to create receipt PDF",
    );
  }

  const cloudinaryResult = await uploadBufferToCloudinary(rcpPdf, "receipt");
  if (!cloudinaryResult) {
    throw new AppError(
      HttpStatusCodes.BAD_REQUEST,
      "Failed to upload receipt PDF to Cloudinary",
    );
  }

  // Persist the PDF URL (non-critical, outside main transaction intentionally)
  await prisma.payment.update({
    where: { id: payment.id },
    data: { rcpPdfUrl: cloudinaryResult.secure_url },
  });

  // ── 3. Send receipt email ──────────────────────────────────────────────────
  await sendEmail({
    to: client.email,
    subject: "Receipt",
    templateName: "receipt",
    templateData: {
      clientName: client.name,
      receiptNumber: payment.rcpNumber,
      invoiceNumber: invoice.invoiceNumber,
      paymentDate: formatDateTime(new Date()),
      paymentMethod: payment.provider,
      transactionId: payment.tran_id,
      currency: payment.currency,
      amount: payment.amount,
      receiptPdfLink: cloudinaryResult.secure_url,
      businessEmail: business.email,
      businessName: business.name,
    },
    attachments: [
      {
        fileName: `Receipt-${payment.rcpNumber}.pdf`,
        content: rcpPdf,
        contentType: "application/pdf",
      },
    ],
  });

  return { success: true, message: "Payment completed successfully" };
};

const failPayment = async (query: Record<string, string>) => {
  const transactionId = query.transactionId;

  await prisma.$transaction(async (tx) => {
    const payment = await tx.payment.findFirst({
      where: {
        tran_id: transactionId,
      },
    });

    if (!payment) {
      throw new AppError(
        HttpStatusCodes.NOT_FOUND,
        "Payment Details Not Found",
      );
    }

    const invoice = await tx.invoice.findUnique({
      where: {
        id: payment.invoiceId,
      },
    });

    if (!invoice) {
      throw new AppError(
        HttpStatusCodes.NOT_FOUND,
        "Invoice Details Not Found",
      );
    }

    await tx.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        status: "FAILED",
      },
    });

    await tx.invoice.update({
      where: {
        id: invoice.id,
      },
      data: {
        status: "FAILED",
      },
    });
  });

  return { success: false, message: "Payment Failed" };
};

const cancelPayment = async (query: Record<string, string>) => {
  const transactionId = query.transactionId;

  await prisma.$transaction(async (tx) => {
    const payment = await tx.payment.findFirst({
      where: {
        tran_id: transactionId,
      },
    });

    if (!payment) {
      throw new AppError(
        HttpStatusCodes.NOT_FOUND,
        "Payment Details Not Found",
      );
    }

    const invoice = await tx.invoice.findUnique({
      where: {
        id: payment.invoiceId,
      },
    });

    if (!invoice) {
      throw new AppError(
        HttpStatusCodes.NOT_FOUND,
        "Invoice Details Not Found",
      );
    }

    await tx.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        status: "CANCELLED",
      },
    });

    await tx.invoice.update({
      where: {
        id: invoice.id,
      },
      data: {
        status: "CANCELLED",
      },
    });
  });

  return { success: false, message: "Payment Failed" };
};

const getPaymentMethodStats = async (userId: string) => {
  const isOwner = await prisma.businessUser.findFirst({
    where: { userId, business: { isDeleted: false } },
  });

  if (!isOwner) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "You do not belong to any business",
    );
  }

  const where = {
    invoice: { businessId: isOwner.businessId },
    status: "SUCCESS" as const,
  };

  const [online, cash] = await Promise.all([
    prisma.payment.count({ where: { ...where, method: "ONLINE" } }),
    prisma.payment.count({ where: { ...where, method: "CASH" } }),
  ]);

  const total = online + cash;

  return {
    online: total ? Math.round((online / total) * 100) : 0,
    cash: total ? Math.round((cash / total) * 100) : 0,
    total,
  };
};

const updatePaymentMethod = async () => {
  await prisma.payment.updateMany({ data: { method: "ONLINE" } });
};

export const PaymentServices = {
  initPayment,
  successPayment,
  failPayment,
  cancelPayment,
  updatePaymentMethod,
  getPaymentMethodStats,
};
