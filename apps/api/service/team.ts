import type { TeamRepo } from "../repo/teams.js";
import type { configSchema } from "./config.js";

export type Team = {
  name: string;
  userId: number;
};

export type Player = {
  name: string;
  number: number;
};

export type TeamPlayers = {
  userId: number;
  players: Player[];
};

export type EditPlayer = {
  name: string;
  number: number;
  id: number;
};

export class TeamService {
  private config: configSchema;
  private teamRepo: TeamRepo;

  constructor(teamRepo: TeamRepo, config: configSchema) {
    this.teamRepo = teamRepo;
    this.config = config;
  }

  async create({ name, userId }: Team) {
    return this.teamRepo.createTeam(name, userId);
  }

  async getSeasons(userId: number, sort: "asc" | "desc") {
    return this.teamRepo.getTeamSeasons(userId, sort);
  }

  async getPlayers(userId: number) {
    return this.teamRepo.getTeamPlayers(userId);
  }

  async createTeamPlayers({ userId, players }: TeamPlayers) {
    return this.teamRepo.createTeamPlayers(userId, players);
  }

  async editTeamPlayer(userId: number, player: EditPlayer) {
    return this.teamRepo.editTeamPlayer(userId, player);
  }

  async deleteTeamPlayer(userId: number, playerId: number) {
    return this.teamRepo.deleteTeamPlayer(userId, playerId);
  }
}
