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

  async getGames(id: number, drafts: boolean) {
    return await this.prisma.seasons.findUnique({
      where: {
        id,
      },
      include: {
        games: {
          where: {
            draft: drafts,
          },
          include: {
            gameStatlines: {
              orderBy: { 
                id: "desc"
              },
              include: {
                player: {
                  select: {
                    id: true,
                    name: true,
                    number: true,
                  },
                },
                shots: true,
                
              },
            },
          },
        },
      },
    });
  }
}
