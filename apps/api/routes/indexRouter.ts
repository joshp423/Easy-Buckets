import { Router } from "express";
import * as indexController from "../controllers/indexController.js";
import { signUp, logIn } from "../controllers/userController.js";
import {
  getTeamSeasons,
  createTeam,
  getTeamPlayers,
  createTeamPlayers,
} from "../controllers/teamController.js";
import { createGame, addReplay } from "../controllers/gameController.js";
import {
  createSeason,
  getSeasonGames,
} from "../controllers/seasonController.js";
const indexRouter = Router();

indexRouter.post("/users/sign-up", signUp);
indexRouter.post("/users/log-in", logIn);
indexRouter.get("/teams/seasons", indexController.verifyToken, getTeamSeasons);
indexRouter.post("/teams/create", indexController.verifyToken, createTeam);
indexRouter.post("/games/create", indexController.verifyToken, createGame);
indexRouter.put("/games/add-replay", indexController.verifyToken, addReplay);
indexRouter.post("/seasons/create", indexController.verifyToken, createSeason);
indexRouter.get(
  "/seasons/:id/games/",
  indexController.verifyToken,
  getSeasonGames,
);
indexRouter.get("/teams/players", indexController.verifyToken, getTeamPlayers);
indexRouter.post(
  "/teams/players/create",
  indexController.verifyToken,
  createTeamPlayers,
);
indexRouter.post("/games/shots/create", indexController.verifyToken, )

export default indexRouter;
