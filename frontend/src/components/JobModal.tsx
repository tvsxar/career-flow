import { useState } from 'react';

import type { JobData } from '../types/job';

interface JobModalProps {
    onClose: () => void;
    loading: boolean;
    addNewJob: (jobData: JobData) => Promise<boolean>;
    error: string;
}

function JobModal({ onClose, loading, addNewJob, error }: JobModalProps) {
    const [formData, setFormData] = useState<JobData>({
        position: '',
        company: '',
        location: '',
        salary: 0,
        status: 'applied'
    });

    function handleInputChange(e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: name === 'salary' ? Number(value) : value
        }))
    }

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();

        const isSubmitted = await addNewJob(formData);

        if(isSubmitted) onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-3xl border border-[#292933] bg-[#19191F] p-6 shadow-2xl sm:p-8">

                <div className="mb-7 flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
                            Add new job
                        </h2>

                        <p className="mt-1 text-sm text-zinc-500">
                            Add a new application to your job search.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-lg text-zinc-500 transition hover:bg-[#24242C] hover:text-zinc-200"
                    >
                        ×
                    </button>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>

                    <div>
                        <label
                            htmlFor="position"
                            className="mb-2 block text-sm font-medium text-zinc-300"
                        >
                            Position
                        </label>

                        <input
                            id="position"
                            onChange={handleInputChange}
                            value={formData.position}
                            name="position"
                            type="text"
                            placeholder="Frontend Developer"
                            className="w-full rounded-xl border border-[#292933] bg-[#111116] px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-[#9297D3]/70 focus:ring-4 focus:ring-[#9297D3]/10"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="company"
                            className="mb-2 block text-sm font-medium text-zinc-300"
                        >
                            Company
                        </label>

                        <input
                            id="company"
                            onChange={handleInputChange}
                            value={formData.company}
                            name="company"
                            type="text"
                            placeholder="Spotify"
                            className="w-full rounded-xl border border-[#292933] bg-[#111116] px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-[#9297D3]/70 focus:ring-4 focus:ring-[#9297D3]/10"
                        />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="location"
                                className="mb-2 block text-sm font-medium text-zinc-300"
                            >
                                Location
                            </label>

                            <input
                                id="location"
                                onChange={handleInputChange}
                                value={formData.location}
                                name="location"
                                type="text"
                                placeholder="Warsaw, Poland"
                                className="w-full rounded-xl border border-[#292933] bg-[#111116] px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-[#9297D3]/70 focus:ring-4 focus:ring-[#9297D3]/10"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="salary"
                                className="mb-2 block text-sm font-medium text-zinc-300"
                            >
                                Salary
                            </label>

                            <input
                                id="salary"
                                onChange={handleInputChange}
                                value={formData.salary}
                                name="salary"
                                type="number"
                                placeholder="2800"
                                className="w-full rounded-xl border border-[#292933] bg-[#111116] px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-[#9297D3]/70 focus:ring-4 focus:ring-[#9297D3]/10"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="status"
                            className="mb-2 block text-sm font-medium text-zinc-300"
                        >
                            Status
                        </label>

                        <select
                            id="status"
                            onChange={handleInputChange}
                            name="status"
                            value={formData.status}
                            className="w-full cursor-pointer rounded-xl border border-[#292933] bg-[#111116] px-4 py-3 text-sm text-zinc-300 outline-none transition focus:border-[#9297D3]/70 focus:ring-4 focus:ring-[#9297D3]/10"
                        >
                            <option value="applied">Applied</option>
                            <option value="interview">Interview</option>
                            <option value="offer">Offer</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 border-t border-[#292933] pt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer rounded-xl border border-[#292933] bg-[#111116] px-4 py-2.5 text-sm font-medium text-zinc-400 transition hover:bg-[#24242C] hover:text-zinc-200"
                        >
                            Cancel
                        </button>

                        <button
                            disabled={loading}
                            type="submit"
                            className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 rounded-xl bg-[#9297D3] px-5 py-2.5 text-sm font-semibold text-[#111116] transition hover:bg-[#A3A7DC] active:scale-[0.98]"
                        >
                            {loading ? 'Adding job...' : 'Add job'}
                        </button>
                    </div>

                </form>

                {error &&
                    <div className="rounded-xl mt-4 border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-400">
                        {error}
                    </div>}
            </div>
        </div>
    )
}

export default JobModal
