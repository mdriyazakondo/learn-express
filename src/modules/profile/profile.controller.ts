import type { Request, Response } from "express";
import { profileService } from "./profile.service";

const getAllProfile = async (req: Request, res: Response) => {
  try {
    const result = await profileService.allProfileService();
    res.status(201).json({
      message: "Successfuly proflie fetch",
      data: result.rows,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Profile not found",
      error: error,
    });
  }
};

const singleProfieController = async (req: Request, res: Response) => {
  try {
    const result = await profileService.singleProfileService(
      req.params.id as string,
    );

    res.status(201).json({
      message: "Single user fetch successfully",
      data: result.rows,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Profile not found",
      error: error,
    });
  }
};

const createProfile = async (req: Request, res: Response) => {
  try {
    const result = await profileService.createProfileService(req.body);
    res.status(200).json({
      message: "profile create Successfully",
      data: result.rows,
    });
  } catch (error) {
    res.status(404).json({
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
