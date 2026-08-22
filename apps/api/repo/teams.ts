import type { PrismaClient } from "@prisma/client";
import type { EditPlayer, Player } from "../service/team.js";

export class TeamRepo {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createTeam(name: string, userId: number) {
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
        userId,
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

  async getTeamPlayers(userId: number) {
    return await this.prisma.teams.findUnique({
      where: {
        userId,
      },
      include: {
        players: {
          select: {
            id: true,
            name: true,
            number: true,
          },
        },
      },
    });
  }

  async createTeamPlayers(userId: number, players: Player[]) {
    const team = await this.prisma.teams.findUnique({
      where: {
        userId,
      },
      select: { id: true },
    });

    if (!team?.id) throw new Error("An unknown error occurred");

    return await this.prisma.players.createMany({
      data: players.map((player) => ({
        name: player.name,
        number: player.number,
        teamId: team.id,
      })),
    });
  }

  async editTeamPlayer(userId: number, player: EditPlayer) {
    const updatedPlayer = await this.prisma.players.update({
      where: {
        team: {
          userId,
        },
        id: player.id,
      },
      data: {
        name: player.name,
        number: player.number,
      },
    });
    return updatedPlayer;
  }

  async deleteTeamPlayer(userId: number, playerId: number) {
    // use auth check to avoid deleting too many records
    const authPlayerCheck = await this.prisma.players.findUnique({
      where: {
        id: playerId,
      },
    });

    if (!authPlayerCheck) {
      throw new Error("Forbidden");
    }

    await this.prisma.shots.deleteMany({
      where: {
        gameStatline: {
          playerId,
        },
      },
    });

    await this.prisma.gameStatlines.deleteMany({
      where: {
        playerId,
      },
    });

    const deletedPlayer = await this.prisma.players.delete({
      where: {
        id: playerId,
      },
    });

    return deletedPlayer;
  }
}
