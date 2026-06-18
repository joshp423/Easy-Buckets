import type { GameRepo } from "../repo/games.js";
import type { configSchema } from "./config.js";

export type Game = {
  seasonId: number;
  opponent: string;
  userId: number;
  date: Date;
};

export type GameStats = {
  playerId: number;
  twoPointFGMiss: number;
  twoPointFGMake: number;
  twoPointFGA: number;
  threePointFGMiss: number;
  threePointFGMake: number;
  threePointFGA: number;
  fTMiss: number;
  fTMake: number;
  fTA: number;
  oReb: number;
  dReb: number;
  assist: number;
  block: number;
  steal: number;
  turnover: number;
  pF: number;
  twoPointFGPercent: number;
  threePointFGPercent: number;
  fTPercent: number;
  totalRebounds: number;
  points: number;
  shots: Shot[];
};

export type Shot = {
  make: boolean;
  X: number;
  Y: number;
  type: number;
};

type Replay = {
  gameId: number;
  replay: string;
};

export class GameService {
  private config: configSchema;
  private gameRepo: GameRepo;

  constructor(gameRepo: GameRepo, config: configSchema) {
    this.gameRepo = gameRepo;
    this.config = config;
  }

  // async createGame({ seasonId, opponent, date, gameStats }: Game) {
  //   return this.gameRepo.create(seasonId, opponent, date, gameStats);
  // }

  async createGameInitial({ userId, seasonId, opponent, date }: Game) {
    return this.gameRepo.createInitial(userId, seasonId, opponent, date);
  }

  async addReplay({ gameId, replay }: Replay) {
    return this.gameRepo.addReplay(gameId, replay);
  }
}
