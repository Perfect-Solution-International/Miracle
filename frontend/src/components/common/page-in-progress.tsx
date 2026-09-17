import { ROUTES } from "@/config/routes";

import { CtaBanner } from "./cta-banner";
import { PageHero } from "./page-hero";

/**
 * Interim body for public routes whose full page is scheduled in a later
 * phase. Keeps navigation free of 404s and gives visitors a path forward.
 */
export function PageInProgress({
  title,
  description,
  eyebrow,
}: {
  title: string;
  description: string;
  eyebrow?: string;
}) {
  return (
    <>
      <PageHero
        title={title}
        description={description}
        eyebrow={eyebrow}
        breadcrumbs={[{ label: title }]}
      />
      <CtaBanner
        title="Need help right now?"
        description="This page is being prepared. Our team can already help with your requirement."
        primary={{
          label: "Tell Us What You Need",
          href: ROUTES.public.tellUsWhatYouNeed,
        }}
        secondary={{ label: "Contact Our Team", href: ROUTES.public.contact }}
      />
    </>
  );
}
