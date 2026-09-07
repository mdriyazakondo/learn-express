import type { Request, Response } from "express";
import { authService } from "./auth.service";
import { ref } from "node:process";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginServiceINTODB(req.body);
    const { refreshToken, accessToken } = result;
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }
};

const refreshToken = async (req: Request, res: Response) => {
  try {
    const result = await authService.refreshTokenService(
      req.cookies.refreshToken,
    );

    res.status(200).json({
      success: true,
      message: "Refresh token successful",
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }
};

export const authController = { loginUser, refreshToken };
