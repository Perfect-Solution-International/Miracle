import { SITE_MEDIA } from "@/config/site-media";
import { TravelSubpageHero } from "@/features/travel";

/** Hero for the Flight Tickets page — same treatment as the other Travel & Tourism subpages. */
export function FlightTicketsHero() {
  return (
    <TravelSubpageHero
      breadcrumbLabel="Flight Tickets"
      title="Flight Tickets"
      description="Find suitable domestic and international flight options based on your travel plans and preferences."
      image={SITE_MEDIA.businessTravel}
      primary={{ label: "Request Flight Options", href: "#flight-request-form" }}
    />
  );
}
