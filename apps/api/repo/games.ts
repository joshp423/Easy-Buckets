import type { PrismaClient } from "@prisma/client";

export class GameRepo {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(seasonId: number, opponent: string, date: Date) {
    return await this.prisma.games.create({
      data: {
        seasonId,
        opponent,
        date,
      },
    });
  }

  async get(seasonId: number) {
    return await this.prisma.games.findMany({
      where: {
        seasonId
      },
      orderBy: {
        date: "desc"
      },
      include: {
        gameStatlines:{
          include: {
            shots: {}
          }
        },
      }
    });
  }

}