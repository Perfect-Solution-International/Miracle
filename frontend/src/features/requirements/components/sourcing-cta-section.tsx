"use client";

import { ArrowRight, CheckCircle2, Globe2, Package, Shield } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { RequirementInquiryForm } from "./requirement-inquiry-form";

const TRUST_POINTS = [
  { icon: Globe2, text: "Global sourcing across 50+ countries" },
  { icon: Package, text: "Products, services & solutions in one request" },
  { icon: Shield, text: "Free consultation — no commitment required" },
] as const;

/**
 * Premium two-column CTA section between the hero and the main form.
 * Left: high-quality global sourcing image with floating stat badges.
 * Right: heading, trust points, and a CTA that opens the intake form in a modal.
 */
export function SourcingCtaSection() {
  const [open, setOpen] = useState(false);

  return (
    <section
      aria-labelledby="sourcing-cta-heading"
      className="relative isolate overflow-hidden bg-white"
    >
      {/* Subtle diagonal background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, #eaf1fb 0%, #ffffff 45%, #f5f7fa 100%)",
        }}
      />

      <div className="container-page py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* LEFT: Image panel */}
          <div className="relative">
            {/* Decorative glow behind image */}
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-3xl opacity-60"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 40%, #1150a8 0%, transparent 65%)",
                filter: "blur(40px)",
              }}
            />

            <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20">
              <Image
                src="/brand/global-sourcing-hero.jpg"
                alt="Global trade routes illustrated with cargo containers and compass on a world map, symbolising Miracle International's international sourcing network"
                width={720}
                height={480}
                className="h-auto w-full object-cover hero-drift"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Dark gradient overlay for badge readability */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(7,22,46,0.55) 0%, transparent 55%)",
                }}
              />

              {/* Floating stat — bottom left */}
              <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-xl border border-white/20 bg-navy/80 px-4 py-2.5 shadow-lg backdrop-blur-sm">
                <span
                  aria-hidden="true"
                  className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-blue/80"
                >
                  <Globe2 className="size-4 text-white" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-sm font-bold text-white">50+ Countries</span>
                  <span className="text-[0.68rem] text-white/70">Global sourcing network</span>
                </span>
              </div>

              {/* Floating stat — top right */}
              <div className="absolute top-4 right-4 flex items-center gap-3 rounded-xl border border-white/20 bg-brand-blue/85 px-4 py-2.5 shadow-lg backdrop-blur-sm">
                <span className="flex flex-col leading-tight text-right">
                  <span className="text-sm font-bold text-white">24–48 hrs</span>
                  <span className="text-[0.68rem] text-white/75">Expert response time</span>
                </span>
                <span
                  aria-hidden="true"
                  className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-white/20"
                >
                  <CheckCircle2 className="size-4 text-white" />
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Content panel */}
          <div className="flex flex-col gap-7">
            {/* Eyebrow label */}
            <p className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.18em] text-brand-blue uppercase sm:text-[0.8rem]">
              <span aria-hidden="true" className="h-0.5 w-6 shrink-0 rounded-full bg-brand-red" />
              Global Sourcing Made Simple
            </p>

            <div className="flex flex-col gap-4">
              <h2
                id="sourcing-cta-heading"
                className="text-3xl leading-[1.1] font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl"
              >
                One Request.{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #1150a8 0%, #0b3b80 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Endless Solutions.
                </span>
              </h2>

              <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                Tell us exactly what your business needs &mdash; whether it&apos;s products,
                services, or international sourcing &mdash; and our expert team will handle
                everything from consultation to delivery.
              </p>
            </div>

            {/* Trust points */}
            <ul className="flex flex-col gap-3">
              {TRUST_POINTS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-blue-light"
                  >
                    <Icon className="size-3.5 text-brand-blue" />
                  </span>
                  <span className="text-sm font-medium text-ink">{text}</span>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div
              aria-hidden="true"
              className="h-px w-full rounded-full bg-gradient-to-r from-brand-blue/20 via-brand-red/20 to-transparent"
            />

            {/* CTA button + modal */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button
                    id="open-requirement-form-cta"
                    variant="accent"
                    size="xl"
                    className="group w-full sm:w-auto"
                  >
                    Tell Us What You Need
                    <ArrowRight
                      data-icon="inline-end"
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </Button>
                </DialogTrigger>

                <DialogContent
                  className="max-h-[90vh] w-full max-w-2xl overflow-y-auto p-0 sm:max-w-2xl"
                  showCloseButton
                >
                  <DialogHeader className="sr-only">
                    <DialogTitle>Submit Your Requirement</DialogTitle>
                    <DialogDescription>
                      Fill out the form below and our team will get back to you with solutions,
                      quotations or consultation.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="p-6 sm:p-8">
                    <RequirementInquiryForm />
                  </div>
                </DialogContent>
              </Dialog>

              <p className="text-center text-xs text-muted-foreground sm:text-left">
                Free to submit &middot; No commitment required
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
