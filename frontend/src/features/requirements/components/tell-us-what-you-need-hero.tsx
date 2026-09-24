import { Eyebrow } from "@/components/common/eyebrow";
import { cn } from "@/lib/utils";

import { HERO_SERVICE_ICONS, HERO_STATS } from "../data/tell-us-what-you-need.content";

const HEX_CLIP = "[clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]";

/** Hero for the public intake page: brand promise, service hexagons, and the
 * four value-proposition stats that lead into the form below. */
export function TellUsWhatYouNeedHero() {
  return (
    <section
      aria-labelledby="tell-us-heading"
      className="from-navy to-brand-blue-dark relative isolate overflow-hidden bg-gradient-to-br"
    >
      <div aria-hidden="true" className="bg-grid-inverse absolute inset-0 -z-10" />

      <div className="container-page grid gap-12 pt-14 pb-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-10 lg:pt-20">
        <div className="flex flex-col gap-5">
          <Eyebrow tone="inverse">Tell Us What You Need</Eyebrow>
          <h1
            id="tell-us-heading"
            className="text-4xl leading-[1.08] font-extrabold tracking-tight text-white sm:text-5xl"
          >
            Your Needs.
            <br />
            <span className="text-brand-red">Our Solutions.</span>
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
            Share your requirements with us, and our expert team will provide or
            coordinate the right solution from A to Z.
          </p>
        </div>

        <div className="hidden lg:block">
          <div className="mx-auto grid w-fit grid-cols-3 items-center gap-5">
            {HERO_SERVICE_ICONS.slice(0, 2).map(({ icon: Icon, label }) => (
              <HexIcon key={label} icon={Icon} label={label} />
            ))}
            <div className="col-start-2 row-span-3 row-start-1">
              <CenterHex />
            </div>
            {HERO_SERVICE_ICONS.slice(2).map(({ icon: Icon, label }) => (
              <HexIcon key={label} icon={Icon} label={label} />
            ))}
          </div>

          <div className="mt-6 flex flex-col items-end gap-2 pr-2 text-right">
            <p className="font-serif text-lg leading-tight text-white/90 italic">
              From Ideas to
              <br />
              Real Results
            </p>
            <span aria-hidden="true" className="bg-brand-red h-0.5 w-10 rounded-full" />
          </div>
        </div>
      </div>

      <div className="container-page pb-14 lg:pb-20">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {HERO_STATS.map(({ icon: Icon, title, subtitle }) => (
            <li
              key={title}
              className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur sm:p-4"
            >
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                <Icon aria-hidden="true" className="size-4.5 text-white" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-bold text-white">{title}</span>
                <span className="text-xs text-white/70">{subtitle}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function HexIcon({
  icon: Icon,
  label,
}: {
  icon: (typeof HERO_SERVICE_ICONS)[number]["icon"];
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn("relative flex size-16 items-center justify-center", HEX_CLIP)}>
        <span className="absolute inset-0 border border-white/25 bg-white/10" />
        <Icon aria-hidden="true" className="relative size-6 text-white" />
      </div>
      <span className="text-[0.65rem] font-semibold tracking-wide text-white/70 uppercase">
        {label}
      </span>
    </div>
  );
}

function CenterHex() {
  return (
    <div className={cn("relative flex size-36 items-center justify-center", HEX_CLIP)}>
      <span className="bg-brand-red absolute inset-0" />
      <p className="relative px-4 text-center text-sm leading-tight font-extrabold tracking-wide text-white uppercase">
        You Tell Us
        <br />
        We Deliver
      </p>
    </div>
  );
}
