/*
Warnings:

- Made the column `productId` on table `InvoiceItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "InvoiceItem"
ALTER COLUMN "productId"
SET
    NOT NULL,
ALTER COLUMN "productId"
DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "InvoiceItem"
ADD CONSTRAINT "InvoiceItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;