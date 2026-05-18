/*
  Warnings:

  - You are about to drop the column `gameNumber` on the `Games` table. All the data in the column will be lost.
  - You are about to drop the column `gameAmount` on the `Seasons` table. All the data in the column will be lost.
  - Added the required column `date` to the `Games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opponent` to the `Games` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Players_number_key";

-- AlterTable
ALTER TABLE "Games" DROP COLUMN "gameNumber",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "opponent" TEXT NOT NULL,
ADD COLUMN     "replay" TEXT;

-- AlterTable
ALTER TABLE "Seasons" DROP COLUMN "gameAmount";
