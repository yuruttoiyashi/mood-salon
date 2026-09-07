import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionHeading } from "./SectionHeading";
import { PageHero } from "../page-hero/PageHero";

describe("editorial headings", () => {
  it("renders SectionHeading title as a level 2 heading", () => {
    render(
      <SectionHeading
        eyebrow="OUR SPECIALITY"
        title="DESIGN YOUR MOOD."
        description="なりたい雰囲気を、髪から。"
      />,
    );

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "DESIGN YOUR MOOD.",
      }),
    ).toBeInTheDocument();
  });

  it("renders PageHero title as a level 1 heading", () => {
    render(
      <PageHero
        eyebrow="TOKYO HAIR SALON"
        title="MOOD."
        subtitle="BE YOUR OWN MOOD."
      />,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "MOOD.",
      }),
    ).toBeInTheDocument();
  });
});