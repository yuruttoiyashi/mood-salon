import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DemoNotice } from "./DemoNotice";

describe("DemoNotice", () => {
  it("shows that MOOD. is a fictional portfolio project", () => {
    render(<DemoNotice />);

    expect(
      screen.getByText(/FICTIONAL PORTFOLIO PROJECT/i),
    ).toBeInTheDocument();
  });

  it("explains that no real reservation is sent", () => {
    render(<DemoNotice context="reservation" />);

    expect(
      screen.getByText(/実際の予約は送信されません/),
    ).toBeInTheDocument();
  });

  it("explains that no real payment is processed", () => {
    render(<DemoNotice context="order" />);

    expect(
      screen.getByText(/実際の購入・決済は行われません/),
    ).toBeInTheDocument();
  });
});