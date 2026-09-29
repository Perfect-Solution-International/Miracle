"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { buildPageRange, describeRange } from "@/lib/utilities/pagination";
import { PAGE_SIZE_OPTIONS } from "@/types/pagination.types";
import type { PaginationMeta } from "@/types/api.types";
import { cn } from "@/lib/utils";

/** Server-driven pagination control shared by every table in the platform. */
export function DataTablePagination({
  meta,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: {
  meta: PaginationMeta;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}) {
  const pages = buildPageRange(meta.page, meta.totalPages);
  const isFirst = meta.page <= 1;
  const isLast = meta.page >= meta.totalPages;

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-col items-center justify-between gap-3 sm:flex-row"
    >
      <p className="text-muted-foreground text-sm" aria-live="polite">
        {describeRange(meta)}
      </p>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 sm:flex">
          <label htmlFor="page-size" className="text-muted-foreground text-sm">
            Rows
          </label>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => onPageSizeChange(Number(value))}
          >
            <SelectTrigger id="page-size" size="sm" className="w-[4.5rem]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(meta.page - 1)}
            disabled={isFirst}
            aria-label="Go to previous page"
          >
            <ChevronLeft aria-hidden="true" />
          </Button>

          {pages.map((token, index) =>
            token === "ellipsis" ? (
              <span
                key={`ellipsis-${index}`}
                className="text-muted-foreground px-2 text-sm"
                aria-hidden="true"
              >
                &hellip;
              </span>
            ) : (
              <Button
                key={token}
                variant={token === meta.page ? "default" : "outline"}
                size="icon"
                onClick={() => onPageChange(token)}
                aria-label={`Go to page ${token}`}
                aria-current={token === meta.page ? "page" : undefined}
                className={cn("hidden sm:inline-flex")}
              >
                {token}
              </Button>
            ),
          )}

          <span className="text-muted-foreground px-2 text-sm sm:hidden">
            {meta.page} / {meta.totalPages}
          </span>

          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(meta.page + 1)}
            disabled={isLast}
            aria-label="Go to next page"
          >
            <ChevronRight aria-hidden="true" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
