import { UserPayload } from "../types.js";
import jwt from "jsonwebtoken";

export const verifyToken = function (token: string, key: string): UserPayload | null {
  try {
    const decoded = jwt.verify(token, key) as UserPayload;
    return decoded;
  } catch (error) {
    console.log("JWT Verification Err", error);
    return null;
  }
};
