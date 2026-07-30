import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import connectDB from "./config/db.js";
import { auth } from "./lib/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1099;

await connectDB();

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
