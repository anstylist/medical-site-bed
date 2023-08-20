-- AlterTable
ALTER TABLE "User" ADD COLUMN     "forgotPasswordTime" TIMESTAMP(3),
ADD COLUMN     "forgotPasswordToken" TEXT;
