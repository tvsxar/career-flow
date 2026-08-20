import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useSession } from '../lib/auth-client';
import type { Job } from '../types/job';
import { getJobs } from '../api/jobsApi';

import MainLayout from '../layouts/MainLayout';
import JobsList from '../components/JobsList';

function DashboardPage() {
    const { data: session, isPending } = useSession();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
                    <JobsList jobs={jobs} />
                )}
            </div>
        </MainLayout>
    );
}

export default DashboardPage;
