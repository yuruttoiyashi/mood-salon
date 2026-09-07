# Phase 2: Content & Salon Experience Design

## Goal

Turn the Phase 1 MOOD. foundation into a convincing fictional Tokyo salon website by adding typed content data, salon/menu/coupon pages, store-specific visual identity, richer home-page sections, and reusable image-driven content blocks.

## Scope

Phase 2 includes:

- Typed source data for salons, menus, and coupons.
- `/menu` page.
- `/coupon` page.
- `/salon` index page.
- `/salon/shibuya`, `/salon/omotesando`, and `/salon/shinjuku` detail pages.
- Header navigation updated to include `COUPON`.
- Home-page excerpts for menu, salons, and coupons.
- Store imagery and hairstyle imagery wired through typed data instead of being hard-coded in page components.
- TDD coverage for data contracts and route rendering.

Phase 2 does not include real reservations, real checkout/payment, CMS integration, authentication, or a backend database.

## Architecture

Use a data-first architecture. Content is defined once in typed TypeScript modules and consumed by route components and reusable presentation components.

Pages must not duplicate prices, salon names, descriptions, specialties, or image metadata. All repeated content comes from `src/data` modules.

The initial data modules are:

- `src/data/salons.ts`
- `src/data/menus.ts`
- `src/data/coupons.ts`

Each module exports both types and immutable data arrays. Consumers render from those exports.

## Navigation

Primary navigation becomes:

`MENU / STYLE / STAFF / PRODUCT / SALON / COUPON / RESERVE`

Desktop and mobile navigation must use the same source configuration so the new `COUPON` destination appears consistently.

## Salon Model

Three fictional MOOD. locations exist.

### SHIBUYA

- Slug: `shibuya`
- Positioning: high-tone color, vivid color, extensions.
- Mood: edgy, urban, trend-driven.
- Interior direction: charcoal, black, chrome, concrete, sharper contrast.
- Hero copy should emphasize transformation, self-expression, and bold color.

### OMOTESANDO

- Slug: `omotesando`
- Positioning: translucent color and hair-quality improvement.
- Mood: airy, refined, soft luxury.
- Interior direction: white, pale gray, silver, daylight, softer materials.
- Hero copy should emphasize translucency, shine, texture, and polish.

### SHINJUKU

- Slug: `shinjuku`
- Positioning: Korean color and all-round salon service.
- Mood: Korean-salon inspired, polished but approachable.
- Interior direction: white, black, silver, clean lines, balanced contrast.
- Hero copy should emphasize trend-aware versatility.

Each salon entry contains:

```ts
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
```

Addresses are fictional and must be clearly treated as portfolio-demo content.

## Image Model

Images are referenced by typed metadata rather than bare strings.

```ts
export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};
```

Every meaningful image must have useful alt text. Decorative-only imagery may use an empty alt string when appropriate.

## Menu Model

The main service groups are:

- `COLOR`
- `EXTENSION`
- `HAIR REPAIR`
- `HOME CARE`

Menu entries are grouped by category and include display price, explanatory copy, and optional salon affinity.

```ts
export type MenuCategoryId =
  | "color"
  | "extension"
  | "hair-repair"
  | "home-care";

export type MenuItem = {
  id: string;
  category: MenuCategoryId;
  name: string;
  price: string;
  description: string;
  recommendedSalon?: SalonSlug;
};
```

Prices are fictional portfolio values. The menu page includes a short note that final pricing would normally depend on length, condition, and service combination.

## Coupon Model

Coupons are a first-class route and navigation destination.

Phase 2 starts with three representative coupon types:

1. First-visit / introductory coupon.
2. Color-focused coupon.
3. Hair-quality-improvement coupon.

```ts
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
```

Coupons do not execute real reservations or payments. Links may lead to the existing fictional `/reserve` route or a demo notice.

## Routes

### `/menu`

Purpose: present service categories, representative pricing, and treatment concepts.

Structure:

1. Editorial page hero.
2. Category navigation or visual index.
3. Category sections rendered from `menus.ts`.
4. Pricing/disclaimer note.
5. Relevant coupon CTA.

### `/coupon`

Purpose: present clear promotional offers without making the whole brand feel discount-led.

Structure:

1. Editorial page hero.
2. Coupon card grid/list.
3. Conditions/notes.
4. Demo reservation CTA.
5. Fictional-site notice remains visible through the shared layout.

### `/salon`

Purpose: compare the three MOOD. locations visually and by specialty.

Structure:

1. Editorial page hero.
2. Three salon cards with image, specialty summary, and detail link.
3. Shared brand statement tying all stores together.

### `/salon/[slug]`

Purpose: give each store its own personality while remaining recognizably MOOD.

Structure:

1. Store-specific hero image and copy.
2. Specialty list.
3. Interior/gallery imagery.
4. Access, hours, and fictional address.
5. Recommended menu/coupon content derived from typed data.
6. Reserve CTA.

Unknown salon slugs must resolve to the app's 404 experience rather than rendering empty content.

## Home Page Expansion

The Phase 1 hero remains the visual anchor.

Below it, Phase 2 adds:

1. Service overview for `COLOR / EXTENSION / HAIR REPAIR / HOME CARE`.
2. Salon preview section featuring all three locations.
3. Coupon preview section featuring a small curated subset.
4. Links to full `MENU`, `SALON`, and `COUPON` pages.

Home excerpts must consume the same typed data as the full pages.

## Reusable Components

Create focused components rather than large route files. Expected units include:

- `SalonCard`
- `MenuSection`
- `CouponCard`
- `EditorialImage`
- shared section wrappers only when repeated structure justifies them

Components receive data through props and do not own duplicated business content.

## Styling Direction

Preserve Phase 1's editorial, fashion-magazine tone: restrained monochrome base, large serif typography, generous whitespace, small uppercase labels, and deliberate asymmetry where useful.

Store-specific variation comes from imagery, copy, and controlled background/accent treatment rather than inventing three unrelated design systems.

Responsive behavior:

- Mobile: one-column reading flow, comfortable touch targets, intentional image crops.
- Tablet: two-column layouts where content density benefits.
- Desktop: editorial grids and larger image/text compositions.

## Error Handling

- Unknown salon slugs use `notFound()`.
- Data lookups return explicit `undefined` when an item is missing; route code handles that state deliberately.
- No route may silently render blank sections for missing required salon/menu/coupon data.
- Image metadata is required in typed data so broken/incomplete image definitions are caught by TypeScript and tests.

## Testing Strategy

Continue test-driven development with Vitest and Testing Library.

Required coverage:

1. `salons.ts` defines exactly the approved three salons and slugs.
2. Each salon has specialties and required image metadata.
3. `menus.ts` contains all four approved categories.
4. `coupons.ts` contains the approved representative coupon set.
5. `/menu` renders category headings and representative menu content.
6. `/coupon` renders coupon content and reserve/demo affordance.
7. `/salon` renders links to all three detail routes.
8. Salon detail rendering displays the correct salon-specific content.
9. Header/mobile navigation includes `COUPON`.
10. Home-page excerpts render from shared data.
11. Full test suite and `npm run build` pass before Phase 2 completion.

## Accessibility

- Maintain semantic heading order.
- All navigation links must be keyboard accessible.
- Meaningful images require descriptive alt text.
- Text cannot rely on color alone to communicate meaning.
- Interactive controls retain visible focus states.
- Existing skip-link behavior remains intact.

## Completion Criteria

Phase 2 is complete when:

- All listed routes exist and render correctly.
- The three salons are visually distinct but brand-consistent.
- MENU, SALON, and COUPON excerpts appear on the home page.
- `COUPON` appears in desktop and mobile primary navigation.
- Repeated content is sourced from typed data modules.
- All tests pass with zero failures.
- `npm run build` completes successfully.
- The Phase 2 branch is clean and ready for a pull request into `main`.
