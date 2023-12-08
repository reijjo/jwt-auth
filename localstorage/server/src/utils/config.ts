import dotenv from "dotenv";
import { Config } from "./types";

dotenv.config();

const PORT = Number(process.env.PORT);

const MONGO_URI = process.env.MONGO_URI;

const JWT_SECRET = String(process.env.JWT_SECRET);

export const config: Config = {
  PORT,
  MONGO_URI,
  JWT_SECRET,
};
