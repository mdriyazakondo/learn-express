import { Router } from "express";
import { userController } from "./user.controller";

const userRouter = Router();

userRouter.get("/", userController.getAllUser);

userRouter.get("/:id", userController.getSingleUser);

userRouter.post("", userController.createUser);

userRouter.put("/:id", userController.updateUser);

userRouter.delete("/:id", userController.deleteUser);

export default userRouter;
