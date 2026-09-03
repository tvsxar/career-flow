import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import JobsCard from "../../components/JobCard";
import type { Job } from "../../types/job";
import type {
    UpdateJobState,
    DeleteJobState,
} from "../../types/jobActions";

describe("JobsCard", () => {
    const job: Job = {
        _id: "job123",
        user: "user123",
        position: "Frontend Developer",
        company: "Google",
        location: "Warsaw",
        status: "applied",
        salary: 3000,
        createdAt: "2026-09-01",
        updatedAt: "2026-09-01",
    };

    test("should render job information correctly", () => {
        const updateJob: UpdateJobState = {
            id: "",
            error: null,
            errorId: null,
            onUpdate: vi.fn(),
        };

        const deleteJob: DeleteJobState = {
            id: "",
            error: null,
            errorId: null,
            onDelete: vi.fn(),
        };

        render(
            <JobsCard job={job} updateJob={updateJob} deleteJob={deleteJob} />
        )

        expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
        expect(screen.getByText("Warsaw")).toBeInTheDocument();
        expect(screen.getByText("Google")).toBeInTheDocument();
        expect(screen.getByText("€3000")).toBeInTheDocument();
    });

    test("should call onDelete with job id when Delete is clicked", async () => {
        const onDelete = vi.fn();

        const updateJob: UpdateJobState = {
            id: "",
            error: null,
            errorId: null,
            onUpdate: vi.fn(),
        };

        const deleteJob: DeleteJobState = {
            id: "",
            error: null,
            errorId: null,
            onDelete,
        };

        render(
            <JobsCard job={job} updateJob={updateJob} deleteJob={deleteJob} />
        );

        const user = userEvent.setup();
        const deleteButton = screen.getByRole("button", { name: "Delete" });
        await user.click(deleteButton);

        expect(onDelete).toHaveBeenCalledWith("job123");
    });

    test("should call onUpdate with job id and new status", async () => {
        const onUpdate = vi.fn();

        const updateJob: UpdateJobState = {
            id: "",
            error: null,
            errorId: null,
            onUpdate
        };

        const deleteJob: DeleteJobState = {
            id: "",
            error: null,
            errorId: null,
            onDelete: vi.fn(),
        };

        render(
            <JobsCard job={job} updateJob={updateJob} deleteJob={deleteJob} />
        );

        const user = userEvent.setup();
        const select = screen.getByRole("combobox");
        await user.selectOptions(select, "interview");

        expect(onUpdate).toHaveBeenCalledWith("job123", "interview");
    });

    test("should show updating state", () => {
        const updateJob: UpdateJobState = {
            id: "job123",
            error: null,
            errorId: null,
            onUpdate: vi.fn(),
        };

        const deleteJob: DeleteJobState = {
            id: "",
            error: null,
            errorId: null,
            onDelete: vi.fn()
        };

        render(
            <JobsCard job={job} updateJob={updateJob} deleteJob={deleteJob} />
        );

        const select = screen.getByRole("combobox");
        const deleteButton = screen.getByRole("button", { name: "Delete" });
        const updatingText = screen.getByText("Updating...");

        expect(select).toBeDisabled();
        expect(deleteButton).toBeDisabled();
        expect(updatingText).toBeInTheDocument();
    });

    test("should show update error for this job", () => {
        const updateJob: UpdateJobState = {
            id: "job123",
            error: "Failed to update job",
            errorId: "job123",
            onUpdate: vi.fn(),
        };

        const deleteJob: DeleteJobState = {
            id: "",
            error: null,
            errorId: null,
            onDelete: vi.fn()
        };

        render(
            <JobsCard job={job} updateJob={updateJob} deleteJob={deleteJob} />
        );

        const errorText = screen.getByText("Failed to update job");

        expect(errorText).toBeInTheDocument();
    });

    test("should not show update error for another job", () => {
        const updateJob: UpdateJobState = {
            id: "",
            error: "Failed to update job",
            errorId: "job343",
            onUpdate: vi.fn(),
        };

        const deleteJob: DeleteJobState = {
            id: "",
            error: null,
            errorId: null,
            onDelete: vi.fn()
        };

        render(
            <JobsCard job={job} updateJob={updateJob} deleteJob={deleteJob} />
        );

        const errorText = screen.queryByText("Failed to update job");

        expect(errorText).not.toBeInTheDocument();
    });
})
