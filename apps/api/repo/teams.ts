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

  async getTeamSeasons(userId: number, amount: number, sort: "asc" | "desc") {

    if (amount === 0) {
      return await this.prisma.teams.findMany({
        where: {
          userId: userId
        },
        include: {
          seasons: {
            orderBy: {
              dateCreated: sort
            },
          }
        }
      })
    }
    
    return await this.prisma.teams.findMany({
      where: {
        userId: userId
      },
      include: {
        seasons: {
          take: amount,
          orderBy: {
            dateCreated: sort
          },
        }
      }
    })
  }
}
