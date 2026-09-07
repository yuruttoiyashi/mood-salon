import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home", () => {
  it("shows the MOOD. brand hero", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "MOOD.",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("BE YOUR OWN MOOD."),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/派手も、透明感も、ツヤも。/),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /RESERVE/,
      }),
    ).toHaveAttribute("href", "/reserve");
  });
});