import mongoose from "mongoose";
import { config } from "./index.js";

export const connectDB = async () => {
  try {
    if (!config.dbUri) {
      console.warn("MONGODB_URI not set. Skipping DB connection.");
      return;
    }
    await mongoose.connect(config.dbUri);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
