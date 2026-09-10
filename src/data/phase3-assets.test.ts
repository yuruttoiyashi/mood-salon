import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { products } from "./products";
import { staffMembers } from "./staff";
import { hairStyles } from "./styles";

describe("Phase 3 local assets", () => {
  it("provides every image referenced by Phase 3 data", () => {
    const images = [
      ...hairStyles.map(({ image }) => image),
      ...staffMembers.map(({ image }) => image),
      ...products.map(({ image }) => image),
    ];

    for (const image of images) {
      const relativePath = image.src.replace(/^\//, "");
      expect(existsSync(join(process.cwd(), "public", relativePath))).toBe(true);
    }
  });
});
