import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useSession } from '../lib/auth-client';
import type { Job, JobData, JobStatus } from '../types/job';
import { getJobs, createJob, updateJobStatus } from '../api/jobsApi';

import MainLayout from '../layouts/MainLayout';
import JobsList from '../components/JobsList';
import JobModal from '../components/JobModal';

function DashboardPage() {
    const { data: session, isPending } = useSession();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [creatingError, setCreatingError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [updatingId, setUpdatingId] = useState<string>('');
    const [updatingError, setUpdatingError] = useState<string | null>(null);
    const [updatingErrorId, setUpdatingErrorId] = useState<string | null>(null);

    function toggleModal() {
        if (!isModalOpen) setCreatingError(null);
        setIsModalOpen(prev => !prev)
    }

    async function addNewJob(jobData: JobData) {
        setIsCreating(true);
        setCreatingError(null)

        try {
            const job = await createJob(jobData);
            setJobs(prev => [job, ...prev]);

            return true;
        } catch (err) {
            setCreatingError(
                err instanceof Error
                    ? err.message
                    : "Failed to create job"
            );

            return false;
        } finally {
            setIsCreating(false);
        }
    }

    async function updateStatus(jobId: string, jobStatus: JobStatus) {
        setUpdatingId(jobId);
        setUpdatingError(null);
        setUpdatingErrorId(null);

        try {
            const updatedJob = await updateJobStatus(jobId, jobStatus);

            setJobs(prev => prev.map(job => job._id === jobId ? updatedJob : job));
        } catch (err) {
            setUpdatingError(
                err instanceof Error
                    ? err.message
                    : "Failed to update job status"
            );

            setUpdatingErrorId(jobId);
        } finally {
            setUpdatingId('');
        }
    }

    useEffect(() => {
        if (!session) return;

        async function fetchJobs() {
            setLoading(true);
            setError(null);

            try {
                const jobs = await getJobs();
                setJobs(jobs);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load jobs"
                );
            } finally {
                setLoading(false);
            }
        }

        fetchJobs();
    }, [session?.user.id])

    if (isPending) {
        return (
            <MainLayout>
                <div className="flex min-h-[70vh] items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#292933] border-t-[#9297D3]" />
                </div>
            </MainLayout>
        );
    }

    if (!session) {
        return (
            <Navigate to="/" replace />
        )
    }

    return (
        <MainLayout>
            <div className="px-4 py-10 sm:px-8 lg:px-16">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
                            Your applications
                        </h1>

                        <p className="mt-2 text-sm text-zinc-500">
                            Track and manage your job applications.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={toggleModal}
                        className="cursor-pointer rounded-xl bg-[#9297D3] px-4 py-2.5 text-sm font-semibold text-[#111116] transition hover:bg-[#A3A7DC] active:scale-[0.98]"
                    >
                        + Add job
                    </button>
                </div>

                {loading ? (
                    <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="h-52 animate-pulse rounded-2xl border border-[#292933] bg-[#19191F]"
                            />
                        ))}
                    </div>
                ) : error ? (
                    <div className="rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-400">
                        {error}
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
                        <h2 className="text-xl font-semibold text-zinc-200">
                            No jobs yet
                        </h2>

                        <p className="mt-2 max-w-sm text-sm text-zinc-500">
                            Add your first application to start tracking your job search.
                        </p>
                    </div>
                ) : (
                    <JobsList updatingError={updatingError} updatingErrorId={updatingErrorId} updateStatus={updateStatus} updatingId={updatingId} jobs={jobs} />
                )}

                {isModalOpen && <JobModal error={creatingError} addNewJob={addNewJob} loading={isCreating} onClose={toggleModal} />}
            </div>
        </MainLayout>
    );
}

export default DashboardPage;
