import type { PaginationMeta } from "@/types/api.types";

/**
 * Builds a compact page list with ellipses, e.g. `1 … 4 5 6 … 20`, so the
 * pagination control stays usable on mobile regardless of total page count.
 */
export type PageToken = number | "ellipsis";

export function buildPageRange(
  current: number,
  total: number,
  siblings = 1,
): PageToken[] {
  const totalNumbers = siblings * 2 + 5;
  if (total <= totalNumbers) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const left = Math.max(current - siblings, 1);
  const right = Math.min(current + siblings, total);
  const showLeftEllipsis = left > 2;
  const showRightEllipsis = right < total - 1;

  const pages: PageToken[] = [1];
  if (showLeftEllipsis) pages.push("ellipsis");

  for (let page = left; page <= right; page += 1) {
    if (page !== 1 && page !== total) pages.push(page);
  }

  if (showRightEllipsis) pages.push("ellipsis");
  if (total > 1) pages.push(total);

  return pages;
}

export function describeRange(meta: PaginationMeta): string {
  if (meta.totalItems === 0) return "No results";
  const first = (meta.page - 1) * meta.pageSize + 1;
  const last = Math.min(meta.page * meta.pageSize, meta.totalItems);
  return `${first}-${last} of ${meta.totalItems}`;
}
