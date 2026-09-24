import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/config/routes";

import { QUICK_PLANNER_TRAVEL_TYPES } from "../data/trip-planner.content";

const selectClassName =
  "border-input focus-visible:border-ring focus-visible:ring-ring/50 h-8 w-full min-w-0 rounded-lg border bg-transparent px-2.5 py-1 text-base transition-colors outline-none focus-visible:ring-3 md:text-sm";

/**
 * Floating "Find Packages" search bar shown just under the hero. A plain GET
 * form to the page itself — no client JS needed — so `TravelPackagesSection`
 * can read `destination` / `type` / `region` back out of `searchParams`.
 */
export function QuickTravelPlanner({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="container-page">
        <form
          action={`${ROUTES.public.travelTourism}#packages`}
          method="get"
          className="shadow-lift bg-white relative z-10 -mt-8 rounded-3xl border p-5 sm:-mt-10 sm:p-6"
        >
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_0.7fr_1fr_auto] lg:items-end">
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="text-ink font-semibold">From</span>
              <Input name="from" placeholder="Departure city" autoComplete="off" />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="text-ink font-semibold">Destination</span>
              <Input name="destination" placeholder="Where to?" autoComplete="off" />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="text-ink font-semibold">Travel Date</span>
              <Input name="date" type="date" />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="text-ink font-semibold">Travelers</span>
              <Input name="travelers" type="number" min={1} defaultValue={2} />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="text-ink font-semibold">Travel Type</span>
              <select
                name="type"
                defaultValue=""
                className={selectClassName}
                aria-label="Travel Type"
              >
                <option value="">Any type</option>
                {QUICK_PLANNER_TRAVEL_TYPES.map((type) => (
                  <option key={type} value={type.toLowerCase()}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <Button type="submit" size="xl" className="w-full lg:w-auto">
              <Search data-icon="inline-start" aria-hidden="true" />
              Find Packages
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
