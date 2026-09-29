import { ArrowRight, Headset, Mail, Phone } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { APP_CONFIG } from "@/config/app";
import { ROUTES } from "@/config/routes";

/**
 * Sidebar support card. Uses an icon avatar rather than a stock photo of a
 * support agent, since no real team photo is available to show honestly.
 */
export function NeedHelpCard() {
  return (
    <div className="shadow-soft rounded-3xl border bg-white p-6">
      <div className="flex items-center gap-4">
        <span className="bg-brand-blue-light text-brand-blue inline-flex size-14 shrink-0 items-center justify-center rounded-full">
          <Headset aria-hidden="true" className="size-6" />
        </span>
        <div>
          <p className="text-ink text-lg font-extrabold">Need Help?</p>
          <p className="text-muted-foreground text-sm">
            Our team is ready to assist you with your requirements.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-2.5 text-sm">
        <a
          href={`tel:${APP_CONFIG.support.phone.replace(/\s+/g, "")}`}
          className="text-ink hover:text-brand-blue flex items-center gap-2.5 font-semibold"
        >
          <Phone aria-hidden="true" className="text-brand-red size-4" />
          {APP_CONFIG.support.phone}
        </a>
        <a
          href={`mailto:${APP_CONFIG.support.email}`}
          className="text-ink hover:text-brand-blue flex items-center gap-2.5 font-semibold"
        >
          <Mail aria-hidden="true" className="text-brand-red size-4" />
          {APP_CONFIG.support.email}
        </a>
      </div>

      <Button asChild variant="accent" size="xl" className="mt-5 w-full">
        <Link href={ROUTES.public.contact}>
          Talk to Our Team
          <ArrowRight data-icon="inline-end" aria-hidden="true" />
        </Link>
      </Button>
    </div>
  );
}
