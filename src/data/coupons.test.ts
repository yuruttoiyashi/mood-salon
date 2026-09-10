import { describe, expect, it } from "vitest";
import { coupons } from "./coupons";

describe("coupons", () => {
  it("defines the three approved representative coupon types", () => {
    expect(
      coupons.map((coupon) => coupon.id),
    ).toEqual([
      "first-visit",
      "color-focus",
      "hair-repair",
    ]);
  });

  it("keeps coupons clearly usable as demo offers", () => {
    for (const coupon of coupons) {
      expect(coupon.price).toMatch(/^¥/);

      expect(
        coupon.notes.length,
      ).toBeGreaterThan(0);
    }
  });
});