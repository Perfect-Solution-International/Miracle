import { cn } from "@/lib/utils";

/**
 * A headline figure with its label.
 *
 * `value` is a string on purpose: it accepts real API metrics ("1,200+") and
 * qualitative values ("Global") alike, until verified figures are approved.
 */
export interface StatHighlightData {
  value: string;
  label: string;
  description?: string;
}

/** Render inside a `<dl>`; each stat is a `<div>` group of `<dt>`/`<dd>`. */
export function StatHighlight({
  stat,
  tone = "default",
  className,
}: {
  stat: StatHighlightData;
  tone?: "default" | "inverse";
  className?: string;
}) {
  const inverse = tone === "inverse";

  return (
    <div className={cn("relative flex flex-col gap-2 pl-5", className)}>
      <span
        aria-hidden="true"
        className="bg-brand-red absolute top-1.5 bottom-1.5 left-0 w-0.5 rounded-full"
      />
      <dt
        className={cn(
          "order-2 text-sm font-bold tracking-wide uppercase",
          inverse ? "text-white/85" : "text-ink",
        )}
      >
        {stat.label}
      </dt>
      <dd
        className={cn(
          "order-1 text-3xl font-extrabold tracking-tight sm:text-4xl",
          inverse ? "text-white" : "text-brand-blue",
        )}
      >
        {stat.value}
      </dd>
      {stat.description ? (
        <dd
          className={cn(
            "order-3 text-sm leading-relaxed",
            inverse ? "text-white/60" : "text-muted-foreground",
          )}
        >
          {stat.description}
        </dd>
      ) : null}
    </div>
  );
}
