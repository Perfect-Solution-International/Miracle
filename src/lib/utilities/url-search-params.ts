import type { ListQuery } from "@/types/pagination.types";

/**
 * Table state lives in the URL so a filtered view is shareable, survives reload,
 * and works with browser navigation, rather than being trapped in component state.
 */
export function listQueryToSearchParams(query: ListQuery): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === "") continue;
    // Only primitives belong in a query string; anything else would serialise
    // as "[object Object]" and silently corrupt the URL.
    if (typeof value === "object") continue;
    params.set(key, String(value as string | number | boolean));
  }
  return params;
}

export function searchParamsToListQuery(params: URLSearchParams): ListQuery {
  const page = Number(params.get("page"));
  const pageSize = Number(params.get("pageSize"));
  const sortDir = params.get("sortDir");

  return {
    page: Number.isFinite(page) && page > 0 ? page : undefined,
    pageSize: Number.isFinite(pageSize) && pageSize > 0 ? pageSize : undefined,
    search: params.get("search") ?? undefined,
    sortBy: params.get("sortBy") ?? undefined,
    sortDir: sortDir === "asc" || sortDir === "desc" ? sortDir : undefined,
  };
}

/**
 * Strips undefined values so query keys stay stable and cache-friendly.
 *
 * Constrained to `object` rather than `Record<string, unknown>`: filter types
 * are declared as interfaces, which have no implicit index signature and so do
 * not satisfy the stricter constraint.
 */
export function normaliseQuery<T extends object>(query: T): Partial<T> {
  const result: Partial<T> = {};
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== "") {
      result[key as keyof T] = value as T[keyof T];
    }
  }
  return result;
}
