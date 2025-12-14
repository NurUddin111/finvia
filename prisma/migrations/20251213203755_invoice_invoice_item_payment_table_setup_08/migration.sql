/*
  Warnings:

  - You are about to drop the column `pdfUrl` on the `Invoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "pdfUrl",
ADD COLUMN     "invPdfUrl" TEXT;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "rcPdfUrl" TEXT;
