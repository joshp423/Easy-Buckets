import { Router } from "express";
import * as indexController from "../controllers/indexController.js";
import { signUp, logIn } from "../controllers/userController.js";
import { getTeamSeasons, createTeam } from "../controllers/teamController.js";
import { createGame } from "../controllers/gameController.js";
const indexRouter = Router();

indexRouter.post("/users/sign-up", signUp);
indexRouter.post("/users/log-in", logIn);
indexRouter.get("/teams/seasons", indexController.verifyToken, getTeamSeasons);
indexRouter.put("/teams/create", indexController.verifyToken, createTeam)
indexRouter.put("/games/create", indexController.verifyToken, createGame)
export default indexRouter;
