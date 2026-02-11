import express from "express";
import {
  createUser,
  deleteUser,
  emailVerification,
  forgotPassword,
  getUser,
  getUsers,
  loginUser,
  logoutUser,
  resetPassword,
  sendEmailVerification,
  updateUser,
  updateUserRole,
} from "../controllers/userController.js";
import { auth } from "../middlewares/auth.js";
import { refreshToken } from "../middlewares/refreshToken.js";

const router = express.Router();

router.route("/users").get(auth, getUsers).post(createUser);

router.route("/users/:id").get(auth, getUser).patch(updateUser).delete(auth, deleteUser);

router.route("/users/:id/role").patch(auth, updateUserRole);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/refresh-token").get(refreshToken);

router.route("/forgot-password").post(forgotPassword);

router.route("/reset-password/:token").post(resetPassword);

router.route("/send-verification").get(auth, sendEmailVerification);
router.route("/verify/:token").get(emailVerification);

export default router;
