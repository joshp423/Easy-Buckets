import type { PrismaClient } from "@prisma/client";
import { data } from "react-router-dom";

export class GameRepo {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createInitial(
    userId: number,
    seasonId: number,
    opponent: string,
    date: Date,
  ) {
    const season = await this.prisma.seasons.findFirst({
      // userId authCheck
      where: {
        id: seasonId,
        team: {
          userId,
        },
      },
    });

    if (!season) {
      throw new Error("Forbidden");
    }

    return this.prisma.games.create({
      data: {
        seasonId,
        opponent,
        date,
        draft: true,
      },
    });
  }

  async addReplay(gameId: number, replay: string) {
    return this.prisma.games.update({
      where: { id: gameId },
      data: { replay },
    });
  }
  // async create(
  //   seasonId: number,
  //   opponent: string,
  //   date: Date,
  //   gameStats: GameStats[],
  // ) {
  //   return await this.prisma.games.create({
  //     data: {
  //       seasonId,
  //       opponent,
  //       date,
  //       gameStatlines: {
  //         create: gameStats.map((playerStats) => ({
  //           player: {
  //             connect: {
  //               id: playerStats.playerId,
  //             },
  //           },
  //           twoPointFGMiss: playerStats.twoPointFGMiss,
  //           twoPointFGMake: playerStats.twoPointFGMake,
  //           twoPointFGA: playerStats.twoPointFGA,
  //           threePointFGMiss: playerStats.threePointFGMiss,
  //           threePointFGMake: playerStats.threePointFGMake,
  //           threePointFGA: playerStats.threePointFGA,
  //           fTMiss: playerStats.fTMiss,
  //           fTMake: playerStats.fTMake,
  //           fTA: playerStats.fTA,
  //           oReb: playerStats.oReb,
  //           dReb: playerStats.dReb,
  //           assist: playerStats.assist,
  //           block: playerStats.block,
  //           steal: playerStats.steal,
  //           turnover: playerStats.turnover,
  //           pF: playerStats.pF,
  //           twoPointFGPercent: playerStats.twoPointFGPercent,
  //           threePointFGPercent: playerStats.threePointFGPercent,
  //           fTPercent: playerStats.fTPercent,
  //           totalRebounds: playerStats.totalRebounds,
  //           points: playerStats.points,
  //           shots: {
  //             create: playerStats.shots.map((shot) => ({
  //               make: shot.make,
  //               X: shot.X,
  //               Y: shot.Y,
  //               type: shot.type,
  //             })),
  //           },
  //         })),
  //       },
  //     },
  //   });
  // }

  async get(seasonId: number) {
    return await this.prisma.games.findMany({
      where: {
        seasonId,
      },
      orderBy: {
        date: "desc",
      },
      include: {
        gameStatlines: {
          include: {
            shots: {},
          },
        },
      },
    });
  }

  async getSingleGame(userId: number, gameId: number) {
    return await this.prisma.games.findUnique({
      where: {
        id: gameId,
        team: {
          userId,
        },
        draft: true,
      },
    });
  }

  async createGameStatlines(
    userId: number,
    gameId: number,
    activePlayers: number[]
  ) {
    const game = await this.prisma.games.findFirst({
      // userId authCheck
      where: {
        id: gameId,
        season: {
          team: {
            userId,
          },
        },
      },
    });

    if (!game) {
      throw new Error("Forbidden");
    }

    return this.prisma.$transaction(activePlayers.map((playerId) => this.prisma.gameStatlines.create({
      data: {
        gameId,
        playerId,
        twoPointFGMiss: 0,
        twoPointFGMake: 0,
        twoPointFGA: 0,
        threePointFGMiss: 0,
        threePointFGMake: 0,
        threePointFGA: 0,
        fTMiss: 0,
        fTMake: 0,
        fTA: 0,
        oReb: 0,
        dReb: 0,
        assist: 0,
        block: 0,
        steal: 0,
        turnover: 0,
        pF: 0,
        twoPointFGPercent: 0,
        threePointFGPercent: 0,
        fTPercent: 0,
        totalRebounds: 0,
        points: 0,
      },
    })));
  }

  async createShot(
    userId: number,
    gameStatlineId: number,
    make: boolean,
    X: number,
    Y: number,
    type: number,
    timeStamp: number,
  ) {
    const gameStatline = await this.prisma.gameStatlines.findFirst({
      // userId authCheck
      where: {
        id: gameStatlineId,
        game: {
          season: {
            team: {
              userId,
            },
          },
        },
      },
    });

    if (!gameStatline) {
      throw new Error("Forbidden");
    }
    return await this.prisma.shots.create({
      data: {
        userId,
        gameStatlineId,
        make,
        X,
        Y,
        type,
        timeStamp,
      },
    });
  }
}
