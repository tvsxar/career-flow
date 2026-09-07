import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AnalyticsGrid from "../../components/AnalyticsGrid";

describe("AnalyticsGrid", () => {
    test("should render analytics data", () => {
        render(<AnalyticsGrid
            statusCounts={{
                applied: 10,
                interview: 4,
                offer: 2,
                rejected: 3,
            }}
            interviewRate={31}
            averageSalary={2800}
            topLocation="Warsaw"
            applicationsCount={19}
        />)

        const heading = screen.getByRole("heading", {
            name: "Analytics"
        });
        const location = screen.getByText("Warsaw");
        const salary = screen.getByText("€2800");
        const interviewRate = screen.getByText("31%");
        const applications = screen.getByText("19");
        const interviews = screen.getByText("4");
        const offers = screen.getByText("2");
        const rejected = screen.getByText("3");

        expect(applications).toBeInTheDocument();
        expect(interviews).toBeInTheDocument();
        expect(offers).toBeInTheDocument();
        expect(rejected).toBeInTheDocument();
        expect(heading).toBeInTheDocument();
        expect(location).toBeInTheDocument();
        expect(salary).toBeInTheDocument();
        expect(interviewRate).toBeInTheDocument();
    });

    test("should round interview rate", () => {
        render(<AnalyticsGrid
            statusCounts={{
                applied: 10,
                interview: 4,
                offer: 2,
                rejected: 3,
            }}
            interviewRate={31.6}
            averageSalary={2800}
            topLocation="Warsaw"
            applicationsCount={19}
        />)

        expect(screen.getByText("32%")).toBeInTheDocument();
    })
})
