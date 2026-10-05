"use client";

import { ArrowRight, Compass, Globe } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

export function TravelHero() {
  return (
    <section
      aria-labelledby="travel-hero-heading"
      className="public-hero"
    >
      <div
        aria-hidden="true"
        className="public-hero-media bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url("/images/travel/travel-hero-cinematic.png")',
          backgroundPosition: "right center",
        }}
      />
      <div
        aria-hidden="true"
        className="public-hero-haze"
      />
      <div
        aria-hidden="true"
        className="public-hero-fade"
      />
      <div className="container-page public-hero-content">
        <div className="public-hero-copy">
          <div className="public-hero-badge">
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-blue-600 ring-4 ring-blue-100"
            />
            <span>Miracle International Travel &amp; Tourism</span>
          </div>

          <h1
            id="travel-hero-heading"
            className="public-hero-title"
          >
            Travel Beyond{" "}
            <span className="bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Boundaries
            </span>
          </h1>

          <p className="public-hero-description">
            Explore destinations, plan customized journeys, arrange flights, and get
            travel support with Miracle International.
          </p>

          <div className="public-hero-actions">
            <Button
              size="xl"
              asChild
              variant="accent"
              className="group shadow-md"
            >
              <Link
                href={ROUTES.public.inboundTravel}
                className="flex items-center justify-center gap-2.5"
              >
                <Compass className="size-5 transition-transform group-hover:rotate-45" />
                <span>Inbound Tours</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              size="xl"
              variant="secondary-hero"
              asChild
              className="group"
            >
              <Link
                href={ROUTES.public.outboundTravel}
                className="flex items-center justify-center gap-2.5"
              >
                <Globe className="size-5 text-blue-600 transition-transform group-hover:scale-110" />
                <span>Outbound Tours</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
