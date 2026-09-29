import type { ApiEnvelope, ApiErrorPayload, Paginated } from "@/types/api.types";

/** Builds a success envelope. Used by BFF route handlers. */
export function successResponse<TData>(data: TData, init?: ResponseInit): Response {
  return Response.json({ success: true, data } satisfies ApiEnvelope<TData>, {
    status: 200,
    ...init,
  });
}

/** Builds a failure envelope in the shape the frontend expects. */
export function errorResponse(error: ApiErrorPayload, status: number): Response {
  return Response.json({ success: false, error } satisfies ApiEnvelope<never>, {
    status,
  });
}

/** Type guard for paginated payloads. */
export function isPaginated<TItem>(value: unknown): value is Paginated<TItem> {
  return (
    typeof value === "object" &&
    value !== null &&
    "items" in value &&
    Array.isArray((value as Paginated<TItem>).items)
  );
}
