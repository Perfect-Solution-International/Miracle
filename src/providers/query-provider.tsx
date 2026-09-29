"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, type ReactNode } from "react";

import { getQueryClient } from "@/lib/query/query-client";
import { isDevelopment } from "@/config/environment";

/**
 * The QueryClient is created inside `useState` rather than at module scope so
 * that each server render gets its own instance. A module-level client would be
 * shared across concurrent requests and leak one user's cached data to another.
 */
export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(getQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {isDevelopment ? <ReactQueryDevtools initialIsOpen={false} /> : null}
    </QueryClientProvider>
  );
}
