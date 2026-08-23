interface AnalyticsGridProps {
    statusCounts: {
        applied: number;
        rejected: number;
        interview: number;
        offer: number;
    };
    interviewRate: number;
    averageSalary: number;
    topLocation: string;
    applicationsCount: number;
}

function AnalyticsGrid({ statusCounts, interviewRate, averageSalary, topLocation, applicationsCount }: AnalyticsGridProps) {
    return (
        <div className="mb-10">
            <div className="mb-5">
                <h2 className="text-lg font-semibold text-zinc-100">
                    Analytics
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                    Overview of your job search progress.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                {/* Applications */}
                <div className="rounded-2xl border border-[#292933] bg-[#19191F] p-5">
                    <p className="text-sm font-medium text-zinc-500">
                        Applications
                    </p>

                    <p className="mt-3 text-3xl font-semibold tracking-tight text-zinc-100">
                        {applicationsCount}
                    </p>
                </div>

                {/* Interviews */}
                <div className="rounded-2xl border border-[#292933] bg-[#19191F] p-5">
                    <p className="text-sm font-medium text-zinc-500">
                        Interviews
                    </p>

                    <p className="mt-3 text-3xl font-semibold tracking-tight text-zinc-100">
                        {statusCounts.interview}
                    </p>
                </div>

                {/* Offers */}
                <div className="rounded-2xl border border-[#292933] bg-[#19191F] p-5">
                    <p className="text-sm font-medium text-zinc-500">
                        Offers
                    </p>

                    <p className="mt-3 text-3xl font-semibold tracking-tight text-zinc-100">
                        {statusCounts.offer}
                    </p>
                </div>

                {/* Rejected */}
                <div className="rounded-2xl border border-[#292933] bg-[#19191F] p-5">
                    <p className="text-sm font-medium text-zinc-500">
                        Rejected
                    </p>

                    <p className="mt-3 text-3xl font-semibold tracking-tight text-zinc-100">
                        {statusCounts.rejected}
                    </p>
                </div>

                {/* Interview Rate */}
                <div className="rounded-2xl border border-[#292933] bg-[#19191F] p-5">
                    <p className="text-sm font-medium text-zinc-500">
                        Interview rate
                    </p>

                    <p className="mt-3 text-3xl font-semibold tracking-tight text-zinc-100">
                        {Math.round(interviewRate)}%
                    </p>
                </div>

                {/* Average Salary */}
                <div className="rounded-2xl border border-[#292933] bg-[#19191F] p-5">
                    <p className="text-sm font-medium text-zinc-500">
                        Average salary
                    </p>

                    <p className="mt-3 text-3xl font-semibold tracking-tight text-zinc-100">
                        €{averageSalary}
                    </p>
                </div>

                {/* Top Location */}
                <div className="rounded-2xl border border-[#292933] bg-[#19191F] p-5 sm:col-span-2 lg:col-span-2">
                    <p className="text-sm font-medium text-zinc-500">
                        Top location
                    </p>

                    <p className="mt-3 truncate text-3xl font-semibold tracking-tight text-zinc-100">
                        {topLocation}
                    </p>
                </div>

            </div>
        </div>
    );
}

export default AnalyticsGrid;
