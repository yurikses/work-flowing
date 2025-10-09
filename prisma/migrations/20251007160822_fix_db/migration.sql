/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'None';

-- CreateIndex
CREATE UNIQUE INDEX "user_name_key" ON "user"("name");
