import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SalonPage from "./page";

describe("SalonPage", () => {
  it("renders the SALON page and all three locations", () => {
    render(<SalonPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "SALON",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /SHIBUYA/i,
      }),
    ).toHaveAttribute(
      "href",
      "/salon/shibuya",
    );

    expect(
      screen.getByRole("link", {
        name: /OMOTESANDO/i,
      }),
    ).toHaveAttribute(
      "href",
      "/salon/omotesando",
    );

    expect(
      screen.getByRole("link", {
        name: /SHINJUKU/i,
      }),
    ).toHaveAttribute(
      "href",
      "/salon/shinjuku",
    );
  });
});