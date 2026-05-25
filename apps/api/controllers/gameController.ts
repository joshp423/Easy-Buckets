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

const createGameSchema = z.object({
  userId: z.number(),
  seasonId: z.number(),
  opponent: z.string()
    .trim()
    .max(25, { message: `Team name: ${lengthErr}` })
    .min(1, { message: `Team name: ${lengthErr}` }),
  date: z.coerce.date(),
  gameStats: z.array(z.object({
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
    shots: z.array(z.object({
        make: z.boolean(),
        X: z.number(),
        Y: z.number(),
        type: z.number(),
    }))
  })),
})

export async function createGame(req: AuthRequest, res: Response) {
    const userId = req.user?.id;

    const { seasonId, opponent, date, gameStats } = req.body;

    const { success, data, error } = createGameSchema.safeParse({
        userId,
        seasonId,
        opponent,
        date,
        gameStats,
  });

  if (!success) {
    return res.status(400).json({
      errors: error.issues.map((issue) => issue.message),
    });
  }

  try {
    await gameService.createGame(data);

    return res.status(201).json({ message: "Game Creation Successful" });
  } catch (err) {
    return res.status(403).json({
      message: "an unexpected error occured",
    });
  }
}