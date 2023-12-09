import express from "express";
import { login, verify } from "../controllers/authContoller";
import { verifyJWT } from "../utils/middleware";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.get("/verify", verifyJWT, verify);

export default authRouter;
