import Link from "next/link";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

import { VISA_TYPE_CARDS } from "../data/visa-services.content";

/** "Visa Services for Your Journey" — each card jumps to the request form
 * with its visa type pre-selected via the `visaType` query param. */
export function VisaTypesSection() {
  return (
    <Section id="visa-types" tone="surface" aria-labelledby="visa-types-heading" className="scroll-mt-24">
      <SectionHeading
        id="visa-types-heading"
        align="center"
        eyebrow="What We Assist With"
        title="Visa Services for Your Journey"
      />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        {VISA_TYPE_CARDS.map(({ slug, icon: Icon, title, description, formValue }) => (
          <li
            key={slug}
            className="shadow-soft flex flex-col gap-4 rounded-2xl border bg-white p-6"
          >
            <span className="bg-brand-blue-light text-brand-blue inline-flex size-11 items-center justify-center rounded-xl">
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <div className="flex-1 space-y-1.5">
              <p className="text-ink text-base font-bold">{title}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
            </div>
            <Button asChild variant="outline" className="text-ink w-full">
              <Link
                href={`${ROUTES.public.visaServices}?visaType=${encodeURIComponent(formValue)}#visa-request-form`}
              >
                Get Assistance
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </Section>
  );
}
