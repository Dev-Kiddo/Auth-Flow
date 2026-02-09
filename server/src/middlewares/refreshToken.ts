import { NextFunction, Request, Response } from "express";
import asyncHandler from "./asyncHandler.js";
import AppError from "../utility/AppError.js";
import jwt from "jsonwebtoken";
import { UserPayload } from "../types.js";
import { verifyToken } from "../utility/verifyToken.js";
import { generateAccessToken } from "../utility/generateToken.js";

export const refreshToken = asyncHandler(async function (request: Request, response: Response, next: NextFunction) {
  const token = request.cookies.refreshToken;

  const refreshTokenSecretKey = process.env.JWT_REFRESHTOKEN_KEY || "mySuperSecretRefreshTokenJWTKey";

  if (!token) {
    return next(new AppError("Your session has expired", 401));
  }

  const user = verifyToken(token, refreshTokenSecretKey);

  if (!user) {
    return next(new AppError("Your session has expired", 401));
  }

  const newAccessToken = generateAccessToken(user);

  response.cookie("accessToken", newAccessToken, { maxAge: 15 * 60 * 1000 });

  response.status(200).json({
    success: true,
    message: "Token refreshed successfully",
  });
});
