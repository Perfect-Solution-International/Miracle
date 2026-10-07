"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

/** Primary conversion CTA in the public header. */
export function HeaderActions() {
  return (
    <div className="flex items-center gap-2">
      <Button
        asChild
        size="lg"
        className="hover:bg-brand-blue-dark hidden h-10 px-4 font-semibold sm:inline-flex"
      >
        <Link href={ROUTES.public.tellUsWhatYouNeed}>
          Tell Us What You Need
        </Link>
      </Button>
    </div>
  );
}
