import express from "express";
import {
  getUserJobs,
  createJob,
  updateJobStatus,
  deleteJob,
} from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";
import {
  createJobSchema,
  updateJobStatusSchema,
} from "../validation/jobSchemas.js";

const router = express.Router();

router.use(protect);

router.get("/", getUserJobs);

router.post("/", validate(createJobSchema), createJob);

router.patch("/:id/status", validate(updateJobStatusSchema), updateJobStatus);

router.delete("/:id", deleteJob);

export default router;
