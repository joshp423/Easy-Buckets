import z from "zod";
import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { lengthErr } from "./indexController.js";
import { SeasonRepo } from "../repo/seasons.js";
import { SeasonService } from "../service/season.js";
import { config } from "../service/config.js";
import prisma from "../lib/prisma.js";

const seasonRepo = new SeasonRepo(prisma);
const seasonService = new SeasonService(seasonRepo, config);

export interface AuthRequest extends Request {
  token?: string;
  user?: JwtPayload;
}

const createSeasonSchema = z.object({
  seasonName: z
    .string()
    .trim()
    .max(25, { message: `Password: ${lengthErr}` })
    .min(1, { message: `Password: ${lengthErr}` }),
  userId: z.number(),
});

const getSeasonGamesSchema = z.object({
  id: z.coerce.number(),
  drafts: z.enum(["true", "false"]).transform((v) => v === "true"), //enum checks if it is one of the values in array,
  //then compared to true
});

const editSeasonNameSchema = z.object({
  userId: z.number(),
  seasonId: z.coerce.number(),
  newSeasonName: z.string(),
});

const deleteSeasonSchema = z.object({
  userId: z.number(),
  seasonId: z.coerce.number(),
});

export async function createSeason(req: AuthRequest, res: Response) {
  const userId = req.user?.id;

  const { seasonName } = req.body;

  const { success, data, error } = createSeasonSchema.safeParse({
    seasonName,
    userId,
  });

  if (!success) {
    return res.status(400).json({
      errors: error.issues.map((issue) => issue.message),
    });
  }

  try {
    await seasonService.createSeason(data);
    return res.status(201).json({ message: "Season Creation Successful" });
  } catch (err) {
    return res.status(403).json({
      message: "an unexpected error occured",
    });
  }
}

export async function getSeasonGames(req: Request, res: Response) {
  const { id } = req.params;

  const { drafts } = req.query;

  const { success, data, error } = getSeasonGamesSchema.safeParse({
    id,
    drafts,
  });

  if (!success) {
    return res.status(400).json({
      errors: error.issues.map((issue) => issue.message),
    });
  }

  const seasonData = await seasonService.getSeasonGames(data.id, data.drafts);

  if (!seasonData) {
    return res.status(500).json({
      message: "an unexpected error occured",
    });
  }

  return res.status(200).json({ seasonData });
}

export async function editSeasonName(req: AuthRequest, res: Response) {
  const userId = req.user?.id;
  const { seasonId } = req.params;
  const { newSeasonName } = req.body;

  const { success, data, error } = editSeasonNameSchema.safeParse({
    userId,
    seasonId,
    newSeasonName,
  });

  if (!success) {
    return res.status(400).json({
      errors: error.issues.map((issue) => issue.message),
    });
  }

  const updatedSeasonName = await seasonService.editSeasonName(
    data.userId,
    data.seasonId,
    data.newSeasonName,
  );

  if (!updatedSeasonName) {
    return res.status(500).json({
      message: "an unexpected error occured",
    });
  }

  return res.status(200).json({ updatedSeasonName });
}

export async function deleteSeason(req: AuthRequest, res: Response) {
  const userId = req.user?.id;
  const { seasonId } = req.params;

  const { success, data, error } = deleteSeasonSchema.safeParse({
    userId,
    seasonId,
  });

  if (!success) {
    return res.status(400).json({
      errors: error.issues.map((issue) => issue.message),
    });
  }

  const deletedSeason = await seasonService.deleteSeason(
    data.userId,
    data.seasonId,
  );

  if (!deletedSeason) {
    return res.status(500).json({
      message: "an unexpected error occured",
    });
  }

  return res.status(200).json({ deletedSeason });
}
