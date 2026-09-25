import { CtaBanner } from "@/components/common/cta-banner";

/** Closing "Planning Your Next Journey?" CTA that scrolls back to the request form. */
export function FlightFinalCta() {
  return (
    <CtaBanner
      eyebrow="Start Planning"
      title="Planning Your Next Journey?"
      description="Share your travel requirements with us and let our team assist you with suitable flight options."
      primary={{ label: "Request Flight Options", href: "#flight-request-form" }}
    />
  );
}
