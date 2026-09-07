import express, { type Express, type Request, type Response } from "express";
import userRouter from "./modules/user/user.route";
import profileRoute from "./modules/profile/profile.route";
import authRouter from "./modules/auth/login.route";
import cors from "cors";
import logger from "./middleware/logger";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middleware/globalError";
const app: Express = express();

// Middware
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger);

app.use(cors({ origin: "http://localhost:3000" }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express  server",
    author: "Next Lavel",
  });
});

app.use(globalErrorHandler);

export default app;
