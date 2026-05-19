import { Router } from "express";
import * as indexController from "../controllers/indexController.js";
import { signUp, logIn } from "../controllers/userController.js";
const indexRouter = Router();

indexRouter.post("/users/sign-up", signUp);
indexRouter.post("/users/log-in", logIn);
indexRouter.get("/teams/", ) 
//make amount of seasons and sorting something that FE can request eg GET /teams/seasons?limit=:amount&sort=:sort

export default indexRouter;
