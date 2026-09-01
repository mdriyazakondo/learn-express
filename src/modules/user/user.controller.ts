import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.userAllService();

    res.status(200).json({
      sueecss: true,
      message: "Get All users Fetch successfully",
      data: result.rows,
    });
  } catch (error) {
    res.status(404).json({
      sueecss: false,
      message: "User not found",
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await userService.singleUserService(id);
    res.status(201).json({
      success: true,
      message: "Sinle user Fetch success",
      data: result.rows,
    });
  } catch (error) {
    res.status(404).json({
      sueecss: false,
      message: "User not found",
    });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserService(req.body);

    res.status(201).json({
      message: "Create user successfully",
      data: result.rows,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
      error: error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.updateUserService(req);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.deleteUserService(req);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const userController = {
  getAllUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
