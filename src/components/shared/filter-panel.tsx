"use client";

import { Filter, X } from "lucide-react";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterDefinition {
  id: string;
  label: string;
  options: readonly FilterOption[];
}

/**
 * Generic filter popover driven by definitions, so status and category filters
 * across modules share one implementation and one interaction pattern.
 */
export function FilterPanel({
  filters,
  values,
  onChange,
  onReset,
  children,
}: {
  filters: readonly FilterDefinition[];
  values: Record<string, string | undefined>;
  onChange: (id: string, value: string | undefined) => void;
  onReset: () => void;
  children?: ReactNode;
}) {
  const activeCount = Object.values(values).filter(Boolean).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter aria-hidden="true" />
          Filters
          {activeCount > 0 ? (
            <Badge className="ml-1 px-1.5" aria-label={`${activeCount} active filters`}>
              {activeCount}
            </Badge>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Filters</h3>
          {activeCount > 0 ? (
            <Button variant="ghost" size="sm" onClick={onReset}>
              <X aria-hidden="true" />
              Reset
            </Button>
          ) : null}
        </div>

        {filters.map((filter) => (
          <div key={filter.id} className="space-y-1.5">
            <Label htmlFor={`filter-${filter.id}`}>{filter.label}</Label>
            <Select
              value={values[filter.id] ?? "all"}
              onValueChange={(value) =>
                onChange(filter.id, value === "all" ? undefined : value)
              }
            >
              <SelectTrigger id={`filter-${filter.id}`} className="w-full">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}

        {children}
      </PopoverContent>
    </Popover>
  );
}
