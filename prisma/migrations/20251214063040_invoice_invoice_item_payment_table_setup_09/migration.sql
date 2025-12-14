/*
  Warnings:

  - You are about to drop the column `rcPdfUrl` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "rcPdfUrl",
ADD COLUMN     "rcpNumber" TEXT,
ADD COLUMN     "rcpPdfUrl" TEXT;
