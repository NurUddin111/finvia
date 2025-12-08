/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Business" DROP CONSTRAINT "Business_categoryId_fkey";

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "categoryId",
ADD COLUMN     "category" "BusinessCategory" NOT NULL;

-- DropTable
DROP TABLE "Category";
