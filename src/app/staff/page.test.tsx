import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StaffPage from "./page";

describe("StaffPage", () => {
  it("renders the fictional staff directory with salon and reserve links", () => {
    render(<StaffPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "STAFF",
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(6);
    const renHeading = screen.getByRole("heading", { name: "青木 蓮" });
    expect(renHeading).toBeInTheDocument();
    expect(
      within(renHeading.closest("article") as HTMLElement).getByText(
        "MOOD. SHIBUYA",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/すべて架空のプロフィール/)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /RESERVE/i }).length).toBeGreaterThan(0);
  });
});
