import type { NextFunction, Request, Response } from "express";
import fs from "fs";

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log("first", Date.now(), req.method);
  const log = `Method -> ${req.method} Time -> ${Date.now()} Url -> ${req.url} \n`;
  fs.appendFile("logger-text", log, (error) => {
    console.log(error);
  });
  next();
};

export default logger;
