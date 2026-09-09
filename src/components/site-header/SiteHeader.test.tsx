import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "./SiteHeader";

describe("SiteHeader", () => {
  it("shows the MOOD. home link and primary navigation", () => {
    render(<SiteHeader />);

    expect(
      screen.getByRole("link", { name: "MOOD." }),
    ).toHaveAttribute("href", "/");

    expect(
      screen.getAllByRole("link", { name: "RESERVE" }).length,
    ).toBeGreaterThan(0);

    expect(
      screen.getAllByRole("link", { name: "COUPON" }).length,
    ).toBeGreaterThan(0);
  });

  it("opens and closes the mobile navigation", async () => {
    const user = userEvent.setup();

    render(<SiteHeader />);

    const button = screen.getByRole("button", {
      name: "メニューを開く",
    });

    expect(button).toHaveAttribute("aria-expanded", "false");

    await user.click(button);

    expect(
      screen.getByRole("button", { name: "メニューを閉じる" }),
    ).toHaveAttribute("aria-expanded", "true");

    expect(
      screen.getByRole("navigation", {
        name: "モバイルナビゲーション",
      }),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(
      screen.getByRole("button", { name: "メニューを開く" }),
    ).toHaveAttribute("aria-expanded", "false");
  });
});