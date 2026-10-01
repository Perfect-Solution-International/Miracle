import { Eyebrow } from "@/components/common/eyebrow";
import { cn } from "@/lib/utils";

import { WHY_SHARE_ITEMS } from "../data/tell-us-what-you-need.content";

/** Sidebar card listing the reasons to submit a requirement through this form. */
export function WhyShareCard() {
  return (
    <div className="rounded-2xl public-card p-6 sm:p-7">
      <Eyebrow>Why Share Your Needs With Us?</Eyebrow>
      <h2 className="text-ink mt-2 text-xl font-extrabold tracking-tight">
        We make it easy for you. Just tell us what you need, and we will provide or
        coordinate the right solution.
      </h2>

      <ul className="mt-6 space-y-5">
        {WHY_SHARE_ITEMS.map(({ icon: Icon, title, description, accent }) => (
          <li key={title} className="flex items-start gap-3">
            <span
              className={cn(
                "inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-blue-light",
                accent,
              )}

            >
              <Icon aria-hidden="true" className="size-4.5" />
            </span>
            <div>
              <p className="text-ink text-sm font-bold">{title}</p>
              <p className="text-muted-foreground text-sm">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

