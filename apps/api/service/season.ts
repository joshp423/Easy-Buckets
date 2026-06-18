import type { SeasonRepo } from "../repo/seasons.js";
import type { configSchema } from "./config.js";

export type Season = {
  name: string;
  teamId: number;
};

export class SeasonService {
  private config: configSchema;
  private seasonRepo: SeasonRepo;

  constructor(seasonRepo: SeasonRepo, config: configSchema) {
    this.seasonRepo = seasonRepo;
    this.config = config;
  }

  async createSeason({ name, teamId }: Season) {
    return this.seasonRepo.create(name, teamId);
  }

  async getSeasonGames(id: number, draft: boolean) {
    return this.seasonRepo.getGames(id, draft);
  }
}
