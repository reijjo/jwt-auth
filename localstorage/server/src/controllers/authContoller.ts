import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Login, LoginUser } from "../utils/types";
import { config } from "../utils/config";

// @Route auth/login
// @Method POST
// @What Login user
export const login = async (req: Request, res: Response) => {
  const { username, passwd } = req.body as Login;

  // If empty field
  if (!username || !passwd) {
    return res
      .status(400)
      .json({ message: "No empty fields thanks.", info: "error" });
  }

  // Find user from database
  let loginUser: LoginUser | null;

  try {
    loginUser = await UserModel.findOne({ username });
  } catch (error: unknown) {
    console.log("Server error on finding user", error);
    return res
      .status(500)
      .json({ message: "Error finding user", info: "error" });
  }

  if (!loginUser) {
    return res.status(404).json({ message: "User not found.", info: "error" });
  }

  // Is password ok?
  const okPasswd = await bcrypt.compare(passwd, loginUser.passwd);
  if (!okPasswd) {
    return res
      .status(400)
      .json({ message: "Invalid username / password.", info: "error" });
  }

  // Create token
  const userToken = {
    id: loginUser.id,
    username: loginUser.username,
  };

  const token = jwt.sign(userToken, String(config.JWT_SECRET), {
    expiresIn: 60 * 60,
  });

  return res
    .status(200)
    .json({ token, loginUser, message: "Logged in!", info: "success" });
};

// @Route auth/verify
// @Method GET
// @What verify token
export const verify = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Valid Token!", user: req.user });
};
