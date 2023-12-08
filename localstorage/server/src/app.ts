import morgan from "morgan";
import express, { Request, Response } from "express";
import cors from "cors";
import { connectMongoDB } from "./utils/helpers";

const app = express();

connectMongoDB();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/ping", (_req: Request, res: Response) => {
  console.log("someone pinged here");
  res.send("pong");
});

export { app };
