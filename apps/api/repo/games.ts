import type { PrismaClient } from "@prisma/client";
import type { GameStatPlayer } from "../service/game.js";
import type { shotObject } from "../service/game.js";

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

    switch(statlineUpdateField) {
      case "2P Make": {
        const pointsUpdateAmount = statlineUpdateIndicator ? 2 : -2;
        const updatedStatline = await this.prisma.gameStatlines.update({
          where: {
            id: gameStatlineId
          },
          data: {
            twoPointFGMake: gameStatline.twoPointFGMake + statAmount,
            twoPointFGA: gameStatline.twoPointFGA + statAmount,
            twoPointFGPercent: Math.round((gameStatline.twoPointFGMake / gameStatline.twoPointFGA) * 100),
            points: gameStatline.points + pointsUpdateAmount
          }
        })
        return updatedStatline
      }
        
      case "2P Miss": {
        const updatedStatline = await this.prisma.gameStatlines.update({
          where: {
            id: gameStatlineId
          },
          data: {
            twoPointFGMiss: gameStatline.twoPointFGMiss + statAmount,
            twoPointFGA: gameStatline.twoPointFGA + statAmount,
            twoPointFGPercent: Math.round((gameStatline.twoPointFGMake / gameStatline.twoPointFGA) * 100),
          }
        })
        return updatedStatline
      }

      case "3P Make": {
        const pointsUpdateAmount = statlineUpdateIndicator ? 3 : -3;
        const updatedStatline = await this.prisma.gameStatlines.update({
          where: {
            id: gameStatlineId
          },
          data: {
            threePointFGMake: gameStatline.threePointFGMake + statAmount,
            threePointFGA: gameStatline.threePointFGA + statAmount,
            threePointFGPercent: Math.round((gameStatline.threePointFGMake / gameStatline.threePointFGA) * 100),
            pointspoints: gameStatline.points + pointsUpdateAmount
          }
        })
        return updatedStatline
      }

      case "3P Miss": {
        const updatedStatline = await this.prisma.gameStatlines.update({
          where: {
            id: gameStatlineId
          },
          data: {
            threePointFGMiss: gameStatline.threePointFGMiss + statAmount,
            threePointFGA: gameStatline.threePointFGA + statAmount,
            threePointFGPercent: Math.round((gameStatline.threePointFGMake / gameStatline.threePointFGA) * 100),
          }
        })
        return updatedStatline
      }

      case "FT Make": {
        const updatedStatline = await this.prisma.gameStatlines.update({
          where: {
            id: gameStatlineId
          },
          data: {
            fTMake: gameStatline.fTMake + statAmount,
            fTA: gameStatline.fTA + statAmount,
            fTPercent: Math.round((gameStatline.fTMake / gameStatline.fTA) * 100),
          }
        })
        return updatedStatline
      }

      case "FT Miss": {
        const updatedStatline = await this.prisma.gameStatlines.update({
          where: { id: gameStatlineId },
          data: {
            fTMiss: gameStatline.fTMiss + statAmount,
            fTA: gameStatline.fTMiss + statAmount,
            fTPercent: Math.round((gameStatline.fTMake / gameStatline.fTA) * 100),
          }
        })
        return updatedStatline
      }

      case "oReb": {
        const updatedStatline = await this.prisma.gameStatlines.update({
          where: { id: gameStatlineId },
          data: {
            oReb: gameStatline.oReb + statAmount, 
            totalRebounds: gameStatline.totalRebounds + statAmount
          }
        })
        return updatedStatline
      }

      case "dReb": {
        const updatedStatline = await this.prisma.gameStatlines.update({
          where: { id: gameStatlineId },
          data: {
            dReb: gameStatline.dReb + statAmount,
            totalRebounds: gameStatline.totalRebounds + statAmount
          }
        })
        return updatedStatline
      }
    
      case "assist": {
        const updatedStatline = await this.prisma.gameStatlines.update({
          where: { id: gameStatlineId },
          data: { dReb: gameStatline.assist + statAmount }
        })
        return updatedStatline
      }

      case "block": {
        const updatedStatline = await this.prisma.gameStatlines.update({
          where: { id: gameStatlineId },
          data: { dReb: gameStatline.block + statAmount }
        })
        return updatedStatline
      }

      case "steal": {
        const updatedStatline = await this.prisma.gameStatlines.update({
          where: { id: gameStatlineId },
          data: { dReb: gameStatline.steal + statAmount }
        })
        return updatedStatline
      }

      case "turnover": {
        const updatedStatline = await this.prisma.gameStatlines.update({
          where: { id: gameStatlineId },
          data: { dReb: gameStatline.turnover + statAmount }
        })
        return updatedStatline
      }

      case "pf": {
        const updatedStatline = await this.prisma.gameStatlines.update({
          where: { id: gameStatlineId },
          data: { dReb: gameStatline.pF + statAmount }
        })
        return updatedStatline
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
    return await this.prisma.shots.delete({
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
  }
}
