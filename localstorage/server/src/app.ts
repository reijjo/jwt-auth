import morgan from "morgan";
import express, { Request, Response } from "express";
import cors from "cors";
import { connectMongoDB } from "./utils/helpers";
import userRouter from "./routes/userRoute";
import authRouter from "./routes/authRoute";

const app = express();

connectMongoDB();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/ping", (_req: Request, res: Response) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/users", userRouter);
app.use("/auth", authRouter);

export { app };
