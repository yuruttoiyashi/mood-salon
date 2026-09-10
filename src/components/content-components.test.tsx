import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SalonCard } from "./salon-card/SalonCard";
import { MenuSection } from "./menu-section/MenuSection";
import { CouponCard } from "./coupon-card/CouponCard";
import { salons } from "@/data/salons";
import {
  menuCategories,
  menuItems,
} from "@/data/menus";
import { coupons } from "@/data/coupons";

describe("Phase 2 content components", () => {
  it("links a salon card to its detail route", () => {
    render(
      <SalonCard salon={salons[0]} />,
    );

    expect(
      screen.getByRole("link", {
        name: /SHIBUYA/i,
      }),
    ).toHaveAttribute(
      "href",
      "/salon/shibuya",
    );
  });

  it("renders menu items for one category", () => {
    render(
      <MenuSection
        category={menuCategories[0]}
        items={menuItems.filter(
          (item) => item.category === "color",
        )}
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: "COLOR",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("ONE COLOR"),
    ).toBeInTheDocument();
  });

  it("links coupon cards to the fictional reserve route", () => {
    render(
      <CouponCard coupon={coupons[0]} />,
    );

    expect(
      screen.getByRole("link", {
        name: /RESERVE/i,
      }),
    ).toHaveAttribute(
      "href",
      "/reserve",
    );
  });
});