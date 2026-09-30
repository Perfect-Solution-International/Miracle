"use client";

import {
  Car,
  CheckCircle2,
  Compass,
  Headphones,
  Hotel,
  MapPin,
  Plane,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { useTravelStore } from "@/lib/storage/travel-store";
import { PublicTravelPackageGrid } from "./public-travel-package-grid";
import { PublicTravelInquiryModal } from "./public-travel-inquiry-modal";

const INBOUND_SERVICES = [
  {
    icon: MapPin,
    title: "Tailored Sri Lanka Itineraries",
    description:
      "Handcrafted tour plans covering Sigiriya, Kandy heritage, Nuwara Eliya tea hills, Yala safaris, and golden southern beaches.",
  },
  {
    icon: Car,
    title: "Chauffeured Private Transport",
    description:
      "Dedicated air-conditioned luxury sedans, vans, and coaches driven by experienced English-speaking tourist chauffeurs.",
  },
  {
    icon: Hotel,
    title: "Handpicked Boutique Stays",
    description:
      "Verified reservations at 4-star and 5-star hotels, colonial tea bungalows, and ocean-facing luxury resorts.",
  },
  {
    icon: Plane,
    title: "Airport Transfers & Meet & Greet",
    description:
      "Smooth on-arrival reception at Bandaranaike International Airport (BIA) with private direct transfers to your destination.",
  },
  {
    icon: Compass,
    title: "Certified Tourist Guides",
    description:
      "Licensed national and site guides sharing authentic island stories, wildlife sightings, and cultural heritage.",
  },
  {
    icon: Headphones,
    title: "24/7 Dedicated Trip Care",
    description:
      "Continuous on-ground support and direct coordinator access throughout your journey across Sri Lanka.",
  },
] as const;

const INBOUND_SLIDES = [
  {
    image: "/images/travel/inbound-slide-sigiriya.jpg",
    title: "Sigiriya Lion Rock",
    region: "Ancient UNESCO Citadel",
    alt: "Sigiriya Lion Rock Fortress at golden hour in Sri Lanka",
  },
  {
    image: "/images/travel/inbound-slide-ella.jpg",
    title: "Ella Nine Arch Bridge",
    region: "Hill Country & Tea Estates",
    alt: "Scenic Nine Arch Bridge in Ella surrounded by tea plantations",
  },
  {
    image: "/images/travel/inbound-slide-beach.jpg",
    title: "Mirissa & Southern Coast",
    region: "Tropical Palm Beaches",
    alt: "Pristine golden beach with coconut palms in Mirissa Sri Lanka",
  },
  {
    image: "/images/travel/inbound-slide-wildlife.jpg",
    title: "Yala National Park",
    region: "Wild Elephant & Leopard Safari",
    alt: "Wild elephants in Yala National Park Sri Lanka",
  },
  {
    image: "/images/travel/inbound-slide-kandy.jpg",
    title: "Temple of the Tooth, Kandy",
    region: "Sacred Cultural Heritage",
    alt: "Temple of the Sacred Tooth Relic in Kandy Sri Lanka",
  },
] as const;

export function InboundToursView() {
  const { inboundPackages } = useTravelStore();
  const [generalInquiryOpen, setGeneralInquiryOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Continuously advance carousel automatically (every 1.8 seconds for fast dynamic showcase)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % INBOUND_SLIDES.length);
    }, 1800);

    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? INBOUND_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % INBOUND_SLIDES.length);
  };

  const activeSlide = INBOUND_SLIDES[currentSlide] ?? INBOUND_SLIDES[0];

  return (
    <>
      {/* Full-Screen Premium Inbound Hero Slider Section */}
      <section
        aria-labelledby="inbound-hero-heading"
        className="relative isolate overflow-hidden bg-slate-950 border-b border-slate-200/80 min-h-[580px] lg:min-h-[660px] flex items-center select-none"
      >
        {/* 1. Underlying Screen-Wide Crossfading Hero Images with High Clarity */}
        {INBOUND_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.image}
              aria-hidden={!isActive}
              className={`absolute inset-0 bg-cover bg-no-repeat transition-all duration-700 ease-in-out ${
                isActive
                  ? "opacity-100 scale-100 z-[1]"
                  : "opacity-0 scale-[1.03] z-0 pointer-events-none"
              }`}
              style={{
                backgroundImage: `url("${slide.image}")`,
                backgroundPosition: "center center",
              }}
            />
          );
        })}

        {/* 2. Soft Gradient Overlay on Left for 100% Text Readability, leaving the rest 100% Crystal-Clear */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2] bg-gradient-to-r from-white/95 via-white/80 via-25% to-transparent to-55% pointer-events-none"
        />

        {/* 3. Bottom Subtle Melt */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-16 z-[2] bg-gradient-to-t from-white/80 via-white/40 to-transparent pointer-events-none"
        />

        {/* Foreground Content with Fixed Left-Aligned Spacing */}
        <div className="container-page relative z-10 w-full py-16 sm:py-20 lg:py-24">
          <div className="grid lg:grid-cols-12 items-center">
            <div className="flex flex-col items-start gap-5 max-w-2xl lg:col-span-7 xl:col-span-6">
              {/* Inbound Category Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/95 px-4 py-1.5 text-xs font-extrabold tracking-wider text-navy uppercase shadow-sm backdrop-blur-md">
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-600" />
                </span>
                <span>Inbound Travel • Discover Sri Lanka</span>
              </div>

              <h1
                id="inbound-hero-heading"
                className="text-navy text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.1] font-extrabold tracking-tight"
              >
                Discover Sri Lanka
              </h1>

              <p className="max-w-xl text-sm sm:text-base md:text-lg leading-relaxed font-medium text-slate-700">
                Experience the beauty, culture, nature, and unforgettable destinations of Sri Lanka with a journey designed around your travel needs.
              </p>

              {/* Action Buttons */}
              <div className="mt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Button
                  asChild
                  size="lg"
                  className="bg-brand-blue hover:bg-brand-blue-dark h-11 sm:h-12 rounded-full px-7 text-sm font-bold text-white shadow-lg shadow-brand-blue/20 transition-all hover:shadow-xl"
                >
                  <a href="#inbound-packages">
                    Explore Packages
                  </a>
                </Button>
                <Button
                  type="button"
                  onClick={() => setGeneralInquiryOpen(true)}
                  variant="outline"
                  size="lg"
                  className="h-11 sm:h-12 rounded-full border-white/90 bg-white/95 px-7 text-sm font-bold text-navy shadow-sm backdrop-blur-md hover:bg-white"
                >
                  Customize Your Trip
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Slide Location & Interactive Navigation Controls */}
        <div className="absolute right-4 sm:right-8 bottom-6 z-10 flex flex-col sm:flex-row items-end sm:items-center gap-3">
          {/* Destination Badge */}
          <div className="flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-navy shadow-md backdrop-blur-md transition-all">
            <MapPin className="size-3.5 text-brand-blue" />
            <span className="font-extrabold">{activeSlide.title}</span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-slate-600 hidden sm:inline text-[11px] font-medium">{activeSlide.region}</span>
          </div>

          {/* Navigation Controls: Chevrons & Dots */}
          <div className="flex items-center gap-2 rounded-full border border-white/80 bg-white/90 p-1.5 shadow-md backdrop-blur-md">
            <button
              type="button"
              onClick={handlePrevSlide}
              aria-label="Previous Sri Lanka destination photo"
              className="flex size-7 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100 hover:text-navy transition-colors"
            >
              <span className="text-base font-bold leading-none select-none">‹</span>
            </button>

            <div className="flex items-center gap-1.5 px-1">
              {INBOUND_SLIDES.map((slide, index) => (
                <button
                  key={slide.image}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "w-6 bg-brand-blue"
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNextSlide}
              aria-label="Next Sri Lanka destination photo"
              className="flex size-7 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100 hover:text-navy transition-colors"
            >
              <span className="text-base font-bold leading-none select-none">›</span>
            </button>
          </div>
        </div>
      </section>

      {/* Inbound Packages Grid */}
      <div className="bg-white">
        <div id="inbound-packages" className="container-page scroll-mt-20">
          <PublicTravelPackageGrid
            packages={inboundPackages}
            filterType="Inbound"
            title="Sri Lanka Inbound Travel Packages"
            subtitle="Carefully crafted holiday itineraries designed for international travelers visiting Sri Lanka."
          />
        </div>
      </div>

      {/* Inbound Services & Highlights */}
      <Section className="bg-white py-16 sm:py-20 border-t border-slate-100" aria-labelledby="inbound-features-heading">
        <SectionHeading
          id="inbound-features-heading"
          align="center"
          eyebrow="Sri Lanka Travel Services"
          title="Everything Arranged for an Effortless Holiday"
          description="From airport reception to your final departure, Miracle International manages every logistical detail so you can immerse yourself in Sri Lanka."
        />

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INBOUND_SERVICES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="shadow-soft hover:shadow-lift group flex flex-col items-start gap-4 rounded-2xl border border-slate-200/80 bg-white hover:bg-slate-50/50 dark:bg-card p-6 transition-all"
            >
              <div className="bg-brand-blue-light/70 text-brand-blue flex size-12 items-center justify-center rounded-xl transition-colors group-hover:bg-brand-blue group-hover:text-white">
                <Icon aria-hidden="true" className="size-6" />
              </div>
              <h3 className="text-navy dark:text-foreground text-base font-bold">{title}</h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* General Inquiry Modal */}
      <PublicTravelInquiryModal
        open={generalInquiryOpen}
        onOpenChange={setGeneralInquiryOpen}
        defaultInquiryType="Inbound Tour"
        defaultDestination="Sri Lanka"
      />
    </>
  );
}
