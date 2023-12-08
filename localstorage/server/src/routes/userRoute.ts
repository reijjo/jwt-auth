import express from "express";
import { getAllUsers, register } from "../controllers/userController";

// Create a router for all the user routes
const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/", register);

export default userRouter;
