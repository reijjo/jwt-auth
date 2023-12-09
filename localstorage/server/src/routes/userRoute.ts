import express from "express";
import { getAllUsers, register } from "../controllers/userController";
import { verifyJWT } from "../utils/middleware";

// Create a router for all the user routes
const userRouter = express.Router();

userRouter.get("/", verifyJWT, getAllUsers);
userRouter.post("/", register);

export default userRouter;
