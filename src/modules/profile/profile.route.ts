import { Router } from "express";
import { profileController } from "./profile.controller";

const profileRoute = Router();

profileRoute.get("/", profileController.getAllProfile);
profileRoute.get("/:id", profileController.singleProfieController);
profileRoute.post("/", profileController.createProfile);
export default profileRoute;
