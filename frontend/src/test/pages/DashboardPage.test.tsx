import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import DashboardPage from "../../pages/DashboardPage";
import { useSession } from "../../lib/auth-client";
import {
    getJobs,
    createJob,
    updateJobStatus,
    deleteJob,
} from "../../api/jobsApi";

import type { Job } from "../../types/job";

vi.mock("../../lib/auth-client", () => ({
    useSession: vi.fn(),
}));

vi.mock("../../api/jobsApi", () => ({
    getJobs: vi.fn(),
    createJob: vi.fn(),
    updateJobStatus: vi.fn(),
    deleteJob: vi.fn(),
}));

describe("DashboardPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        vi.mocked(useSession).mockReturnValue({
            data: {
                user: {
                    id: "user1",
                },
            },
            isPending: false,
        } as ReturnType<typeof useSession>);
    })

    const jobs: Job[] = [
        {
            _id: "1",
            user: "user1",
            position: "Frontend Developer",
            company: "Google",
            location: "Warsaw",
            salary: 3000,
            status: "applied",
            createdAt: "2026-09-01",
            updatedAt: "2026-09-01",
        },
        {
            _id: "2",
            user: "user1",
            position: "Backend Developer",
            company: "Spotify",
            location: "Warsaw",
            salary: 4000,
            status: "interview",
            createdAt: "2026-09-01",
            updatedAt: "2026-09-01",
        },
    ];

    const newJob: Job = {
        _id: "3",
        user: "user1",
        position: "React Developer",
        company: "Microsoft",
        location: "Wroclaw",
        salary: 3200,
        status: "applied",
        createdAt: "2026-09-04",
        updatedAt: "2026-09-04",
    };

    test("should load and render jobs", async () => {
        vi.mocked(getJobs).mockResolvedValue(jobs);

        render(
            <MemoryRouter>
                <DashboardPage />
            </MemoryRouter>
        );

        const frontendJob = await screen.findByRole("heading", { name: "Frontend Developer" });

        expect(frontendJob).toBeInTheDocument();
        expect(
            screen.getByRole("heading", {
                name: "Backend Developer",
            })
        ).toBeInTheDocument();

        expect(screen.getByText("€3500")).toBeInTheDocument();
        expect(screen.getAllByText("Warsaw")).toHaveLength(3);
    });

    test("should show error when jobs loading fails", async () => {
        vi.mocked(getJobs).mockRejectedValue(new Error("Failed to fetch jobs"));

        render(
            <MemoryRouter>
                <DashboardPage />
            </MemoryRouter>
        );

        const errorMessage = await screen.findByText("Failed to fetch jobs");

        expect(errorMessage).toBeInTheDocument();
        expect(
            screen.queryByRole("heading", {
                name: "Frontend Developer",
            })
        ).not.toBeInTheDocument();
    });

    test("should show empty state when user has no jobs", async () => {
        vi.mocked(getJobs).mockResolvedValue([]);

        render(
            <MemoryRouter>
                <DashboardPage />
            </MemoryRouter>
        );

        const noJobsText = await screen.findByText("No jobs yet");

        expect(noJobsText).toBeInTheDocument();
    });

    test("should create a new job", async () => {
        const user = userEvent.setup();

        vi.mocked(getJobs).mockResolvedValue([]);
        vi.mocked(createJob).mockResolvedValue(newJob);

        render(
            <MemoryRouter>
                <DashboardPage />
            </MemoryRouter>
        );

        await screen.findByText("No jobs yet");
        await user.click(screen.getByRole("button", { name: "+ Add job" }));

        await user.type(screen.getByLabelText("Position"), "React Developer");
        await user.type(screen.getByLabelText("Company"), "Microsoft");
        await user.type(screen.getByLabelText("Location"), "Wroclaw");

        const salaryInput = screen.getByLabelText("Salary");
        await user.clear(salaryInput);
        await user.type(salaryInput, "3200");

        await user.click(screen.getByRole("button", { name: "Add job" }));
        const createdJob = await screen.findByRole("heading", {
            name: "React Developer",
        });

        expect(createdJob).toBeInTheDocument();
        expect(createJob).toHaveBeenCalledTimes(1);
        expect(createJob).toHaveBeenCalledWith({
            position: "React Developer",
            company: "Microsoft",
            location: "Wroclaw",
            salary: 3200,
            status: "applied",
        });
        expect(
            screen.queryByRole("heading", {
                name: "Add new job",
            })
        ).not.toBeInTheDocument();
    });

    test("should show create error and keep modal open", async () => {
        const user = userEvent.setup();

        vi.mocked(getJobs).mockResolvedValue([]);
        vi.mocked(createJob).mockRejectedValue(
            new Error("Failed to create job")
        );

        render(
            <MemoryRouter>
                <DashboardPage />
            </MemoryRouter>
        );

        await screen.findByText("No jobs yet");
        await user.click(screen.getByRole("button", { name: "+ Add job" }));

        await user.type(screen.getByLabelText("Position"), "React Developer");
        await user.type(screen.getByLabelText("Company"), "Microsoft");
        await user.type(screen.getByLabelText("Location"), "Wroclaw");

        const salaryInput = screen.getByLabelText("Salary");
        await user.clear(salaryInput);
        await user.type(salaryInput, "3200");

        await user.click(screen.getByRole("button", { name: "Add job" }));

        const errorMessage = await screen.findByText("Failed to create job");
        const modalHeading = screen.getByRole("heading", { name: "Add new job" });
        const createdJob = screen.queryByRole("heading", {
            name: "React Developer",
        });

        expect(createJob).toHaveBeenCalledTimes(1);
        expect(errorMessage).toBeInTheDocument();
        expect(modalHeading).toBeInTheDocument();
        expect(createdJob).not.toBeInTheDocument();
    });

    test("should update job status", async () => {
        const user = userEvent.setup();

        const updatedJob: Job = {
            ...jobs[0],
            status: "interview",
        };

        vi.mocked(getJobs).mockResolvedValue(jobs);
        vi.mocked(updateJobStatus).mockResolvedValue(updatedJob);

        render(
            <MemoryRouter>
                <DashboardPage />
            </MemoryRouter>
        );

        const frontendHeading = await screen.findByRole("heading", {
            name: "Frontend Developer",
        });
        const frontendCard = frontendHeading.closest("li");

        expect(frontendCard).not.toBeNull();

        const select = within(frontendCard!).getByRole("combobox");
        await user.selectOptions(select, "interview");

        expect(updateJobStatus).toHaveBeenCalledWith("1", "interview");
        expect(select).toHaveValue("interview");
    });

    test("should delete a job", async () => {
        const user = userEvent.setup();

        vi.mocked(getJobs).mockResolvedValue(jobs);
        vi.mocked(deleteJob).mockResolvedValue(undefined);

        render(
            <MemoryRouter>
                <DashboardPage />
            </MemoryRouter>
        );

        const frontendHeading = await screen.findByRole("heading", {
            name: "Frontend Developer"
        });
        const frontendCard = frontendHeading.closest("li");

        expect(frontendCard).not.toBeNull();

        const deleteButton = within(frontendCard!).getByRole("button", {
            name: "Delete"
        });
        await user.click(deleteButton);

        expect(deleteJob).toHaveBeenCalledWith("1");
        await waitFor(() => {
            expect(screen.queryByRole("heading", {
                name: "Frontend Developer",
            })).not.toBeInTheDocument();
        })
        expect(
            screen.getByRole("heading", {
                name: "Backend Developer",
            })
        ).toBeInTheDocument();
    });
})
