import mongoose from "mongoose";
import chalk from "chalk";
import { config } from "./config";

export const connectMongoDB = async () => {
  try {
    console.log(chalk.magentaBright("..."));

    await mongoose.connect(String(config.MONGO_URI));

    console.log(chalk.magentaBright("Connected to MongoDB."));
  } catch (error: unknown) {
    console.log("Error connecting MongoDB", error);
  }
};
