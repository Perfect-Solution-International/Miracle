"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import type { DataTableState } from "@/components/data-display/data-table/data-table.types";
import {
  listQueryToSearchParams,
  searchParamsToListQuery,
} from "@/lib/utilities/url-search-params";
import { DEFAULT_PAGE_SIZE } from "@/types/pagination.types";

/**
 * Keeps table state in the URL.
 *
 * A filtered table view is then shareable with a colleague, survives a refresh,
 * and works with the back button. `router.replace` avoids stacking a history
 * entry for every keystroke or page change.
 */
export function useTableState(defaults?: Partial<DataTableState>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const state = useMemo<DataTableState>(() => {
    const parsed = searchParamsToListQuery(new URLSearchParams(searchParams.toString()));
    return {
      page: parsed.page ?? defaults?.page ?? 1,
      pageSize: parsed.pageSize ?? defaults?.pageSize ?? DEFAULT_PAGE_SIZE,
      search: parsed.search ?? defaults?.search,
      sortBy: parsed.sortBy ?? defaults?.sortBy,
      sortDir: parsed.sortDir ?? defaults?.sortDir,
    };
  }, [searchParams, defaults]);

  const setState = useCallback(
    (next: DataTableState) => {
      const params = listQueryToSearchParams(next);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router],
  );

  const setSearch = useCallback(
    (search: string) => {
      // A new search term invalidates the current page offset.
      setState({ ...state, search: search || undefined, page: 1 });
    },
    [state, setState],
  );

  return { state, setState, setSearch };
}
