import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import { TravelSubpageHero } from "@/features/travel";

/** Hero for the Flight Tickets page — same treatment as the other Travel & Tourism subpages. */
export function FlightTicketsHero() {
  return (
    <TravelSubpageHero
      breadcrumbs={[
        { label: "Travel & Tourism", href: ROUTES.public.travelTourism },
        { label: "Flight Tickets" },
      ]}
      categoryLabel="Flight Assistance"
      title="Your Journey Starts With the Right Flight"
      description="Tell us your travel requirements and let our team help coordinate suitable flight options for your journey."
      image={SITE_MEDIA.businessTravel}
      primary={{ label: "Request Flight Tickets", href: "#flight-request-form" }}
    />
  );
}
