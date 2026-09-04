import { Router } from "express";
import { authController } from "./login.controller";

const authRouter = Router();

authRouter.post("/login", authController.loginUser);

export default authRouter;
