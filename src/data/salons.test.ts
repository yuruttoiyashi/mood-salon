import { describe, expect, it } from "vitest";
import { getSalonBySlug, salons } from "./salons";

describe("salons", () => {
  it("defines exactly the three approved MOOD. salons", () => {
    expect(salons.map((salon) => salon.slug)).toEqual([
      "shibuya",
      "omotesando",
      "shinjuku",
    ]);
  });

  it("gives every salon specialties and valid image metadata", () => {
    for (const salon of salons) {
      expect(salon.specialties.length).toBeGreaterThan(0);

      expect(salon.heroImage.src).toMatch(
        /^\/images\/salons\//,
      );

      expect(
        salon.heroImage.alt.length,
      ).toBeGreaterThan(0);

      expect(
        salon.heroImage.width,
      ).toBeGreaterThan(0);

      expect(
        salon.heroImage.height,
      ).toBeGreaterThan(0);

      expect(
        salon.gallery.length,
      ).toBeGreaterThanOrEqual(2);
    }
  });

  it("returns undefined for an unknown salon slug", () => {
    expect(
      getSalonBySlug("unknown"),
    ).toBeUndefined();
  });
});