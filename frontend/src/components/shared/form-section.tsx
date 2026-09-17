import type { ReactNode } from "react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

/**
 * Groups related fields in long forms (supplier onboarding, requirement
 * creation) using a fieldset, so the grouping is conveyed structurally and not
 * only visually.
 */
export function FormSection({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <fieldset className={cn("space-y-4", className)}>
      <div className="space-y-1">
        <legend className="text-base font-medium">{title}</legend>
        {description ? (
          <p className="text-muted-foreground text-sm">{description}</p>
        ) : null}
      </div>
      <Separator />
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}
