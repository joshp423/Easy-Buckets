import { Router } from "express";
import * as indexController from "../controllers/indexController.js";
import { signUp, logIn } from "../controllers/userController.js";
const indexRouter = Router();

indexRouter.post("/users/sign-up", signUp);
indexRouter.post("/users/log-in", logIn);


export default indexRouter;