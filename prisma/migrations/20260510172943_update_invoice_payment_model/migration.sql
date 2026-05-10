/*
  Warnings:

  - You are about to drop the column `paymentToken` on the `Invoice` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('ONLINE', 'CASH');

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "paymentToken";

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "method" "PaymentMethod",
ALTER COLUMN "provider" DROP NOT NULL;
