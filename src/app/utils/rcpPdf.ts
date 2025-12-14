/* eslint-disable @typescript-eslint/no-unused-vars */
import PDFDocument from "pdfkit";
import axios from "axios";
import { Invoice, InvoiceItem } from "../../generated/prisma";
import { prisma } from "../../lib/prisma";
import AppError from "../errorHelpers/AppError";
import { HttpStatusCodes } from "./httpStatusCodes";
import { formatDateTime } from "./formatDT";

export const generateRcpPdf = async (
  invoice: Invoice
): Promise<Buffer<ArrayBufferLike>> => {
  const business = await prisma.business.findFirst({
    where: { id: invoice.businessId },
  });

  if (!business) {
    throw new AppError(
      HttpStatusCodes.NOT_FOUND,
      "Business details not found!"
    );
  }

  const client = await prisma.client.findFirst({
    where: { id: invoice.clientId },
  });

  if (!client) {
    throw new AppError(HttpStatusCodes.NOT_FOUND, "Client details not found!");
  }

  const items = await prisma.invoiceItem.findMany({
    where: { invoiceId: invoice.id },
  });

  if (!items) {
    throw new AppError(HttpStatusCodes.NOT_FOUND, "Item details not found!");
  }

  const payment = await prisma.payment.findFirst({
    where: {
      invoiceId: invoice.id,
    },
  });

  if (!payment) {
    throw new AppError(HttpStatusCodes.NOT_FOUND, "Payment details not found!");
  }

  let logoBuffer: Buffer | null = null;
  if (business.logoUrl) {
    try {
      const resp = await axios.get(business.logoUrl, {
        responseType: "arraybuffer",
        timeout: 5000,
      });
      logoBuffer = Buffer.from(resp.data, "binary");
    } catch (err) {
      logoBuffer = null;
    }
  }

  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });

      const buffer: Uint8Array[] = [];

      doc.on("data", (chunk) => buffer.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffer)));
      doc.on("error", (err) => reject(err));

      const formatBDT = (num: number) => `${num.toFixed(2)}Tk`;

      // Pdf Header

      if (logoBuffer) {
        try {
          doc.image(logoBuffer, 50, 30, { width: 60 });
        } catch (err) {
          // Logo not available
        }

        doc.font("Helvetica-Bold").fontSize(20).text(business.name, 120, 30);
        doc.font("Helvetica").fontSize(10);
        if (business.address) doc.text(business.address, 120, 55);
        if (business.phone) doc.text(business.phone, 120, 70);

        doc
          .font("Helvetica-Bold")
          .fontSize(26)
          .text("RECEIPT", 0, 30, { align: "right" });

        doc
          .font("Helvetica-Bold")
          .fontSize(10)
          .text(`#${payment.rcpNumber}`, 453, 55);

        doc
          .font("Helvetica")
          .fontSize(10)
          .text(`Date: ${formatDateTime(new Date(Date.now()))}`, 0, 70, {
            align: "right",
          });
      } else {
        doc.font("Helvetica-Bold").fontSize(24).text(business.name, 50, 30);
        doc.font("Helvetica").fontSize(10);
        if (business.address) doc.text(business.address, 50, 55);
        if (business.phone) doc.text(business.phone, 50, 70);
        doc
          .font("Helvetica-Bold")
          .fontSize(26)
          .text("RECEIPT", 0, 30, { align: "right" });
        doc
          .font("Helvetica-Bold")
          .fontSize(10)
          .text(`#${payment.rcpNumber}`, 453, 55);

        doc
          .font("Helvetica")
          .fontSize(10)
          .text(`Date: ${formatDateTime(new Date(Date.now()))}`, 0, 70, {
            align: "right",
          });
      }

      doc.moveTo(50, 100).lineTo(560, 100).stroke();

      doc.moveDown(1);

      // Client Details

      doc.font("Helvetica-Bold").fontSize(12).text("Bill To", 50, 110);
      doc.font("Helvetica").fontSize(10);

      doc.text(client.name);
      if (client.email) doc.text(client.email);
      if (client.address) doc.text(client.address);
      if (client.phone) doc.text(client.phone);

      doc.moveDown(2);

      // Table Header

      let headerY = doc.y;

      doc.font("Helvetica-Bold").fontSize(12);
      doc.text("Description", 50, headerY);
      doc.text("Quantity", 250, headerY);
      doc.text("Unit Price", 350, headerY);
      doc.text("Amount", 450, headerY);

      doc.moveDown(0.5);
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

      doc.moveDown(1);

      // Rows
      headerY = doc.y;
      doc.font("Helvetica").fontSize(10);

      items.forEach((item: InvoiceItem) => {
        doc.text(item.name, 50, headerY);
        doc.text(String(item.quantity), 270, headerY);
        doc.text(formatBDT(item.pricePerUnit), 350, headerY);
        doc.text(formatBDT(item.total), 450, headerY);
        doc.moveDown();
        headerY = headerY + 20;
      });

      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown();

      // Summary

      const summaryX = 350;
      headerY = doc.y;

      doc.font("Helvetica").fontSize(12);

      doc.text(`Amount Paid:`, summaryX, headerY);
      doc.text(formatBDT(invoice.total), 450, headerY);

      doc.moveDown(0.5);
      headerY = doc.y;

      doc.text(`Payment Method:`, summaryX, headerY);
      doc.text(payment.provider, 450, headerY);

      doc.moveDown(0.5);
      headerY = doc.y;

      doc.font("Helvetica-Bold").text(`Transaction ID:`, summaryX, headerY);
      doc.font("Helvetica-Bold").text(payment.tran_id, 450, headerY);

      doc.moveDown(2);

      // Footer

      doc
        .font("Helvetica")
        .fontSize(10)
        .text("Payment Received - thank you!", 50, doc.y);

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};
