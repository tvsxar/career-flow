import type { Job, JobData, JobStatus } from "../types/job";

const API_URL = "/api/jobs";

export async function getJobs(): Promise<Job[]> {
  const response = await fetch(API_URL, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const data = await response.json();
  return data.jobs;
}

export async function createJob(jobData: JobData): Promise<Job> {
  const response = await fetch(API_URL, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });

  if (!response.ok) {
    throw new Error("Failed to create job");
  }

  const data = await response.json();
  return data.job;
}

export async function updateJobStatus(
  jobId: string,
  status: JobStatus,
): Promise<Job> {
  const response = await fetch(`${API_URL}/${jobId}/status`, {
    credentials: "include",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update job status");
  }

  const data = await response.json();
  return data.job;
}

export async function deleteJob(jobId: string): Promise<void> {
  const response = await fetch(`${API_URL}/${jobId}`, {
    credentials: "include",
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete job");
  }
}
