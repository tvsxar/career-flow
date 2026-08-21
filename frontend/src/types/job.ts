export type JobStatus =
  | "applied"
  | "interview"
  | "offer"
  | "rejected";

export interface Job {
  _id: string;
  user: string;
  position: string;
  location: string;
  company: string;
  status: JobStatus;
  salary: number;
  createdAt: string;
  updatedAt: string;
}

export interface JobData {
  position: string;
  location: string;
  company: string;
  status?: JobStatus;
  salary: number;
}
