"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

/**
 * Global error boundary.
 *
 * Next.js passes a `digest` for server-side errors; the real message and stack
 * stay on the server, so it is safe to show the digest as a support reference
 * without leaking internals to the browser.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Replace with the platform's error reporter when observability lands.
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 p-6 text-center">
      <AlertTriangle className="text-destructive size-10" aria-hidden="true" />
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-muted-foreground max-w-md text-sm">
        An unexpected error occurred while loading this page. Please try again.
      </p>
      {error.digest ? (
        <p className="text-muted-foreground text-xs">
          Reference: <code>{error.digest}</code>
        </p>
      ) : null}
      <Button onClick={reset}>Try again</Button>
    </main>
  );
}
