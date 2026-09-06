import express, { type Express, type Request, type Response } from "express";
import userRouter from "./modules/user/user.route";
import profileRoute from "./modules/profile/profile.route";
import authRouter from "./modules/auth/login.route";
import fs from "fs";
const app: Express = express();

// Middware
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("first", Date.now(), req.method);
  const log = `Method -> ${req.method} Time -> ${Date.now()} Url -> ${req.url}`;
  fs.appendFile("logger-text", log, (error) => {
    console.log(error);
  });
  next();
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express  server",
    author: "Next Lavel",
  });
});

export default app;
