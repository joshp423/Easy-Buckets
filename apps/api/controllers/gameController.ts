import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import z from "zod";
import prisma from "../lib/prisma.js";
import { config } from "../service/config.js";
import { GameRepo } from "../repo/games.js";
import { GameService } from "../service/game.js";
import { lengthErr, type AuthRequest } from "./indexController.js";

const gameRepo = new GameRepo(prisma);
const gameService = new GameService(gameRepo, config);

const createInitialGameSchema = z.object({
  userId: z.number(),
  seasonId: z.number(),
  opponent: z
    .string()
    .trim()
    .max(25, { message: `Team name: ${lengthErr}` })
    .min(1, { message: `Team name: ${lengthErr}` }),
  date: z.coerce.date(),
});

const replaySchema = z.object({
  gameId: z.number(),
  replay: z.url().trim(),
});

const createGameSchema = z.object({
  userId: z.number(),
  seasonId: z.number(),
  opponent: z
    .string()
    .trim()
    .max(25, { message: `Team name: ${lengthErr}` })
    .min(1, { message: `Team name: ${lengthErr}` }),
  date: z.coerce.date(),
  gameStats: z.array(
    z.object({
      playerId: z.number(),
      twoPointFGMiss: z.number(),
      twoPointFGMake: z.number(),
      twoPointFGA: z.number(),
      threePointFGMiss: z.number(),
      threePointFGMake: z.number(),
      threePointFGA: z.number(),
      fTMiss: z.number(),
      fTMake: z.number(),
      fTA: z.number(),
      oReb: z.number(),
      dReb: z.number(),
      assist: z.number(),
      block: z.number(),
      steal: z.number(),
      turnover: z.number(),
      pF: z.number(),
      twoPointFGPercent: z.number(),
      threePointFGPercent: z.number(),
      fTPercent: z.number(),
      totalRebounds: z.number(),
      points: z.number(),
      shots: z.array(
        z.object({
          make: z.boolean(),
          X: z.number(),
          Y: z.number(),
          type: z.number(),
        }),
      ),
    }),
  ),
});

const createGameStatLineSchema = z.object({
  userId: z.number(),
  gameId: z.number(),
  playerId: z.number(),
  twoPointFGMiss: z.number(),
  twoPointFGMake: z.number(),
  twoPointFGA: z.number(),
  threePointFGMiss: z.number(),
  threePointFGMake: z.number(),
  threePointFGA: z.number(),
  fTMiss: z.number(),
  fTMake: z.number(),
  fTA: z.number(),
  oReb: z.number(),
  dReb: z.number(),
  assist: z.number(),
  block: z.number(),
  steal: z.number(),
  turnover: z.number(),
  pF: z.number(),
  twoPointFGPercent: z.number(),
  threePointFGPercent: z.number(),
  fTPercent: z.number(),
  totalRebounds: z.number(),
  points: z.number(),
});

const createShotSchema = z.object({
  userId: z.number(),
  gameStatlineId: z.number(),
  make: z.boolean(),
  X: z.number(),
  Y: z.number(),
  type: z.number(),
  timeStamp: z.number(),
});

export async function createGame(req: AuthRequest, res: Response) {
  const userId = req.user?.id;

  const { seasonId, opponent, date } = req.body;

  const { success, data, error } = createInitialGameSchema.safeParse({
    userId,
    seasonId,
    opponent,
    date,
  });

  if (!success) {
    return res.status(400).json({
      errors: error.issues.map((issue) => issue.message),
    });
  }

  const game = await gameService.createGameInitial(data);

  if (!game) {
    return res.status(403).json({
      message: "an unexpected error occured",
    });
  }

  return res.status(201).json(game);
}

export async function addReplay(req: Request, res: Response) {
  const { gameId, replay } = req.body;

  const { success, data, error } = replaySchema.safeParse({
    gameId,
    replay,
  });

  if (!success) {
    return res.status(400).json({
      errors: error.issues.map((issue) => issue.message),
    });
  }

  try {
    await gameService.addReplay(data);

    return res.status(201).json({ message: "Game Creation Successful" });
  } catch (err) {
    return res.status(403).json({
      message: "an unexpected error occured",
    });
  }
}

export async function createGameStatLine(req: AuthRequest, res: Response) {
  const userId = req.user?.id;

  const {
    gameId,
    playerId,
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
    dReb,
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
  } = req.body;

  const { success, data, error } = createGameStatLineSchema.safeParse({
    userId,
    gameId,
    playerId,
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
    dReb,
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
  });

  if (!success) {
    return res.status(400).json({
      errors: error.issues.map((issue) => issue.message),
    });
  }

  const gameStatline = await gameService.createGameStatLine(data);

  if (!gameStatline) {
    return res.status(403).json({
      message: "an unexpected error occured",
    });
  }

  return res.status(201).json(gameStatline);
}

export async function createShot(req: AuthRequest, res: Response) {
  const userId = req.user?.id;

  const { gameStatlineId, make, X, Y, type, timeStamp } = req.body;

  const { success, data, error } = createShotSchema.safeParse({
    userId,
    gameStatlineId,
    make,
    X,
    Y,
    type,
    timeStamp,
  });

  if (!success) {
    return res.status(400).json({
      errors: error.issues.map((issue) => issue.message),
    });
  }

  const shot = await gameService.createShot(data);
  if (!shot) {
    return res.status(403).json({
      message: "an unexpected error occured",
    });
  }

  return res.status(201);
}
