import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import JobModal from "../../components/JobModal";

describe("JobModal", () => {
    test("should allow user to fill in the form", async () => {
        const user = userEvent.setup();

        render(
            <JobModal
                onClose={vi.fn()}
                loading={false}
                addNewJob={vi.fn()}
                error={null}
            />,
        );

        const positionInput = screen.getByLabelText("Position");
        const companyInput = screen.getByLabelText("Company");
        const locationInput = screen.getByLabelText("Location");
        const salaryInput = screen.getByLabelText("Salary");
        const statusSelect = screen.getByLabelText("Status");

        await user.type(positionInput, "Frontend Developer");
        await user.type(companyInput, "Google");
        await user.type(locationInput, "Warsaw");

        await user.clear(salaryInput);
        await user.type(salaryInput, "3000");

        await user.selectOptions(statusSelect, "interview");

        expect(positionInput).toHaveValue("Frontend Developer");
        expect(companyInput).toHaveValue("Google");
        expect(locationInput).toHaveValue("Warsaw");
        expect(salaryInput).toHaveValue(3000);
        expect(statusSelect).toHaveValue("interview");
    });

    test("should submit form data and close modal on success", async () => {
        const user = userEvent.setup();

        const addNewJob = vi.fn().mockResolvedValue(true);
        const onClose = vi.fn();

        render(
            <JobModal
                onClose={onClose}
                loading={false}
                addNewJob={addNewJob}
                error={null}
            />,
        );

        const positionInput = screen.getByLabelText("Position");
        const companyInput = screen.getByLabelText("Company");
        const locationInput = screen.getByLabelText("Location");
        const salaryInput = screen.getByLabelText("Salary");

        await user.type(positionInput, "Frontend Developer");
        await user.type(companyInput, "Google");
        await user.type(locationInput, "Warsaw");

        await user.clear(salaryInput);
        await user.type(salaryInput, "3000");

        await user.click(screen.getByRole("button", { name: "Add job" }));

        expect(addNewJob).toHaveBeenCalledWith({
            position: "Frontend Developer",
            company: "Google",
            location: "Warsaw",
            salary: 3000,
            status: "applied",
        });
        expect(onClose).toHaveBeenCalled();
    });

    test("should not close modal when submission fails", async () => {
        const user = userEvent.setup();

        const addNewJob = vi.fn().mockResolvedValue(false);
        const onClose = vi.fn();

        render(
            <JobModal
                onClose={onClose}
                loading={false}
                addNewJob={addNewJob}
                error={null}
            />,
        );

        await user.click(screen.getByRole("button", { name: "Add job" }));

        expect(addNewJob).toHaveBeenCalled();
        expect(onClose).not.toHaveBeenCalled();
    });

    test("should show loading state", () => {
        render(
            <JobModal
                onClose={vi.fn()}
                loading={true}
                addNewJob={vi.fn()}
                error={null}
            />,
        );

        const loadingButton = screen.getByRole("button", { name: "Adding job..." });

        expect(loadingButton).toBeDisabled();
    });

    test("should show error message", () => {
        render(
            <JobModal
                onClose={vi.fn()}
                loading={false}
                addNewJob={vi.fn()}
                error="Failed to add job"
            />,
        );

        expect(screen.getByText("Failed to add job")).toBeInTheDocument();
    });
})
