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
  name: z
      .string()
      .trim()
      .max(25, { message: `Password: ${lengthErr}` })
      .min(1, { message: `Password: ${lengthErr}` }),
  teamId: z.number()
})

export async function createSeason(req: AuthRequest, res: Response) {
  const userId = req.user?.id;

  const { name } = req.body;

  const { success, data, error } = createSeasonSchema.safeParse({
    userId,
    name
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