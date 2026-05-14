-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Players" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "Players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teams" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seasons" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gameAmount" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "Seasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Games" (
    "id" SERIAL NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "gameNumber" INTEGER NOT NULL,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameStatlines" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "TwoPointFGMiss" INTEGER NOT NULL,
    "TwoPointFGMake" INTEGER NOT NULL,
    "ThreePointFGMiss" INTEGER NOT NULL,
    "ThreePointFGMake" INTEGER NOT NULL,
    "FTMiss" INTEGER NOT NULL,
    "FTMake" INTEGER NOT NULL,
    "OReb" INTEGER NOT NULL,
    "DReb" INTEGER NOT NULL,
    "Assist" INTEGER NOT NULL,
    "Block" INTEGER NOT NULL,
    "Steal" INTEGER NOT NULL,
    "Turnover" INTEGER NOT NULL,
    "PF" INTEGER NOT NULL,
    "TwoPointFGPercent" INTEGER NOT NULL,
    "ThreePointFGPercent" INTEGER NOT NULL,
    "FTPercent" INTEGER NOT NULL,
    "TotalRebounds" INTEGER NOT NULL,
    "Points" INTEGER NOT NULL,

    CONSTRAINT "GameStatlines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shots" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "gameStatlineId" INTEGER NOT NULL,
    "make" BOOLEAN NOT NULL,
    "X" INTEGER NOT NULL,
    "Y" INTEGER NOT NULL,
    "Type" INTEGER NOT NULL,

    CONSTRAINT "Shots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_users" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_users_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Players_number_key" ON "Players"("number");

-- CreateIndex
CREATE INDEX "_users_B_index" ON "_users"("B");

-- AddForeignKey
ALTER TABLE "Players" ADD CONSTRAINT "Players_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seasons" ADD CONSTRAINT "Seasons_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Games" ADD CONSTRAINT "Games_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Seasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameStatlines" ADD CONSTRAINT "GameStatlines_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameStatlines" ADD CONSTRAINT "GameStatlines_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shots" ADD CONSTRAINT "Shots_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shots" ADD CONSTRAINT "Shots_gameStatlineId_fkey" FOREIGN KEY ("gameStatlineId") REFERENCES "GameStatlines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_users" ADD CONSTRAINT "_users_A_fkey" FOREIGN KEY ("A") REFERENCES "Teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_users" ADD CONSTRAINT "_users_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
