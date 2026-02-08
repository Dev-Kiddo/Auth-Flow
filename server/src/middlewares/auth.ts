import { Request, Response, NextFunction } from "express";
import asyncHandler from "./asyncHandler.js";
import AppError from "../utility/AppError.js";
import jwt from "jsonwebtoken";
import { UserPayload } from "../types.js";
import { verifyToken } from "../utility/verifyToken.js";

const accessTokenKey = process.env.JWT_SECRET_KEY || "mySuperSecretJWTKey";

export const auth = asyncHandler(async function (request: Request, response: Response, next: NextFunction) {
  const token = request.cookies.accessToken;

  if (!token) {
    return next(new AppError("Your session has expired", 401));
  }

  const isVerified = verifyToken(token, accessTokenKey);

  console.log("isVerified", isVerified);

  if (!isVerified) {
    return next(new AppError("Invalid token", 401));
  }

  request.user = isVerified;

  next();
});
