import userModel from "../models/userModel.js";
import { Request, Response } from "express";

export const getUsers = function (request: Request, response: Response) {
  console.log("userModel:", userModel);
  response.send("All Users");
};
