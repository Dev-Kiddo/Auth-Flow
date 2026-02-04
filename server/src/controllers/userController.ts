import userModel from "../models/userModel.js";
import { Request, Response } from "express";

export const getUsers = async function (request: Request, response: Response) {
  const users = await userModel.find({});

  if (users.length <= 0) {
    return response.status(200).json({
      success: true,
      message: "User not exist yet",
    });
  }

  return response.status(200).json({
    success: true,
    numOfUsers: users.length,
    message: users,
  });
};
