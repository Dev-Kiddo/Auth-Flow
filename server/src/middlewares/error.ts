import { Request, Response, NextFunction } from "express";

interface CustomErr extends Error {
  statusCode?: number;
}

function handleError(error: CustomErr, request: Request, response: Response, next: NextFunction) {
  error.message = error.message || "Internal Server Error";

  error.statusCode = error.statusCode || 500;

  response.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
}

export default handleError;
