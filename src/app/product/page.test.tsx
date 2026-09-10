import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProductPage from "./page";

describe("ProductPage", () => {
  it("renders the fictional MOOD. LAB catalog with related destinations", () => {
    render(<ProductPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "PRODUCT",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("MOOD. LAB")).toBeInTheDocument();
    const productCards = screen.getAllByRole("article");
    expect(productCards).toHaveLength(4);

    expect(screen.getByText("MOOD. CARE SHAMPOO")).toBeInTheDocument();
    expect(screen.getByText("¥3,300")).toBeInTheDocument();
    expect(screen.getByText("MOOD. REPAIR MASK")).toBeInTheDocument();
    expect(screen.getByText("¥4,400")).toBeInTheDocument();
    expect(screen.getByText("MOOD. COLOR VEIL OIL")).toBeInTheDocument();
    expect(screen.getByText("¥3,850")).toBeInTheDocument();
    expect(screen.getByText("MOOD. EXTENSION SERUM")).toBeInTheDocument();
    expect(screen.getByText("¥3,520")).toBeInTheDocument();

    expect(
      within(productCards[0]).getByRole("link", { name: /RELATED MENU/i }),
    ).toHaveAttribute("href", "/menu#home-care");
    expect(
      within(productCards[0]).getByRole("link", { name: /SALON LIST/i }),
    ).toHaveAttribute("href", "/salon");
    expect(screen.getByText(/購入機能はありません/)).toBeInTheDocument();
  });
});
