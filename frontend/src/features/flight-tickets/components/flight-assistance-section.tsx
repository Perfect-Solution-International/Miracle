import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";

import { FLIGHT_ASSISTANCE_FEATURES } from "../data/flight-tickets.content";

/** "Flight Ticket Assistance" — short, scannable, and placed right before the request form. */
export function FlightAssistanceSection() {
  return (
    <Section aria-labelledby="flight-assistance-heading">
      <SectionHeading
        id="flight-assistance-heading"
        align="center"
        eyebrow="How We Help"
        title="Flight Ticket Assistance"
        description="Looking for a flight for your next journey? Miracle International helps you find suitable domestic and international flight options based on your destination, travel dates, number of travelers and preferred travel class."
      >
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
          Simply share your travel requirements through the form below. Our team will review your
          request and assist you with suitable flight options and further booking arrangements.
        </p>
      </SectionHeading>

      <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FLIGHT_ASSISTANCE_FEATURES.map(({ icon: Icon, title }) => (
          <li
            key={title}
            className="shadow-soft flex items-center gap-3 rounded-2xl border bg-white p-4"
          >
            <span className="bg-brand-blue-light text-brand-blue inline-flex size-10 shrink-0 items-center justify-center rounded-full">
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <p className="text-ink text-sm font-bold">{title}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
