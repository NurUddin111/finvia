/*
  Warnings:

  - Made the column `method` on table `Payment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "method" SET NOT NULL,
ALTER COLUMN "method" DROP DEFAULT;
