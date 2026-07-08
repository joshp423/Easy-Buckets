import type { GameRepo } from "../repo/games.js";
import type { configSchema } from "./config.js";

export type Game = {
  seasonId: number;
  opponent: string;
  userId: number;
  date: Date;
};

export type GameStats = {
  userId: number;
  gameId: number;
  activePlayers: number[];
};

export type Shot = {
  userId: number;
  gameStatlineId: number;
  make: boolean;
  X: number;
  Y: number;
  type: number;
  timeStamp: number;
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

  async createGameStatLines({
    userId,
    gameId,
    activePlayers
  }: GameStats) {
    return this.gameRepo.createGameStatlines(
      userId,
      gameId,
      activePlayers
    );
  }

  async createShot({
    userId,
    gameStatlineId,
    make,
    X,
    Y,
    type,
    timeStamp,
  }: Shot) {
    return this.gameRepo.createShot(
      userId,
      gameStatlineId,
      make,
      X,
      Y,
      type,
      timeStamp,
    );
  }

  // async deleteShot({});
}
