# Miracle International — Frontend

Frontend for the Miracle International integrated global trade and business solutions platform: a B2B and wholesale platform covering sourcing, quotations, orders, imports and exports, business services, travel, and administration.

Built with Next.js 16 (App Router), TypeScript in strict mode, Tailwind CSS v4, shadcn/ui, and TanStack Query, against a Rust backend.

---

## Getting started

```bash
npm install
cp .env.example .env.local   # then edit the values
npm run dev
```

The app runs at http://localhost:3000.

### Scripts

| Command                 | Purpose                                            |
| ----------------------- | -------------------------------------------------- |
| `npm run dev`           | Development server                                  |
| `npm run build`         | Production build                                    |
| `npm run start`         | Serve the production build                          |
| `npm run typecheck`     | TypeScript, no emit                                 |
| `npm run lint`          | ESLint                                              |
| `npm run format`        | Prettier, write                                     |
| `npm run test`          | Unit tests (Vitest)                                 |
| `npm run test:e2e`      | End-to-end tests (Playwright)                       |
| `npm run validate`      | Typecheck, lint, and test — run before every commit  |

---

## Two things that differ from older Next.js

This project targets Next.js 16. Two conventions differ from most tutorials and from what an AI assistant may suggest:

1. **`middleware.ts` no longer exists.** It was renamed to `proxy.ts` in Next.js 16 and lives at [`src/proxy.ts`](src/proxy.ts). The functionality is unchanged.
2. **Cache Components is enabled** (`cacheComponents: true`). Every route is prerendered to a static shell with dynamic parts streamed in. Reading `cookies()` or uncached data outside a `<Suspense>` boundary fails the build by design.

The version-matched documentation is bundled in `node_modules/next/dist/docs/`. Read it there rather than relying on memory or the public site.

---

## Architecture

The codebase is organised by **domain**, not by technical type. A feature owns its API calls, components, hooks, schemas, types, and utilities together, so work on quotations means working in one folder.

```text
src/
├── app/                 Routes only — thin pages that delegate to features
│   ├── (public)/        Marketing site
│   ├── (auth)/          Login, register, password flows
│   ├── (portal)/        Customer, supplier, staff, admin — one shared shell
│   └── api/v1/          BFF: the only code that talks to the Rust API
├── server/              Server-only. Enforces authorisation
│   ├── dal/             Session, current user, permission guards
│   └── http/            Server-side Rust API client
├── features/            Domain modules (quotations, orders, requirements, …)
├── components/          Shared UI: ui, layout, navigation, data-display, feedback, shared
├── lib/                 api, auth, permissions, query, validation, formatting, utilities, constants
├── config/              app, navigation, permissions, routes, environment
├── providers/           Query, auth, theme
├── hooks/               Cross-cutting hooks
├── types/               Shared wire and domain types
└── proxy.ts             Optimistic redirects (formerly middleware.ts)
```

### Request flow

Components never call the backend directly:

```text
Component → Feature hook → Feature API → API client → BFF route → Rust API
```

### Feature module layout

```text
features/quotations/
├── api/         quotation.api.ts, quotation.keys.ts
├── components/  quotation-table.tsx, quotation-card.tsx, quotation-status.tsx
├── hooks/       use-quotations.ts, use-quotation.ts, use-quotation-mutations.ts
├── schemas/     quotation.schema.ts
├── types/       quotation.types.ts
├── utils/       quotation.utils.ts
└── index.ts     The public surface
```

Import across features only through `index.ts`:

```ts
import { QuotationTable } from "@/features/quotations"; // yes
import { QuotationTable } from "@/features/quotations/components/quotation-table"; // no
```

---

## Authentication and authorisation

### Where tokens live

Tokens are never readable by JavaScript. The browser calls `/api/v1/*` on this app; the BFF route handlers attach the access token server-side and forward the request to Rust. Access and refresh tokens are stored in HTTP-only cookies, so an XSS bug cannot exfiltrate a session, and nothing is kept in `localStorage`.

### Three layers, one of which is real

| Layer                        | Purpose                                   | Security value |
| ---------------------------- | ----------------------------------------- | -------------- |
| `src/proxy.ts`               | Optimistic redirect on cookie presence    | None           |
| `<Can>` / `usePermission()`  | Hide affordances the user cannot act on   | None           |
| `src/server/dal/`            | Server-side enforcement, renders 403      | Real           |
| Rust API                     | The authoritative check                   | Authoritative  |

The first two are user experience only. Anything rendered client-side still reaches the browser bundle.

**Authorisation belongs in the page, not the layout.** Next.js layouts do not re-render when navigating between their child routes, so a check placed there is not re-run. Each page and Server Action calls the DAL itself:

```tsx
export default async function AdminQuotationsPage() {
  await requirePermission("quotations.manage"); // renders forbidden.tsx on failure
  return <QuotationTable detailHref={(id) => ROUTES.admin.quotation(id)} />;
}
```

Client-side, for hiding UI:

```tsx
<Can permission="quotations.create">
  <CreateQuotationButton />
</Can>
```

### Roles and permissions

16 roles map to permissions in [`src/lib/permissions/roles.ts`](src/lib/permissions/roles.ts); permissions are declared in [`permissions.ts`](src/lib/permissions/permissions.ts). Because the list is `as const`, a typo is a build error. Each role also declares its portal, which drives the post-login destination.

Add a permission in `permissions.ts` first, then grant it to roles. Never write an ad-hoc role check in a component.

---

## Adding a feature

1. Create `src/features/<name>/` with the folders above.
2. Add endpoints to [`lib/api/endpoints.ts`](src/lib/api/endpoints.ts).
3. Build query keys hierarchically so invalidation stays precise:

   ```ts
   export const thingKeys = {
     all: ["things"] as const,
     lists: () => [...thingKeys.all, "list"] as const,
     list: (filters: ThingFilters) => [...thingKeys.lists(), filters] as const,
     details: () => [...thingKeys.all, "detail"] as const,
     detail: (id: string) => [...thingKeys.details(), id] as const,
   };
   ```

4. Define Zod schemas separately from components so they are reusable and testable.
5. Add statuses to `lib/constants/statuses/` with label, variant, and allowed transitions — never inline status strings in a component.
6. Add routes to `config/routes.ts` and navigation entries to `config/navigation.ts` with their permissions.
7. Export the public surface from `index.ts`.

### Forms

React Hook Form with Zod. Backend validation errors are mapped onto the offending field:

```tsx
const message = applyBackendErrors(error, form.setError, ["email", "password"]);
```

When a schema uses `.default()` or `z.coerce`, the parsed output differs from the typed input, so supply both generics: `useForm<FormInput, unknown, Output>`. See [`login-form.tsx`](src/features/auth/components/login-form.tsx).

### Tables

Compose the shared [`DataTable`](src/components/data-display/data-table/data-table.tsx). It handles sorting, pagination, column visibility, loading, empty, and error states, and collapses to cards on mobile. Sorting and paging are server-driven; `useTableState` keeps that state in the URL so a filtered view is shareable and survives reload.

---

## Money, dates, and language

- **Money** crosses the wire in **minor units** (integer cents) to avoid floating-point drift, and every amount carries its own currency code. Format with `formatCurrency(amountMinor, currency)`. Nothing assumes LKR.
- **Dates** are ISO-8601 strings formatted through `Intl`, so locale support arrives without rewrites.
- **Language**: English ships today. Text is not yet extracted into message catalogues, but formatting is locale-aware and the supported locales are declared in `config/app.ts`.

---

## Testing

Vitest with React Testing Library for units, Playwright for end-to-end. Priority areas, per the platform's risk profile: authentication, permissions, the quotation and order workflows, and money handling.

```bash
npm run test          # unit
npm run test:e2e      # end-to-end
```

---

## Environment variables

Two schemas enforce the client/server split, validated at startup in [`config/environment.ts`](src/config/environment.ts):

- `NEXT_PUBLIC_*` values are inlined into the browser bundle. **Never put a secret here.**
- Server-only values (`RUST_API_URL`, cookie names) are reachable solely from server code; reading them in the browser throws.

Copy `.env.example` to `.env.local` to start. An invalid or missing variable fails fast with a message naming the offending key.

---

## Conventions

- Files `kebab-case`; components `PascalCase`; functions `camelCase`.
- Server Components by default. Add `"use client"` only where interactivity requires it, and keep the boundary as low in the tree as possible.
- No `any`; no `@ts-ignore` without a written justification.
- No business logic in components — it belongs in feature hooks and utilities.
- Run `npm run validate` before committing.
