/*
  Warnings:

  - You are about to drop the column `tran_id` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `tnx_id` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "tran_id",
ADD COLUMN     "tnx_id" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;

-- DropEnum
DROP TYPE "PaymentStatus";
