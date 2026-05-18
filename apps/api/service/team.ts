import type { TeamRepo } from "../repo/teams.js";
import type { configSchema } from "./config.js";

export type Team = { name: string; userId: number };

export class TeamService {
  private config: configSchema;
  private teamRepo: TeamRepo;

  constructor(teamRepo: TeamRepo, config: configSchema) {
    this.teamRepo = teamRepo;
    this.config = config;
  }

  async create({ name, userId }: Team) {
    return this.teamRepo.create(name, userId);
  }
}
