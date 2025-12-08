-- DropIndex
DROP INDEX "Business_email_key";

-- AlterTable
ALTER TABLE "Business" ALTER COLUMN "email" DROP NOT NULL;
