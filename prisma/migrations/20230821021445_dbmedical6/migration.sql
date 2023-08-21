/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Speciality` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "linkdein" TEXT,
ADD COLUMN     "twitter" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Speciality_name_key" ON "Speciality"("name");
