import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Eyebrow } from "./eyebrow";

/**
 * Eyebrow, heading, and supporting copy for a section.
 *
 * `as` keeps the document outline correct: sections use `h2`, and the page
 * hero is the only `h1`.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  tone = "default",
  as: Heading = "h2",
  id,
  className,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "start" | "center";
  tone?: "default" | "inverse";
  as?: "h1" | "h2" | "h3";
  /** Reference from `aria-labelledby` on the enclosing section. */
  id?: string;
  className?: string;
  /** Extra content under the description, such as a CTA row. */
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <Heading
        id={id}
        className={cn(
          "text-3xl leading-[1.12] font-bold sm:text-4xl lg:text-[2.75rem]",
          tone === "inverse" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "text-base leading-relaxed text-pretty sm:text-lg",
            tone === "inverse" ? "text-white/70" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
