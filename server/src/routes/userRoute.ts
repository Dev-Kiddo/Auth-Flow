import express from "express";
import { createUser, getUser, getUsers } from "../controllers/userController.js";

const router = express.Router();

router.route("/users").get(getUsers).post(createUser);

router.route("/users/:id").get(getUser);

export default router;
