-- CreateEnum
CREATE TYPE "BusinessCategory" AS ENUM ('AGENCY', 'ECOMMERCE', 'RESTAURANT', 'FREELANCER', 'SERVICE_PROVIDER', 'RETAIL', 'SOFTWARE_COMPANY', 'EDUCATION', 'HEALTHCARE', 'REAL_ESTATE', 'OTHER');

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "categoryId" TEXT;

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "enumValue" "BusinessCategory" NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
