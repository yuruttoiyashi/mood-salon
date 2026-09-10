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
        name: "RESERVE",
      }),
    ).toHaveAttribute("href", "/reserve");

    expect(
      screen.getByRole("heading", {
        name: "OUR SERVICES",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("HAIR REPAIR"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "OUR SALONS",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("SHIBUYA"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "SPECIAL OFFERS",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("CUT + COLOR + CARE"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /VIEW MENU/i,
      }),
    ).toHaveAttribute("href", "/menu");
    expect(
      screen.getByRole("link", {
        name: /VIEW SALONS/i,
      }),
    ).toHaveAttribute("href", "/salon");
    expect(
      screen.getByRole("link", {
        name: /VIEW COUPONS/i,
      }),
    ).toHaveAttribute("href", "/coupon");
  });
});
