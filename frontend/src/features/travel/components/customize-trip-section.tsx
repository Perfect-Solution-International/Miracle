"use client";

import { ArrowRight, Check, SlidersHorizontal, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Eyebrow } from "@/components/common/eyebrow";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { SITE_MEDIA } from "@/config/site-media";

import { TripPlannerForm } from "./trip-planner-form";

const PERKS = [
  "Choose your exact destination & route",
  "Flexible travel dates & group sizes",
  "Tailored activities & sightseeing pace",
  "Preferred accommodation & transport style",
] as const;

export function CustomizeTripModal({
  open,
  onClose,
  initialDestination,
}: {
  open: boolean;
  onClose: () => void;
  initialDestination?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="bg-navy/40 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="customize-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="bg-popover text-popover-foreground relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="border-b px-6 py-5 pr-14 sm:px-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close trip planner"
            className="text-muted-foreground hover:bg-muted hover:text-ink absolute top-4 right-4 z-10 inline-flex size-9 items-center justify-center rounded-full transition-colors"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
          <p className="text-brand-red text-xs font-bold tracking-wider uppercase">
            Miracle Travel Desk
          </p>
          <h2
            id="customize-modal-title"
            className="text-ink mt-1 text-2xl font-extrabold sm:text-3xl"
          >
            Customize Your Trip
          </h2>
          <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
            Tell us your travel preferences, dates, and requirements. Our travel specialists
            will put together a tailored itinerary and quotation for you.
          </p>
        </div>

        {/* Form Container */}
        <div className="overflow-y-auto px-6 py-6 sm:px-8">
          <TripPlannerForm defaultDestination={initialDestination} />
        </div>
      </div>
    </div>
  );
}

export function CustomizeTripSection({
  onOpenModal,
}: {
  onOpenModal?: () => void;
}) {
  const [internalOpen, setInternalOpen] = useState(false);

  const handleOpen = () => {
    if (onOpenModal) {
      onOpenModal();
    } else {
      setInternalOpen(true);
    }
  };

  return (
    <>
      <Section
        id="customize-trip"
        aria-labelledby="customize-trip-heading"
        className="scroll-mt-24 py-12 lg:py-16"
      >
        <div className="shadow-soft rounded-3xl border bg-white p-6 sm:p-10 lg:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            {/* Travel Image with compact proportions */}
            <div className="relative aspect-[4/3] max-h-80 w-full overflow-hidden rounded-2xl sm:max-h-96">
              <Image
                src={SITE_MEDIA.travelCategoryCards.customized.src}
                alt={SITE_MEDIA.travelCategoryCards.customized.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="from-navy/60 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
              <span className="text-brand-blue-dark shadow-soft absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase">
                <SlidersHorizontal aria-hidden="true" className="size-3.5" />
                Tailor-Made Itinerary
              </span>
            </div>

            {/* Content description */}
            <div className="flex flex-col items-start">
              <Eyebrow tone="default">Custom Travel Planning</Eyebrow>
              <h2
                id="customize-trip-heading"
                className="text-ink mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl"
              >
                Customize Your Trip
              </h2>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
                Design a journey that reflects your travel style. Customers can create a trip
                based on their preferred destination, dates, activities, accommodation,
                transportation, and other requirements.
              </p>

              <ul className="mt-5 grid w-full gap-2.5 sm:grid-cols-2">
                {PERKS.map((perk) => (
                  <li key={perk} className="text-ink flex items-start gap-2 text-sm font-semibold">
                    <Check
                      aria-hidden="true"
                      className="text-brand-blue mt-0.5 size-4 shrink-0"
                    />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="xl" onClick={handleOpen} className="gap-2">
                  <SlidersHorizontal aria-hidden="true" className="size-4" />
                  Customize My Trip
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {!onOpenModal ? (
        <CustomizeTripModal
          open={internalOpen}
          onClose={() => setInternalOpen(false)}
        />
      ) : null}
    </>
  );
}
