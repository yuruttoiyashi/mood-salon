import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SalonDetailPage, {
  generateStaticParams,
} from "./page";

describe("SalonDetailPage", () => {
  it("generates routes for all three salons", () => {
    expect(generateStaticParams()).toEqual([
      { slug: "shibuya" },
      { slug: "omotesando" },
      { slug: "shinjuku" },
    ]);
  });

  it("renders the SHIBUYA salon details", async () => {
    const page = await SalonDetailPage({
      params: Promise.resolve({
        slug: "shibuya",
      }),
    });

    render(page);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "MOOD. SHIBUYA",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "COLOR OUTSIDE THE LINES.",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "HIGH TONE COLOR",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /東京都渋谷区神南/,
      ),
    ).toBeInTheDocument();
  });

  it("uses the Next.js not-found response for an unknown salon", async () => {
    await expect(
      SalonDetailPage({
        params: Promise.resolve({
          slug: "unknown",
        }),
      }),
    ).rejects.toThrow(
      "NEXT_HTTP_ERROR_FALLBACK;404",
    );
  });
});