/*
  Warnings:

  - Made the column `totalSold` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totalEarning` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pendingOrder` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "totalSold" SET NOT NULL,
ALTER COLUMN "totalEarning" SET NOT NULL,
ALTER COLUMN "pendingOrder" SET NOT NULL;
