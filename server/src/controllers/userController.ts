import userModel from "../models/userModel.js";
import { NextFunction, Request, Response } from "express";
import AppError from "../utility/AppError.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const getUsers = asyncHandler(async function (request: Request, response: Response, next: NextFunction) {
  const users = await userModel.find({});

  if (users.length <= 0) {
    // return response.status(200).json({
    //   success: true,
    //   message: "User not exist yet",
    // });
    return next(new AppError("User not exist yet", 200));
  }

  return response.status(200).json({
    success: true,
    numOfUsers: users.length,
    message: users,
  });
});

// export const getUser = async function (request, response) {};
