import express, { type Express, type Request, type Response } from "express";
import userRouter from "./modules/user/user.route";
const app: Express = express();

// Middware
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/users", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express  server",
    author: "Next Lavel",
  });
});

export default app;
