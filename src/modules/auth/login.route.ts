import { Router } from "express";
import { authController } from "./login.controller";

const authRouter = Router();

authRouter.post("/login", authController.loginUser);
authRouter.post("/refresh-token", authController.refreshToken);

export default authRouter;
