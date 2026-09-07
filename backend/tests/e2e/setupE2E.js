import "../../config/env.js";
import mongoose from "mongoose";
import connectDB from "../../config/db.js";
import { resetE2EDatabase } from "./resetE2EDatabase.js";

async function setupE2E() {
  await connectDB();

  try {
    await resetE2EDatabase();
    console.log("E2E database reset successfully");
  } finally {
    await mongoose.disconnect();
  }
}

await setupE2E();
