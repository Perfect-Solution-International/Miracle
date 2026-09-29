/**
 * Re-exported from the `cn` package that shadcn/ui installs (a compiled
 * drop-in for clsx + tailwind-merge). Aliased here so feature code can import
 * from `@/lib/utilities/cn` alongside the other utilities, while the shadcn
 * primitives keep importing `@/lib/utils`. Both resolve to one implementation.
 */
export { cn } from "cn";
