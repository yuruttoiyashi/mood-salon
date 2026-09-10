import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { hairStyles } from "@/data/styles";
import { StyleGallery } from "./StyleGallery";

describe("StyleGallery", () => {
  it("filters styles by the selected category", async () => {
    const user = userEvent.setup();

    render(<StyleGallery styles={hairStyles} />);

    expect(screen.getAllByRole("article")).toHaveLength(9);
    expect(screen.getByRole("button", { name: "ALL" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await user.click(screen.getByRole("button", { name: "SHEER" }));

    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(screen.queryByText("NEON BOB")).not.toBeInTheDocument();
    expect(screen.getByText("PEARL SHEER")).toBeInTheDocument();
    expect(screen.getByText("SILK LONG")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "SHEER" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});
