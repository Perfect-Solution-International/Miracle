"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api/api-error";
import { cn } from "@/lib/utils";

/**
 * Renders a failed request. Shows the backend's message when it is safe and
 * useful, and surfaces the request id so support can trace it in the Rust logs.
 */
export function ErrorState({
  error,
  onRetry,
  className,
}: {
  error: unknown;
  onRetry?: () => void;
  className?: string;
}) {
  const apiError = error instanceof ApiError ? error : null;
  const message =
    apiError?.message ??
    (error instanceof Error ? error.message : "Something went wrong.");

  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed px-6 py-12 text-center",
        className,
      )}
    >
      <AlertTriangle className="text-destructive size-8" aria-hidden="true" />
      <div className="space-y-1">
        <h3 className="text-base font-medium">Unable to load this content</h3>
        <p className="text-muted-foreground mx-auto max-w-sm text-sm">{message}</p>
        {apiError?.requestId ? (
          <p className="text-muted-foreground text-xs">
            Reference: <code>{apiError.requestId}</code>
          </p>
        ) : null}
      </div>
      {onRetry ? (
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RefreshCw aria-hidden="true" />
          Try again
        </Button>
      ) : null}
    </div>
  );
}
