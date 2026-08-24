import type { PrismaClient } from "@prisma/client";
import { deleteSeason } from "../controllers/seasonController.js";

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
                id: "desc",
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

  async editSeasonName(userId: number, seasonId: number, newSeasonName: string) {

    const authCheckSeason = await this.prisma.seasons.findUnique({
      where: {
        id: seasonId, 
        team: {
          userId
        }
      }
    })

    if (!authCheckSeason) {
      throw new Error("Forbidden");
    }

    const updatedSeasonName = await this.prisma.seasons.update({
      where: {
        id: seasonId
      },
      data: {
        name: newSeasonName
      }
    })

    return updatedSeasonName.name;
  }

  async deleteSeason(userId: number, seasonId: number) {
    //combining authcheck for this one

    const deletedSeason = await this.prisma.seasons.delete({
      where: {
        team: {
          userId
        },
        id: seasonId
      }
    })
    return deletedSeason;
  }
}
