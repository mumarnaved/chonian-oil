const icon = "h-[22px] w-[22px] shrink-0 text-gold-deep";
const svg = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className: icon, "aria-hidden": true };

const items = [
  {
    label: "Homemade in small batches",
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/images/homemade-jars.png" alt="" width={34} height={34} className="-my-2 h-[34px] w-[34px] shrink-0" />
    ),
  },
  {
    label: "Fully natural",
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/images/natural-badge.png" alt="" width={34} height={34} className="-my-2 h-[34px] w-[34px] shrink-0" />
    ),
  },
  {
    label: "Same oil as Chonions",
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/images/oil-drops.png" alt="" width={34} height={34} className="-my-2 h-[34px] w-[34px] shrink-0" />
    ),
  },
  {
    label: "Organic onion & mustard",
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/images/organic-badge.png" alt="" width={34} height={34} className="-my-2 h-[34px] w-[34px] shrink-0" />
    ),
  },
  {
    label: "Cash on Delivery",
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/images/cod-truck.png" alt="" width={34} height={34} className="-my-2 h-[34px] w-[34px] shrink-0" />
    ),
  },
  {
    label: "Ships across Pakistan",
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/images/fast-clock.png" alt="" width={34} height={34} className="-my-2 h-[34px] w-[34px] shrink-0 object-contain" />
    ),
  },
];

/** Endless, slow-scrolling strip of promises. The group is rendered twice so the loop is seamless. */
export function TrustMarquee() {
  return (
    <section className="trust-marquee border-y border-plum/10 bg-sand" aria-label="Why choose us">
      <div className="trust-marquee__viewport">
        <div className="trust-marquee__track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="trust-marquee__group" aria-hidden={copy === 1}>
              {[...items, ...items].map((it, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 whitespace-nowrap px-8 py-5 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-plum sm:text-xs"
                >
                  {it.icon}
                  {it.label}
                  <span className="ml-8 h-1 w-1 rotate-45 bg-plum/30" aria-hidden />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
