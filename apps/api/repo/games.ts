import type { PrismaClient } from "@prisma/client";
import { type GameStats } from "../service/game.js";

export class GameRepo {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createInitial(seasonId: number, opponent: string, date: Date) {
    return this.prisma.games.create({
      data: {
        seasonId,
        opponent,
        date,
        draft: true,
      },
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
}
