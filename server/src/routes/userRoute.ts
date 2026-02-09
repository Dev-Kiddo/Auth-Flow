import express from "express";
import { createUser, deleteUser, forgotPassword, getUser, getUsers, loginUser, logoutUser, resetPassword, updateUser } from "../controllers/userController.js";
import { auth } from "../middlewares/auth.js";
import { refreshToken } from "../middlewares/refreshToken.js";

const router = express.Router();

router.route("/users").get(getUsers).post(createUser);

router.route("/users/:id").get(auth, getUser).patch(updateUser).delete(deleteUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/refresh-token").get(refreshToken);

router.route("/forgot-password").post(forgotPassword);

router.route("/reset-password/:token").post(resetPassword);

export default router;
