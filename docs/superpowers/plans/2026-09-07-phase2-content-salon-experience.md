# Phase 2 Content & Salon Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand MOOD. from the Phase 1 foundation into a convincing multi-location fictional Tokyo salon site with typed salon/menu/coupon data, image-driven pages, and reusable home-page excerpts.

**Architecture:** Use data-first TypeScript modules under `src/data` as the single source of truth. Route components consume typed data and pass it into focused reusable presentation components. Navigation remains driven by `siteConfig`, unknown salon slugs use `notFound()`, and all new work follows the existing Vitest + Testing Library TDD pattern.

**Tech Stack:** Next.js 16.3.4 App Router, React, TypeScript, CSS Modules, `next/image`, Vitest, Testing Library.

**Spec:** `docs/superpowers/specs/2026-09-07-phase2-content-salon-experience-design.md`

## Global Constraints

- Keep the project fictional and preserve the shared `DemoNotice` behavior.
- Main navigation order must be `MENU / STYLE / STAFF / PRODUCT / SALON / COUPON / RESERVE`.
- Supported salons are exactly `shibuya`, `omotesando`, and `shinjuku`.
- Main service categories are exactly `COLOR`, `EXTENSION`, `HAIR REPAIR`, and `HOME CARE`.
- Repeated salon names, descriptions, prices, specialties, coupon copy, and image metadata must live in `src/data`, not route components.
- `/reserve` may be linked to, but Phase 2 must not implement real booking, payment, authentication, CMS, or backend persistence.
- Unknown salon slugs must call `notFound()`.
- Meaningful images require descriptive alt text.
- Existing skip-link, semantic heading, keyboard navigation, and visible focus behavior must remain intact.
- Every task uses TDD: failing test, minimal implementation, passing test, then commit.

---

### Task 1: Add COUPON to the shared navigation

**Files:**
- Modify: `src/lib/site-config.test.ts`
- Modify: `src/lib/site-config.ts`
- Modify: `src/components/site-header/SiteHeader.test.tsx`

**Interfaces:**
- Consumes: existing `siteConfig.navigation` array.
- Produces: shared `/coupon` navigation entry used automatically by desktop nav, mobile nav, and footer.

- [ ] **Step 1: Write the failing navigation tests**

Update `src/lib/site-config.test.ts` so the expected navigation labels are:

```ts
expect(siteConfig.navigation.map((item) => item.label)).toEqual([
  "MENU",
  "STYLE",
  "STAFF",
  "PRODUCT",
  "SALON",
  "COUPON",
  "RESERVE",
]);

expect(
  siteConfig.navigation.find((item) => item.label === "COUPON"),
).toEqual({ label: "COUPON", href: "/coupon" });
```

Add this assertion to the first test in `src/components/site-header/SiteHeader.test.tsx`:

```ts
expect(
  screen.getAllByRole("link", { name: "COUPON" }).length,
).toBeGreaterThan(0);
```

- [ ] **Step 2: Run tests to verify RED**

Run:

```bash
npx vitest run src/lib/site-config.test.ts src/components/site-header/SiteHeader.test.tsx
```

Expected: FAIL because `COUPON` is not yet present.

- [ ] **Step 3: Add the shared navigation item**

Insert in `src/lib/site-config.ts` between SALON and RESERVE:

```ts
{ label: "SALON", href: "/salon" },
{ label: "COUPON", href: "/coupon" },
{ label: "RESERVE", href: "/reserve" },
```

- [ ] **Step 4: Run tests to verify GREEN**

```bash
npx vitest run src/lib/site-config.test.ts src/components/site-header/SiteHeader.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/site-config.ts src/lib/site-config.test.ts src/components/site-header/SiteHeader.test.tsx
git commit -m "feat: add coupon to primary navigation"
```

---

### Task 2: Create typed salon data and lookup helpers

**Files:**
- Create: `src/data/salons.test.ts`
- Create: `src/data/salons.ts`

**Interfaces:**
- Produces:
  - `type ImageAsset = { src: string; alt: string; width: number; height: number }`
  - `type SalonSlug = "shibuya" | "omotesando" | "shinjuku"`
  - `type Salon`
  - `const salons: readonly Salon[]`
  - `function getSalonBySlug(slug: string): Salon | undefined`

- [ ] **Step 1: Write the failing salon data tests**

Create `src/data/salons.test.ts`:

```ts
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
      expect(salon.heroImage.src).toMatch(/^\/images\/salons\//);
      expect(salon.heroImage.alt.length).toBeGreaterThan(0);
      expect(salon.heroImage.width).toBeGreaterThan(0);
      expect(salon.heroImage.height).toBeGreaterThan(0);
      expect(salon.gallery.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("returns undefined for an unknown salon slug", () => {
    expect(getSalonBySlug("unknown")).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run the test to verify RED**

```bash
npx vitest run src/data/salons.test.ts
```

Expected: FAIL because `./salons` does not exist.

- [ ] **Step 3: Implement typed salon data**

Create `src/data/salons.ts` with the approved type contract and these entries:

```ts
export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type SalonSlug = "shibuya" | "omotesando" | "shinjuku";

export type Salon = {
  slug: SalonSlug;
  name: string;
  locationLabel: string;
  tagline: string;
  description: string;
  specialties: string[];
  atmosphere: string;
  address: string;
  hours: string;
  access: string;
  heroImage: ImageAsset;
  gallery: ImageAsset[];
};

export const salons: readonly Salon[] = [
  {
    slug: "shibuya",
    name: "MOOD. SHIBUYA",
    locationLabel: "SHIBUYA",
    tagline: "COLOR OUTSIDE THE LINES.",
    description:
      "ハイトーン、ビビッドカラー、エクステで、気分ごと大胆に変わるためのMOOD.。",
    specialties: ["HIGH TONE COLOR", "VIVID COLOR", "EXTENSION"],
    atmosphere: "CHARCOAL / CHROME / CONCRETE",
    address: "東京都渋谷区神南0-0-0 MOOD. BUILDING 3F（架空住所）",
    hours: "11:00–21:00",
    access: "渋谷駅から徒歩5分（架空設定）",
    heroImage: {
      src: "/images/salons/shibuya-hero.jpg",
      alt: "チャコールとクロームを基調にしたMOOD. SHIBUYAの架空サロン内装",
      width: 1600,
      height: 1100,
    },
    gallery: [
      {
        src: "/images/salons/shibuya-detail-1.jpg",
        alt: "コンクリートとメタル素材を使ったMOOD. SHIBUYAの架空セット面",
        width: 1200,
        height: 900,
      },
      {
        src: "/images/salons/shibuya-detail-2.jpg",
        alt: "ハイトーンスタイルをイメージしたMOOD. SHIBUYAの架空ビジュアル",
        width: 1200,
        height: 900,
      },
    ],
  },
  {
    slug: "omotesando",
    name: "MOOD. OMOTESANDO",
    locationLabel: "OMOTESANDO",
    tagline: "LIGHT, SHINE, TEXTURE.",
    description:
      "透明感カラーと髪質改善で、光をまとったようなやわらかさとツヤを整えるMOOD.。",
    specialties: ["SHEER COLOR", "HAIR REPAIR", "GLOSS CARE"],
    atmosphere: "WHITE / SILVER / DAYLIGHT",
    address: "東京都港区北青山0-0-0 MOOD. AOYAMA 2F（架空住所）",
    hours: "10:00–20:00",
    access: "表参道駅から徒歩3分（架空設定）",
    heroImage: {
      src: "/images/salons/omotesando-hero.jpg",
      alt: "白と淡いシルバーに自然光が差し込むMOOD. OMOTESANDOの架空サロン内装",
      width: 1600,
      height: 1100,
    },
    gallery: [
      {
        src: "/images/salons/omotesando-detail-1.jpg",
        alt: "明るい自然光と柔らかな素材を使ったMOOD. OMOTESANDOの架空セット面",
        width: 1200,
        height: 900,
      },
      {
        src: "/images/salons/omotesando-detail-2.jpg",
        alt: "透明感とツヤのあるヘアスタイルをイメージした架空ビジュアル",
        width: 1200,
        height: 900,
      },
    ],
  },
  {
    slug: "shinjuku",
    name: "MOOD. SHINJUKU",
    locationLabel: "SHINJUKU",
    tagline: "SEOUL MOOD, TOKYO RHYTHM.",
    description:
      "韓国トレンドを軸に、カラーもカットもケアもバランスよく楽しめるオールラウンドなMOOD.。",
    specialties: ["KOREAN COLOR", "LAYER CUT", "ALL ROUND"],
    atmosphere: "WHITE / BLACK / SILVER",
    address: "東京都新宿区新宿0-0-0 MOOD. TERRACE 5F（架空住所）",
    hours: "11:00–21:00",
    access: "新宿三丁目駅から徒歩2分（架空設定）",
    heroImage: {
      src: "/images/salons/shinjuku-hero.jpg",
      alt: "白黒とシルバーでまとめた韓国サロン風MOOD. SHINJUKUの架空内装",
      width: 1600,
      height: 1100,
    },
    gallery: [
      {
        src: "/images/salons/shinjuku-detail-1.jpg",
        alt: "洗練された韓国サロン風のMOOD. SHINJUKU架空セット面",
        width: 1200,
        height: 900,
      },
      {
        src: "/images/salons/shinjuku-detail-2.jpg",
        alt: "韓国レイヤースタイルをイメージしたMOOD. SHINJUKUの架空ビジュアル",
        width: 1200,
        height: 900,
      },
    ],
  },
] as const;

export function getSalonBySlug(slug: string) {
  return salons.find((salon) => salon.slug === slug);
}
```

- [ ] **Step 4: Run the test to verify GREEN**

```bash
npx vitest run src/data/salons.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/salons.ts src/data/salons.test.ts
git commit -m "feat: add typed salon data"
```

---

### Task 3: Create typed menu data

**Files:**
- Create: `src/data/menus.test.ts`
- Create: `src/data/menus.ts`

**Interfaces:**
- Consumes: `SalonSlug` from `src/data/salons.ts`.
- Produces:
  - `type MenuCategoryId = "color" | "extension" | "hair-repair" | "home-care"`
  - `type MenuCategory`
  - `type MenuItem`
  - `const menuCategories`
  - `const menuItems`
  - `function getMenuItemsByCategory(category: MenuCategoryId): readonly MenuItem[]`

- [ ] **Step 1: Write the failing menu tests**

Create `src/data/menus.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { getMenuItemsByCategory, menuCategories, menuItems } from "./menus";

describe("menus", () => {
  it("defines all four approved categories in order", () => {
    expect(menuCategories.map((category) => category.label)).toEqual([
      "COLOR",
      "EXTENSION",
      "HAIR REPAIR",
      "HOME CARE",
    ]);
  });

  it("provides representative items for every category", () => {
    for (const category of menuCategories) {
      expect(getMenuItemsByCategory(category.id).length).toBeGreaterThan(0);
    }
  });

  it("uses display prices and descriptions for every menu item", () => {
    for (const item of menuItems) {
      expect(item.price).toMatch(/^¥/);
      expect(item.description.length).toBeGreaterThan(0);
    }
  });
});
```

- [ ] **Step 2: Run the test to verify RED**

```bash
npx vitest run src/data/menus.test.ts
```

Expected: FAIL because `./menus` does not exist.

- [ ] **Step 3: Implement menu categories and representative items**

Create `src/data/menus.ts` with these exact categories:

```ts
import type { SalonSlug } from "./salons";

export type MenuCategoryId =
  | "color"
  | "extension"
  | "hair-repair"
  | "home-care";

export type MenuCategory = {
  id: MenuCategoryId;
  label: "COLOR" | "EXTENSION" | "HAIR REPAIR" | "HOME CARE";
  concept: string;
};

export type MenuItem = {
  id: string;
  category: MenuCategoryId;
  name: string;
  price: string;
  description: string;
  recommendedSalon?: SalonSlug;
};

export const menuCategories: readonly MenuCategory[] = [
  { id: "color", label: "COLOR", concept: "色で、その日のムードを変える。" },
  { id: "extension", label: "EXTENSION", concept: "長さも質感も、自由に足す。" },
  { id: "hair-repair", label: "HAIR REPAIR", concept: "ツヤと手触りを、土台から整える。" },
  { id: "home-care", label: "HOME CARE", concept: "サロン帰りの質感を、毎日に。" },
] as const;

export const menuItems: readonly MenuItem[] = [
  {
    id: "sheer-color",
    category: "color",
    name: "SHEER COLOR",
    price: "¥8,800",
    description: "赤みを抑えた透明感と柔らかな発色をつくるワンカラー。",
    recommendedSalon: "omotesando",
  },
  {
    id: "high-tone-double-color",
    category: "color",
    name: "HIGH TONE DOUBLE COLOR",
    price: "¥17,600",
    description: "ブリーチを使い、ハイトーンや鮮やかな色味まで表現するダブルカラー。",
    recommendedSalon: "shibuya",
  },
  {
    id: "korean-tone-color",
    category: "color",
    name: "KOREAN TONE COLOR",
    price: "¥9,900",
    description: "韓国トレンドを意識した艶感と深みのあるカラー設計。",
    recommendedSalon: "shinjuku",
  },
  {
    id: "point-extension",
    category: "extension",
    name: "POINT EXTENSION",
    price: "¥6,600〜",
    description: "顔まわりやインナーにポイントで長さや色を足すエクステ。",
    recommendedSalon: "shibuya",
  },
  {
    id: "full-extension",
    category: "extension",
    name: "FULL EXTENSION",
    price: "¥19,800〜",
    description: "全体の長さとボリュームを自然につなぐフルデザイン。",
    recommendedSalon: "shibuya",
  },
  {
    id: "gloss-repair",
    category: "hair-repair",
    name: "GLOSS REPAIR",
    price: "¥11,000",
    description: "乾燥や広がりを整え、ツヤとまとまりを引き出す集中ケア。",
    recommendedSalon: "omotesando",
  },
  {
    id: "premium-repair",
    category: "hair-repair",
    name: "PREMIUM REPAIR",
    price: "¥15,400",
    description: "複数工程で内部と表面を整える、髪質改善コンセプトのプレミアムケア。",
    recommendedSalon: "omotesando",
  },
  {
    id: "mood-lab-shampoo",
    category: "home-care",
    name: "MOOD. LAB SHAMPOO",
    price: "¥3,300",
    description: "カラー後の質感とまとまりを意識した架空のホームケアシャンプー。",
  },
  {
    id: "mood-lab-mask",
    category: "home-care",
    name: "MOOD. LAB REPAIR MASK",
    price: "¥4,400",
    description: "毛先の乾燥とパサつきを集中ケアする架空のヘアマスク。",
  },
] as const;

export function getMenuItemsByCategory(category: MenuCategoryId) {
  return menuItems.filter((item) => item.category === category);
}
```

- [ ] **Step 4: Run the test to verify GREEN**

```bash
npx vitest run src/data/menus.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/menus.ts src/data/menus.test.ts
git commit -m "feat: add typed menu data"
```

---

### Task 4: Create typed coupon data

**Files:**
- Create: `src/data/coupons.test.ts`
- Create: `src/data/coupons.ts`

**Interfaces:**
- Consumes: `SalonSlug` from `src/data/salons.ts`.
- Produces `type Coupon` and `const coupons: readonly Coupon[]`.

- [ ] **Step 1: Write the failing coupon tests**

```ts
import { describe, expect, it } from "vitest";
import { coupons } from "./coupons";

describe("coupons", () => {
  it("defines the three approved representative coupon types", () => {
    expect(coupons.map((coupon) => coupon.id)).toEqual([
      "first-visit",
      "color-focus",
      "hair-repair",
    ]);
  });

  it("keeps coupons clearly usable as demo offers", () => {
    for (const coupon of coupons) {
      expect(coupon.price).toMatch(/^¥/);
      expect(coupon.notes.length).toBeGreaterThan(0);
    }
  });
});
```

- [ ] **Step 2: Run to verify RED**

```bash
npx vitest run src/data/coupons.test.ts
```

Expected: FAIL because `./coupons` does not exist.

- [ ] **Step 3: Implement coupon data**

Create `src/data/coupons.ts`:

```ts
import type { SalonSlug } from "./salons";

export type Coupon = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  targetSalon?: SalonSlug;
  notes: string[];
};

export const coupons: readonly Coupon[] = [
  {
    id: "first-visit",
    eyebrow: "FIRST VISIT",
    title: "CUT + COLOR + CARE",
    description: "MOOD.を初めて利用する方へ。カラーとケアを組み合わせた架空の体験プラン。",
    price: "¥11,000",
    originalPrice: "¥14,300",
    notes: ["初回限定の架空クーポン", "実際の予約・決済は行われません"],
  },
  {
    id: "color-focus",
    eyebrow: "COLOR MOOD",
    title: "DOUBLE COLOR + TREATMENT",
    description: "ハイトーンや鮮やかな色を楽しみたい方向けの架空カラープラン。",
    price: "¥16,500",
    originalPrice: "¥19,800",
    targetSalon: "shibuya",
    notes: ["SHIBUYA推奨", "髪の状態により施術内容が変わる想定です"],
  },
  {
    id: "hair-repair",
    eyebrow: "GLOSS CARE",
    title: "SHEER COLOR + PREMIUM REPAIR",
    description: "透明感カラーと髪質改善コンセプトのケアを組み合わせた架空プラン。",
    price: "¥18,700",
    originalPrice: "¥22,000",
    targetSalon: "omotesando",
    notes: ["OMOTESANDO推奨", "実際の予約・決済は行われません"],
  },
] as const;
```

- [ ] **Step 4: Run to verify GREEN**

```bash
npx vitest run src/data/coupons.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/coupons.ts src/data/coupons.test.ts
git commit -m "feat: add typed coupon data"
```

---

### Task 5: Add reusable image, salon, menu, and coupon presentation components

**Files:**
- Create: `src/components/editorial-image/EditorialImage.tsx`
- Create: `src/components/editorial-image/editorial-image.module.css`
- Create: `src/components/salon-card/SalonCard.tsx`
- Create: `src/components/salon-card/salon-card.module.css`
- Create: `src/components/menu-section/MenuSection.tsx`
- Create: `src/components/menu-section/menu-section.module.css`
- Create: `src/components/coupon-card/CouponCard.tsx`
- Create: `src/components/coupon-card/coupon-card.module.css`
- Create: `src/components/content-components.test.tsx`

**Interfaces:**
- Consumes: `ImageAsset`, `Salon`, `MenuCategory`, `MenuItem`, `Coupon`.
- Produces reusable visual units for all Phase 2 routes and home excerpts.

- [ ] **Step 1: Write failing component tests**

Create `src/components/content-components.test.tsx` with one focused assertion per component:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SalonCard } from "./salon-card/SalonCard";
import { MenuSection } from "./menu-section/MenuSection";
import { CouponCard } from "./coupon-card/CouponCard";
import { salons } from "@/data/salons";
import { menuCategories, menuItems } from "@/data/menus";
import { coupons } from "@/data/coupons";

describe("Phase 2 content components", () => {
  it("links a salon card to its detail route", () => {
    render(<SalonCard salon={salons[0]} />);
    expect(screen.getByRole("link", { name: /SHIBUYA/i })).toHaveAttribute(
      "href",
      "/salon/shibuya",
    );
  });

  it("renders menu items for one category", () => {
    render(
      <MenuSection
        category={menuCategories[0]}
        items={menuItems.filter((item) => item.category === "color")}
      />,
    );
    expect(screen.getByRole("heading", { name: "COLOR" })).toBeInTheDocument();
    expect(screen.getByText("SHEER COLOR")).toBeInTheDocument();
  });

  it("links coupon cards to the fictional reserve route", () => {
    render(<CouponCard coupon={coupons[0]} />);
    expect(screen.getByRole("link", { name: /RESERVE/i })).toHaveAttribute(
      "href",
      "/reserve",
    );
  });
});
```

- [ ] **Step 2: Run to verify RED**

```bash
npx vitest run src/components/content-components.test.tsx
```

Expected: FAIL because the components do not exist.

- [ ] **Step 3: Implement `EditorialImage`**

Use `next/image` and accept `{ image: ImageAsset; sizes: string; className?: string }`. The image component must set `width`, `height`, `alt`, `sizes`, and `className` from props.

- [ ] **Step 4: Implement `SalonCard`**

Render `EditorialImage`, salon `locationLabel`, `tagline`, specialty summary, and a link to `/salon/${salon.slug}`. Use a semantic `<article>` and heading.

- [ ] **Step 5: Implement `MenuSection`**

Render `<section id={category.id}>`, category label/concept, and a semantic list of provided menu items with name, description, and price.

- [ ] **Step 6: Implement `CouponCard`**

Render eyebrow, title, description, original/current price, notes, and a `/reserve` CTA labeled `RESERVE`.

- [ ] **Step 7: Add CSS Modules**

Use the Phase 1 design language: monochrome base, serif headings, small uppercase labels, thin rules, generous spacing. Mobile is one column; card media uses `aspect-ratio` and `object-fit: cover`.

- [ ] **Step 8: Run component tests to verify GREEN**

```bash
npx vitest run src/components/content-components.test.tsx
```

Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add src/components/editorial-image src/components/salon-card src/components/menu-section src/components/coupon-card src/components/content-components.test.tsx
git commit -m "feat: add reusable content presentation components"
```

---

### Task 6: Build the MENU and COUPON routes

**Files:**
- Create: `src/app/menu/page.test.tsx`
- Create: `src/app/menu/page.tsx`
- Create: `src/app/menu/menu.module.css`
- Create: `src/app/coupon/page.test.tsx`
- Create: `src/app/coupon/page.tsx`
- Create: `src/app/coupon/coupon.module.css`

**Interfaces:**
- Consumes: `PageHero`, `TextLink`, `menuCategories`, `getMenuItemsByCategory`, `coupons`, `MenuSection`, `CouponCard`.
- Produces working `/menu` and `/coupon` routes.

- [ ] **Step 1: Write failing `/menu` route test**

Test that `MENU` is an h1, all four category headings render, `SHEER COLOR` is visible, and the category index has links to `#color`, `#extension`, `#hair-repair`, and `#home-care`.

- [ ] **Step 2: Run `/menu` test to verify RED**

```bash
npx vitest run src/app/menu/page.test.tsx
```

Expected: FAIL because the route does not exist.

- [ ] **Step 3: Implement `/menu`**

Use `PageHero` with `title="MENU"` and render a page-local category index:

```tsx
<nav aria-label="メニューカテゴリー">
  {menuCategories.map((category) => (
    <a key={category.id} href={`#${category.id}`}>
      {category.label}
    </a>
  ))}
</nav>
```

Then map categories into `MenuSection`. End with a pricing note explaining that these are fictional portfolio prices and real salons would vary by length, condition, and combinations. Add `TextLink href="/coupon"`.

- [ ] **Step 4: Run `/menu` test to verify GREEN**

```bash
npx vitest run src/app/menu/page.test.tsx
```

- [ ] **Step 5: Write failing `/coupon` route test**

Test that `COUPON` is an h1, the three coupon titles render, and at least one `RESERVE` link points to `/reserve`.

- [ ] **Step 6: Run `/coupon` test to verify RED**

```bash
npx vitest run src/app/coupon/page.test.tsx
```

Expected: FAIL because the route does not exist.

- [ ] **Step 7: Implement `/coupon`**

Use `PageHero`, map `coupons` into `CouponCard`, and include a short portfolio-demo note. Keep the page editorial rather than discount-heavy: large heading, restrained cards, generous whitespace.

- [ ] **Step 8: Run both route tests to verify GREEN**

```bash
npx vitest run src/app/menu/page.test.tsx src/app/coupon/page.test.tsx
```

Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add src/app/menu src/app/coupon
git commit -m "feat: add menu and coupon pages"
```

---

### Task 7: Build SALON index and dynamic salon detail routes

**Files:**
- Create: `src/app/salon/page.test.tsx`
- Create: `src/app/salon/page.tsx`
- Create: `src/app/salon/salon.module.css`
- Create: `src/app/salon/[slug]/page.tsx`
- Create: `src/app/salon/[slug]/salon-detail.module.css`
- Create: `src/components/salon-detail/SalonDetail.tsx`
- Create: `src/components/salon-detail/SalonDetail.test.tsx`
- Create: `src/components/salon-detail/salon-detail.module.css`

**Interfaces:**
- Consumes: `salons`, `getSalonBySlug`, `menuItems`, `coupons`, `SalonCard`, `EditorialImage`, `TextLink`.
- Produces `/salon` plus `/salon/shibuya`, `/salon/omotesando`, `/salon/shinjuku`.

- [ ] **Step 1: Write failing salon index test**

Test that `/salon` renders an h1 `SALON` and links to all three exact routes.

- [ ] **Step 2: Run index test to verify RED**

```bash
npx vitest run src/app/salon/page.test.tsx
```

- [ ] **Step 3: Implement salon index**

Use `PageHero` and render all `salons` through `SalonCard`. Add a shared statement such as `THREE PLACES. ONE MOOD.` below the grid.

- [ ] **Step 4: Write failing `SalonDetail` component test**

Render `SalonDetail` with `salons[0]` and assert that the heading contains `MOOD. SHIBUYA`, specialties render, hours render, and a `/reserve` link exists.

- [ ] **Step 5: Run component test to verify RED**

```bash
npx vitest run src/components/salon-detail/SalonDetail.test.tsx
```

- [ ] **Step 6: Implement `SalonDetail`**

The component receives `salon: Salon`, derives recommended menu items using `recommendedSalon === salon.slug`, derives coupons using `targetSalon === salon.slug`, and renders:

1. store hero image and h1,
2. tagline and description,
3. specialties,
4. gallery images,
5. recommended menu items,
6. matching coupon when available,
7. fictional address/access/hours,
8. `/reserve` CTA.

- [ ] **Step 7: Implement dynamic route with `notFound()`**

Create `src/app/salon/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { SalonDetail } from "@/components/salon-detail/SalonDetail";
import { getSalonBySlug, salons } from "@/data/salons";

export function generateStaticParams() {
  return salons.map((salon) => ({ slug: salon.slug }));
}

export default async function SalonDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const salon = getSalonBySlug(slug);

  if (!salon) {
    notFound();
  }

  return <SalonDetail salon={salon} />;
}
```

- [ ] **Step 8: Run salon tests to verify GREEN**

```bash
npx vitest run src/app/salon/page.test.tsx src/components/salon-detail/SalonDetail.test.tsx
```

Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add src/app/salon src/components/salon-detail
git commit -m "feat: add salon index and detail pages"
```

---

### Task 8: Add salon image assets and verify all image paths

**Files:**
- Create: `public/images/salons/shibuya-hero.jpg`
- Create: `public/images/salons/shibuya-detail-1.jpg`
- Create: `public/images/salons/shibuya-detail-2.jpg`
- Create: `public/images/salons/omotesando-hero.jpg`
- Create: `public/images/salons/omotesando-detail-1.jpg`
- Create: `public/images/salons/omotesando-detail-2.jpg`
- Create: `public/images/salons/shinjuku-hero.jpg`
- Create: `public/images/salons/shinjuku-detail-1.jpg`
- Create: `public/images/salons/shinjuku-detail-2.jpg`

**Interfaces:**
- Consumes: exact image paths already declared in `salons.ts`.
- Produces real local assets for every salon hero/gallery reference.

- [ ] **Step 1: Prepare/generate the nine local image assets**

Use these art directions:

- SHIBUYA hero/detail: premium Tokyo salon, charcoal concrete, polished chrome, black accents, high-contrast editorial lighting, edgy but clean, no visible logos or readable text.
- OMOTESANDO hero/detail: premium airy Tokyo salon, white and pale gray, soft silver, strong natural daylight, translucent materials, refined quiet luxury, no visible logos or readable text.
- SHINJUKU hero/detail: premium Korean-inspired salon in Tokyo, white/black/silver palette, curved mirrors and clean lines, polished but approachable, editorial photography, no visible logos or readable text.

For the second detail image of each salon, use a hair-style editorial image consistent with that store specialty rather than another identical interior shot.

- [ ] **Step 2: Verify file existence from the project root**

Run:

```bash
node -e "const fs=require('fs'); const files=['shibuya-hero','shibuya-detail-1','shibuya-detail-2','omotesando-hero','omotesando-detail-1','omotesando-detail-2','shinjuku-hero','shinjuku-detail-1','shinjuku-detail-2'].map(x=>'public/images/salons/'+x+'.jpg'); const missing=files.filter(x=>!fs.existsSync(x)); if(missing.length){console.error(missing); process.exit(1)} console.log('all salon images present')"
```

Expected: `all salon images present`.

- [ ] **Step 3: Run salon data tests and build**

```bash
npx vitest run src/data/salons.test.ts
npm run build
```

Expected: PASS and successful build.

- [ ] **Step 4: Commit**

```bash
git add public/images/salons
git commit -m "feat: add salon visual assets"
```

---

### Task 9: Expand the home page from shared data

**Files:**
- Modify: `src/app/page.test.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/home.module.css`

**Interfaces:**
- Consumes: `menuCategories`, `salons`, `coupons`, `SalonCard`, `CouponCard`, `SectionHeading`, `TextLink`.
- Produces shared-data-driven service, salon, and coupon excerpts under the existing Phase 1 hero/intro.

- [ ] **Step 1: Extend the home test to fail on missing Phase 2 content**

Add assertions:

```tsx
expect(screen.getByRole("heading", { name: "OUR SERVICES" })).toBeInTheDocument();
expect(screen.getByText("HAIR REPAIR")).toBeInTheDocument();
expect(screen.getByRole("heading", { name: "OUR SALONS" })).toBeInTheDocument();
expect(screen.getByText("SHIBUYA")).toBeInTheDocument();
expect(screen.getByRole("heading", { name: "SPECIAL OFFERS" })).toBeInTheDocument();
expect(screen.getByText("CUT + COLOR + CARE")).toBeInTheDocument();
expect(screen.getByRole("link", { name: /VIEW MENU/i })).toHaveAttribute("href", "/menu");
expect(screen.getByRole("link", { name: /VIEW SALONS/i })).toHaveAttribute("href", "/salon");
expect(screen.getByRole("link", { name: /VIEW COUPONS/i })).toHaveAttribute("href", "/coupon");
```

- [ ] **Step 2: Run test to verify RED**

```bash
npx vitest run src/app/page.test.tsx
```

- [ ] **Step 3: Add service overview**

After the existing intro, render a section headed `OUR SERVICES` using `menuCategories`, showing all four labels and concepts, then `TextLink` to `/menu` with text `VIEW MENU`.

- [ ] **Step 4: Add salon preview**

Render `OUR SALONS` and all three `SalonCard` components using `salons`, then a `VIEW SALONS` link.

- [ ] **Step 5: Add curated coupon preview**

Render `SPECIAL OFFERS`, use `coupons.slice(0, 2)` to show a restrained subset, then `VIEW COUPONS` link.

- [ ] **Step 6: Style the new sections**

Add CSS grid rules to `home.module.css`:

- mobile: one column,
- tablet: two columns where appropriate,
- desktop salon preview: three columns,
- service overview: oversized serif labels with thin horizontal rules,
- coupon preview: maximum two columns so the site does not become discount-led.

- [ ] **Step 7: Run home test to verify GREEN**

```bash
npx vitest run src/app/page.test.tsx
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/app/page.tsx src/app/page.test.tsx src/app/home.module.css
git commit -m "feat: expand home with shared phase 2 content"
```

---

### Task 10: Full Phase 2 regression, responsive review, and branch checkpoint

**Files:**
- Modify only files required by defects discovered in this task.

**Interfaces:**
- Consumes all Phase 2 work.
- Produces a clean, tested branch ready for a Phase 2 PR.

- [ ] **Step 1: Run the complete test suite**

```bash
npm run test
```

Expected: all tests pass, zero failures.

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: successful production build and routes for `/`, `/menu`, `/coupon`, `/salon`, and the three static salon detail routes.

- [ ] **Step 3: Run the development server for visual review**

```bash
npm run dev
```

Review at desktop width and Chrome device emulation for a phone-sized viewport:

- header contains COUPON without crowding,
- mobile full-screen nav contains COUPON,
- MENU category anchors jump correctly,
- SALON cards remain readable on mobile,
- each store has a clearly different visual mood while still feeling like MOOD.,
- images crop intentionally and do not distort,
- coupon cards remain secondary to the overall brand tone,
- existing skip link and mobile menu still work.

- [ ] **Step 4: Re-run tests/build after any visual fixes**

```bash
npm run test
npm run build
```

Expected: all PASS.

- [ ] **Step 5: Confirm clean Git state**

```bash
git status
git log --oneline --decorate -10
```

Expected: `nothing to commit, working tree clean` and the Phase 2 task commits visible.

- [ ] **Step 6: Push the Phase 2 branch**

```bash
git push -u origin feature/mood-phase2-content
```

Expected: remote branch updated and ready for a pull request into `main`.
