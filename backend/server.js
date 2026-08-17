import "dotenv/config";
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import connectDB from "./config/db.js";
import { auth } from "./lib/auth.js";
import jobRoutes from "./routes/jobRoutes.js";

const app = express();
const PORT = process.env.PORT || 1099;

await connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());

// routes
app.use("/api/jobs", jobRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
