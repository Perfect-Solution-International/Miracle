import type { Metadata } from "next";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  Circle,
  Headphones,
  Hotel,
  Info,
  MapPin,
  MessageCircleMore,
  Phone,
  Plane,
  Search,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { requirePermission } from "@/server/dal/require-permission";

export const metadata: Metadata = {
  title: "Bookings",
  robots: { index: false, follow: false },
};

const bookingSteps = [
  { number: 1, label: "Trip Details" },
  { number: 2, label: "Traveller Details" },
  { number: 3, label: "Additional Services" },
  { number: 4, label: "Review & Payment" },
] as const;

const travelModes = [
  { icon: Plane, label: "Flights" },
  { icon: Hotel, label: "Hotels" },
  { icon: BriefcaseBusiness, label: "Tour Packages" },
  { icon: Headphones, label: "Visa Assistance" },
  { icon: ShieldCheck, label: "24/7 Support" },
] as const;

const summaryRows = [
  { label: "Trip Type", value: "Round Trip" },
  { label: "From", value: "Colombo (CMB)" },
  { label: "To", value: "Not selected" },
  { label: "Departure", value: "Not selected" },
  { label: "Return", value: "Not selected" },
  { label: "Passengers", value: "1 Adult" },
  { label: "Class", value: "Economy" },
] as const;

function SelectorField({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const Icon = icon;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-600">{label}</label>
      <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-500 shadow-sm">
        <Icon className="size-4 text-slate-500" />
        <span className="flex-1 text-slate-700">{value}</span>
        <ChevronDown className="size-4 text-slate-500" />
      </div>
    </div>
  );
}

export default async function Page() {
  await requirePermission("bookings.read");

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.04)]">
        <div className="flex flex-wrap gap-4 border-b border-slate-200 bg-slate-50/80 px-5 py-4 sm:px-6">
          {bookingSteps.map((step, index) => (
            <div
              key={step.label}
              className={[
                "flex flex-1 min-w-[140px] items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium",
                index === 0
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-transparent text-slate-500",
              ].join(" ")}
            >
              <span
                className={[
                  "flex size-7 items-center justify-center rounded-full text-xs font-semibold",
                  index === 0
                    ? "bg-white/20 text-white"
                    : "bg-slate-200 text-slate-600",
                ].join(" ")}
              >
                {step.number}
              </span>
              <span className="truncate">{step.label}</span>
            </div>
          ))}
        </div>

        <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,2.2fr)_minmax(260px,0.9fr)] lg:p-6">
          <section className="rounded-[24px] border border-slate-200 bg-slate-50/70 p-5 shadow-inner shadow-slate-100">
            <div className="mb-5 flex items-center gap-2 text-lg font-semibold text-blue-700">
              <Plane className="size-5" />
              <span>Trip Details</span>
            </div>

            <p className="mb-5 text-sm text-slate-500">
              Enter your travel details to find the best options.
            </p>

            <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {travelModes.map(({ icon: Icon, label }) => {
                const isActive = label === "Flights";

                return (
                  <button
                    key={label}
                    type="button"
                    className={[
                      "flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition",
                      isActive
                        ? "border-blue-200 bg-blue-100 text-blue-700 shadow-sm"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300",
                    ].join(" ")}
                  >
                    <Icon className="size-4" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mb-5 flex flex-wrap items-center gap-5 text-sm text-slate-600">
              <label className="flex items-center gap-2">
                <span className="inline-flex size-4 items-center justify-center rounded-full border border-blue-600">
                  <span className="size-2 rounded-full bg-blue-600" />
                </span>
                Round Trip
              </label>
              <label className="flex items-center gap-2 text-slate-400">
                <span className="inline-flex size-4 items-center justify-center rounded-full border border-slate-300">
                  <Circle className="size-2.5 fill-current" />
                </span>
                One Way
              </label>
              <label className="flex items-center gap-2 text-slate-400">
                <span className="inline-flex size-4 items-center justify-center rounded-full border border-slate-300">
                  <Circle className="size-2.5 fill-current" />
                </span>
                Multi-City
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <SelectorField label="From" value="Colombo (CMB)" icon={MapPin} />
              <SelectorField label="To" value="Select Destination" icon={MapPin} />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <SelectorField label="Departure Date" value="Select date" icon={CalendarDays} />
              <SelectorField label="Return Date" value="Select date" icon={CalendarDays} />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <SelectorField label="Passengers" value="1 Adult" icon={Users} />
              <SelectorField label="Class" value="Economy" icon={ShieldCheck} />
            </div>

            <Button className="mt-6 h-12 w-full rounded-xl bg-blue-600 text-base font-semibold text-white shadow-[0_14px_30px_rgba(37,99,235,0.25)] hover:bg-blue-700">
              <Search className="size-4" />
              Search Flights
            </Button>

            <div className="mt-5 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-slate-600">
                <span className="flex size-5 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Info className="size-3" />
                </span>
                Need help with your booking? Our travel experts are here to assist you.
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 self-start rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Contact Travel Team
                <ArrowRight className="size-4" />
              </button>
            </div>
          </section>

          <aside className="space-y-5">
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-900 text-white shadow-[0_12px_30px_rgba(15,23,42,0.12)]">
              <div
                className="relative h-48 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, rgba(15,23,42,0.2), rgba(8,47,73,0.7)), url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80')",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-sky-600/15 via-sky-500/10 to-slate-950/30" />
                <div className="relative flex h-full items-end p-5">
                  <h3 className="max-w-[10rem] text-3xl font-semibold leading-tight tracking-tight text-white">
                    Your Next Adventure Awaits
                  </h3>
                </div>
              </div>

              <div className="space-y-4 bg-slate-900/95 p-5">
                <div className="flex items-center justify-between gap-3 text-sm text-slate-300">
                  <span className="text-base font-semibold text-white">Booking Summary</span>
                </div>

                <div className="space-y-3 text-sm">
                  {summaryRows.map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2 text-slate-300">
                        {label === "Trip Type" ? <Plane className="size-4" /> : null}
                        {label === "From" ? <MapPin className="size-4" /> : null}
                        {label === "To" ? <MapPin className="size-4" /> : null}
                        {label === "Departure" ? <CalendarDays className="size-4" /> : null}
                        {label === "Return" ? <CalendarDays className="size-4" /> : null}
                        {label === "Passengers" ? <User className="size-4" /> : null}
                        {label === "Class" ? <ShieldCheck className="size-4" /> : null}
                        {label}
                      </span>
                      <span className="text-right text-slate-100">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-700 pt-4">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>Estimated Price</span>
                    <span className="text-2xl font-bold text-blue-400">LKR 0.00</span>
                  </div>
                </div>
              </div>
            </div>

            <Card className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Headphones className="size-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-slate-800">Need Assistance?</h4>
                  <p className="mt-1 text-sm text-slate-500">
                    Our travel consultants are ready to help you with the best options and
                    special deals.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Button variant="outline" className="flex-1 justify-center gap-2 rounded-xl">
                  <Phone className="size-4" />
                  Call Us
                </Button>
                <Button variant="outline" className="flex-1 justify-center gap-2 rounded-xl">
                  <MessageCircleMore className="size-4" />
                  Live Chat
                </Button>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
