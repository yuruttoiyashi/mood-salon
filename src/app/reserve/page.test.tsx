import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ReservePage from "./page";

describe("ReservePage", () => {
  it("renders the reservation demo disclosure and first selection step", () => {
    render(<ReservePage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "RESERVE" }),
    ).toBeInTheDocument();
    expect(screen.getByText("DEMO RESERVATION")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "1. SELECT" })).toBeInTheDocument();
  });
});
