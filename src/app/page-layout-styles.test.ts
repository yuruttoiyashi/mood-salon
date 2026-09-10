import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const pageStylePaths = [
  "src/app/menu/menu.module.css",
  "src/app/coupon/coupon.module.css",
  "src/app/salon/salon.module.css",
  "src/app/salon/[slug]/salon-detail.module.css",
  "src/app/style/style.module.css",
  "src/app/staff/staff.module.css",
];

const readProjectFile = (path: string) =>
  readFileSync(resolve(process.cwd(), path), "utf8");

describe("Phase 2 page layout styles", () => {
  it("uses defined design tokens when calculating page width", () => {
    const globalStyles = readProjectFile("src/app/globals.css");
    const definedTokens = new Set(
      [...globalStyles.matchAll(/(--[\w-]+)\s*:/g)].map(
        ([, token]) => token,
      ),
    );

    const undefinedLayoutTokens = pageStylePaths.flatMap((path) => {
      const styles = readProjectFile(path);
      const pageRule = styles.match(/\.page\s*\{([\s\S]*?)\}/)?.[1] ?? "";

      return [...pageRule.matchAll(/var\((--[\w-]+)\)/g)]
        .map(([, token]) => token)
        .filter((token) => !definedTokens.has(token))
        .map((token) => `${path}: ${token}`);
    });

    expect(undefinedLayoutTokens).toEqual([]);
  });
});
