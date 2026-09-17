"use client";

import { ArrowDown, ArrowUp, ArrowUpDown, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/components/feedback/empty-state";
import { ErrorState } from "@/components/feedback/error-state";
import { LoadingState } from "@/components/feedback/loading-state";
import { cn } from "@/lib/utils";

import { DataTablePagination } from "./data-table-pagination";
import { nextSortDirection, type DataTableProps } from "./data-table.types";

/**
 * The platform's shared table.
 *
 * Sorting, paging, and searching are server-driven: every state change is handed
 * back through `onStateChange` and the caller refetches. The component holds no
 * data state of its own, so it behaves identically across all portals.
 *
 * On small screens the table collapses into a card list, since a wide B2B table
 * (order number, customer, status, dates, totals) cannot be read on a phone.
 */
export function DataTable<TRow>({
  columns,
  rows,
  getRowId,
  pagination,
  state,
  onStateChange,
  isLoading = false,
  error,
  onRetry,
  rowActions,
  onRowClick,
  emptyTitle = "No records found",
  emptyDescription = "Try adjusting your filters or search terms.",
  toolbar,
  mobileTitle,
  caption,
}: DataTableProps<TRow>) {
  const [hiddenColumns, setHiddenColumns] = useState<ReadonlySet<string>>(new Set());

  const visibleColumns = useMemo(
    () => columns.filter((column) => !hiddenColumns.has(column.id)),
    [columns, hiddenColumns],
  );

  function toggleColumn(id: string) {
    setHiddenColumns((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function handleSort(columnId: string) {
    const isActive = state.sortBy === columnId;
    const direction = nextSortDirection(state.sortDir, isActive);

    onStateChange({
      ...state,
      sortBy: direction ? columnId : undefined,
      sortDir: direction,
      // Sorting changes which records appear first, so return to page one.
      page: 1,
    });
  }

  if (error) {
    return <ErrorState error={error} onRetry={onRetry} />;
  }

  const hideableColumns = columns.filter((column) => column.hideable !== false);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">{toolbar}</div>

        {hideableColumns.length > 0 ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden md:inline-flex">
                <SlidersHorizontal aria-hidden="true" />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Visible columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {hideableColumns.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={!hiddenColumns.has(column.id)}
                  onCheckedChange={() => toggleColumn(column.id)}
                >
                  {column.header}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>

      {isLoading ? (
        <LoadingState rows={state.pageSize > 10 ? 8 : state.pageSize} />
      ) : rows.length === 0 ? (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      ) : (
        <>
          {/* Desktop and tablet: a real table, horizontally scrollable if needed. */}
          <div className="hidden overflow-x-auto rounded-lg border md:block">
            <Table>
              {caption ? <TableCaption>{caption}</TableCaption> : null}
              <TableHeader>
                <TableRow>
                  {visibleColumns.map((column) => {
                    const isSorted = state.sortBy === column.id;
                    return (
                      <TableHead
                        key={column.id}
                        className={cn(
                          column.width,
                          column.align === "right" && "text-right",
                          column.align === "center" && "text-center",
                        )}
                        aria-sort={
                          isSorted
                            ? state.sortDir === "asc"
                              ? "ascending"
                              : "descending"
                            : undefined
                        }
                      >
                        {column.sortable ? (
                          <button
                            type="button"
                            onClick={() => handleSort(column.id)}
                            className="hover:text-foreground focus-visible:ring-ring inline-flex items-center gap-1 rounded-sm font-medium focus-visible:ring-2 focus-visible:outline-none"
                          >
                            {column.header}
                            {isSorted ? (
                              state.sortDir === "asc" ? (
                                <ArrowUp className="size-3.5" aria-hidden="true" />
                              ) : (
                                <ArrowDown className="size-3.5" aria-hidden="true" />
                              )
                            ) : (
                              <ArrowUpDown
                                className="size-3.5 opacity-50"
                                aria-hidden="true"
                              />
                            )}
                            <span className="sr-only">
                              {isSorted && state.sortDir === "asc"
                                ? ", sorted ascending"
                                : isSorted
                                  ? ", sorted descending"
                                  : ", not sorted"}
                            </span>
                          </button>
                        ) : (
                          column.header
                        )}
                      </TableHead>
                    );
                  })}
                  {rowActions ? (
                    <TableHead className="w-12">
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  ) : null}
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={getRowId(row)}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    onKeyDown={
                      onRowClick
                        ? (event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              onRowClick(row);
                            }
                          }
                        : undefined
                    }
                    tabIndex={onRowClick ? 0 : undefined}
                    role={onRowClick ? "button" : undefined}
                    className={cn(
                      onRowClick &&
                        "focus-visible:ring-ring cursor-pointer focus-visible:ring-2 focus-visible:outline-none",
                    )}
                  >
                    {visibleColumns.map((column) => (
                      <TableCell
                        key={column.id}
                        className={cn(
                          column.align === "right" && "text-right",
                          column.align === "center" && "text-center",
                        )}
                      >
                        {column.cell(row)}
                      </TableCell>
                    ))}
                    {rowActions ? (
                      // Stops a row click from firing when using the action menu.
                      <TableCell onClick={(event) => event.stopPropagation()}>
                        {rowActions(row)}
                      </TableCell>
                    ) : null}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile: one card per record. */}
          <ul className="space-y-3 md:hidden">
            {rows.map((row) => {
              const [firstColumn, ...restColumns] = visibleColumns;
              return (
                <li key={getRowId(row)} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between gap-3">
                    <button
                      type="button"
                      onClick={onRowClick ? () => onRowClick(row) : undefined}
                      disabled={!onRowClick}
                      className="text-left font-medium disabled:cursor-default"
                    >
                      {mobileTitle
                        ? mobileTitle(row)
                        : firstColumn
                          ? firstColumn.cell(row)
                          : null}
                    </button>
                    {rowActions ? rowActions(row) : null}
                  </div>
                  <dl className="mt-3 space-y-1.5">
                    {restColumns
                      .filter((column) => !column.hideOnMobile)
                      .map((column) => (
                        <div
                          key={column.id}
                          className="flex items-center justify-between gap-4 text-sm"
                        >
                          <dt className="text-muted-foreground">{column.header}</dt>
                          <dd className="text-right">{column.cell(row)}</dd>
                        </div>
                      ))}
                  </dl>
                </li>
              );
            })}
          </ul>
        </>
      )}

      {pagination && pagination.totalItems > 0 ? (
        <DataTablePagination
          meta={pagination}
          pageSize={state.pageSize}
          onPageChange={(page) => onStateChange({ ...state, page })}
          onPageSizeChange={(pageSize) => onStateChange({ ...state, pageSize, page: 1 })}
        />
      ) : null}
    </div>
  );
}
