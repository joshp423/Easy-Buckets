import { Router } from "express";
import * as indexController from "../controllers/indexController.js";
import { signUp, logIn } from "../controllers/userController.js";
const indexRouter = Router();

indexRouter.post("/sign-up", signUp);
indexRouter.post("/log-in", logIn);


export default indexRouter;