/*
  Warnings:

  - You are about to drop the column `gameId` on the `Shots` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Shots" DROP CONSTRAINT "Shots_gameId_fkey";

-- AlterTable
ALTER TABLE "Shots" DROP COLUMN "gameId";
