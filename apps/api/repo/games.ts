import type { PrismaClient } from "@prisma/client";

export class GameRepo {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(seasonId: number, opponent: string) {
    return await this.prisma.games.create({
      data: {
        seasonId,
        opponent,
      },
    });
  }
}