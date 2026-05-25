/*
  Warnings:

  - You are about to drop the column `Assist` on the `GameStatlines` table. All the data in the column will be lost.
  - You are about to drop the column `Block` on the `GameStatlines` table. All the data in the column will be lost.
  - You are about to drop the column `DReb` on the `GameStatlines` table. All the data in the column will be lost.
  - You are about to drop the column `FTMake` on the `GameStatlines` table. All the data in the column will be lost.
  - You are about to drop the column `FTMiss` on the `GameStatlines` table. All the data in the column will be lost.
  - You are about to drop the column `FTPercent` on the `GameStatlines` table. All the data in the column will be lost.
  - You are about to drop the column `OReb` on the `GameStatlines` table. All the data in the column will be lost.
  - You are about to drop the column `PF` on the `GameStatlines` table. All the data in the column will be lost.
  - You are about to drop the column `Points` on the `GameStatlines` table. All the data in the column will be lost.
  - You are about to drop the column `Steal` on the `GameStatlines` table. All the data in the column will be lost.
  - You are about to drop the column `ThreePointFGMake` on the `GameStatlines` table. All the data in the column will be lost.
  - You are about to drop the column `ThreePointFGMiss` on the `GameStatlines` table. All the data in the column will be lost.
  - You are about to drop the column `ThreePointFGPercent` on the `GameStatlines` table. All the data in the column will be lost.
  - You are about to drop the column `TotalRebounds` on the `GameStatlines` table. All the data in the column will be lost.
  - You are about to drop the column `Turnover` on the `GameStatlines` table. All the data in the column will be lost.
  - You are about to drop the column `TwoPointFGMake` on the `GameStatlines` table. All the data in the column will be lost.
  - You are about to drop the column `TwoPointFGMiss` on the `GameStatlines` table. All the data in the column will be lost.
  - You are about to drop the column `TwoPointFGPercent` on the `GameStatlines` table. All the data in the column will be lost.
  - You are about to drop the column `Type` on the `Shots` table. All the data in the column will be lost.
  - Added the required column `assist` to the `GameStatlines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `block` to the `GameStatlines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dReb` to the `GameStatlines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fTMake` to the `GameStatlines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fTMiss` to the `GameStatlines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fTPercent` to the `GameStatlines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oReb` to the `GameStatlines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pF` to the `GameStatlines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `points` to the `GameStatlines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `steal` to the `GameStatlines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `threePointFGMake` to the `GameStatlines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `threePointFGMiss` to the `GameStatlines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `threePointFGPercent` to the `GameStatlines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalRebounds` to the `GameStatlines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turnover` to the `GameStatlines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twoPointFGMake` to the `GameStatlines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twoPointFGMiss` to the `GameStatlines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twoPointFGPercent` to the `GameStatlines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Shots` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameStatlines" DROP COLUMN "Assist",
DROP COLUMN "Block",
DROP COLUMN "DReb",
DROP COLUMN "FTMake",
DROP COLUMN "FTMiss",
DROP COLUMN "FTPercent",
DROP COLUMN "OReb",
DROP COLUMN "PF",
DROP COLUMN "Points",
DROP COLUMN "Steal",
DROP COLUMN "ThreePointFGMake",
DROP COLUMN "ThreePointFGMiss",
DROP COLUMN "ThreePointFGPercent",
DROP COLUMN "TotalRebounds",
DROP COLUMN "Turnover",
DROP COLUMN "TwoPointFGMake",
DROP COLUMN "TwoPointFGMiss",
DROP COLUMN "TwoPointFGPercent",
ADD COLUMN     "assist" INTEGER NOT NULL,
ADD COLUMN     "block" INTEGER NOT NULL,
ADD COLUMN     "dReb" INTEGER NOT NULL,
ADD COLUMN     "fTMake" INTEGER NOT NULL,
ADD COLUMN     "fTMiss" INTEGER NOT NULL,
ADD COLUMN     "fTPercent" INTEGER NOT NULL,
ADD COLUMN     "oReb" INTEGER NOT NULL,
ADD COLUMN     "pF" INTEGER NOT NULL,
ADD COLUMN     "points" INTEGER NOT NULL,
ADD COLUMN     "steal" INTEGER NOT NULL,
ADD COLUMN     "threePointFGMake" INTEGER NOT NULL,
ADD COLUMN     "threePointFGMiss" INTEGER NOT NULL,
ADD COLUMN     "threePointFGPercent" INTEGER NOT NULL,
ADD COLUMN     "totalRebounds" INTEGER NOT NULL,
ADD COLUMN     "turnover" INTEGER NOT NULL,
ADD COLUMN     "twoPointFGMake" INTEGER NOT NULL,
ADD COLUMN     "twoPointFGMiss" INTEGER NOT NULL,
ADD COLUMN     "twoPointFGPercent" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Shots" DROP COLUMN "Type",
ADD COLUMN     "type" INTEGER NOT NULL;
