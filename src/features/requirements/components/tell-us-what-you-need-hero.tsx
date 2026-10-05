import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Eyebrow } from "@/components/common/eyebrow";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

import { ServiceRequirementDialog } from "./service-requirement-dialog";

/**
 * Tell Us What You Need Hero
 */
export function TellUsWhatYouNeedHero() {
  return (
    <section
      aria-labelledby="tell-us-heading"
      className="public-hero"
    >
      {/* Background Image */}
      <div
        aria-hidden="true"
        className="public-hero-media bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            'url("/images/global-business-services-hero-v2.png")',
          backgroundPosition: "right center",
        }}
      />

      {/* White Gradient */}
      <div
        aria-hidden="true"
        className="public-hero-haze"
      />

      {/* Bottom Fade */}
      <div
        aria-hidden="true"
        className="public-hero-fade"
      />

      {/* Content */}
      <div className="container-page public-hero-content">
        <div className="grid items-center lg:grid-cols-12">
          <div className="public-hero-copy flex flex-col items-start gap-6 lg:col-span-7 xl:col-span-6">
            <Eyebrow>TELL US WHAT YOU NEED</Eyebrow>

            <h1
              id="tell-us-heading"
              className="public-hero-title mt-0"
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

            <p className="public-hero-description mt-0 text-pretty">
              Have a specific requirement, business idea, product need, or travel
              request? Tell us what you&apos;re looking for and our team will help
              you find the right solution.
            </p>

            <div className="public-hero-actions mt-0">
              <ServiceRequirementDialog
                context="general"
                trigger={
                  <Button
                    size="xl"
                    variant="accent"
                    className="shadow-md"
                  >
                    Submit Your Requirement
                    <ArrowRight
                      data-icon="inline-end"
                      aria-hidden="true"
                      className="size-4"
                    />
                  </Button>
                }
              />

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
