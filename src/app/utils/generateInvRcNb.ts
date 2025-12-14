import { prisma } from "../../lib/prisma";

export const generateInvoiceNumber = async (businessId: string) => {
  const year = new Date().getFullYear();
  const count = await prisma.invoice.count({
    where: { businessId, issueDate: { gte: new Date(`${year}-01-01`) } },
  });
  return `INV-${year}-${String(count + 1).padStart(5, "0")}`;
};

export const generateReceiptNumber = async (businessId: string) => {
  const year = new Date().getFullYear();
  const count = await prisma.payment.count({
    where: {
      invoice: {
        businessId: businessId,
        status: "PAID",
      },
      createdAt: { gte: new Date(`${year}-01-01`) },
    },
  });
  return `RCP-${year}-${String(count + 1).padStart(5, "0")}`;
};
