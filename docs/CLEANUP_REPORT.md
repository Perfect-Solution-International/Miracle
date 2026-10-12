# Cleanup validation report

Date: 2026-10-12. The initial Git working tree was clean.

## Scope and inspection

Inventoried all 551 tracked files, including 465 TypeScript/TSX files, 24 Rust files, five CSS files, two SQL migrations, and 30 public assets. Used the TypeScript compiler API to resolve imports/re-exports across the frontend, ESLint and compiler diagnostics for local bindings, and repository-wide searches for names, paths, dynamic imports, runtime registration, scripts, and configuration references. This is a static usage audit, not a claim that every runtime path was exercised.

Read AGENTS.md, CLAUDE.md, README.md, docs/ARCHITECTURE.md, the installed Next.js project-structure and ESLint guides, package/lock files, compiler/lint/test/build configuration, the scaffold script, route/proxy conventions, backend module registration, and asset/storage references. The architecture document is a roadmap; its proposed authentication, API, database, and routing changes were not implemented during this cleanup.

Stack: npm; Next.js 16.3.5 App Router, React 19, strict TypeScript, Tailwind v4, shadcn/Radix, TanStack Query; Rust 2021 with Axum, Tokio, SQLx/PostgreSQL. Entry points include src/app layouts/pages and convention files, src/proxy.ts, the Next.js API handlers, and server/src/main.rs with its registered routes. No implemented scheduled-job or background-worker entry point was found. Vitest owns unit tests; Playwright owns desktop/mobile browser tests. scripts/generate-pages.mjs remains an explicitly invoked scaffolding tool.

## Changes and counting

- 56 existing files modified and 18 files deleted; this report is the only added file.
- 246 unused import bindings removed from surviving files: 239 TypeScript and seven Rust. This includes 25 complete TypeScript import statements. Deleted internal modules contained another 348 import bindings, for **594 import bindings removed overall**.
- **80 non-import dead-code items removed**, counted without nested declarations inside deleted functions: 51 top-level declarations in deleted modules (16 functions/components, 18 types/interfaces, 17 constants), 11 unused local declarations in surviving modules, 17 unused destructured bindings, and one unused Rust method (ApiResponse::with_meta). No classes removed.
- Deleted 17 unreferenced internal TypeScript modules, including the obsolete admin dashboard/travel UI and its private types/data, an unused services landing implementation, and a travel background wrapper. These were not framework entry points, were not exposed by feature barrels, had no surviving import/re-export consumers, and had no script/string registration references. Active admin inquiry/package views remain.
- Deleted one unimported CSS module (light-page.module.css) and the unreferenced local CSS-module classes heroOverlay and serviceCard. No images, uploaded files, JSON business data, migrations, or global CSS utilities were removed.
- Removed five direct npm dependencies: clsx, date-fns, tailwind-merge, tailwindcss-animate, zustand. Removed two direct Rust dependencies: tower and anyhow. cn supplies the existing class-merging implementation; globals.css still imports tw-animate-css and shadcn/tailwind.css. Runtime/framework/tooling dependencies remain. clsx may remain transitively required.
- npm updated the lockfile; unrelated platform metadata churn was discarded. Retained package versions are unchanged. No dependency directories were edited by cleanup commands.
- Preserved public component prop types, shared hooks/barrels, response serialization fields, routes, permissions, authentication, error handling, logging, and environment values. Kept hook calls/state setters whose removal could alter subscriptions or render timing.
- Compared JSX syntax in every surviving edited TSX file against HEAD after normalizing checkout line endings: no JSX differences. Removed obsolete comments attached only to deleted declarations; useful documentation remains.

## Validation

| Check | Baseline | After cleanup |
| --- | --- | --- |
| npm run typecheck | Passed | Passed, also with --noUnusedLocals --noUnusedParameters --incremental false |
| ESLint | 0 errors, 313 warnings | 0 errors, 12 warnings; no unused-variable/import warnings |
| npm test | 29 tests passed in 3 files | 29 tests passed in 3 files |
| Production build | Blocked in restricted environment fetching Geist Mono and Manrope | Passed with network access; 98/98 pages generated; also rebuilt by isolated Playwright server |
| Playwright, dedicated production server on port 3107 | See comparison limitation below | 12 passed, 4 failed; desktop and mobile navigation/card tests passed |
| cargo check --offline | Passed, 7 warnings | Passed, 1 retained warning |
| cargo test --locked --offline | 4 passed | 4 passed |
| cargo clippy --locked --offline --all-targets | Passed, 7 warnings | Passed, 1 retained warning |
| cargo fmt --check | Fails with 35 formatting hunks in original snapshot | Same pre-existing formatting debt; no new formatting hunks retained |
| Prettier API check of 50 surviving edited TS/CSS/JSON files | 45 already unformatted | Same 45; no new failures after normalizing CRLF checkout endings |
| node --check scripts/generate-pages.mjs | Existing script inspected | Passed |
| git diff --check | Clean initial tree | Passed |

### Browser failures and baseline limitation

The four failures are two auth assertions in each of the chromium/mobile projects in src/test/e2e/auth.spec.ts (anonymous portal redirect and protection of every portal root). Both stop at /customer/dashboard. src/config/routes.ts already includes that route in PUBLIC_PATH_OVERRIDES, so isProtectedPath returns false. Executed the original HEAD and current route helpers independently: both return false for /customer/dashboard and true for /supplier/dashboard, /staff/dashboard, and /admin/dashboard. The route configuration is unchanged; the only proxy edit removes an unused import. This confirms the pre-existing conflict between the test expectations and route policy without changing authorization behavior.

The first Playwright invocation reused the user's existing port-3000 server and reported 9 passed/7 failed; it is not treated as cleanup validation. The dedicated production run supersedes it. A full browser baseline from an archived HEAD snapshot was attempted: Turbopack rejected its cross-drive node_modules junction, and a Webpack fallback also failed cross-drive module resolution before tests could start. Therefore no successful full baseline browser run is claimed.

Rust still warns that AppError::Conflict is never constructed; it was retained because it defines error-response handling. SQLx 0.7.4 also reports an existing future-compatibility warning. The 12 remaining ESLint warnings concern state updates in effects, effect dependencies, and window.location navigation; changing those would go beyond dead-code removal. No database-backed integration suite is configured, and no live database integration validation is claimed.

## Intentionally retained / follow-up

- Shared/public export surfaces and scaffolding: src/features/*/index.ts, src/server/dal/index.ts, src/lib/permissions/index.ts, src/lib/api/types.ts, src/config/permissions.ts, src/lib/utilities/cn.ts, reusable hooks such as useDebounce/useMediaQuery/usePermission, and shared UI primitives. Lack of an app import alone does not justify removing their documented interfaces.
- attachRequestId and other exported extension helpers were retained for interface review; no security/tracing behavior was redesigned.
- Duplicate admin route aliases and all Next.js automatically discovered routes remain. Decide canonical URLs separately.
- Global CSS and public/upload assets remain because framework-generated class names and stored/external asset URLs can escape source-reference searches. In particular with-scroll-bars-hidden is injected by the scroll-lock library.
- Resolve the /customer/dashboard public-route versus authentication-test policy conflict as a separate authorized behavior change. Address existing effect/navigation and formatting warnings separately. Run database-backed integration checks in the normal deployment/test environment.

## Modified files

- package-lock.json
- package.json
- server/Cargo.toml
- server/src/middleware/auth.rs
- server/src/models/response.rs
- server/src/routes/requirements.rs
- server/src/routes/travel.rs
- src/app/(public)/business-solutions/page.tsx
- src/app/(public)/how-it-works/page.tsx
- src/app/(public)/it-solutions/animated-circuit-background.module.css
- src/app/(public)/landing-surfaces.module.css
- src/app/(public)/request-quotation/page.tsx
- src/app/(public)/services/marketing-advertising/page.tsx
- src/components/admin-dashboard/admin-dashboard-view.tsx
- src/components/admin-inquiries/admin-inquiries-view.tsx
- src/components/admin-inquiries/admin-inquiry-details-dialog.tsx
- src/components/admin-profile/admin-profile-view.tsx
- src/components/admin-travel/admin-travel-nav-header.tsx
- src/components/admin-travel/travel-management-view.tsx
- src/components/admin-travel/travel-package-details-dialog.tsx
- src/components/admin-travel/travel-package-dialog.tsx
- src/components/admin-travel/travel-packages-table.tsx
- src/components/common/page-hero.tsx
- src/components/common/subpage-template.tsx
- src/components/layout/public/mobile-navigation.tsx
- src/components/navigation/notification-menu.tsx
- src/components/navigation/portal-search.tsx
- src/components/travel/inbound-tours-view.tsx
- src/components/travel/outbound-tours-view.tsx
- src/components/travel/public-travel-inquiry-modal.tsx
- src/components/travel/public-travel-package-grid.tsx
- src/config/navigation.ts
- src/config/public-navigation.ts
- src/features/faq/components/faq-content.tsx
- src/features/flight-tickets/components/flight-assistance-section.tsx
- src/features/flight-tickets/components/flight-tickets-hero.tsx
- src/features/franchise/components/franchise-landing.tsx
- src/features/import-export/components/import-export-landing.tsx
- src/features/investment/components/investment-landing.tsx
- src/features/marketing/components/home-gateway.tsx
- src/features/marketing/components/services-overview.tsx
- src/features/requirements/components/intake-industry-gallery.tsx
- src/features/requirements/components/tell-us-what-you-need-view.tsx
- src/features/requirements/data/tell-us-what-you-need.content.ts
- src/features/trading/components/trading-landing.tsx
- src/features/travel/components/package-detail-modal.tsx
- src/features/travel/components/package-detail/admin-package-detail-page.tsx
- src/features/travel/components/package-detail/package-hero.tsx
- src/features/travel/components/package-detail/package-reviews-section.tsx
- src/features/travel/components/travel-package-card.tsx
- src/features/travel/components/travel-services-section.tsx
- src/features/travel/components/travel-subpage-hero.tsx
- src/features/travel/components/trip-planner-form.tsx
- src/features/travel/data/travel.content.ts
- src/features/visa-services/components/visa-hero.tsx
- src/proxy.ts

## Deleted files

- src/app/(public)/light-page.module.css
- src/components/admin-dashboard/add-travel-package-dialog.tsx
- src/components/admin-dashboard/booking-details-dialog.tsx
- src/components/admin-dashboard/data.ts
- src/components/admin-dashboard/quick-actions.tsx
- src/components/admin-dashboard/recent-requests-table.tsx
- src/components/admin-dashboard/recent-travel-bookings.tsx
- src/components/admin-dashboard/request-details-dialog.tsx
- src/components/admin-dashboard/service-overview.tsx
- src/components/admin-dashboard/status-badge.tsx
- src/components/admin-dashboard/types.ts
- src/components/admin-travel/inquiry-details-dialog.tsx
- src/components/admin-travel/travel-booking-details-dialog.tsx
- src/components/admin-travel/travel-bookings-table.tsx
- src/components/admin-travel/travel-inquiries-table.tsx
- src/components/admin-travel/travel-inquiries-view.tsx
- src/features/marketing/components/services-landing.tsx
- src/features/travel/components/travel-cinematic-background.tsx
