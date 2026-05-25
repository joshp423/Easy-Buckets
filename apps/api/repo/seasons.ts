import type { PrismaClient } from "@prisma/client";

export class SeasonRepo {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(name: string, teamId: number) {
    return await this.prisma.seasons.create({
      data: {
        name,
        teamId,
      },
    });
  }
}
