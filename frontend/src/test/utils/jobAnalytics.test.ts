import { describe, test, expect } from "vitest";
import type { Job } from "../../types/job";
import {
  getStatusCounts,
  getInterviewRate,
  getAverageSalary,
  getTopLocation,
} from "../../utils/jobAnalytics";

describe("jobAnalytics", () => {
  const jobs: Job[] = [
    {
      _id: "1",
      user: "user1",
      position: "Frontend Developer",
      company: "Google",
      location: "Warsaw",
      salary: 3000,
      status: "applied",
      createdAt: "2026-09-01",
      updatedAt: "2026-09-01",
    },
    {
      _id: "2",
      user: "user1",
      position: "Backend Developer",
      company: "Spotify",
      location: "Warsaw",
      salary: 3500,
      status: "interview",
      createdAt: "2026-09-01",
      updatedAt: "2026-09-01",
    },
    {
      _id: "3",
      user: "user1",
      position: "Full Stack Developer",
      company: "Microsoft",
      location: "Wroclaw",
      salary: 4000,
      status: "offer",
      createdAt: "2026-09-01",
      updatedAt: "2026-09-01",
    },
    {
      _id: "4",
      user: "user1",
      position: "React Developer",
      company: "Meta",
      location: "Warsaw",
      salary: 2500,
      status: "rejected",
      createdAt: "2026-09-01",
      updatedAt: "2026-09-01",
    },
  ];

  test("should count jobs by status", () => {
    const expectedResult = {
      applied: 1,
      interview: 1,
      offer: 1,
      rejected: 1,
    };

    const result = getStatusCounts(jobs);

    expect(result).toEqual(expectedResult);
  });

  test("should return zero counts for empty jobs array", () => {
    const expectedResult = {
      applied: 0,
      interview: 0,
      offer: 0,
      rejected: 0,
    };

    const result = getStatusCounts([]);

    expect(result).toEqual(expectedResult);
  });

  test("should calculate interview rate", () => {
    const expectedResult = 50;

    const result = getInterviewRate(jobs);

    expect(result).toBe(expectedResult);
  });

  test("should return zero interview rate for empty jobs array", () => {
    const result = getInterviewRate([]);

    expect(result).toBe(0);
  });

  test("should calculate average salary", () => {
    const expectedResult = 3250;

    const result = getAverageSalary(jobs);

    expect(result).toBe(expectedResult);
  });

  test("should return zero average salary for empty jobs array", () => {
    const result = getAverageSalary([]);

    expect(result).toBe(0);
  });

  test("should return top location", () => {
    const result = getTopLocation(jobs);

    expect(result).toBe("Warsaw");
  });

  test("should return empty string for empty jobs array", () => {
    const result = getTopLocation([]);

    expect(result).toBe("");
  });
});
