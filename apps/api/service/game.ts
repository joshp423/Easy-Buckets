import type { GameRepo } from "../repo/games.js";
import type { configSchema } from "./config.js";

export type Game = {
  seasonId: number;
  opponent: string;
  userId: number;
};

export class GameService {
  private config: configSchema;
  private gameRepo: GameRepo;

  constructor(gameRepo: GameRepo, config: configSchema) {
    this.gameRepo = gameRepo;
    this.config = config;
  }

  async create({ seasonId, opponent }: Game) {
    return this.gameRepo.create(seasonId, opponent);
  }

}