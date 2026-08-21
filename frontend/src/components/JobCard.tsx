import type { Job, JobStatus } from '../types/job';

interface JobCardProps {
    job: Job;
    updatingId: string;
    updateStatus: (jobId: string, jobStatus: JobStatus) => Promise<void>;
    updatingErrorId: null | string;
    updatingError: null | string;
}

function JobsCard({ job, updatingId, updateStatus, updatingErrorId, updatingError }: JobCardProps) {
    const isUpdating = updatingId === job._id;

    async function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
        await updateStatus(job._id, e.target.value as JobStatus);
    }

    return (
        <li className="group rounded-2xl flex flex-col justify-between border border-[#292933] bg-[#19191F] p-5 transition hover:border-[#9297D3]/40 hover:shadow-[0_0_30px_rgba(146,151,211,0.05)]">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-zinc-100">
                        {job.position}
                    </h3>

                    <p className="mt-1 text-sm font-medium text-[#9297D3]">
                        {job.company}
                    </p>
                </div>

                <span className="shrink-0 rounded-full border border-[#9297D3]/20 bg-[#9297D3]/10 px-3 py-1 text-xs font-medium text-[#A3A7DC]">
                    {job.status}
                </span>
            </div>

            <div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div>
                        <p className="text-xs text-zinc-500">
                            Location
                        </p>
                        <p className="mt-1 text-sm text-zinc-300">
                            {job.location}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-zinc-500">
                            Salary
                        </p>
                        <p className="mt-1 text-sm text-zinc-300">
                            €{job.salary}
                        </p>
                    </div>
                </div>

                <div className="mt-5 border-t border-[#292933] pt-4">
                    <div className="flex items-center justify-between gap-3">
                        <select
                            value={job.status}
                            disabled={isUpdating}
                            onChange={handleSelectChange}
                            className="rounded-lg disabled:cursor-not-allowed disabled:opacity-60 text-center border border-[#292933] appearance-none cursor-pointer bg-[#111116] px-3 py-2 text-xs text-zinc-300 outline-none transition focus:border-[#9297D3]/60"
                        >
                            {isUpdating ? (
                                <option value={job.status}>Updating...</option>
                            ) : (
                                <>
                                    <option value="applied">Applied</option>
                                    <option value="interview">Interview</option>
                                    <option value="offer">Offer</option>
                                    <option value="rejected">Rejected</option>
                                </>
                            )}
                        </select>

                        <button
                            type="button"
                            disabled={isUpdating}
                            className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 rounded-lg px-3 py-2 text-xs font-medium text-zinc-500 transition hover:bg-red-400/10 hover:text-red-400"
                        >
                            Delete
                        </button>
                    </div>

                    {updatingErrorId === job._id && updatingError && (
                        <p className="mt-3 text-xs text-red-400">
                            {updatingError}
                        </p>
                    )}
                </div>
            </div>
        </li>
    )
}

export default JobsCard
