import type { PrismaClient } from "@prisma/client";
import type { GameStatPlayer } from "../service/game.js";
import type { shotObject } from "../service/game.js";
import { id } from "zod/locales";
import type { deleteGame } from "../controllers/gameController.js";

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
          orderBy: {
            id: "desc",
          },
          include: {
            shots: true,
          },
        },
      },
    });
  }

  async getGame(id: number) {
    return await this.prisma.games.findUnique({
      where: {
        id,
      },
      include: {
        gameStatlines: {
          orderBy: {
            id: "desc",
          },
          include: {
            shots: true,
            player: {
              select: {
                id: true,
                name: true,
                number: true,
              },
            },
          },
        },
      },
    });
  }

  async createGameStatlines(
    userId: number,
    gameId: number,
    playerList: GameStatPlayer[],
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

    return this.prisma.$transaction(
      playerList.map((playerId) =>
        this.prisma.gameStatlines.create({
          data: {
            gameId,
            playerId: playerId.id,
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
        }),
      ),
    );
  }

  async updateGameStatline(
    userId: number,
    gameStatlineId: number,
    statlineUpdateField: string,
    statlineUpdateIndicator: boolean,
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

    const statAmount = statlineUpdateIndicator ? 1 : -1;

    function roundTo(value: number, decimals: number): number {
      return Number(value.toFixed(decimals));
    }

    switch (statlineUpdateField) {
      case "2P Make": {
        const newMakes = gameStatline.twoPointFGMake + statAmount;
        const newAttempts = gameStatline.twoPointFGA + statAmount;
        const pointsUpdateAmount = statlineUpdateIndicator ? 2 : -2;
        const updatedStatline = await this.prisma.gameStatlines.update({
          where: {
            id: gameStatlineId,
          },
          data: {
            twoPointFGMake: newMakes,
            twoPointFGA: newAttempts,
            twoPointFGPercent:
              newAttempts === 0
                ? 0
                : roundTo((newMakes / newAttempts) * 100, 1),
            points: gameStatline.points + pointsUpdateAmount,
          },
        });
        return updatedStatline;
      }

      case "2P Miss": {
        const newMiss = gameStatline.twoPointFGMiss + statAmount;
        const newAttempts = gameStatline.twoPointFGA + statAmount;
        const updatedStatline = await this.prisma.gameStatlines.update({
          where: {
            id: gameStatlineId,
          },
          data: {
            twoPointFGMiss: newMiss,
            twoPointFGA: newAttempts,
            twoPointFGPercent:
              newAttempts === 0
                ? 0
                : (gameStatline.twoPointFGMake / newAttempts) * 100,
          },
        });
        return updatedStatline;
      }

      case "3P Make": {
        const newMakes = gameStatline.threePointFGMake + statAmount;
        const newAttempts = gameStatline.threePointFGA + statAmount;
        const pointsUpdateAmount = statlineUpdateIndicator ? 3 : -3;
        const updatedStatline = await this.prisma.gameStatlines.update({
          where: {
            id: gameStatlineId,
          },
          data: {
            threePointFGMake: newMakes,
            threePointFGA: newAttempts,
            threePointFGPercent:
              newAttempts === 0 ? 0 : (newMakes / newAttempts) * 100,
            points: gameStatline.points + pointsUpdateAmount,
          },
        });
        return updatedStatline;
      }

      case "3P Miss": {
        const newMiss = gameStatline.threePointFGMiss + statAmount;
        const newAttempts = gameStatline.threePointFGA + statAmount;
        const updatedStatline = await this.prisma.gameStatlines.update({
          where: {
            id: gameStatlineId,
          },
          data: {
            threePointFGMiss: newMiss,
            threePointFGA: newAttempts,
            threePointFGPercent:
              newAttempts === 0
                ? 0
                : (gameStatline.twoPointFGMake / newAttempts) * 100,
          },
        });
        return updatedStatline;
      }

      case "FT Make": {
        const newMakes = gameStatline.fTMake + statAmount;
        const newAttempts = gameStatline.fTA + statAmount;
        const updatedStatline = await this.prisma.gameStatlines.update({
          where: {
            id: gameStatlineId,
          },
          data: {
            fTMake: newMakes,
            fTA: newAttempts,
            fTPercent: newMakes === 0 ? 0 : (newMakes / newAttempts) * 100,
          },
        });
        return updatedStatline;
      }

      case "FT Miss": {
        const newMiss = gameStatline.threePointFGMiss + statAmount;
        const newAttempts = gameStatline.threePointFGA + statAmount;
        const updatedStatline = await this.prisma.gameStatlines.update({
          where: { id: gameStatlineId },
          data: {
            fTMiss: newMiss,
            fTA: newAttempts,
            fTPercent:
              newAttempts === 0 ? 0 : (gameStatline.fTMake / newAttempts) * 100,
          },
        });
        return updatedStatline;
      }

      case "O-Reb": {
        const updatedStatline = await this.prisma.gameStatlines.update({
          where: { id: gameStatlineId },
          data: {
            oReb: gameStatline.oReb + statAmount,
            totalRebounds: gameStatline.totalRebounds + statAmount,
          },
        });
        return updatedStatline;
      }

      case "D-Reb": {
        const updatedStatline = await this.prisma.gameStatlines.update({
          where: { id: gameStatlineId },
          data: {
            dReb: gameStatline.dReb + statAmount,
            totalRebounds: gameStatline.totalRebounds + statAmount,
          },
        });
        return updatedStatline;
      }

      case "Assist": {
        const updatedStatline = await this.prisma.gameStatlines.update({
          where: { id: gameStatlineId },
          data: { assist: gameStatline.assist + statAmount },
        });
        return updatedStatline;
      }

      case "Block": {
        const updatedStatline = await this.prisma.gameStatlines.update({
          where: { id: gameStatlineId },
          data: { block: gameStatline.block + statAmount },
        });
        return updatedStatline;
      }

      case "Steal": {
        const updatedStatline = await this.prisma.gameStatlines.update({
          where: { id: gameStatlineId },
          data: { steal: gameStatline.steal + statAmount },
        });
        return updatedStatline;
      }

      case "TO": {
        const updatedStatline = await this.prisma.gameStatlines.update({
          where: { id: gameStatlineId },
          data: { turnover: gameStatline.turnover + statAmount },
        });
        return updatedStatline;
      }

      case "Foul": {
        const updatedStatline = await this.prisma.gameStatlines.update({
          where: { id: gameStatlineId },
          data: { pF: gameStatline.pF + statAmount },
        });
        return updatedStatline;
      }
    }
  }

  // async updateGameStatline(
  //   gameStatlineId: number,
  //   userId: number,
  //   twoPointFGMiss: number,
  //   twoPointFGMake: number,
  //   twoPointFGA: number,
  //   threePointFGMiss: number,
  //   threePointFGMake: number,
  //   threePointFGA: number,
  //   fTMiss: number,
  //   fTMake: number,
  //   fTA: number,
  //   oReb: number,
  //   assist: number,
  //   block: number,
  //   steal: number,
  //   turnover: number,
  //   pF: number,
  //   twoPointFGPercent: number,
  //   threePointFGPercent: number,
  //   fTPercent: number,
  //   totalRebounds: number,
  //   points: number,
  // ) {
  //   const gameStatline = await this.prisma.gameStatlines.findFirst({
  //     // userId authCheck
  //     where: {
  //       id: gameStatlineId,
  //       game: {
  //         season: {
  //           team: {
  //             userId,
  //           },
  //         },
  //       },
  //     },
  //   });

  //   if (!gameStatline) {
  //     throw new Error("Forbidden");
  //   }

  //   return await this.prisma.gameStatlines.update({
  //     where: { id: gameStatlineId },
  //     data: {
  //       gameStatlineId,
  //       userId,
  //       twoPointFGMiss,
  //       twoPointFGMake,
  //       twoPointFGA,
  //       threePointFGMiss,
  //       threePointFGMake,
  //       threePointFGA,
  //       fTMiss,
  //       fTMake,
  //       fTA,
  //       oReb,
  //       assist,
  //       block,
  //       steal,
  //       turnover,
  //       pF,
  //       twoPointFGPercent,
  //       threePointFGPercent,
  //       fTPercent,
  //       totalRebounds,
  //       points,
  //     },
  //   });
  // }

  async createShot(userId: number, gameStatlineId: number, shot: shotObject) {
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
        gameStatlineId,
        make: shot.make,
        X: shot.X,
        Y: shot.Y,
        type: shot.type,
        timeStamp: shot.timeStamp,
      },
    });
  }

  async deleteShot(userId: number, shotId: number) {
    const shot = await this.prisma.shots.findUnique({
      // userId authCheck
      where: {
        id: shotId,
        gameStatline: {
          game: {
            season: {
              team: {
                userId,
              },
            },
          },
        },
      },
    });

    if (!shot) {
      throw new Error("Forbidden");
    }
    return await this.prisma.shots.delete({
      where: {
        id: shotId,
      },
    });
  }

  async getShotLog(userId: number, gameId: number) {
    const game = await this.prisma.games.findUnique({
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

    return await this.prisma.shots.findMany({
      where: {
        gameStatline: {
          game: {
            id: gameId,
          },
        },
      },
      include: {
        gameStatline: {
          select: {
            player: {
              select: {
                name: true,
                number: true,
              },
            },
          },
        },
      },

      orderBy: { id: "desc" },
    });
  }

  async publishGame(userId: number, gameId: number) {
    const gameAuthCheck = await this.prisma.games.findUnique({
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

    if (!gameAuthCheck) {
      throw new Error("Forbidden");
    }

    return await this.prisma.games.update({
      where: { id: gameAuthCheck.id },
      data: { draft: false },
    });
  }

  async deleteGame(userId: number, gameId: number) {
    const gameAuthCheck = await this.prisma.games.findUnique({
      where: {
        id: gameId,
        season: {
          team: {
            userId,
          },
        },
      },
    });

    if (!gameAuthCheck) {
      throw new Error("Forbidden");
    }

    return await this.prisma.games.delete({
      where: {
        id: gameId,
      },
    });
  }
}
