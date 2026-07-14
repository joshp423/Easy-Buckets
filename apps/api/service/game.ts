import type { GameRepo } from "../repo/games.js";
import type { configSchema } from "./config.js";

export type Game = {
  seasonId: number;
  opponent: string;
  userId: number;
  date: Date;
};

export type GameStatsInitial = {
  userId: number;
  gameId: number;
  playerList: GameStatPlayer[];
};

export type GameStats = {
  gameStatlineId: number;
  userId: number;
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
};

export type Shot = {
  userId: number;
  gameStatlineId: number;
  shot: shotObject;
};

type Replay = {
  gameId: number;
  replay: string;
};

export type GameStatPlayer = {
  id: number;
  name: string;
  number: number;
}

export type shotObject = {
  make: boolean;
  X: number;
  Y: number;
  type: number;
  timeStamp: number;
}

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

  async getGame(id: number) {
    return this.gameRepo.getGame(id);
  }

  async createGameStatlines({
    userId,
    gameId,
    playerList,
  }: GameStatsInitial) {
    return this.gameRepo.createGameStatlines(userId, gameId, playerList);
  }

  async updateGameStatline({
    gameStatlineId,
    userId,
    twoPointFGMiss,
    twoPointFGMake,
    twoPointFGA,
    threePointFGMiss,
    threePointFGMake,
    threePointFGA,
    fTMiss,
    fTMake,
    fTA,
    oReb,
    assist,
    block,
    steal,
    turnover,
    pF,
    twoPointFGPercent,
    threePointFGPercent,
    fTPercent,
    totalRebounds,
    points,
  }: GameStats) {
    return this.gameRepo.updateGameStatline(
      gameStatlineId,
      userId,
      twoPointFGMiss,
      twoPointFGMake,
      twoPointFGA,
      threePointFGMiss,
      threePointFGMake,
      threePointFGA,
      fTMiss,
      fTMake,
      fTA,
      oReb,
      assist,
      block,
      steal,
      turnover,
      pF,
      twoPointFGPercent,
      threePointFGPercent,
      fTPercent,
      totalRebounds,
      points,
    );
  }

  async createShot({
    userId,
    gameStatlineId,
    shot
  }: Shot) {
    return this.gameRepo.createShot(
      userId,
      gameStatlineId,
      shot
    );
  }

  async deleteShot(userId: number, shotId: number) {
    return this.gameRepo.deleteShot(userId, shotId);
  }
}
