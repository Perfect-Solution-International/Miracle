import { Check } from "lucide-react";
import type { Metadata } from "next";

import { CtaBanner } from "@/components/common/cta-banner";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import { TravelSubpageHero } from "@/features/travel";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Work Visa Support";
const DESCRIPTION = "Get guidance for work-related travel and visa requirements.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.workVisa,
  image: SITE_MEDIA.travelCategoryCards.customized,
});

const WORK_VISA_HIGHLIGHTS: readonly string[] = [
  "Employment visa applications",
  "Document preparation & checklists",
  "Employer sponsorship guidance",
  "Work permit renewals",
];

const workVisaRequestHref = `${ROUTES.public.visaServices}?visaType=${encodeURIComponent(
  "Work Visa",
)}#visa-request-form`;

export default function Page() {
  return (
    <>
      <TravelSubpageHero
        breadcrumbLabel="Work Visa Support"
        title="Work Visa Support"
        description="Guidance and documentation support for employment-related travel and visa requirements."
        image={SITE_MEDIA.travelCategoryCards.customized}
        primary={{ label: "Request Visa Assistance", href: workVisaRequestHref }}
      />

      <Section aria-labelledby="work-visa-what-heading">
        <SectionHeading
          id="work-visa-what-heading"
          align="center"
          eyebrow="Work Visa Support"
          title="What We Help With"
          description="From supporting documents to employer sponsorship paperwork, we guide you through what employment visas require."
        />

        <ul className="mx-auto mt-10 grid max-w-2xl gap-x-8 gap-y-3 sm:grid-cols-2">
          {WORK_VISA_HIGHLIGHTS.map((highlight) => (
            <li key={highlight} className="text-ink flex items-center gap-2 text-sm font-medium">
              <Check aria-hidden="true" className="text-brand-blue size-4 shrink-0" strokeWidth={3} />
              {highlight}
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner
        eyebrow="Start Planning"
        title="Ready to Apply for a Work Visa?"
        description="Tell us about your destination and employer, and our team will guide you through the requirements."
        primary={{ label: "Request Visa Assistance", href: workVisaRequestHref }}
      />
    </>
  );
}
