import userModel from "../models/userModel.js";
import { NextFunction, Request, Response } from "express";
import AppError from "../utility/AppError.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utility/generateToken.js";
import SendMail from "../utility/SendMail.js";
import crypto from "crypto";
import { generateOTP } from "../utility/utilityFunctions.js";
import { request } from "http";

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
    .cookie("accessToken", accessToken, { maxAge: 15 * 60 * 1000, httpOnly: true })
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

export const forgotPassword = asyncHandler(async function (request: Request, response: Response, next: NextFunction) {
  const { email } = request.body;

  let user = await userModel.findOne({ email });

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const resetOtp = generateOTP();

  const token = crypto.randomBytes(36).toString("hex");

  const hashToken = crypto.createHash("sha256").update(token).digest("hex");

  const resetMessage = `<h3>Hi ${user.name}👋,</h3> <p>You are receiving this because you have requested the reset of the password for your account.</p>\n\n<h2>Your OTP is ${resetOtp}.</h2> \n\n<p>👉 Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:</p>\n\n <a href="http://localhost:8000/api/v1/reset-password/${token}">http://localhost:8000/api/v1/reset-password/${token}</a>\n\n<p>👉NOTE: If you did'nt request this, please ignore this email and your password will remain unchanged.</p>\n`;

  user.passwordResetToken = hashToken;
  user.passwordResetExpires = new Date(new Date().getTime() + 15 * 60 * 1000);

  await user.save();

  SendMail(email, "Password Reset Link", resetMessage);

  response.status(200).json({
    success: true,
    message: "Reset OTP link sent successfully",
  });
});

export const resetPassword = asyncHandler(async function (request: Request, response: Response, next: NextFunction) {
  const { token } = request.params;
  const otp = request.body;

  console.log("Params", token);

  response.status(200).json({
    success: true,
    data: token,
  });
});
