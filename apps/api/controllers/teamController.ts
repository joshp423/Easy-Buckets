import z from "zod";
import type { Request, Response, NextFunction } from "express";
import { type AuthRequest } from "./indexController.js";
import { TeamService } from "../service/team.js";
import { TeamRepo } from "../repo/teams.js";
import prisma from "../lib/prisma.js";
import { config } from "../service/config.js";
import { lengthErr } from "./indexController.js";

const teamRepo = new TeamRepo(prisma);
const teamService = new TeamService(teamRepo, config);

const getTeamSeasonsSchema = z.object({
  userId: z.number(),
  orderBy: z.enum(["asc", "desc"]),
});

const createTeamSchema = z.object({
  userId: z.number(),
  name: z
    .string()
    .trim()
    .max(25, { message: `Team name: ${lengthErr}` })
    .min(1, { message: `Team name: ${lengthErr}` }),
});

const getTeamPlayersSchema = z.object({
  userId: z.number(),
});

const createTeamPlayersSchema = z.object({
  userId: z.number(),
  players: z.array(
    z.object({
      name: z.string(),
      number: z.number(),
    }),
  ),
});

const editPlayerSchema = z.object({
  player: z.object({
    id: z.number(),
    name: z.string(),
    number: z.number()
  }),
  userId: z.number()
})

const deletePlayerSchema = z.object({
  userId: z.number(),
  playerID: z.number(),
})

export async function createTeam(req: AuthRequest, res: Response) {
  const userId = req.user?.id;

  const { name } = req.body;

  const { success, data, error } = createTeamSchema.safeParse({
    userId,
    name,
  });

  if (!success) {
    return res.status(400).json({
      errors: error.issues.map((issue) => issue.message),
    });
  }

  try {
    await teamService.create(data);
    return res.status(201).json({ message: "Team Creation Successful" });
  } catch (err) {
    return res.status(403).json({
      message: "an unexpected error occured",
    });
  }
}

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

export async function getTeamPlayers(req: AuthRequest, res: Response) {
  const userId = req.user?.id;

  const { success, data, error } = getTeamPlayersSchema.safeParse({
    userId,
  });

  if (!success) {
    return res.status(400).json({
      errors: error,
    });
  }

  const teamPlayers = await teamService.getPlayers(data.userId);

  if (!teamPlayers) {
    return res.status(500).json({
      message: "an unexpected error occured",
    });
  }

  return res.status(200).json(teamPlayers.players);
}

export async function createTeamPlayers(req: AuthRequest, res: Response) {
  const userId = req.user?.id;

  const { players } = req.body;

  const { success, data, error } = createTeamPlayersSchema.safeParse({
    userId,
    players,
  });

  if (!success) {
    return res.status(400).json({
      errors: error,
    });
  }

  try {
    await teamService.createTeamPlayers(data);
    return res.status(201).json({ message: "Player Creation Successful" });
  } catch (err) {
    return res.status(403).json({
      message: "an unexpected error occured",
    });
  }
}
/*
prev issue: return res.json({ thing }) creates an object { thing } which is the shorthand syntax for: { thing: thing }, therefore
the rsp became: {teamSeasons: {id, name, seasons, etc}}, not what we wanted which is { id, name, seasons, etc }

solution was to strip the object we were creating in the .json() function call .json({}) so we didnt create a new object with a key
*/

export async function editTeamPlayer(req: AuthRequest, res: Response) {
  const userId = req.user?.id;

  const { player } = req.body;

  const { success, data, error } = editPlayerSchema.safeParse({
    userId,
    player,
  });

  if (!success) {
    return res.status(400).json({
      errors: error,
    });
  }

  const updatedPlayer = await teamService.editTeamPlayer(data.userId, data.player);
  
    if (!updatedPlayer) {
      return res.status(403).json({
        message: "an unexpected error occured",
      });
    }
  
    return res.status(201).json(updatedPlayer);
}

export async function deleteTeamPlayer(req: AuthRequest, res: Response) {
  const userId = req.user?.id;
  const { playerId } = req.body;

  
  const { success, data, error } = deletePlayerSchema.safeParse({
    userId,
    playerId,
  });

  if (!success) {
    return res.status(400).json({
      errors: error,
    });
  }

  const deletedPlayer = await teamService.deleteTeamPlayer(data.userId, data.playerID);
  
    if (!deletedPlayer) {
      return res.status(403).json({
        message: "an unexpected error occured",
      });
    }
  
    return res.status(201).json(deletedPlayer);
}