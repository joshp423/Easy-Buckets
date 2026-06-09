import { Router } from "express";
import * as indexController from "../controllers/indexController.js";
import { signUp, logIn } from "../controllers/userController.js";
import { getTeamSeasons, createTeam, getTeamPlayers, createTeamPlayers } from "../controllers/teamController.js";
import { createGame } from "../controllers/gameController.js";
import {
  createSeason,
  getSeasonGames,
} from "../controllers/seasonController.js";
const indexRouter = Router();

indexRouter.post("/users/sign-up", signUp);
indexRouter.post("/users/log-in", logIn);
indexRouter.get("/teams/seasons", indexController.verifyToken, getTeamSeasons);
indexRouter.put("/teams/create", indexController.verifyToken, createTeam);
indexRouter.put("/games/create", indexController.verifyToken, createGame);
indexRouter.put("/seasons/create", indexController.verifyToken, createSeason);
indexRouter.get(
  "/seasons/:id/games",
  indexController.verifyToken,
  getSeasonGames,
);
indexRouter.get("/teams/players", indexController.verifyToken, getTeamPlayers)
indexRouter.put("/teams/players/create", indexController.verifyToken, createTeamPlayers)

export default indexRouter;