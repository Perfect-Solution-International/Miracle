"use client";

import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { CurrencyDisplay } from "@/components/data-display/currency-display";
import { DateDisplay } from "@/components/data-display/date-display";
import { DataTable } from "@/components/data-display/data-table";
import type { DataTableColumn } from "@/components/data-display/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SearchInput } from "@/components/shared/search-input";
import { useTableState } from "@/hooks/use-table-state";
import { useAuth } from "@/providers/auth-provider";

import { useQuotations } from "../hooks/use-quotations";
import { useApproveQuotation } from "../hooks/use-quotation-mutations";
import { canApprove, canReject } from "../utils/quotation.utils";
import { QuotationStatusBadge } from "./quotation-status";
import type { QuotationSummary } from "../types/quotation.types";

/**
 * Quotation list.
 *
 * Shows how a feature composes the shared DataTable: it owns its columns and
 * row actions, while paging, sorting, and the mobile card view come from the
 * shared component. Table state lives in the URL via `useTableState`.
 */
export function QuotationTable({ detailHref }: { detailHref: (id: string) => string }) {
  const router = useRouter();
  const { ability } = useAuth();
  const { state, setState, setSearch } = useTableState({
    sortBy: "createdAt",
    sortDir: "desc",
  });
  const approve = useApproveQuotation();

  const { data, isLoading, error, refetch } = useQuotations(state);

  const columns = useMemo<DataTableColumn<QuotationSummary>[]>(
    () => [
      {
        id: "reference",
        header: "Reference",
        sortable: true,
        hideable: false,
        cell: (row) => <span className="font-medium">{row.reference}</span>,
      },
      {
        id: "customerName",
        header: "Customer",
        sortable: true,
        cell: (row) => row.customerName,
      },
      {
        id: "status",
        header: "Status",
        sortable: true,
        cell: (row) => <QuotationStatusBadge status={row.status} />,
      },
      {
        id: "totalMinor",
        header: "Total",
        sortable: true,
        align: "right",
        cell: (row) => (
          <CurrencyDisplay
            amountMinor={row.totalMinor}
            currency={row.currency}
            showCode
          />
        ),
      },
      {
        id: "validUntil",
        header: "Valid until",
        sortable: true,
        hideOnMobile: true,
        cell: (row) => <DateDisplay value={row.validUntil} />,
      },
      {
        id: "createdAt",
        header: "Created",
        sortable: true,
        hideOnMobile: true,
        cell: (row) => <DateDisplay value={row.createdAt} relative />,
      },
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      rows={data?.items ?? []}
      getRowId={(row) => row.id}
      pagination={data?.pagination}
      state={state}
      onStateChange={setState}
      isLoading={isLoading}
      error={error}
      onRetry={() => void refetch()}
      onRowClick={(row) => router.push(detailHref(row.id))}
      mobileTitle={(row) => row.reference}
      emptyTitle="No quotations yet"
      emptyDescription="Quotations you create or receive will appear here."
      caption="List of quotations"
      toolbar={
        <SearchInput
          value={state.search ?? ""}
          onSearch={setSearch}
          placeholder="Search by reference or customer"
        />
      }
      rowActions={(row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Actions for quotation ${row.reference}`}
            >
              <MoreHorizontal aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push(detailHref(row.id))}>
              View details
            </DropdownMenuItem>
            {canApprove(row.status, ability) ? (
              <DropdownMenuItem
                onClick={() => approve.mutate(row.id)}
                disabled={approve.isPending}
              >
                Approve
              </DropdownMenuItem>
            ) : null}
            {canReject(row.status, ability) ? (
              <DropdownMenuItem onClick={() => router.push(detailHref(row.id))}>
                Reject
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    />
  );
}
