import { beforeEach, describe, test, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import JobsList from "../../components/JobsList";
import type { Job } from "../../types/job";

describe("JobsList", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })

    const updateJob = {
        id: "",
        error: null,
        errorId: null,
        onUpdate: vi.fn(),
    };

    const deleteJob = {
        id: "",
        error: null,
        errorId: null,
        onDelete: vi.fn(),
    };

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
            salary: 3500,
            status: "interview",
            createdAt: "2026-09-01",
            updatedAt: "2026-09-01",
        }
    ];

    test("should render all jobs", () => {
        render(<JobsList jobs={jobs} updateJob={updateJob} deleteJob={deleteJob} />)

        const frontendPosition = screen.getByRole("heading", {
            name: "Frontend Developer",
        });

        const backendPosition = screen.getByRole("heading", {
            name: "Backend Developer",
        });

        expect(frontendPosition).toBeInTheDocument();
        expect(backendPosition).toBeInTheDocument();
    });

    test("should render no jobs when jobs array is empty", () => {
        render(<JobsList jobs={[]} updateJob={updateJob} deleteJob={deleteJob} />)

        const jobCards = screen.queryAllByRole("listitem");

        expect(jobCards).toHaveLength(0);
    });

    test("should call delete handler for selected job", async () => {
        const user = userEvent.setup();

        render(<JobsList jobs={jobs} updateJob={updateJob} deleteJob={deleteJob} />)

        const jobCards = screen.getAllByRole("listitem");

        const firstJobCard = jobCards[0];
        const deleteButton = within(firstJobCard).getByRole("button", {
            name: "Delete"
        });

        await user.click(deleteButton);

        expect(deleteJob.onDelete).toHaveBeenCalledTimes(1);
        expect(deleteJob.onDelete).toHaveBeenCalledWith("1");
    });

    test("should call update handler for selected job", async () => {
        const user = userEvent.setup();

        render(<JobsList jobs={jobs} updateJob={updateJob} deleteJob={deleteJob} />)

        const jobCards = screen.getAllByRole("listitem");

        const firstJobCard = jobCards[0];
        const statusSelect = within(firstJobCard).getByRole("combobox");

        await user.selectOptions(statusSelect, "interview");

        expect(updateJob.onUpdate).toHaveBeenCalledTimes(1);
        expect(updateJob.onUpdate).toHaveBeenCalledWith(
            "1",
            "interview"
        );
    });
})
