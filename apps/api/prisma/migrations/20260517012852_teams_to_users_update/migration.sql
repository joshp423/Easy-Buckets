/*
  Warnings:

  - You are about to drop the `_users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Teams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Teams` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_users" DROP CONSTRAINT "_users_A_fkey";

-- DropForeignKey
ALTER TABLE "_users" DROP CONSTRAINT "_users_B_fkey";

-- AlterTable
ALTER TABLE "Teams" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_users";

-- AddForeignKey
ALTER TABLE "Teams" ADD CONSTRAINT "Teams_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
