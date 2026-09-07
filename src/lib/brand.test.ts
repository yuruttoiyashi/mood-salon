import { describe, expect, it } from "vitest";
import { brandTokens } from "./brand";

describe("brandTokens", () => {
  it("matches the approved palette", () => {
    expect(brandTokens.colors).toEqual({
      white: "#FFFFFF",
      softGray: "#F5F5F5",
      charcoal: "#171717",
      black: "#0A0A0A",
      silver: "#B8BCC2",
    });
  });
});