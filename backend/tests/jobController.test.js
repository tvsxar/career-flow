import { describe, test, expect, vi, beforeEach } from "vitest";
import {
  createJob,
  deleteJob,
  updateJobStatus,
  getUserJobs,
} from "../controllers/jobController.js";
import Job from "../models/jobModel.js";

vi.mock("../models/jobModel.js", () => ({
  default: {
    create: vi.fn(),
    findOneAndDelete: vi.fn(),
    findOne: vi.fn(),
    find: vi.fn(),
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("createJob", () => {
  test("creates a job and returns 201", async () => {
    const testJob = {
      _id: "job123",
      user: "user123",
      company: "Google",
      position: "Frontend Developer",
      location: "Warsaw",
      salary: 3000,
      status: "applied",
    };

    Job.create.mockResolvedValue(testJob);

    const req = {
      user: {
        id: "user123",
      },
      body: {
        company: "Google",
        position: "Frontend Developer",
        location: "Warsaw",
        salary: 3000,
        status: "applied",
      },
    };

    const json = vi.fn();

    const res = {
      status: vi.fn(() => ({
        json,
      })),
    };

    await createJob(req, res);

    expect(Job.create).toHaveBeenCalledWith({
      user: "user123",
      position: "Frontend Developer",
      company: "Google",
      location: "Warsaw",
      salary: 3000,
      status: "applied",
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalledWith({
      job: testJob,
    });
  });

  test("returns 500 when job creation fails", async () => {
    Job.create.mockRejectedValue(new Error("Failed creating job"));

    const req = {
      user: {
        id: "user123",
      },
      body: {
        company: "Google",
        position: "Frontend Developer",
        location: "Warsaw",
        salary: 3000,
        status: "applied",
      },
    };

    const json = vi.fn();

    const res = {
      status: vi.fn(() => ({
        json,
      })),
    };

    await createJob(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({
      message: "Something went wrong",
    });
  });
});

describe("deleteJob", () => {
  test("find job, delete and returns 200", async () => {
    const job = {
      id: 2,
      position: "Frontend Developer",
    };

    Job.findOneAndDelete.mockResolvedValue(job);

    const req = {
      user: {
        id: "user123",
      },
      params: {
        id: "job123",
      },
    };

    const json = vi.fn();

    const res = {
      status: vi.fn(() => ({
        json,
      })),
    };

    await deleteJob(req, res);

    expect(Job.findOneAndDelete).toHaveBeenCalledWith({
      _id: "job123",
      user: "user123",
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({ message: "Job deleted successfully" });
  });

  test("job not found and returns 404", async () => {
    Job.findOneAndDelete.mockResolvedValue(null);

    const req = {
      user: {
        id: "user123",
      },
      params: {
        id: "job123",
      },
    };

    const json = vi.fn();

    const res = {
      status: vi.fn(() => ({
        json,
      })),
    };

    await deleteJob(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith({ message: "Job not found" });
  });

  test("returns 500 when job deletion fails", async () => {
    Job.findOneAndDelete.mockRejectedValue(new Error("Failed deleting job"));

    const req = {
      user: {
        id: "user123",
      },
      params: {
        id: "job123",
      },
    };

    const json = vi.fn();

    const res = {
      status: vi.fn(() => ({
        json,
      })),
    };

    await deleteJob(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({
      message: "Something went wrong",
    });
  });
});

describe("updateJobStatus", () => {
  test("updates job status and returns 200", async () => {
    const job = {
      _id: "job123",
      status: "offer",
      save: vi.fn(),
    };

    Job.findOne.mockResolvedValue(job);

    const req = {
      user: {
        id: "user123",
      },
      params: {
        id: "job123",
      },
      body: {
        status: "applied",
      },
    };

    const json = vi.fn();

    const res = {
      status: vi.fn(() => ({
        json,
      })),
    };

    await updateJobStatus(req, res);

    expect(Job.findOne).toHaveBeenCalledWith({
      _id: "job123",
      user: "user123",
    });
    expect(job.status).toBe("applied");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(job.save).toHaveBeenCalled();
    expect(json).toHaveBeenCalledWith({
      job,
    });
  });

  test("job not found and returns 404", async () => {
    Job.findOne.mockResolvedValue(null);

    const req = {
      user: {
        id: "user123",
      },
      params: {
        id: "job123",
      },
      body: {
        status: "applied",
      },
    };

    const json = vi.fn();

    const res = {
      status: vi.fn(() => ({
        json,
      })),
    };

    await updateJobStatus(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith({
      message: "Job not found",
    });
  });

  test("returns 500 when job status updating fails", async () => {
    Job.findOne.mockRejectedValue(new Error("Failed updating job status"));

    const req = {
      user: {
        id: "user123",
      },
      params: {
        id: "job123",
      },
      body: {
        status: "applied",
      },
    };

    const json = vi.fn();

    const res = {
      status: vi.fn(() => ({
        json,
      })),
    };

    await updateJobStatus(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({
      message: "Something went wrong",
    });
  });
});

describe("getUserJobs", () => {
  test("returns user jobs sorted by newest first", async () => {
    const jobs = [
      {
        id: "job1",
        position: "Frontend Developer",
      },
      {
        id: "job2",
        position: "Full-Stack Developer",
      },
    ];

    const sort = vi.fn();

    Job.find.mockReturnValue({
      sort,
    });

    sort.mockResolvedValue(jobs);

    const req = {
      user: {
        id: "userId123",
      },
    };

    const json = vi.fn();

    const res = {
      status: vi.fn(() => ({
        json,
      })),
    };

    await getUserJobs(req, res);

    expect(Job.find).toHaveBeenCalledWith({ user: "userId123" });
    expect(sort).toHaveBeenCalledWith({ createdAt: -1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({ jobs });
  });

  test("returns 500 when jobs fetching fails", async () => {
    const sort = vi.fn();

    Job.find.mockReturnValue({
      sort,
    });

    sort.mockRejectedValue(new Error("Failed fetching jobs"));

    const req = {
      user: {
        id: "userId123",
      },
    };

    const json = vi.fn();

    const res = {
      status: vi.fn(() => ({
        json,
      })),
    };

    await getUserJobs(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({ message: "Something went wrong" });
  });
});
