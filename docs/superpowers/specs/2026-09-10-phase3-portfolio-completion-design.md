# Phase 3: Portfolio Completion Design

## Goal

Complete every destination in the MOOD. primary navigation by adding convincing fictional `STYLE`, `STAFF`, `PRODUCT`, and `RESERVE` experiences. Phase 3 should balance editorial presentation with enough interaction to demonstrate frontend engineering skill, while keeping the project safe, fictional, and easy to deepen in later phases.

## Scope

Phase 3 includes:

- A filterable `/style` gallery with nine fictional hairstyles.
- A `/staff` directory with six fictional stylists.
- A `/product` catalog with four fictional MOOD. LAB products.
- A three-step `/reserve` demo flow.
- Typed source data and relationship validation for styles, staff, products, salons, and menus.
- Responsive imagery, descriptive alternative text, route metadata, and accessible interaction states.
- Tests for data contracts, route rendering, style filtering, and the complete reservation flow.

Phase 3 does not include staff detail routes, product detail routes, ecommerce, payments, accounts, a CMS, a backend, calendar availability, email delivery, analytics, or persistent reservation storage.

## Product Positioning

This is a fictional portfolio site. Content should feel credible enough to demonstrate a production-minded salon experience without implying that a real appointment or purchase can occur.

The shared fictional-site notice remains visible. The reservation flow repeats the demo disclosure before confirmation and after completion. Product actions lead to related menus or salon information instead of checkout.

## Architecture

Continue the Phase 2 data-first architecture. New content lives in typed modules under `src/data`; route components render those modules through focused presentation components. Existing salon and menu records remain the source of truth for cross-links.

New modules:

- `src/data/styles.ts`
- `src/data/staff.ts`
- `src/data/products.ts`

The reservation flow is an isolated client component beneath the server-rendered `/reserve` route. It owns temporary form state in memory only. It must not call a server action, API route, `fetch`, storage API, or third-party service.

## Data Contracts

All meaningful imagery uses the existing `ImageAsset` type from `src/data/salons.ts`.

### Styles

```ts
export type StyleCategory =
  | "color"
  | "sheer"
  | "korean"
  | "repair";

export type HairStyle = {
  id: string;
  title: string;
  category: StyleCategory;
  description: string;
  salonSlug: SalonSlug;
  staffId: string;
  image: ImageAsset;
};
```

The gallery contains exactly nine entries. Three entries may reuse the hairstyle-oriented salon assets from Phase 2; six additional images provide enough variation for filtering without creating unnecessary assets.

### Staff

```ts
export type StaffMember = {
  id: string;
  name: string;
  role: string;
  salonSlug: SalonSlug;
  specialties: string[];
  bio: string;
  image: ImageAsset;
  styleIds: string[];
};
```

The directory contains exactly six fictional people, two per salon. Each member references at least one valid style and exposes a useful specialty summary.

### Products

```ts
export type Product = {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  description: string;
  usage: string;
  image: ImageAsset;
  availableAt: SalonSlug[];
  relatedMenuCategory: MenuCategoryId;
};
```

The catalog contains exactly four fictional MOOD. LAB products. Every product references at least one valid salon and one existing menu category.

### Reservation

```ts
export type ReservationValues = {
  salonSlug: SalonSlug | "";
  menuItemId: string;
  staffId: string;
  preferredDate: string;
  name: string;
  email: string;
  phone: string;
  note: string;
};
```

`staffId`, `phone`, and `note` are optional values. Salon, menu, preferred date, name, and email are required. Staff choices are limited to the selected salon. Changing the salon clears a staff choice that no longer belongs to that location.

## Route Design

### `/style`

1. Editorial page hero.
2. Introductory copy describing the fictional collection.
3. Category filter with `ALL`, `COLOR`, `SHEER`, `KOREAN`, and `REPAIR` controls.
4. Responsive style grid showing image, title, category, staff, and salon.
5. Links from each item to the associated salon and from the page footer to reservation.

Filtering happens on the client without URL mutation. `ALL` is selected initially. Filter controls use buttons with `aria-pressed`; an empty result is not possible with the approved data set, but the component renders a clear message if future data creates one.

### `/staff`

1. Editorial page hero.
2. Six-card responsive directory.
3. Each card shows portrait, name, role, salon, specialties, short biography, and representative style names.
4. Salon and reservation links use existing routes.

Phase 3 deliberately keeps staff profiles on one page. The data model supports a later `staff/[id]` detail route without changing current consumers.

### `/product`

1. Editorial page hero for MOOD. LAB.
2. Four-product responsive catalog.
3. Each product shows packshot, name, subtitle, fictional price, description, usage, and availability.
4. Calls to action lead to the related menu section and salon index; there is no cart or purchase control.

### `/reserve`

The route displays a three-step client-side demo:

1. **SELECT** — salon, menu, optional staff, and preferred date.
2. **DETAILS** — name, email, optional phone, and optional note.
3. **CONFIRM** — human-readable summary, demo disclosure, back button, and completion button.

Completing the flow displays a success-style demo panel that explicitly says no reservation was sent or stored. A reset action returns to the first step with empty values.

## Reservation Validation and State

- Step changes occur only after fields in the current step validate.
- Required messages appear beside the relevant control and in an error summary.
- Email uses a modest format check suitable for client feedback; it does not claim deliverability.
- Preferred dates before the current local date are rejected.
- Returning to a prior step preserves entered values.
- Advancing a step moves keyboard focus to the new step heading.
- Completing or resetting the demo does not write to browser storage.
- Unexpected missing lookup data produces a readable fallback rather than an empty label or crash.

## Components

Focused components should follow existing naming and CSS Module conventions:

- `StyleGallery` — filter state and result rendering.
- `StyleCard` — one style presentation.
- `StaffCard` — one staff presentation.
- `ProductCard` — one product presentation.
- `ReserveFlow` — step state, validation orchestration, and completion/reset.
- Small reservation step components may be extracted when they keep `ReserveFlow` readable; shared form abstractions are not required.

Existing `PageHero`, `SectionHeading`, `EditorialImage`, `TextLink`, `DemoNotice`, header, and footer remain in use. New generic wrappers are introduced only after repeated structure appears.

## Visual Direction

Preserve the Phase 1 and Phase 2 editorial system: monochrome foundation, large serif display type, small uppercase labels, fine rules, generous whitespace, and restrained asymmetry.

- Desktop page content uses the established `--content-max` and `--page-gutter` tokens.
- Mobile layouts use a single readable column with at least the existing 20px gutter.
- Tablet and desktop grids expand only where card content remains readable.
- Style imagery uses deliberate portrait/editorial crops.
- Staff portraits share neutral lighting and art direction without making the fictional people appear to be real employees.
- Product imagery uses a consistent minimal studio treatment.
- `object-fit: cover` is limited to fixed editorial frames; product packshots use containment when cropping would hide packaging.

Initial Phase 3 imagery is sufficient to complete every route. Later visual refinement may replace individual images or adjust composition without changing the data interfaces.

## Accessibility

- Preserve skip-link, semantic heading order, visible focus indicators, and keyboard navigation.
- Every meaningful image has specific Japanese alternative text.
- Filter controls expose selected state programmatically.
- Form controls have visible labels, associated errors, and useful autocomplete attributes where applicable.
- Reservation steps are announced through headings and focus movement, not color alone.
- Error text and muted text maintain readable contrast against their backgrounds.
- Reduced-motion preferences continue to use the global motion override.

## Error Handling

- Cross-record tests prevent orphaned salon, staff, style, and menu references.
- UI lookup helpers return `undefined` explicitly and consumers render fallbacks deliberately.
- The style gallery always has an `ALL` fallback.
- Reservation validation prevents forward navigation when required data is missing or invalid.
- No user-entered value is interpolated as HTML.

## Testing Strategy

All implementation follows RED → GREEN TDD with Vitest, Testing Library, and `user-event`.

Required coverage:

1. Styles define exactly nine entries and all four categories.
2. Staff define exactly six entries, two per salon, with valid style references.
3. Products define exactly four entries with valid salon and menu references.
4. All image metadata has a project-local source, useful alt text, and positive dimensions.
5. `/style`, `/staff`, `/product`, and `/reserve` render their approved primary content.
6. Style filters update the visible cards and selected state.
7. Reservation cannot advance with missing required fields.
8. Changing salon removes an incompatible staff selection.
9. Valid reservation values survive backward navigation and appear in confirmation.
10. Completion states that nothing was transmitted or saved, and reset clears the flow.
11. Full tests, lint, production build, and route checks pass before Phase 3 completion.

## Delivery Sequence

1. Commit this approved design and a detailed implementation plan.
2. Add typed data and relationship tests.
3. Build the STYLE experience and its assets.
4. Build STAFF and PRODUCT experiences and their assets.
5. Build and test the RESERVE flow.
6. Run complete responsive, accessibility, test, lint, build, and diff verification.
7. Push the Phase 3 branch and open a pull request to `main`.

Each independently testable task receives its own small commit. The Phase 3 worktree remains isolated from `main` and the completed Phase 2 branch.
