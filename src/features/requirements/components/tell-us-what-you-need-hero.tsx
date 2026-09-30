import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Eyebrow } from "@/components/common/eyebrow";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

/**
 * Tell Us What You Need Hero
 */
export function TellUsWhatYouNeedHero() {
  return (
    <section
      aria-labelledby="tell-us-heading"
      className="relative isolate flex min-h-[580px] items-center overflow-hidden border-b border-slate-200/70 bg-white lg:min-h-[660px]"
    >
      {/* Background Image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-1000"
        style={{
          backgroundImage:
            'url("/images/global-business-services-hero-v2.png")',
          backgroundPosition: "right center",
        }}
      />

      {/* White Gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/20 lg:from-white/95 lg:via-white/60 lg:to-transparent"
      />

      {/* Bottom Fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent"
      />

      {/* Content */}
      <div className="container-page relative z-10 w-full py-16 sm:py-20 lg:py-24">
        <div className="grid items-center lg:grid-cols-12">
          <div className="flex max-w-2xl flex-col gap-6 lg:col-span-7 xl:col-span-6">
            <Eyebrow>TELL US WHAT YOU NEED</Eyebrow>

            <h1
              id="tell-us-heading"
              className="text-ink text-[2.5rem] leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-5xl lg:text-[3.35rem] xl:text-[3.85rem]"
            >
              Tell Us What{" "}
              <span className="text-brand-blue relative inline-block">
                You Need
                <span
                  aria-hidden="true"
                  className="bg-brand-red absolute -bottom-1 left-0 h-1 w-16 rounded-full sm:-bottom-2 sm:w-24"
                />
              </span>
            </h1>

            <p className="text-muted-foreground max-w-xl text-base leading-relaxed font-medium text-pretty sm:text-lg lg:text-xl">
              Have a specific requirement, business idea, product need, or travel
              request? Tell us what you&apos;re looking for and our team will help
              you find the right solution.
            </p>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
              <Button
                asChild
                size="xl"
                className="bg-brand-blue font-bold text-white shadow-md hover:bg-brand-blue-dark"
              >
                <a href="#requirement-form">
                  Submit Your Requirement
                  <ArrowRight
                    data-icon="inline-end"
                    aria-hidden="true"
                    className="size-4"
                  />
                </a>
              </Button>

              <Button
                asChild
                size="xl"
                variant="secondary-hero"
                className="border border-slate-300 bg-white font-bold text-slate-900 shadow-sm hover:bg-slate-50"
              >
                <Link href={ROUTES.public.services}>
                  Explore Our Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}