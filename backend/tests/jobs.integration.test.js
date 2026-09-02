import { describe, test, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import app from "../app.js";
import { auth } from "../lib/auth.js";
import Job from "../models/jobModel.js";

vi.mock("../lib/auth.js", () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    },
  },
}));

vi.mock("../models/jobModel.js", () => ({
  default: {
    create: vi.fn(),
    find: vi.fn(),
    findOne: vi.fn(),
    findOneAndDelete: vi.fn(),
  },
}));

const session = {
  user: {
    id: "user123",
    email: "test@example.com",
  },
  session: {
    id: "session123",
  },
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("POST /api/jobs", () => {
  test("should create a new job", async () => {
    const jobData = {
      company: "Google",
      position: "Frontend Developer",
      location: "Warsaw",
      salary: 3000,
      status: "applied",
    };

    const createdJob = {
      _id: "job123",
      user: "user123",
      ...jobData,
    };

    auth.api.getSession.mockResolvedValue(session);
    Job.create.mockResolvedValue(createdJob);

    const response = await request(app).post("/api/jobs").send(jobData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      job: createdJob,
    });
    expect(Job.create).toHaveBeenCalledWith({
      user: "user123",
      ...jobData,
    });
  });

  test("should return 400 for invalid job data", async () => {
    auth.api.getSession.mockResolvedValue(session);

    const response = await request(app).post("/api/jobs").send({});

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
    expect(Job.create).not.toHaveBeenCalled();
  });

  test("should return 401 for unauthorized access", async () => {
    auth.api.getSession.mockResolvedValue(null);

    const jobData = {
      company: "Google",
      position: "Frontend Developer",
      location: "Warsaw",
      salary: 3000,
      status: "applied",
    };

    const response = await request(app).post("/api/jobs").send(jobData);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Unauthorized",
    });
    expect(Job.create).not.toHaveBeenCalled();
  });
});

describe("GET /api/jobs", () => {
  const jobs = [
    {
      _id: "job123",
      user: "user123",
      company: "Google",
      position: "Frontend Developer",
      location: "Warsaw",
      salary: 3000,
      status: "applied",
    },
    {
      _id: "job234",
      user: "user123",
      company: "Amazon",
      position: "Full Stack Developer",
      location: "London",
      salary: 3500,
      status: "offer",
    },
  ];

  test("should return a list of jobs for the authenticated user", async () => {
    const sort = vi.fn();

    Job.find.mockReturnValue({ sort });
    sort.mockResolvedValue(jobs);

    auth.api.getSession.mockResolvedValue(session);

    const response = await request(app).get("/api/jobs");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      jobs,
    });
    expect(sort).toHaveBeenCalledWith({ createdAt: -1 });
    expect(Job.find).toHaveBeenCalledWith({
      user: "user123",
    });
  });

  test("should return 500 if there is an error fetching jobs", async () => {
    const sort = vi.fn();

    Job.find.mockReturnValue({ sort });
    sort.mockRejectedValue(new Error("Database error"));

    auth.api.getSession.mockResolvedValue(session);

    const response = await request(app).get("/api/jobs");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Something went wrong",
    });
  });
});

describe("PATCH /api/jobs/:id/status", () => {
  test("should update the job status for the authenticated user", async () => {
    const jobId = "job123";

    const updatedJob = {
      _id: jobId,
      user: "user123",
      position: "Frontend Developer",
      status: "interview",
    };

    const job = {
      _id: jobId,
      user: "user123",
      position: "Frontend Developer",
      status: "applied",
      save: vi.fn(),
    };

    auth.api.getSession.mockResolvedValue(session);
    Job.findOne.mockResolvedValue(job);
    job.save.mockResolvedValue();

    const response = await request(app)
      .patch(`/api/jobs/${jobId}/status`)
      .send({ status: "interview" });

    expect(response.status).toBe(200);
    expect(response.body.job).toEqual(updatedJob);
    expect(Job.findOne).toHaveBeenCalledWith({ _id: jobId, user: "user123" });
    expect(job.save).toHaveBeenCalled();
    expect(job.status).toBe("interview");
  });

  test("should return 404 if the job is not found", async () => {
    const jobId = "job123";

    auth.api.getSession.mockResolvedValue(session);
    Job.findOne.mockResolvedValue(null);

    const response = await request(app)
      .patch(`/api/jobs/${jobId}/status`)
      .send({ status: "interview" });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Job not found",
    });
  });
});

describe("DELETE /api/jobs/:id", () => {
  test("should delete the job for the authenticated user", async () => {
    const jobId = "job123";

    const deletedJob = {
      _id: jobId,
      user: "user123",
    };

    auth.api.getSession.mockResolvedValue(session);
    Job.findOneAndDelete.mockResolvedValue(deletedJob);

    const response = await request(app).delete(`/api/jobs/${jobId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Job deleted successfully",
    });
    expect(Job.findOneAndDelete).toHaveBeenCalledWith({
      _id: jobId,
      user: "user123",
    });
  });

  test("should return 404 if the job is not found", async () => {
    const jobId = "job123";

    auth.api.getSession.mockResolvedValue(session);
    Job.findOneAndDelete.mockResolvedValue(null);

    const response = await request(app).delete(`/api/jobs/${jobId}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Job not found",
    });
  });
});
