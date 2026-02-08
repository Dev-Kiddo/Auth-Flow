import jwt from "jsonwebtoken";

const refreshTokenSecretKey = process.env.JWT_REFRESHTOKEN_KEY || "mySuperSecretRefreshTokenJWTKey";
const accessTokenKey = process.env.JWT_SECRET_KEY || "mySuperSecretJWTKey";

export const generateAccessToken = function (user) {
  return jwt.sign({ id: user._id, role: user.role }, accessTokenKey, { expiresIn: "15m" });
};

export const generateRefreshToken = function (user) {
  return jwt.sign({ id: user._id }, refreshTokenSecretKey, { expiresIn: "3d" });
};
