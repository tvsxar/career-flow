import type { JobStatus } from "./job";

export interface UpdateJobState {
  id: string;
  error: string | null;
  errorId: string | null;
  onUpdate: (jobId: string, jobStatus: JobStatus) => Promise<void>;
}

export interface DeleteJobState {
  id: string;
  error: string | null;
  errorId: string | null;
  onDelete: (jobId: string) => Promise<void>;
}
