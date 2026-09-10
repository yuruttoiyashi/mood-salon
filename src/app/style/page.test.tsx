import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StylePage from "./page";

describe("StylePage", () => {
  it("renders the STYLE collection with its imagery and reserve link", () => {
    render(<StylePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "STYLE",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/架空のスタイルコレクション/)).toBeInTheDocument();

    const styleImages = screen.getAllByRole("img");
    expect(styleImages).toHaveLength(9);
    for (const image of styleImages) {
      expect(image).toHaveAccessibleName(/.+/);
    }

    expect(screen.getByRole("link", { name: /RESERVE/i })).toHaveAttribute(
      "href",
      "/reserve",
    );
  });
});
