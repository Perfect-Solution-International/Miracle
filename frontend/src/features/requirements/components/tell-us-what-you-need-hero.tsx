import Image from "next/image";

import { cn } from "@/lib/utils";

import { HERO_SERVICE_ICONS, HERO_STATS } from "../data/tell-us-what-you-need.content";

/** Light-mode hero for the public intake page.
 *
 * Background: blurred satellite image under a bright white-to-blue-light
 * gradient overlay — subtle photo texture without losing legibility.
 * All text uses dark navy / ink tones. Stats bar uses white glassmorphic cards
 * on a soft brand-blue-light base.
 */
export function TellUsWhatYouNeedHero() {
  return (
    <section
      aria-labelledby="tell-us-heading"
      className="relative isolate overflow-hidden bg-white"
    >
      {/* ── Full-width background image (blurred, very bright) ── */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <Image
          src="/brand/hero-bg.jpg"
          alt=""
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center"
          style={{ filter: "blur(4px) brightness(1.6) saturate(0.5) opacity(0.22)" }}
        />
      </div>

      {/* Light gradient overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(160deg, #ffffff 0%, #eaf1fb 40%, #f0f5fd 70%, #ffffff 100%)",
        }}
      />

      {/* Faint grid texture */}
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-50" />

      {/* Ambient glow orbs — light blue / light red */}
      <div
        aria-hidden="true"
        className="pulse-glow pointer-events-none absolute -top-24 -right-24 -z-10 size-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(17,80,168,0.10) 0%, rgba(17,80,168,0.03) 55%, transparent 78%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pulse-glow pointer-events-none absolute -bottom-32 -left-16 -z-10 size-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(223,32,33,0.07) 0%, rgba(17,80,168,0.05) 50%, transparent 75%)",
          animationDelay: "2s",
        }}
      />

      {/* ── Main content ───────────────────────────────────────── */}
      <div className="container-page flex flex-col items-center pt-20 pb-0 text-center lg:pt-28">

        {/* Eyebrow pill */}
        <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-brand-blue/15 bg-brand-blue-light/70 px-4 py-1.5 backdrop-blur-sm">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-red" />
          <span className="text-[0.72rem] font-bold tracking-[0.2em] text-brand-blue uppercase">
            Miracle International
          </span>
          <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-red" />
        </div>

        {/* Headline */}
        <h1
          id="tell-us-heading"
          className="mx-auto max-w-4xl text-5xl leading-[1.04] font-extrabold tracking-tight text-ink sm:text-6xl lg:text-7xl"
        >
          Your Needs.{" "}
          <span
            className="block sm:inline"
            style={{
              background: "linear-gradient(135deg, #1150a8 0%, #0b3b80 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Our Solutions.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink/60 sm:text-lg lg:text-xl">
          Share your requirements with us — products, services, or international
          sourcing — and our expert team will coordinate the perfect solution
          from&nbsp;A&nbsp;to&nbsp;Z.
        </p>

        {/* Service badge strip */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {HERO_SERVICE_ICONS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className={cn(
                "flex items-center gap-2 rounded-full border border-brand-blue/15 bg-white px-4 py-2",
                "text-sm font-semibold text-navy shadow-sm",
                "transition-all duration-200 hover:border-brand-blue/40 hover:bg-brand-blue-light hover:shadow-md",
              )}
            >
              <Icon aria-hidden="true" className="size-4 text-brand-blue" />
              {label}
            </div>
          ))}
          <div
            className={cn(
              "flex items-center gap-2 rounded-full border border-brand-red/20 bg-white px-4 py-2",
              "text-sm font-semibold text-navy shadow-sm",
              "transition-all duration-200 hover:border-brand-red/40 hover:bg-red-50 hover:shadow-md",
            )}
          >
            <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-red" />
            &amp; More
          </div>
        </div>

        {/* Floating quote card */}
        <div className="float-slow relative mt-14 hidden w-full max-w-lg lg:flex lg:justify-center">
          <div
            className="relative rounded-2xl border border-brand-blue/12 px-8 py-5 shadow-soft backdrop-blur-sm"
            style={{
              background:
                "linear-gradient(135deg, rgba(234,241,251,0.9) 0%, rgba(255,255,255,0.95) 100%)",
            }}
          >
            <p className="text-base font-bold tracking-wide text-ink">
              &ldquo;One request. Countless possibilities.&rdquo;
            </p>
            <p className="mt-1 text-xs text-ink/45">
              Products · Sourcing · Services · Consultation
            </p>
            <span aria-hidden="true" className="absolute top-3 left-3 size-1.5 rounded-full bg-brand-red" />
            <span aria-hidden="true" className="absolute right-3 bottom-3 size-1.5 rounded-full bg-brand-blue" />
          </div>
        </div>
      </div>

      {/* ── Stats bar ──────────────────────────────────────────── */}
      <div className="container-page mt-16 pb-0">
        {/* Accent shimmer line */}
        <div
          aria-hidden="true"
          className="shimmer-line mx-auto mb-0 h-px max-w-3xl rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(17,80,168,0.25) 20%, rgba(223,32,33,0.35) 50%, rgba(17,80,168,0.25) 80%, transparent 100%)",
          }}
        />

        <ul className="grid grid-cols-2 divide-x divide-brand-blue/8 border-x border-brand-blue/8 sm:grid-cols-4">
          {HERO_STATS.map(({ icon: Icon, title, subtitle }, i) => (
            <li
              key={title}
              className={cn(
                "flex flex-col items-center gap-3 px-4 py-8 text-center sm:py-10",
                i === 0 && "sm:items-start sm:text-left",
                i === HERO_STATS.length - 1 && "sm:items-end sm:text-right",
              )}
            >
              <span
                className={cn(
                  "inline-flex size-10 shrink-0 items-center justify-center rounded-xl",
                  i === 0
                    ? "bg-brand-red/10 text-brand-red"
                    : "bg-brand-blue-light text-brand-blue",
                )}
              >
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <span className="flex flex-col gap-0.5 leading-tight">
                <span className="text-base font-extrabold text-ink">{title}</span>
                <span className="text-xs font-medium text-ink/50">{subtitle}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
