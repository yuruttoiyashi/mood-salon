import { describe, expect, it } from "vitest";
import { menuCategories } from "./menus";
import { getProductById, products } from "./products";
import { salons } from "./salons";

describe("products", () => {
  it("defines four fictional MOOD. LAB products", () => {
    expect(products).toHaveLength(4);
    expect(products.map(({ id }) => id)).toEqual([
      "care-shampoo",
      "repair-mask",
      "color-veil-oil",
      "extension-serum",
    ]);
  });

  it("uses valid salon and menu relationships", () => {
    const salonSlugs = new Set(salons.map(({ slug }) => slug));
    const categoryIds = new Set(menuCategories.map(({ id }) => id));
    for (const product of products) {
      expect(product.availableAt.length).toBeGreaterThan(0);
      expect(product.availableAt.every((slug) => salonSlugs.has(slug))).toBe(true);
      expect(categoryIds.has(product.relatedMenuCategory)).toBe(true);
      expect(product.price).toMatch(/^¥/);
    }
  });

  it("returns undefined for an unknown product", () => {
    expect(getProductById("unknown")).toBeUndefined();
  });
});
