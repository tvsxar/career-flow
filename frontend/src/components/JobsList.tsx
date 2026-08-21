import type { Job } from "../types/job";
import type {
  UpdateJobState,
  DeleteJobState,
} from "../types/jobActions";

import JobCard from "./JobCard";

interface JobsListProps {
  jobs: Job[];
  updateJob: UpdateJobState;
  deleteJob: DeleteJobState;
}

function JobsList({
  jobs,
  updateJob,
  deleteJob,
}: JobsListProps) {
  return (
    <ul className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
      {jobs.map((job) => (
        <JobCard
          key={job._id}
          job={job}
          updateJob={updateJob}
          deleteJob={deleteJob}
        />
      ))}
    </ul>
  );
}

export default JobsList;
