import Job from "../models/jobModel.js";

async function getUserJobs(req, res) {
  try {
    const userId = req.user.id;
    const jobs = await Job.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      jobs,
    });
  } catch (error) {
    console.error("Get jobs error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function createJob(req, res) {
  try {
    const userId = req.user.id;
    const { company, salary, position, location, status } = req.body;

    if (!company || !salary || !position || !location) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const job = await Job.create({
      user: userId,
      position,
      company,
      location,
      salary,
      status,
    });

    res.status(201).json({
      job,
    });
  } catch (error) {
    console.error("Create job error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function updateJobStatus(req, res) {
  const userId = req.user.id;
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = ["applied", "interview", "offer", "rejected"];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Please provide proper status" });
  }

  try {
    const job = await Job.findOne({ _id: id, user: userId });

    if (!job) return res.status(404).json({ message: "Job not found" });

    job.status = status;
    await job.save();

    res.status(200).json({ job });
  } catch (error) {
    console.error("Update job status error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function deleteJob(req, res) {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const job = await Job.findOneAndDelete({ _id: id, user: userId });

    if (!job) return res.status(404).json({ message: "Job not found" });

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Delete job error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
