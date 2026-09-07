import { describe, expect, it } from "vitest";
import { siteConfig } from "./site-config";

describe("siteConfig", () => {
  it("keeps the approved MOOD. navigation order", () => {
    expect(siteConfig.name).toBe("MOOD.");
    expect(siteConfig.navigation.map((item) => item.label)).toEqual([
      "MENU",
      "STYLE",
      "STAFF",
      "PRODUCT",
      "SALON",
      "RESERVE",
    ]);
  });

  it("marks the project as fictional", () => {
    expect(siteConfig.isFictionalPortfolio).toBe(true);
  });
});