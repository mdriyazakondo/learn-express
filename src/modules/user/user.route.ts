import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const userRouter = Router();

userRouter.get("/", auth(), userController.getAllUser);

userRouter.get("/:id", userController.getSingleUser);

userRouter.post("", userController.createUser);

userRouter.put("/:id", userController.updateUser);

userRouter.delete("/:id", userController.deleteUser);

export default userRouter;
