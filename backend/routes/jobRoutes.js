import express from "express";
import {
  getUserJobs,
  createJob,
  updateJobStatus,
  deleteJob,
} from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getUserJobs);

router.post("/", createJob);

router.patch("/:id/status", updateJobStatus);

router.delete("/:id", deleteJob);

export default router;
