import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "./config";
import { User } from "./types";

// For the req.user
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.header("Authorization")?.split(" ")[1];

  // If there is no token
  if (!token) {
    res
      .status(401)
      .json({ message: "Unauthorized - Missing token", info: "error" });
    return;
  }

  try {
    const decoded = jwt.verify(token, String(config.JWT_SECRET)) as User;

    req.user = decoded;

    next();
  } catch (error: unknown) {
    console.error("Error verifying token", error);
    res
      .status(401)
      .json({ message: "Unauhtorized - Invalid token", info: "error" });
  }
};
