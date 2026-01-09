/* eslint-disable @typescript-eslint/no-unused-vars */
import PDFDocument from "pdfkit";
import axios from "axios";
import { Invoice, InvoiceItem } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import AppError from "../errorHelpers/AppError";
import { HttpStatusCodes } from "./httpStatusCodes";
import { formatDateTime } from "./formatDT";

export const generateInvPdf = async (
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
          .text("INVOICE", 0, 30, { align: "right" });

        doc
          .font("Helvetica-Bold")
          .fontSize(10)
          .text(`#${invoice.invoiceNumber}`, 456, 55);

        doc
          .font("Helvetica")
          .fontSize(10)
          .text(`Issue Date: ${formatDateTime(invoice.issueDate)}`, 405, 70);

        doc.text(`Due Date: ${formatDateTime(invoice.dueDate)}`, 405, 85);
      } else {
        doc.font("Helvetica-Bold").fontSize(24).text(business.name, 50, 30);
        doc.font("Helvetica").fontSize(10);
        if (business.address) doc.text(business.address, 50, 55);
        if (business.phone) doc.text(business.phone, 50, 70);
        doc
          .font("Helvetica-Bold")
          .fontSize(26)
          .text("INVOICE", 0, 30, { align: "right" });
        doc
          .font("Helvetica-Bold")
          .fontSize(10)
          .text(`#${invoice.invoiceNumber}`, 456, 55);

        doc
          .font("Helvetica")
          .fontSize(10)
          .text(
            `Issue Date: ${new Date(invoice.issueDate).toLocaleDateString(
              "en-GB"
            )}`,
            456,
            70
          );

        doc.text(
          `Due Date: ${new Date(invoice.dueDate).toLocaleDateString("en-GB")}`,
          456,
          85
        );
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

      doc.text(`Subtotal:`, summaryX, headerY);
      doc.text(formatBDT(invoice.subtotal), 450, headerY);

      doc.moveDown(0.5);
      headerY = doc.y;

      doc.text(`Tax:`, summaryX, headerY);
      doc.text(formatBDT(invoice.tax), 450, headerY);

      doc.moveDown(0.5);
      headerY = doc.y;

      doc.font("Helvetica-Bold").text(`Total:`, summaryX, headerY);
      doc.font("Helvetica-Bold").text(formatBDT(invoice.total), 450, headerY);

      doc.moveDown(2);

      // Footer

      doc
        .font("Helvetica")
        .fontSize(10)
        .text("Thank you for your business!", 50, doc.y);

      doc.moveDown(3);
      doc.text("Signature", 50, doc.y);
      doc
        .moveTo(50, doc.y - 15)
        .lineTo(200, doc.y - 15)
        .stroke();

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};
