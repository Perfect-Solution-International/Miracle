"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Debounced search box.
 *
 * Holds keystrokes locally and reports the settled value upward, so each
 * character does not trigger a backend query. The debounce timer is owned by the
 * change handler rather than an effect that mirrors state, which avoids the
 * cascading render that writing state from an effect would cause.
 */
export function SearchInput({
  value = "",
  onSearch,
  placeholder = "Search...",
  label = "Search",
  className,
  delayMs = 350,
}: Readonly<{
  value?: string;
  onSearch: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  delayMs?: number;
}>) {
  const [draft, setDraft] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Keep the latest callback without making it a dependency of the timer.
  // Assigned in an effect, since writing a ref during render is unsafe under
  // concurrent rendering.
  const onSearchRef = useRef(onSearch);
  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  // `value` is the committed search term from the URL. When it changes for a
  // reason other than typing (a cleared filter, back navigation), adopt it.
  const [lastExternalValue, setLastExternalValue] = useState(value);
  if (value !== lastExternalValue) {
    setLastExternalValue(value);
    setDraft(value);
  }

  useEffect(() => () => clearTimeout(timerRef.current), []);

  function handleChange(next: string) {
    setDraft(next);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onSearchRef.current(next), delayMs);
  }

  function handleClear() {
    clearTimeout(timerRef.current);
    setDraft("");
    onSearchRef.current("");
  }

  return (
    <div className={cn("relative w-full sm:max-w-xs", className)}>
      <Search
        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
        aria-hidden="true"
      />
      <Input
        type="search"
        aria-label={label}
        placeholder={placeholder}
        value={draft}
        onChange={(event) => handleChange(event.target.value)}
        className="pr-9 pl-9"
      />
      {draft ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute top-1/2 right-1 size-7 -translate-y-1/2"
        >
          <X aria-hidden="true" />
        </Button>
      ) : null}
    </div>
  );
}
