import type { Request, Response } from "express";
import { profileService } from "./profile.service";
import sendResponse from "../../utility/sendResponse";

const getAllProfile = async (req: Request, res: Response) => {
  try {
    const result = await profileService.allProfileService();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Profiles fetched successfully",
      data: result.rows,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Profiles not found",
      error: error,
    });
  }
};

const singleProfieController = async (req: Request, res: Response) => {
  try {
    const result = await profileService.singleProfileService(
      req.params.id as string,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Single user fetch successfully",
      data: result.rows,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Profile not found",
      error: error,
    });
  }
};

const createProfile = async (req: Request, res: Response) => {
  try {
    const result = await profileService.createProfileService(req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Profile created successfully",
      data: result.rows,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Profile not found",
      error: error,
    });
  }
};

export const profileController = {
  getAllProfile,
  singleProfieController,
  createProfile,
};
