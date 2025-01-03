import { Response } from "express";
import userModel from "../models/user.model";

// Get user by id 
export const getUserById = async (id: string, res: Response) => {
  try {
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    
    // Return the user data
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Unknown error",
      });
    }
  }
};

// Get all users
export const getAllUsersService = async (res: Response) => {
  try {
    const users = await userModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Unknown error",
      });
    }
  }
};