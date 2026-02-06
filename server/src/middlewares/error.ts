import { Request, Response, NextFunction } from "express";
import AppError from "../utility/AppError.js";

interface CustomErr extends Error {
  statusCode?: number;
  path?: string;
}

function handleError(error: CustomErr, request: Request, response: Response, next: NextFunction) {
  error.message = error.message || "Internal Server Error";

  error.statusCode = error.statusCode || 500;

  if (error.name === "CastError") {
    // error.message = "This is invalid resource";
    const message = `This is invalid resource ${error.path}`;
    error = new AppError(message, 400);
  }

  response.status(error.statusCode as number).json({
    success: false,
    message: error.message,
    stack: error.stack,
  });
}

export default handleError;
