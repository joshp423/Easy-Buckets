import type { PrismaClient } from "@prisma/client";

export class TeamRepo {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(name: string, userId: number) {
    return await this.prisma.teams.create({
      data: {
        name,
        userId,
      },
    });
  }

  async getTeamSeasons(userId: number, sort: "asc" | "desc") {
    return await this.prisma.teams.findUnique({
      where: {
        userId: userId,
      },
      include: {
        seasons: {
          orderBy: {
            dateCreated: sort,
          },
        },
      },
    });
  }
}
