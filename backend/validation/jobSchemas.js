import { z } from "zod";

const createJobSchema = z.object({
  company: z.string().trim().min(1, "Company is required"),
  position: z.string().trim().min(1, "Position is required"),
  location: z.string().trim().min(1, "Location is required"),
  salary: z.number().positive("Salary must be a positive number"),
  status: z.enum(["applied", "interview", "offer", "rejected"]).optional(),
});

const updateJobStatusSchema = z.object({
  status: z.enum(["applied", "interview", "offer", "rejected"]),
});

export { createJobSchema, updateJobStatusSchema };
