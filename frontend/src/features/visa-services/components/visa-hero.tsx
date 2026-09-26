import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import { TravelSubpageHero } from "@/features/travel";

/** Hero for the Visa Services page — matching the seamless gradient melt design of other Travel & Tourism subpages. */
export function VisaHero() {
  return (
    <TravelSubpageHero
      breadcrumbs={[
        { label: "Travel & Tourism", href: ROUTES.public.travelTourism },
        { label: "Visa Services" },
      ]}
      categoryLabel="Visa & Consular Services"
      title="Visa Assistance Made Simple & Reliable"
      description="Tell us about your destination and travel plans. Miracle International assists with document verification, embassy submissions, and step-by-step guidance."
      image={SITE_MEDIA.travelCategoryCards.customized}
      primary={{ label: "Request Visa Assistance", href: "#visa-request-form" }}
    />
  );
}
