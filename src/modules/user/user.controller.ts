import type { Request, Response } from "express";

import { userService } from "./user.service";
import sendResponse from "../../utility/sendResponse";

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.userAllService();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All users fetched successfully",
      data: result.rows,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Users not found",
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await userService.singleUserService(id as string);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Single user fetched successfully",
      data: result.rows,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "User not found",
    });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserService(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error: any) {
    console.log("Create User Error:", error);

    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await userService.updateUserService(id as string, req.body);
    if (result.rows.length === 0) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "User not found",
      });
    }
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);

    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Something went wrong",
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.deleteUserService(req.params.id as string);

    if (result.rows.length === 0) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "User not found",
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User deleted successfully",
      data: result.rows[0],
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
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
