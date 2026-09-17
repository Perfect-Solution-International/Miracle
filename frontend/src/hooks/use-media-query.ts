"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Tracks a CSS media query.
 *
 * Uses `useSyncExternalStore`, the API intended for subscribing to an external
 * store: it reads the current value during render rather than writing state
 * from an effect, which avoids the extra render pass and keeps the value
 * consistent with concurrent rendering. The server snapshot is `false`, so the
 * markup matches on hydration and then corrects itself on the client.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onStoreChange);
      return () => list.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  // Media queries cannot be evaluated on the server; assume the desktop layout.
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export const useIsMobile = () => useMediaQuery("(max-width: 767px)");
export const useIsTablet = () =>
  useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
