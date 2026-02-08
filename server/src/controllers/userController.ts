import userModel from "../models/userModel.js";
import { NextFunction, Request, Response } from "express";
import AppError from "../utility/AppError.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utility/generateToken.js";

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

export const getUser = asyncHandler(async function (request: Request, response: Response, next: NextFunction) {
  const { id } = request.params;

  const user = await userModel.findById(id);

  // console.log("user:", user);

  if (!user) {
    return next(new AppError("User not found", 401));
  }

  return response.status(200).json({
    success: true,
    message: user,
  });
});

export const createUser = asyncHandler(async function (request: Request, response: Response, next) {
  const { password, email } = request.body;

  const existingEmail = await userModel.findOne({ email });

  if (existingEmail) {
    return next(new AppError("User already exist,Please Login", 401));
  }

  const hashPassword = await bcrypt.hash(password, 10);

  let user = new userModel({ ...request.body, password: hashPassword });

  // const user = await userModel.create(request.body)
  user = await user.save();

  return response.status(200).json({
    success: true,
    message: "User registered successfully",
    user,
  });
});

export const updateUser = asyncHandler(async function (request: Request, response: Response, next: NextFunction) {
  const { id } = request.params;

  const user = await userModel.findById(id);

  if (!user) {
    return next(new AppError("User not exist", 401));
  }

  const updatedUser = await userModel.findByIdAndUpdate(id, request.body, { new: true });

  return response.status(200).json({
    success: true,
    message: "User updated successfully",
    updatedUser,
  });
});

export const deleteUser = asyncHandler(async function (request: Request, response: Response, next: NextFunction) {
  const { id } = request.params;

  const user = await userModel.findById(id);

  if (!user) {
    return next(new AppError("User not exist", 401));
  }

  await userModel.findByIdAndDelete(id);

  return response.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

export const loginUser = asyncHandler(async function (request: Request, response: Response, next: NextFunction) {
  const { email, password } = request.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return next(new AppError("User not registered, Please register", 404));
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return next(new AppError("Invalid username or password", 404));
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  response
    .status(200)
    .cookie("accessToken", accessToken, { maxAge: 10 * 1000, httpOnly: true })
    .cookie("refreshToken", refreshToken, { maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true })
    .json({
      success: true,
      message: "Login successfull",
    });
});

export const logoutUser = asyncHandler(async function (request: Request, response: Response, next: NextFunction) {
  response.clearCookie("accessToken");
  response.clearCookie("refreshToken");

  // response.session

  response.status(200).json({
    success: false,
    message: "Logout successfully",
  });
});
