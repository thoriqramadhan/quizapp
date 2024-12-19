/*
  Warnings:

  - You are about to drop the column `emai` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_emai_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emai",
ADD COLUMN     "email" TEXT NOT NULL DEFAULT 'placeholder@email.com';

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
