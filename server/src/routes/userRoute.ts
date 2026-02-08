import express from "express";
import { createUser, deleteUser, getUser, getUsers, loginUser, logoutUser, updateUser } from "../controllers/userController.js";
import { auth } from "../middlewares/auth.js";
import { refreshToken } from "../middlewares/refreshToken.js";

const router = express.Router();

router.route("/users").get(getUsers).post(createUser);

router.route("/users/:id").get(auth, getUser).patch(updateUser).delete(deleteUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/refresh-token").get(refreshToken);

export default router;
