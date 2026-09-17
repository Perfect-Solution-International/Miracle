import type { Permission } from "@/lib/permissions/permissions";

/** Visual treatment for a status badge. Maps to StatusBadge variants. */
export type StatusVariant =
  "neutral" | "info" | "pending" | "success" | "warning" | "danger";

/**
 * A status definition carries its own presentation and workflow rules, so no
 * component needs to hardcode a status string or decide which action is legal.
 */
export interface StatusDefinition<TStatus extends string> {
  value: TStatus;
  label: string;
  variant: StatusVariant;
  /** Statuses this one may legally transition into. */
  transitionsTo?: readonly TStatus[];
  /** Permission required to move the record out of this status. */
  requiredPermission?: Permission;
  /** True for terminal states, which suppress action buttons. */
  terminal?: boolean;
}

export type StatusMap<TStatus extends string> = Readonly<
  Record<TStatus, StatusDefinition<TStatus>>
>;

/** Builds lookup helpers so each status module stays declarative. */
export function createStatusHelpers<TStatus extends string>(map: StatusMap<TStatus>) {
  return {
    definition: (status: TStatus) => map[status],
    label: (status: TStatus) => map[status]?.label ?? status,
    variant: (status: TStatus): StatusVariant => map[status]?.variant ?? "neutral",
    options: () => Object.values(map) as StatusDefinition<TStatus>[],
    canTransition: (from: TStatus, to: TStatus): boolean =>
      map[from]?.transitionsTo?.includes(to) ?? false,
    isTerminal: (status: TStatus): boolean => map[status]?.terminal === true,
  };
}
