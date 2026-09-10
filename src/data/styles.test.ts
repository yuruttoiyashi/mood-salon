import { describe, expect, it } from "vitest";
import { salons } from "./salons";
import {
  getHairStyleById,
  getHairStylesByCategory,
  hairStyles,
  styleCategories,
} from "./styles";

describe("hairStyles", () => {
  it("defines nine styles across all approved categories", () => {
    expect(hairStyles).toHaveLength(9);
    expect(styleCategories.map(({ id }) => id)).toEqual([
      "color",
      "sheer",
      "korean",
      "repair",
    ]);
    for (const category of styleCategories) {
      expect(getHairStylesByCategory(category.id).length).toBeGreaterThan(0);
    }
  });

  it("uses valid salons and complete image metadata", () => {
    const salonSlugs = new Set(salons.map(({ slug }) => slug));
    for (const style of hairStyles) {
      expect(salonSlugs.has(style.salonSlug)).toBe(true);
      expect(style.image.src).toMatch(/^\/images\//);
      expect(style.image.alt.length).toBeGreaterThan(0);
      expect(style.image.width).toBeGreaterThan(0);
      expect(style.image.height).toBeGreaterThan(0);
    }
  });

  it("looks up known and unknown style IDs explicitly", () => {
    expect(getHairStyleById("neon-bob")?.title).toBe("NEON BOB");
    expect(getHairStyleById("unknown")).toBeUndefined();
  });
});
