import type { Job } from '../types/job';
import JobCard from '../components/JobCard';

function JobsList({ jobs }: { jobs: Job[] }) {
    return (
        <ul className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
            {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
            ))}
        </ul>
    )
}

export default JobsList
