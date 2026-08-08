import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    company: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    salary: { type: Number, required: true },
    status: {
      type: String,
      enum: ["applied", "interview", "offer", "rejected"],
      default: "applied",
    },
  },
  { timestamps: true },
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
