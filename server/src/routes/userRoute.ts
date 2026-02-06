import express from "express";
import { getUser, getUsers } from "../controllers/userController.js";

const router = express.Router();

router.route("/users").get(getUsers);

router.route("/users/:id").get(getUser);

export default router;
