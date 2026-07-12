import type { Request, Response, NextFunction } from "express";
import z, { number } from "zod";
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

const getGameSchema = z.object({
  id: z.coerce.number(),
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

const createGameStatLinesSchema = z.object({
  userId: z.number(),
  gameId: z.number(),
  activePlayers: z.array(z.object({
    id: z.number(),
    name: z.string(),
    number: z.number()
  })),
});

const updateGameStatLineSchema = z.object({
  gameStatlineId: z.number(),
  userId: z.number(),
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

const deleteShotSchema = z.object({
  userId: z.number(),
  shotId: z.number(),
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

    return res.status(201).json({ message: "Replay Added Successfully" });
  } catch (err) {
    return res.status(403).json({
      message: "an unexpected error occured",
    });
  }
}

export async function getGame(req: Request, res: Response) {
  const { id } = req.params;

  const { success, data, error } = getGameSchema.safeParse({
    id,
  });

  if (!success) {
    return res.status(400).json({
      errors: error.issues.map((issue) => issue.message),
    });
  }

  const game = await gameService.getGame(data.id);

  if (!game) {
    return res.status(403).json({
      message: "an unexpected error occured",
    });
  }

  return res.status(200).json(game);
}

export async function createGameStatLines(req: AuthRequest, res: Response) {
  const userId = req.user?.id;

  const { gameId, activePlayers } = req.body;

  const { success, data, error } = createGameStatLinesSchema.safeParse({
    userId,
    gameId,
    activePlayers,
  });

  if (!success) {
    return res.status(400).json({
      errors: error.issues.map((issue) => issue.message),
    });
  }

  const gameStatlines = await gameService.createGameStatlines(data);

  if (!gameStatlines) {
    return res.status(403).json({
      message: "an unexpected error occured",
    });
  }

  return res.status(201).json(gameStatlines);
}

export async function updateGameStatline(req: AuthRequest, res: Response) {
  const userId = req.user?.id;

  const {
    gameStatlineId,
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
  } = req.body;

  const { success, data, error } = updateGameStatLineSchema.safeParse({
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
  });

  if (!success) {
    return res.status(400).json({
      errors: error.issues.map((issue) => issue.message),
    });
  }

  try {
    await gameService.updateGameStatline(data);

    return res.status(201).json({ message: "Stats Updated Successfully" });
  } catch (err) {
    return res.status(403).json({
      message: "an unexpected error occured",
    });
  }
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

  return res.status(201).json(shot);
}

export async function deleteShot(req: AuthRequest, res: Response) {
  const userId = req.user?.id;

  const { shotID } = req.body;

  const { success, data, error } = deleteShotSchema.safeParse({
    userId,
    shotID,
  });

  if (!success) {
    return res.status(400).json({
      errors: error.issues.map((issue) => issue.message),
    });
  }

  const deletedShot = await gameService.deleteShot(data.shotId, data.userId);

  if (!deletedShot) {
    return res.status(403).json({
      message: "an unexpected error occured",
    });
  }

  return res.status(201).json(deletedShot);
}
