import { describe, expect, it } from "vitest";
import {
  getMenuItemsByCategory,
  menuCategories,
  menuItems,
} from "./menus";

describe("menus", () => {
  it("defines all four approved categories in order", () => {
    expect(
      menuCategories.map((category) => category.label),
    ).toEqual([
      "COLOR",
      "EXTENSION",
      "HAIR REPAIR",
      "HOME CARE",
    ]);
  });

  it("provides representative items for every category", () => {
    for (const category of menuCategories) {
      expect(
        getMenuItemsByCategory(category.id).length,
      ).toBeGreaterThan(0);
    }
  });

  it("uses display prices and descriptions for every menu item", () => {
    for (const item of menuItems) {
      expect(item.price).toMatch(/^¥/);

      expect(
        item.description.length,
      ).toBeGreaterThan(0);
    }
  });
});