/*
  Warnings:

  - Added the required column `fTA` to the `GameStatlines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `threePointFGA` to the `GameStatlines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twoPointFGA` to the `GameStatlines` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameStatlines" ADD COLUMN     "fTA" INTEGER NOT NULL,
ADD COLUMN     "threePointFGA" INTEGER NOT NULL,
ADD COLUMN     "twoPointFGA" INTEGER NOT NULL;
