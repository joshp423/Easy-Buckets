import type { deleteSeason } from "../controllers/seasonController.js";
import type { SeasonRepo } from "../repo/seasons.js";
import type { configSchema } from "./config.js";

export type Season = {
  name: string;
  userId: number;
};

export class SeasonService {
  private config: configSchema;
  private seasonRepo: SeasonRepo;

  constructor(seasonRepo: SeasonRepo, config: configSchema) {
    this.seasonRepo = seasonRepo;
    this.config = config;
  }

  async createSeason({ name, userId }: Season) {
    return this.seasonRepo.create(name, userId);
  }

  async getSeasonGames(id: number, drafts: boolean) {
    return this.seasonRepo.getGames(id, drafts);
  }

  async editSeasonName(userId: number, seasonId: number, newSeasonName: string) {
    return this.seasonRepo.editSeasonName(userId, seasonId, newSeasonName);
  }

  async deleteSeason(userId: number, seasonId: number) {
    return this.seasonRepo.deleteSeason(userId, seasonId);
  }
}
