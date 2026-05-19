/*
  Warnings:

  - Added the required column `dateCreated` to the `Seasons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seasons" ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL;
