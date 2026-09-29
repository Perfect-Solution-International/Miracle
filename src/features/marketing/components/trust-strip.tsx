import { TRUST_STRIP_ITEMS } from "../data/home.content";

/** Slim band of service pillars directly under the hero. */
export function TrustStrip() {
  return (
    <section aria-label="What we cover" className="border-y bg-white">
      <div className="container-page">
        <ul className="bg-border grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-6">
          {TRUST_STRIP_ITEMS.map(({ icon: Icon, title }) => (
            <li
              key={title}
              className="text-ink flex items-center gap-3 bg-white px-3 py-5 text-sm font-semibold sm:px-4 lg:justify-center"
            >
              <Icon aria-hidden="true" className="text-brand-blue size-5 shrink-0" />
              {title}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
