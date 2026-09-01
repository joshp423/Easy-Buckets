import { Router } from "express";
import * as indexController from "../controllers/indexController.js";
import { signUp, logIn, checkUserTeam } from "../controllers/userController.js";
import {
  getTeamSeasons,
  createTeam,
  getTeamPlayers,
  createTeamPlayers,
  editTeamPlayer,
  deleteTeamPlayer,
} from "../controllers/teamController.js";
import {
  createGame,
  addReplay,
  createGameStatLines,
  createShot,
  updateGameStatline,
  deleteShot,
  getGame,
  getGameShots,
  publishGame,
  deleteGame,
} from "../controllers/gameController.js";
import {
  createSeason,
  deleteSeason,
  editSeasonName,
  getSeasonGames,
} from "../controllers/seasonController.js";
const indexRouter = Router();

//what if someone completes initial gameupdate then not players? Think upload has to be at player lock in.

indexRouter.post("/users/sign-up", signUp);
indexRouter.post("/users/log-in", logIn);
indexRouter.get("/teams/seasons", indexController.verifyToken, getTeamSeasons);
indexRouter.post("/teams/create", indexController.verifyToken, createTeam);
indexRouter.post("/games/create", indexController.verifyToken, createGame);
indexRouter.put("/games/add-replay", indexController.verifyToken, addReplay);
indexRouter.get("/games/:id", indexController.verifyToken, getGame);
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
indexRouter.post(
  "/games/gameStatlines/create",
  indexController.verifyToken,
  createGameStatLines,
);
indexRouter.put(
  "/games/gameStatlines/update",
  indexController.verifyToken,
  updateGameStatline,
);
indexRouter.post(
  "/games/shots/create",
  indexController.verifyToken,
  createShot,
);
indexRouter.delete(
  "/games/shots/:shotId",
  indexController.verifyToken,
  deleteShot,
);
indexRouter.get(
  "/games/:gameId/shots",
  indexController.verifyToken,
  getGameShots,
);
indexRouter.put(
  "/games/:gameId/publish",
  indexController.verifyToken,
  publishGame,
);
indexRouter.put(
  "/teams/players/edit",
  indexController.verifyToken,
  editTeamPlayer,
);
indexRouter.delete(
  "/teams/players/delete",
  indexController.verifyToken,
  deleteTeamPlayer,
);
indexRouter.delete(
  "/games/:gameId/delete",
  indexController.verifyToken,
  deleteGame,
);
indexRouter.put(
  "/seasons/:seasonId/update/name",
  indexController.verifyToken,
  editSeasonName,
);
indexRouter.delete(
  "/seasons/:seasonId/delete",
  indexController.verifyToken,
  deleteSeason,
);
indexRouter.get("/users/team", indexController.verifyToken, checkUserTeam);

export default indexRouter;
