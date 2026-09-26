import {
  CheckCircle2,
  Clock,
  Coins,
  Globe2,
  Luggage,
  Send,
  Sparkles,
  Ticket,
  Users,
} from "lucide-react";

import { Section } from "@/components/common/section";

import { FlightRequestForm } from "./flight-request-form";

const FLIGHT_HIGHLIGHTS = [
  {
    icon: Globe2,
    title: "Global & Domestic Route Coverage",
    description:
      "Access major international carriers and regional airlines connecting Sri Lanka with the Middle East, Europe, Asia, and beyond.",
  },
  {
    icon: Coins,
    title: "Multi-Airline Fare Comparison",
    description:
      "We compare schedules and rates across Economy, Premium Economy, Business, and First Class to secure your ideal fare.",
  },
  {
    icon: Luggage,
    title: "Baggage & Transit Advisory",
    description:
      "Clear advice on piece and weight baggage allowances, layover visa requirements, and transit connection times.",
  },
  {
    icon: Users,
    title: "Group & Corporate Travel Desk",
    description:
      "Specialized ticketing coordination for family vacation groups, corporate business delegations, and destination events.",
  },
  {
    icon: Clock,
    title: "Re-issuance & Date Change Help",
    description:
      "Direct assistance with date changes, ticket cancellations, and flight modifications when your travel plans change.",
  },
  {
    icon: Sparkles,
    title: "Dedicated Ticketing Specialists",
    description:
      "Personalized attention from experienced travel coordinators who ensure optimal seats, meals, and flight timings.",
  },
] as const;

const BOOKING_STEPS = [
  {
    step: "01",
    icon: Send,
    title: "Submit Your Request",
    description: "Fill in your preferred travel dates, destinations, passengers, and class.",
  },
  {
    step: "02",
    icon: Ticket,
    title: "Compare Best Options",
    description: "Our flight team reviews available airlines, route connections, and quotes.",
  },
  {
    step: "03",
    icon: CheckCircle2,
    title: "Confirm & Fly",
    description: "Choose your ideal schedule, finalize booking, and receive your e-ticket.",
  },
] as const;

/** "Flight Ticket Assistance" — balanced two-column layout: details on the left, request form on the right. */
export function FlightAssistanceSection() {
  return (
    <Section className="bg-slate-50/60 py-14 sm:py-20" aria-labelledby="flight-assistance-heading">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
        {/* Left Column: Flight Coordination Details & Steps */}
        <div className="flex flex-col gap-8 lg:col-span-5">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/15 bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-blue shadow-2xs">
              <span className="size-2 rounded-full bg-brand-blue" aria-hidden="true" />
              Flight Coordination Desk
            </span>
            <h2
              id="flight-assistance-heading"
              className="text-ink text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl"
            >
              Flight Ticket Assistance Made Effortless
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Looking for the best flight options for your journey? Miracle International helps you find the most convenient domestic and international connections tailored to your schedule and budget.
            </p>
          </div>

          {/* 6 Key Flight Highlights */}
          <div className="space-y-3.5">
            <p className="text-ink text-xs font-bold uppercase tracking-[0.14em]">
              Why Book With Miracle International
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {FLIGHT_HIGHLIGHTS.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="shadow-2xs hover:shadow-soft group flex items-start gap-3.5 rounded-xl border border-slate-200/80 bg-white p-4 transition-all"
                >
                  <div className="bg-brand-blue-light/70 text-brand-blue flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors group-hover:bg-brand-blue group-hover:text-white">
                    <Icon aria-hidden="true" className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-ink text-sm font-bold">{title}</h3>
                    <p className="text-muted-foreground mt-0.5 text-xs leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Simple 3-Step Coordination Process */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
            <p className="text-brand-blue text-xs font-bold uppercase tracking-widest">
              Simple 3-Step Process
            </p>
            <div className="mt-4 space-y-4">
              {BOOKING_STEPS.map(({ step, icon: Icon, title, description }) => (
                <div key={step} className="flex items-start gap-3.5">
                  <div className="relative flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue-light text-brand-blue">
                    <Icon aria-hidden="true" className="size-5" />
                    <span className="bg-brand-red absolute -top-1.5 -right-1.5 flex size-4.5 items-center justify-center rounded-full text-[10px] font-bold text-white">
                      {step}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-ink text-sm font-bold">{title}</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Request Flight Options Form */}
        <div className="lg:col-span-7">
          <FlightRequestForm embedded />
        </div>
      </div>
    </Section>
  );
}
