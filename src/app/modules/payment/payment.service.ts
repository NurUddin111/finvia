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
  const result = await prisma.$transaction(async (tx) => {
    let invoice = await tx.invoice.findFirst({
      where: {
        id: invId,
        status: {
          not: "PAID",
        },
      },
    });

    if (!invoice) {
      throw new AppError(HttpStatusCodes.BAD_REQUEST, "This invoice is PAID!");
    }

    const dueDate = new Date(
      Date.now() + invoice.dueDays * 24 * 60 * 60 * 1000,
    );

    invoice = await tx.invoice.update({
      where: {
        id: invId,
      },
      data: {
        status: "SENT",
        issueDate: new Date(Date.now()),
        dueDate: dueDate,
      },
    });

    let client = await tx.client.findUnique({
      where: { id: invoice.clientId },
    });

    if (!client) {
      throw new AppError(HttpStatusCodes.NOT_FOUND, "Client not found");
    }

    client = await tx.client.update({
      where: {
        id: client.id,
      },
      data: {
        totalInvoices: client.totalInvoices + 1,
      },
    });

    const business = await tx.business.findUnique({
      where: {
        id: invoice.businessId,
      },
    });

    if (!business) {
      throw new AppError(
        HttpStatusCodes.NOT_FOUND,
        "Business details not found",
      );
    }

    let payment = await tx.payment.findFirst({
      where: {
        invoiceId: invoice.id,
      },
    });

    if (!payment) {
      throw new AppError(
        HttpStatusCodes.NOT_FOUND,
        "Payment details not found",
      );
    }

    payment = await tx.payment.update({
      where: { id: payment.id },
      data: {
        status: "INITIATED",
      },
    });

    return { invoice, client, business, payment };
  });

  const { invoice, client, business, payment } = result;

  const invPdf = await generateInvPdf(invoice);

  if (!invPdf) {
    throw new AppError(
      HttpStatusCodes.BAD_REQUEST,
      "Failed to create Invoice PDF",
    );
  }

  const cloudinaryResult = await uploadBufferToCloudinary(invPdf, "invoice");

  if (!cloudinaryResult) {
    throw new AppError(
      HttpStatusCodes.BAD_REQUEST,
      "Failed to upload invoice pdf at cloudinary",
    );
  }

  await prisma.invoice.update({
    where: {
      id: invId,
    },
    data: {
      invPdfUrl: cloudinaryResult.secure_url,
    },
  });

  const sslPayload: ISSLCommerz = {
    address: client.address || "Bangladesh",
    email: client.email,
    phoneNumber: client.phone || "",
    name: client.name,
    amount: invoice.total,
    transactionId: payment.tran_id,
  };

  const sslPayment = await SSLService.sslPaymentInit(sslPayload);

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
        fileName: `Invoice-${invoice.invoiceNumber}`,
        content: invPdf,
        contentType: "application/pdf",
      },
    ],
  });

  console.log(sslPayment);

  return {
    CloudinaryResult: cloudinaryResult.secure_url,
    SSLCOMMERZ: sslPayment.GatewayPageURL,
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
        fileName: `Receipt-${payment.rcpNumber}`,
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

export const PaymentServices = {
  initPayment,
  successPayment,
  failPayment,
  cancelPayment,
};
