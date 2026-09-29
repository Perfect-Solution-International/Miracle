import type { ReactNode } from "react";

import type { PaginationMeta } from "@/types/api.types";
import type { ListQuery, SortDirection } from "@/types/pagination.types";

/**
 * Column definition for the DataTable.
 *
 * Deliberately a small, hand-rolled contract rather than a full table library:
 * the platform's tables are server-paginated and server-sorted, so the client
 * never owns the data pipeline and the extra abstraction would not earn its cost.
 */
export interface DataTableColumn<TRow> {
  /** Stable key, also used as the `sortBy` value sent to the backend. */
  id: string;
  header: string;
  /** Renders the cell. Receives the whole row so it can combine fields. */
  cell: (row: TRow) => ReactNode;
  /** Enables the sort control in the header. Requires backend support. */
  sortable?: boolean;
  /** Hidden on small screens; the mobile card view shows it instead. */
  hideOnMobile?: boolean;
  /** Excluded from the column visibility menu when false. */
  hideable?: boolean;
  align?: "left" | "right" | "center";
  /** Tailwind width class, e.g. `w-32`. */
  width?: string;
}

export interface DataTableState extends ListQuery {
  page: number;
  pageSize: number;
}

export interface DataTableProps<TRow> {
  columns: readonly DataTableColumn<TRow>[];
  rows: readonly TRow[];
  /** Stable row identity for React keys and row actions. */
  getRowId: (row: TRow) => string;
  pagination?: PaginationMeta;
  state: DataTableState;
  onStateChange: (next: DataTableState) => void;
  isLoading?: boolean;
  error?: unknown;
  onRetry?: () => void;
  /** Per-row action menu, typically permission-gated by the caller. */
  rowActions?: (row: TRow) => ReactNode;
  /** Row click handler. Rows become keyboard-focusable when provided. */
  onRowClick?: (row: TRow) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  /** Rendered above the table, e.g. search and filters. */
  toolbar?: ReactNode;
  /** Primary label for the mobile card view. Defaults to the first column. */
  mobileTitle?: (row: TRow) => ReactNode;
  caption?: string;
}

export function nextSortDirection(
  current: SortDirection | undefined,
  isActive: boolean,
): SortDirection | undefined {
  if (!isActive) return "asc";
  if (current === "asc") return "desc";
  // Third click clears sorting and returns to the backend's default order.
  return undefined;
}
