/*
  Warnings:

  - Added the required column `timeStamp` to the `Shots` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shots" ADD COLUMN     "timeStamp" INTEGER NOT NULL;
