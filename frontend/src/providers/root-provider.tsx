import type { ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";
import { getCurrentUserDto, type CurrentUserDto } from "@/server/dal/current-user";
import { AuthProvider } from "./auth-provider";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";

/**
 * App-wide providers.
 *
 * Deliberately synchronous and free of `cookies()`. Awaiting the session here
 * would make every route dynamic, including the public marketing pages, since
 * any dynamic access at the top of the root layout prevents the whole tree below
 * it from being prerendered.
 *
 * The session is instead resolved by `SessionBoundary`, which passes a promise
 * to the client provider so only the components that read the user suspend.
 */
export function RootProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: Promise<CurrentUserDto | null>;
}) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider userPromise={user}>
          {children}
          <Toaster richColors closeButton position="top-right" />
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}

/**
 * Starts the session request without awaiting it, so the promise can be handed
 * to a client component that unwraps it with `use()`.
 */
export function getSessionPromise(): Promise<CurrentUserDto | null> {
  return getCurrentUserDto();
}
