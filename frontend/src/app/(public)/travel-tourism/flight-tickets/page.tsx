import type { Metadata } from "next";

import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import {
  FlightAssistanceSection,
  FlightFinalCta,
  FlightRequestForm,
  FlightTicketsHero,
} from "@/features/flight-tickets";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Flight Tickets";
const DESCRIPTION =
  "Find suitable domestic and international flight options based on your travel plans and preferences.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.flightTickets,
  image: SITE_MEDIA.businessTravel,
});

export default function Page() {
  return (
    <>
      <FlightTicketsHero />
      <FlightAssistanceSection />
      <FlightRequestForm />
      <FlightFinalCta />
    </>
  );
}
