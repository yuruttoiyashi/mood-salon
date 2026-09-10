# Phase 3 Portfolio Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete every MOOD. primary-navigation destination with typed STYLE, STAFF, PRODUCT, and accessible three-step RESERVE experiences.

**Architecture:** Continue the Phase 2 data-first structure with immutable TypeScript records under `src/data` and focused route/presentation components. STYLE filtering and RESERVE step state are client-only islands; all other page content remains server-rendered. Cross-record tests enforce relationships between salons, menus, styles, staff, and products.

**Tech Stack:** Next.js 16.3.4 App Router, React 19.2.8, TypeScript, CSS Modules, `next/image`, Vitest 4.1.11, Testing Library, `user-event`.

**Spec:** `docs/superpowers/specs/2026-09-10-phase3-portfolio-completion-design.md`

## Global Constraints

- Work only on `feature/mood-phase3-portfolio-completion`, never directly on `main`.
- Keep the site fictional and preserve the shared `DemoNotice`.
- Do not add ecommerce, payment, authentication, CMS, backend, server action, API route, persistence, email, or real calendar availability.
- Reuse `ImageAsset`, `SalonSlug`, `salons`, `menuItems`, and `MenuCategoryId` from Phase 2 instead of duplicating them.
- Preserve Next.js App Router, strict TypeScript, CSS Modules, and the established editorial design system.
- Use `--content-max` and `--page-gutter` for every new route container.
- All meaningful images require useful Japanese alt text and positive dimensions.
- Every behavior change follows RED → GREEN TDD.
- Run the complete test suite after every task and commit only after it passes.
- Keep Task commits small and do not include unrelated refactoring.

## File Map

- `src/data/styles.ts`: style categories, nine hairstyle records, and lookup helpers.
- `src/data/staff.ts`: six fictional staff records and lookup helpers.
- `src/data/products.ts`: four fictional MOOD. LAB products.
- `src/data/phase3-assets.test.ts`: verifies every referenced local Phase 3 asset exists.
- `src/components/style-card/*`: one hairstyle presentation.
- `src/components/style-gallery/*`: accessible category filter and result grid.
- `src/components/staff-card/*`: one fictional staff presentation.
- `src/components/product-card/*`: one product presentation.
- `src/lib/reservation.ts`: reservation values, pure validation, labels, and staff filtering.
- `src/components/reserve-flow/*`: client-only step orchestration and form UI.
- `src/app/style/*`, `src/app/staff/*`, `src/app/product/*`, `src/app/reserve/*`: route composition, route tests, and CSS Modules.
- `public/images/styles/*`, `public/images/staff/*`, `public/images/products/*`: Phase 3 visual assets.

---

### Task 1: Add typed STYLE and STAFF data

**Files:**
- Create: `src/data/styles.test.ts`
- Create: `src/data/styles.ts`
- Create: `src/data/staff.test.ts`
- Create: `src/data/staff.ts`

**Interfaces:**
- Produces `StyleCategory`, `HairStyle`, `styleCategories`, `hairStyles`, `getHairStyleById()`, `getHairStylesByCategory()`.
- Produces `StaffMember`, `staffMembers`, `getStaffById()`, `getStaffBySalon()`.
- Consumes `ImageAsset`, `SalonSlug`, and `salons` from `src/data/salons.ts`.

- [ ] **Step 1: Write failing STYLE data tests**

Create `src/data/styles.test.ts`:

```ts
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
```

- [ ] **Step 2: Run STYLE tests to verify RED**

Run:

```bash
npx vitest run src/data/styles.test.ts
```

Expected: FAIL because `src/data/styles.ts` does not exist.

- [ ] **Step 3: Implement exact STYLE records and helpers**

Create `src/data/styles.ts` with:

```ts
import type { ImageAsset, SalonSlug } from "./salons";

export type StyleCategory = "color" | "sheer" | "korean" | "repair";

export type StyleCategoryOption = {
  id: StyleCategory;
  label: "COLOR" | "SHEER" | "KOREAN" | "REPAIR";
};

export type HairStyle = {
  id: string;
  title: string;
  category: StyleCategory;
  description: string;
  salonSlug: SalonSlug;
  staffId: string;
  image: ImageAsset;
};

export const styleCategories: readonly StyleCategoryOption[] = [
  { id: "color", label: "COLOR" },
  { id: "sheer", label: "SHEER" },
  { id: "korean", label: "KOREAN" },
  { id: "repair", label: "REPAIR" },
];

export function getHairStyleById(id: string): HairStyle | undefined {
  return hairStyles.find((style) => style.id === id);
}

export function getHairStylesByCategory(
  category: StyleCategory,
): readonly HairStyle[] {
  return hairStyles.filter((style) => style.category === category);
}
```

Define `hairStyles` using exactly this content contract:

| id | title | category | salonSlug | staffId | image src | dimensions |
|---|---|---|---|---|---|---|
| `neon-bob` | `NEON BOB` | `color` | `shibuya` | `ren-aoki` | `/images/salons/shibuya-detail-2.jpg` | 1200×900 |
| `vivid-layer` | `VIVID LAYER` | `color` | `shibuya` | `mio-tachibana` | `/images/styles/vivid-layer.jpg` | 1200×1500 |
| `midnight-wolf` | `MIDNIGHT WOLF` | `color` | `shibuya` | `ren-aoki` | `/images/styles/midnight-wolf.jpg` | 1200×1500 |
| `pearl-sheer` | `PEARL SHEER` | `sheer` | `omotesando` | `hina-kurosawa` | `/images/salons/omotesando-detail-2.jpg` | 1200×900 |
| `silk-long` | `SILK LONG` | `sheer` | `omotesando` | `hina-kurosawa` | `/images/styles/silk-long.jpg` | 1200×1500 |
| `seoul-layer` | `SEOUL LAYER` | `korean` | `shinjuku` | `sora-minami` | `/images/salons/shinjuku-detail-2.jpg` | 1200×900 |
| `mocha-wave` | `MOCHA WAVE` | `korean` | `shinjuku` | `sora-minami` | `/images/styles/mocha-wave.jpg` | 1200×1500 |
| `gloss-bob` | `GLOSS BOB` | `repair` | `omotesando` | `yui-shiraishi` | `/images/styles/gloss-bob.jpg` | 1200×1500 |
| `dark-gloss` | `DARK GLOSS` | `repair` | `shinjuku` | `rina-fujimoto` | `/images/styles/dark-gloss.jpg` | 1200×1500 |

Give every record a one-sentence Japanese description and image alt that names the visible hairstyle rather than repeating the title mechanically.

- [ ] **Step 4: Run STYLE tests to verify GREEN**

```bash
npx vitest run src/data/styles.test.ts
```

Expected: PASS.

- [ ] **Step 5: Write failing STAFF relationship tests**

Create `src/data/staff.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { hairStyles } from "./styles";
import { salons } from "./salons";
import { getStaffById, getStaffBySalon, staffMembers } from "./staff";

describe("staffMembers", () => {
  it("defines six fictional staff members, two per salon", () => {
    expect(staffMembers).toHaveLength(6);
    for (const salon of salons) {
      expect(getStaffBySalon(salon.slug)).toHaveLength(2);
    }
  });

  it("keeps staff and style relationships valid", () => {
    const styleIds = new Set(hairStyles.map(({ id }) => id));
    const staffIds = new Set(staffMembers.map(({ id }) => id));

    for (const member of staffMembers) {
      expect(member.specialties.length).toBeGreaterThan(0);
      expect(member.styleIds.length).toBeGreaterThan(0);
      expect(member.styleIds.every((id) => styleIds.has(id))).toBe(true);
    }

    expect(hairStyles.every(({ staffId }) => staffIds.has(staffId))).toBe(true);
  });

  it("looks up known and unknown staff IDs explicitly", () => {
    expect(getStaffById("ren-aoki")?.name).toBe("青木 蓮");
    expect(getStaffById("unknown")).toBeUndefined();
  });
});
```

- [ ] **Step 6: Run STAFF tests to verify RED**

```bash
npx vitest run src/data/staff.test.ts
```

Expected: FAIL because `src/data/staff.ts` does not exist.

- [ ] **Step 7: Implement exact STAFF records and helpers**

Create `src/data/staff.ts` with the `StaffMember` type from the spec and:

```ts
export function getStaffById(id: string): StaffMember | undefined {
  return staffMembers.find((member) => member.id === id);
}

export function getStaffBySalon(
  salonSlug: SalonSlug,
): readonly StaffMember[] {
  return staffMembers.filter((member) => member.salonSlug === salonSlug);
}
```

Define `staffMembers` using exactly these identities and relationships:

| id | name | role | salonSlug | specialties | styleIds | image |
|---|---|---|---|---|---|---|
| `ren-aoki` | `青木 蓮` | `ART DIRECTOR` | `shibuya` | HIGH TONE, DESIGN COLOR | neon-bob, midnight-wolf | `/images/staff/ren-aoki.jpg` |
| `mio-tachibana` | `橘 美緒` | `STYLIST` | `shibuya` | VIVID COLOR, FACE FRAME | vivid-layer | `/images/staff/mio-tachibana.jpg` |
| `hina-kurosawa` | `黒沢 陽菜` | `SALON DIRECTOR` | `omotesando` | SHEER COLOR, LONG HAIR | pearl-sheer, silk-long | `/images/staff/hina-kurosawa.jpg` |
| `yui-shiraishi` | `白石 結衣` | `CARE STYLIST` | `omotesando` | HAIR REPAIR, GLOSS CARE | gloss-bob | `/images/staff/yui-shiraishi.jpg` |
| `sora-minami` | `南 空` | `TOP STYLIST` | `shinjuku` | KOREAN LAYER, WAVE | seoul-layer, mocha-wave | `/images/staff/sora-minami.jpg` |
| `rina-fujimoto` | `藤本 凛` | `STYLIST` | `shinjuku` | DARK TONE, GLOSS COLOR | dark-gloss | `/images/staff/rina-fujimoto.jpg` |

Every portrait is 1200×1500. Give each fictional member a distinct two-sentence Japanese bio consistent with their specialties.

- [ ] **Step 8: Run targeted and full tests, then commit**

```bash
npx vitest run src/data/styles.test.ts src/data/staff.test.ts
npm test
git add src/data/styles.ts src/data/styles.test.ts src/data/staff.ts src/data/staff.test.ts
git commit -m "feat: add typed style and staff data"
```

Expected: targeted tests and full suite PASS.

---

### Task 2: Add typed PRODUCT data

**Files:**
- Create: `src/data/products.test.ts`
- Create: `src/data/products.ts`

**Interfaces:**
- Produces `Product`, `products`, and `getProductById()`.
- Consumes `MenuCategoryId` from `src/data/menus.ts` and `ImageAsset`, `SalonSlug`, `salons` from `src/data/salons.ts`.

- [ ] **Step 1: Write failing PRODUCT tests**

```ts
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
```

- [ ] **Step 2: Run tests to verify RED**

```bash
npx vitest run src/data/products.test.ts
```

Expected: FAIL because `src/data/products.ts` does not exist.

- [ ] **Step 3: Implement the Product interface and exact catalog**

Use the spec's `Product` interface and these records:

| id | name | subtitle | price | relatedMenuCategory | availableAt | image |
|---|---|---|---|---|---|---|
| `care-shampoo` | `MOOD. CARE SHAMPOO` | `COLOR KEEP / DAILY` | `¥3,300` | `home-care` | all three salons | `/images/products/care-shampoo.jpg` |
| `repair-mask` | `MOOD. REPAIR MASK` | `DEEP MOISTURE / WEEKLY` | `¥4,400` | `hair-repair` | omotesando, shinjuku | `/images/products/repair-mask.jpg` |
| `color-veil-oil` | `MOOD. COLOR VEIL OIL` | `GLOSS / HEAT CARE` | `¥3,850` | `color` | all three salons | `/images/products/color-veil-oil.jpg` |
| `extension-serum` | `MOOD. EXTENSION SERUM` | `SMOOTH / LIGHT` | `¥3,520` | `extension` | shibuya | `/images/products/extension-serum.jpg` |

All images are 1200×1200. Each record includes a distinct Japanese description, one-sentence usage instruction, and product-specific alt text.

```ts
export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
```

- [ ] **Step 4: Verify GREEN and commit**

```bash
npx vitest run src/data/products.test.ts
npm test
git add src/data/products.ts src/data/products.test.ts
git commit -m "feat: add typed mood lab product data"
```

Expected: targeted tests and full suite PASS.

---

### Task 3: Create and verify Phase 3 visual assets

**Files:**
- Create: `src/data/phase3-assets.test.ts`
- Create: `public/images/styles/vivid-layer.jpg`
- Create: `public/images/styles/midnight-wolf.jpg`
- Create: `public/images/styles/silk-long.jpg`
- Create: `public/images/styles/mocha-wave.jpg`
- Create: `public/images/styles/gloss-bob.jpg`
- Create: `public/images/styles/dark-gloss.jpg`
- Create: six staff portraits under `public/images/staff/` matching Task 1 IDs.
- Create: four packshots under `public/images/products/` matching Task 2 IDs.

**Interfaces:**
- Consumes all `image.src` values from `hairStyles`, `staffMembers`, and `products`.
- Produces sixteen optimized JPEG files at the exact paths declared by the data modules.

- [ ] **Step 1: Write the failing asset-existence test**

```ts
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
```

- [ ] **Step 2: Run the test to verify RED**

```bash
npx vitest run src/data/phase3-assets.test.ts
```

Expected: FAIL for the sixteen new file paths; the three reused salon images already pass.

- [ ] **Step 3: Generate six hairstyle editorials**

Generate vertical Japanese salon-editorial photographs at 1200×1500. Each image contains one adult model, no visible brand logo, no text, no watermark, no celebrity resemblance, and realistic hair texture.

Use these directions:

- `vivid-layer`: vivid pink-red face-framing layers, charcoal studio.
- `midnight-wolf`: blue-black wolf cut, chrome and dark gray studio.
- `silk-long`: translucent beige long hair, white daylight studio.
- `mocha-wave`: polished mocha Korean waves, white and silver studio.
- `gloss-bob`: healthy glossy neutral-brown bob, pale gray studio.
- `dark-gloss`: deep espresso gloss with clean layers, black-white studio.

Convert outputs to RGB JPEG, strip metadata, resize/crop exactly to 1200×1500, and save to their declared paths.

- [ ] **Step 4: Generate six fictional staff portraits**

Generate vertical editorial portraits at 1200×1500 with varied adult Japanese-presenting fictional people. Use neutral salon lighting, monochrome clothing, natural expressions, no text, no watermark, and no resemblance to known individuals. Keep SHIBUYA portraits higher contrast, OMOTESANDO portraits airy, and SHINJUKU portraits polished black/white.

- [ ] **Step 5: Generate four consistent product packshots**

Generate square 1200×1200 minimal studio packshots for a fictional monochrome `MOOD. LAB` range. Use four visibly distinct containers appropriate to shampoo, mask, oil, and serum. Product text may be limited to `MOOD. LAB` and the exact product name; avoid third-party marks and illegible decorative copy.

- [ ] **Step 6: Verify file type, dimensions, GREEN, and commit**

Run the available image inspector (`magick identify` or `identify`) and confirm every new file is JPEG with its specified dimensions, then:

```bash
npx vitest run src/data/phase3-assets.test.ts
npm test
git add public/images/styles public/images/staff public/images/products src/data/phase3-assets.test.ts
git commit -m "feat: add phase 3 editorial assets"
```

Expected: all sixteen dimensions match, targeted test PASS, full suite PASS.

---

### Task 4: Build the filterable STYLE route

**Files:**
- Create: `src/components/style-card/StyleCard.tsx`
- Create: `src/components/style-card/style-card.module.css`
- Create: `src/components/style-gallery/StyleGallery.tsx`
- Create: `src/components/style-gallery/StyleGallery.test.tsx`
- Create: `src/components/style-gallery/style-gallery.module.css`
- Create: `src/app/style/page.tsx`
- Create: `src/app/style/page.test.tsx`
- Create: `src/app/style/style.module.css`
- Modify: `src/app/page-layout-styles.test.ts`

**Interfaces:**
- `StyleCard({ style, staffName, salonLabel })` renders one record.
- `StyleGallery({ styles })` owns `"all" | StyleCategory` selection.
- `/style` passes immutable `hairStyles` to the gallery.

- [ ] **Step 1: Write failing filtering tests**

In `StyleGallery.test.tsx`, render the real component with `hairStyles`. Assert initially all nine titles are visible, `ALL` has `aria-pressed="true"`, clicking `SHEER` hides `NEON BOB`, keeps `PEARL SHEER` and `SILK LONG`, and sets `SHEER` pressed.

```ts
const user = userEvent.setup();
render(<StyleGallery styles={hairStyles} />);
expect(screen.getAllByRole("article")).toHaveLength(9);
await user.click(screen.getByRole("button", { name: "SHEER" }));
expect(screen.getAllByRole("article")).toHaveLength(2);
expect(screen.queryByText("NEON BOB")).not.toBeInTheDocument();
expect(screen.getByText("PEARL SHEER")).toBeInTheDocument();
expect(screen.getByText("SILK LONG")).toBeInTheDocument();
```

- [ ] **Step 2: Run to verify RED**

```bash
npx vitest run src/components/style-gallery/StyleGallery.test.tsx
```

Expected: FAIL because the gallery component does not exist.

- [ ] **Step 3: Implement StyleCard and StyleGallery**

`StyleGallery.tsx` begins with `"use client"`, renders `ALL` plus `styleCategories`, and filters without mutating props:

```ts
const [activeCategory, setActiveCategory] = useState<"all" | StyleCategory>("all");
const visibleStyles = activeCategory === "all"
  ? styles
  : styles.filter(({ category }) => category === activeCategory);
```

Resolve staff and salon labels with `getStaffById()` and `getSalonBySlug()`, falling back to `STAFF INFORMATION UNAVAILABLE` and `SALON INFORMATION UNAVAILABLE`. Render an `aria-live="polite"` result count and a readable empty state.

- [ ] **Step 4: Style the gallery responsively**

Use a horizontal wrapping filter row, one column below 640px, two columns from 640px, and three columns from 1024px. Give image frames a portrait ratio and `object-fit: cover`. Selected filter uses charcoal background and white text; unselected controls retain visible border and focus ring.

- [ ] **Step 5: Write the failing route test**

`src/app/style/page.test.tsx` must assert heading `STYLE`, intro copy containing `架空のスタイルコレクション`, all nine style images with useful alt text, and a `RESERVE` link to `/reserve`.

- [ ] **Step 6: Implement `/style` and register its layout token check**

Compose `PageHero`, intro copy, `StyleGallery`, and `TextLink`. Export route metadata title `STYLE | MOOD.`. The `.page` rule must be:

```css
.page {
  width: min(calc(100% - (var(--page-gutter) * 2)), var(--content-max));
  margin-inline: auto;
}
```

Append `src/app/style/style.module.css` to `pageStylePaths` in `src/app/page-layout-styles.test.ts`.

- [ ] **Step 7: Verify GREEN and commit**

```bash
npx vitest run src/components/style-gallery/StyleGallery.test.tsx src/app/style/page.test.tsx src/app/page-layout-styles.test.ts
npm test
git add src/components/style-card src/components/style-gallery src/app/style src/app/page-layout-styles.test.ts
git commit -m "feat: add filterable style gallery"
```

Expected: targeted tests and full suite PASS.

---

### Task 5: Build the fictional STAFF directory

**Files:**
- Create: `src/components/staff-card/StaffCard.tsx`
- Create: `src/components/staff-card/staff-card.module.css`
- Create: `src/app/staff/page.tsx`
- Create: `src/app/staff/page.test.tsx`
- Create: `src/app/staff/staff.module.css`
- Modify: `src/app/page-layout-styles.test.ts`

**Interfaces:**
- `StaffCard({ member, salonLabel, styles })` consumes `StaffMember`, a string, and `readonly HairStyle[]`.
- `/staff` resolves valid related records before passing props.

- [ ] **Step 1: Write the failing route test**

Render the real page and assert:

```ts
expect(screen.getByRole("heading", { level: 1, name: "STAFF" })).toBeInTheDocument();
expect(screen.getAllByRole("article")).toHaveLength(6);
expect(screen.getByRole("heading", { name: "青木 蓮" })).toBeInTheDocument();
expect(screen.getByText("MOOD. SHIBUYA")).toBeInTheDocument();
expect(screen.getByText(/すべて架空のプロフィール/)).toBeInTheDocument();
expect(screen.getAllByRole("link", { name: /RESERVE/i }).length).toBeGreaterThan(0);
```

- [ ] **Step 2: Run to verify RED**

```bash
npx vitest run src/app/staff/page.test.tsx
```

Expected: FAIL because `/staff` does not exist.

- [ ] **Step 3: Implement StaffCard and route**

Render portrait, role, Japanese name, resolved salon name, specialties joined by ` / `, bio, and related style titles. Add links `VIEW SALON →` to `/salon/${member.salonSlug}` and `RESERVE →` to `/reserve`.

If a future invalid style ID reaches the component, omit that missing style title while keeping the rest of the card readable. The data relationship test remains the primary prevention.

Export route metadata title `STAFF | MOOD.` and describe the profiles as fictional in the metadata description.

- [ ] **Step 4: Add responsive CSS and layout-token coverage**

Use the established `.page` rule, one column on mobile, two from 700px, and three from 1024px. Portrait frames use 4:5 and cover. Append `src/app/staff/staff.module.css` to the layout-token test.

- [ ] **Step 5: Verify GREEN and commit**

```bash
npx vitest run src/app/staff/page.test.tsx src/app/page-layout-styles.test.ts
npm test
git add src/components/staff-card src/app/staff src/app/page-layout-styles.test.ts
git commit -m "feat: add fictional staff directory"
```

Expected: targeted tests and full suite PASS.

---

### Task 6: Build the MOOD. LAB PRODUCT catalog

**Files:**
- Create: `src/components/product-card/ProductCard.tsx`
- Create: `src/components/product-card/product-card.module.css`
- Create: `src/app/product/page.tsx`
- Create: `src/app/product/page.test.tsx`
- Create: `src/app/product/product.module.css`
- Modify: `src/app/page-layout-styles.test.ts`

**Interfaces:**
- `ProductCard({ product, salonLabels })` consumes `Product` and `readonly string[]`.
- Product menu links use `/menu#${product.relatedMenuCategory}`.

- [ ] **Step 1: Write the failing route test**

Assert the `PRODUCT` h1, `MOOD. LAB` copy, four articles, all exact product names and prices, a related menu link such as `/menu#home-care`, a `/salon` link, and the copy `購入機能はありません`.

- [ ] **Step 2: Run to verify RED**

```bash
npx vitest run src/app/product/page.test.tsx
```

Expected: FAIL because `/product` does not exist.

- [ ] **Step 3: Implement ProductCard and route**

ProductCard renders a contained packshot, subtitle, name, price, description, usage prefixed by `HOW TO USE`, availability prefixed by `AVAILABLE AT`, `RELATED MENU →`, and `SALON LIST →`. Resolve salon names using `getSalonBySlug()` and fall back to the uppercase slug only if a lookup is missing.

Export route metadata title `PRODUCT | MOOD.` and identify MOOD. LAB as a fictional product range in the metadata description.

- [ ] **Step 4: Add responsive CSS and layout-token coverage**

Use the established `.page` rule. Catalog is one column on mobile and two from 760px. Product image frames use a square soft-gray background; the image uses `object-fit: contain` and internal padding. Append `src/app/product/product.module.css` to the layout-token test.

- [ ] **Step 5: Verify GREEN and commit**

```bash
npx vitest run src/app/product/page.test.tsx src/app/page-layout-styles.test.ts
npm test
git add src/components/product-card src/app/product src/app/page-layout-styles.test.ts
git commit -m "feat: add mood lab product catalog"
```

Expected: targeted tests and full suite PASS.

---

### Task 7: Add pure reservation state and validation rules

**Files:**
- Create: `src/lib/reservation.test.ts`
- Create: `src/lib/reservation.ts`

**Interfaces:**
- Produces `ReservationValues`, `ReservationErrors`, `initialReservationValues`, `getTodayIso()`, `validateSelectStep()`, `validateDetailsStep()`, and `getAvailableStaff()`.
- Consumes `SalonSlug`, `menuItems`, and `staffMembers`.

- [ ] **Step 1: Write failing validation tests**

Cover these literal behaviors:

```ts
expect(validateSelectStep(initialReservationValues, "2026-09-10")).toEqual({
  salonSlug: "店舗を選択してください。",
  menuItemId: "メニューを選択してください。",
  preferredDate: "希望日を選択してください。",
});

expect(validateSelectStep({
  ...initialReservationValues,
  salonSlug: "shibuya",
  menuItemId: "one-color",
  preferredDate: "2026-09-09",
}, "2026-09-10")).toEqual({
  preferredDate: "今日以降の日付を選択してください。",
});

expect(validateDetailsStep({
  ...initialReservationValues,
  name: "佐藤 ゆみ",
  email: "invalid",
})).toEqual({ email: "メールアドレスの形式を確認してください。" });

expect(getAvailableStaff("shibuya")).toHaveLength(2);
expect(getAvailableStaff("")).toEqual([]);
```

Also test that valid select and details values return `{}`, and `getTodayIso(new Date(2026, 8, 10, 23, 30))` returns `2026-09-10` without UTC rollover.

- [ ] **Step 2: Run to verify RED**

```bash
npx vitest run src/lib/reservation.test.ts
```

Expected: FAIL because `src/lib/reservation.ts` does not exist.

- [ ] **Step 3: Implement minimal pure rules**

Use field-keyed errors:

```ts
export type ReservationErrors = Partial<
  Record<keyof ReservationValues, string>
>;
```

`validateSelectStep(values, todayIso)` validates salon, menu, and preferred date in that order. `validateDetailsStep(values)` trims name and email, requires both, and accepts email only when `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` matches. `getAvailableStaff("")` returns an empty array; otherwise it delegates to `getStaffBySalon()`.

`getTodayIso(now)` builds year, month, and day from `getFullYear()`, `getMonth() + 1`, and `getDate()` with two-digit padding; do not derive the local date by slicing `toISOString()`.

- [ ] **Step 4: Verify GREEN and commit**

```bash
npx vitest run src/lib/reservation.test.ts
npm test
git add src/lib/reservation.ts src/lib/reservation.test.ts
git commit -m "feat: add reservation validation rules"
```

Expected: targeted tests and full suite PASS.

---

### Task 8: Build the accessible three-step RESERVE demo

**Files:**
- Create: `src/components/reserve-flow/ReserveFlow.tsx`
- Create: `src/components/reserve-flow/ReserveFlow.test.tsx`
- Create: `src/components/reserve-flow/reserve-flow.module.css`
- Create: `src/app/reserve/page.tsx`
- Create: `src/app/reserve/page.test.tsx`
- Create: `src/app/reserve/reserve.module.css`
- Modify: `src/app/page-layout-styles.test.ts`

**Interfaces:**
- `ReserveFlow()` owns `step: 1 | 2 | 3 | "complete"`, `ReservationValues`, and `ReservationErrors`.
- It uses only the pure functions from Task 7 and existing typed data.

- [ ] **Step 1: Write the failing route and empty-submit tests**

Route test asserts the `RESERVE` h1, `DEMO RESERVATION` disclosure, and the first-step heading `1. SELECT`.

Component test:

```ts
const user = userEvent.setup();
render(<ReserveFlow />);
await user.click(screen.getByRole("button", { name: "NEXT" }));
expect(screen.getByText("店舗を選択してください。")).toBeInTheDocument();
expect(screen.getByText("メニューを選択してください。")).toBeInTheDocument();
expect(screen.getByText("希望日を選択してください。")).toBeInTheDocument();
expect(screen.getByRole("heading", { name: "1. SELECT" })).toBeInTheDocument();
```

- [ ] **Step 2: Run to verify RED**

```bash
npx vitest run src/components/reserve-flow/ReserveFlow.test.tsx src/app/reserve/page.test.tsx
```

Expected: FAIL because the component and route do not exist.

- [ ] **Step 3: Implement step 1 and dependent staff clearing**

Use controlled `select` and `input type="date"` controls. Salon change logic must be:

```ts
const nextSalon = event.target.value as SalonSlug | "";
const staffStillAvailable = getAvailableStaff(nextSalon).some(
  ({ id }) => id === values.staffId,
);
setValues((current) => ({
  ...current,
  salonSlug: nextSalon,
  staffId: staffStillAvailable ? current.staffId : "",
}));
```

Use `min={getTodayIso()}`. Display errors with stable IDs and connect each invalid field through `aria-invalid` and `aria-describedby`.

- [ ] **Step 4: Write and pass the salon/staff dependency test**

Select SHIBUYA, choose `青木 蓮`, change salon to OMOTESANDO, and assert the staff select returns to `指名なし` and only the two OMOTESANDO staff options remain.

- [ ] **Step 5: Implement steps 2, 3, focus movement, completion, and reset**

Step 2 uses name, email, telephone, and textarea controls with `name`, `email`, `tel`, and no inappropriate autocomplete for note. Step 3 resolves labels from typed data and renders `未指定` for optional blank values.

Use a heading ref and this effect after step changes:

```ts
useEffect(() => {
  headingRef.current?.focus();
}, [step]);
```

Every step heading has `tabIndex={-1}`. Completion copy must include `予約情報は送信・保存されていません`. Reset sets `initialReservationValues`, clears errors, and returns to step 1.

- [ ] **Step 6: Write and pass the complete-flow test**

Use future date `2099-12-31`; choose SHIBUYA, ONE COLOR, and 青木 蓮; advance; enter `佐藤 ゆみ` and `yumi@example.com`; advance; assert all resolved values appear in confirmation; go back and verify values persist; advance again; complete; assert the no-send/no-save copy; reset; assert first step and blank salon.

- [ ] **Step 7: Add responsive form CSS and route composition**

Use the established `.page` width. Keep form width at most 960px. On desktop, paired fields may use two columns; on mobile every field is one column. Buttons have at least 44px height. Error summary uses `role="alert"`, a visible border, and text rather than color alone.

Append `src/app/reserve/reserve.module.css` to the layout-token test. Export metadata title `RESERVE | MOOD.` and render the explicit fictional demo introduction above `ReserveFlow`.

- [ ] **Step 8: Verify GREEN and commit**

```bash
npx vitest run src/components/reserve-flow/ReserveFlow.test.tsx src/app/reserve/page.test.tsx src/app/page-layout-styles.test.ts
npm test
git add src/components/reserve-flow src/app/reserve src/app/page-layout-styles.test.ts
git commit -m "feat: add accessible demo reservation flow"
```

Expected: targeted tests and full suite PASS with no React accessibility warnings.

---

### Task 9: Complete Phase 3 verification and handoff

**Files:**
- Modify only files implicated by failures found during this task.

**Interfaces:**
- Verifies all Phase 3 contracts without adding scope.

- [ ] **Step 1: Run the full automated suite**

```bash
npm test
```

Expected: every test file and test passes with zero failures.

- [ ] **Step 2: Run lint and production build**

```bash
npm run lint
npm run build
```

Expected: both exit 0. Build output lists `/style`, `/staff`, `/product`, `/reserve`, all Phase 2 routes, and the three static salon detail routes.

- [ ] **Step 3: Verify local routes and assets**

Start the production server and verify HTTP 200 for:

```text
/
/menu
/coupon
/salon
/salon/shibuya
/salon/omotesando
/salon/shinjuku
/style
/staff
/product
/reserve
```

Verify every Phase 3 image URL returns `image/jpeg`. Inspect desktop, tablet, and mobile widths for clipping, horizontal overflow, image crops, product containment, filter wrapping, form labels, focus visibility, and the full reservation flow.

- [ ] **Step 4: Inspect the complete diff and repository state**

```bash
git diff --check origin/main...HEAD
git diff --stat origin/main...HEAD
git status --short --branch
git log --oneline origin/main..HEAD
```

Expected: no whitespace errors, no uncommitted files, no secret/config artifacts, and only approved Phase 3 changes.

- [ ] **Step 5: Commit only evidence-driven final fixes**

If Steps 1–4 reveal a defect, return to the Task that owns the reported file, reproduce it with the narrowest failing automated test, implement only the root-cause fix, stage the exact test and production files named by that Task, rerun Steps 1–4, and commit:

```bash
git commit -m "fix: complete phase 3 verification"
```

If no defect is found, do not create an empty final commit.

- [ ] **Step 6: Push and open the Phase 3 pull request**

Push `feature/mood-phase3-portfolio-completion` and create a pull request to `main`. The PR body lists route features, data/asset counts, reservation safety behavior, test count, lint result, build result, and manual route checks. Keep the worktree for review changes until the PR is merged.
