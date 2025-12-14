/*
  Warnings:

  - You are about to drop the column `price` on the `InvoiceItem` table. All the data in the column will be lost.
  - Added the required column `pricePerUnit` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InvoiceItem" DROP COLUMN "price",
ADD COLUMN     "pricePerUnit" DOUBLE PRECISION NOT NULL;
