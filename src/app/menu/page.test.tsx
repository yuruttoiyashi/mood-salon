import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MenuPage from "./page";

describe("MenuPage", () => {
  it("renders the MENU page and all service categories", () => {
    render(<MenuPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "MENU",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "COLOR",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "EXTENSION",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "HAIR REPAIR",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "HOME CARE",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("ONE COLOR"),
    ).toBeInTheDocument();
  });

  it("links the category index to each menu section", () => {
    render(<MenuPage />);

    expect(
      screen.getByRole("link", {
        name: "COLOR",
      }),
    ).toHaveAttribute("href", "#color");

    expect(
      screen.getByRole("link", {
        name: "EXTENSION",
      }),
    ).toHaveAttribute("href", "#extension");

    expect(
      screen.getByRole("link", {
        name: "HAIR REPAIR",
      }),
    ).toHaveAttribute("href", "#hair-repair");

    expect(
      screen.getByRole("link", {
        name: "HOME CARE",
      }),
    ).toHaveAttribute("href", "#home-care");
  });
});