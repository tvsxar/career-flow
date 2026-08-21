import type { Job, JobStatus } from '../types/job';
import JobCard from '../components/JobCard';

interface JobsListProps {
    jobs: Job[];
    updatingId: string;
    updateStatus: (jobId: string, jobStatus: JobStatus) => Promise<void>;
    updatingErrorId: null | string;
    updatingError: null | string;
}

function JobsList({ jobs, updatingId, updateStatus, updatingErrorId, updatingError }: JobsListProps) {
    return (
        <ul className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
            {jobs.map((job) => (
                <JobCard updatingError={updatingError} updatingErrorId={updatingErrorId} updatingId={updatingId} updateStatus={updateStatus} key={job._id} job={job} />
            ))}
        </ul>
    )
}

export default JobsList
