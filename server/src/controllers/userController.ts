import userModel from "../models/userModel.js";
import { NextFunction, Request, Response } from "express";
import AppError from "../utility/AppError.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";
import { hash } from "bcryptjs";

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

  const existinguser = await userModel.findOne({ email });

  if (existinguser) {
    return next(new AppError("User already exist,Please Login", 401));
  }

  const hashPassword = await bcrypt.hash(password, 10);

  let user = new userModel({ ...request.body, password: hashPassword });

  const secretkey = process.env.JWT_SECRET_KEY || "OPTIONAL_JWTSECRETKEY";

  const token = jwt.sign({ id: user._id }, secretkey, { expiresIn: "1d" });

  // const user = await userModel.create(request.body)
  user = await user.save();

  // response.cookie("accessToken", token, { maxAge: 86400000 });
  return response.status(200).cookie("accessToken", token, { maxAge: 86400000 }).json({
    success: true,
    message: "User registered successfully",
    user,
    // token,
  });
});
