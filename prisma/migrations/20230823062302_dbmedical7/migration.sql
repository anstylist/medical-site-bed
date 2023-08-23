/*
  Warnings:

  - You are about to drop the column `linkdein` on the `Doctor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "linkdein",
ADD COLUMN     "linkedin" TEXT;
