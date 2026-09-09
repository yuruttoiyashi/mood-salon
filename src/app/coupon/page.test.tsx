import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CouponPage from "./page";

describe("CouponPage", () => {
  it("renders the COUPON page and representative offers", () => {
    render(<CouponPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "COUPON",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("CUT + COLOR + CARE"),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "DOUBLE COLOR + TREATMENT",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "SHEER COLOR + PREMIUM REPAIR",
      ),
    ).toBeInTheDocument();
  });

  it("provides reserve links for every coupon", () => {
    render(<CouponPage />);

    const reserveLinks =
      screen.getAllByRole("link", {
        name: /RESERVE/i,
      });

    expect(reserveLinks).toHaveLength(3);

    for (const link of reserveLinks) {
      expect(link).toHaveAttribute(
        "href",
        "/reserve",
      );
    }
  });
});