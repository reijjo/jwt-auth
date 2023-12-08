import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import bcrypt from "bcryptjs";

// @Route users
// @Method GET
// @What Get all users from database
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    // Gets all the users from database and doesn't return the users passwords to frontend
    const users = await UserModel.find({}).select("-passwd");
    res.status(200).json(users);
  } catch (error: unknown) {
    console.log("Error fetching all users", error);

    // Send status and message and style for InfoMessage component in frontend
    res
      .status(500)
      .send({ message: "Server error fetching all users.", info: "error" });
  }
};

// @Route users
// @Method POST
// @What Create new user
export const register = async (req: Request, res: Response) => {
  const { username, passwd } = req.body;

  // If empty field
  if (!username || !passwd) {
    return res
      .status(400)
      .json({ message: "No empty fields, thanks.", info: "error" });
  }

  // Check if username already exists
  try {
    const existingUsername = await UserModel.findOne({ username });

    if (existingUsername) {
      return res
        .status(400)
        .json({ message: "Username already exists.", info: "warning" });
    }
  } catch (error: unknown) {
    console.log("Error checking duplicate users", error);
    return res
      .status(500)
      .json({ message: "Server error checking duplicates", info: "error" });
  }

  // Hash the user password
  const saltRounds = 10;
  const hashPasswd = await bcrypt.hash(passwd, saltRounds);

  // Save user to database
  try {
    const newUser = new UserModel({
      username,
      passwd: hashPasswd,
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      message: `User '${savedUser.username}' created!`,
      info: "success",
    });
  } catch (error: unknown) {
    console.log("Error creating user", error);
    return res
      .status(500)
      .json({ message: "Server error creating user", info: "error" });
  }
};
