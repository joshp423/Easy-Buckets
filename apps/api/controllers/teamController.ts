import z from "zod";
import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { type AuthRequest } from "./indexController.js";
import { TeamService } from "../service/team.js";
import { TeamRepo } from "../repo/teams.js";
import prisma from "../lib/prisma.js";
import { config } from "../service/config.js";

const teamRepo = new TeamRepo(prisma);
const teamService = new TeamService(teamRepo, config);

const getTeamSeasonsSchema = z.object({
  userId: z.number(),
  orderBy: z.enum(["asc", "desc"]),
});

export async function getTeamSeasons(req: AuthRequest, res: Response) {
  const userId = req.user?.id;

  const { orderBy } = req.query;

  const { success, data, error } = getTeamSeasonsSchema.safeParse({
    userId,
    orderBy,
  });

  if (!success) {
    return res.status(400).json({
      errors: error,
    });
  }

  const teamSeasons = await teamService.getSeasons(data.userId, data.orderBy);

  if (!teamSeasons) {
    return res.status(500).json({
      message: "an unexpected error occured",
    });
  }

  return res.status(200).json(teamSeasons);
}

/*
prev issue: return res.json({ thing }) creates an object { thing } which is the shorthand syntax for: { thing: thing }, therefore
the rsp became: {teamSeasons: {id, name, seasons, etc}}, not what we wanted which is { id, name, seasons, etc }

solution was to strip the object we were creating in the .json() function call .json({}) so we didnt create a new object with a key
*/
