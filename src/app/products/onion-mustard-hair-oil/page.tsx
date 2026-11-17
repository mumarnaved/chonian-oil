import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AccordionItem } from "@/components/AccordionItem";
import { ProductBuyBox } from "@/components/ProductBuyBox";
import { ProductGallery } from "@/components/ProductGallery";
import { chonionsSiteUrl, formatPKR, product, shipping } from "@/lib/store";

export const metadata: Metadata = {
  title: `${product.name} | Onion & Mustard — by Chonions`,
  description:
    "Homemade, fully natural onion & mustard hair oil — the very same oil used in Chonions onion crisps. Cash on Delivery across Pakistan.",
};

const points = [
  "The very same oil we use in Chonions crisps",
  "Mustard oil infused with organic onion essence",
  "Homemade in small batches — fully natural",
  "Nothing artificial: no added fragrance, colour or fillers",
];

const why = [
  { icon: "/images/homemade-jars.png", title: "Homemade", text: "Made by us at home, in small batches." },
  { icon: "/images/natural-badge.png", title: "Fully natural", text: "No fragrance, colour or fillers." },
  { icon: "/images/oil-drops.png", title: "Same oil as Chonions", text: "Trusted in our food, bottled for hair." },
  { icon: "/images/organic-badge.png", title: "Organic match", text: "Mustard for warmth, onion for strength." },
];

const benefits = [
  { title: "Nourishes the scalp", text: "Warm mustard oil has been massaged into scalps for generations to keep them nourished and comfortable." },
  { title: "Helps strengthen hair", text: "Onion and mustard together support stronger-feeling hair from root to tip with regular oiling." },
  { title: "Softness & natural shine", text: "Coats each strand to tame dryness and frizz, leaving hair soft with a healthy shine." },
  { title: "Nothing artificial", text: "Fully natural and homemade — no added fragrance, colour or fillers." },
];

const howTo = [
  { title: "Warm it", text: "Pour a little oil into a bowl and warm it slightly. It should feel comfortably warm, never hot." },
  { title: "Massage", text: "Part your hair and massage into the scalp with your fingertips for 5–10 minutes, then work it through the lengths." },
  { title: "Leave it in", text: "Leave for at least an hour, or overnight for a deeper treatment. Cover with a towel or shower cap." },
  { title: "Wash", text: "Shampoo as usual. Use 2–3 times a week for best results." },
];

const details = [
  {
    q: "Description",
    a: "Organic Onions & Mustard Hair Oil is a nourishing oil made at home from pure mustard oil and organic onion essence. It is the very same oil we use in making Chonions onion crisps — bottled for hair health and strength.",
  },
  { q: "Ingredients", a: "Mustard oil and organic onion essence. Fully natural, with nothing artificial added." },
  {
    q: "Delivery & payment",
    a: `Pay in cash when your order arrives — we deliver across Pakistan. Delivery is ${formatPKR(shipping.flatFee)}, and free on orders of ${formatPKR(shipping.freeAbove)} or more.`,
  },
  {
    q: "Before you use it",
    a: "For external use on hair and scalp only. Mustard oil feels warm on the skin and can irritate some people: do a small patch test behind the ear 24 hours before first use, and avoid contact with the eyes.",
  },
];

export default function ProductPage() {
  return (
    <>
      <div className="bg-cream pt-32 md:pt-36">
        <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-5 text-[13px] text-ink/55">
          <Link href="/" className="hover:text-plum">Home</Link> <span aria-hidden>/</span>{" "}
          <Link href="/shop" className="hover:text-plum">Shop</Link> <span aria-hidden>/</span>{" "}
          <span className="text-plum">Hair oil</span>
        </nav>

        <section className="mx-auto grid max-w-6xl gap-6 px-5 pb-10 pt-4 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-24 lg:pt-6">
          <ProductGallery />

          <div>
            <p className="eyebrow">Sister company by Chonions</p>
            <h1 className="mt-3 font-display text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.05] tracking-tight text-plum-deep">
              {product.name}
            </h1>
            <p className="mt-2 text-ink/60">{product.tagline} · {product.size}</p>

            <p className="mt-3 flex items-baseline gap-3 md:mt-5">
              <span className="font-display text-3xl font-bold text-plum-deep">{formatPKR(product.price)}</span>
              {product.compareAtPrice ? <span className="text-lg text-ink/40 line-through">{formatPKR(product.compareAtPrice)}</span> : null}
              {product.compareAtPrice ? (
                <span className="rounded-[5px] bg-gold px-2 py-0.5 font-display text-[11px] font-semibold uppercase tracking-wide text-plum-deep">
                  Save {Math.round((1 - product.price / product.compareAtPrice) * 100)}%
                </span>
              ) : null}
            </p>
            <p className="mt-1 text-[13px] text-ink/50">Inclusive of all taxes · shipping calculated at checkout</p>

            <ul className="mt-4 space-y-2 border-y border-plum/10 py-4 text-[15px] md:mt-6 md:space-y-3 md:py-6 md:text-base">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-ink/80">
                  <svg className="mt-1 h-4 w-4 shrink-0 text-gold-deep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m5 12 5 5 9-10" /></svg>
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-4 md:mt-6">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-plum/70">Size</p>
              <span className="mt-2 inline-flex rounded-full border-2 border-plum px-5 py-2 font-display text-sm font-semibold text-plum">{product.size}</span>
            </div>

            <ProductBuyBox />

            <div className="mt-6 grid grid-cols-3 gap-2 text-center md:mt-8 md:gap-3">
              {[
                { icon: "/images/cod-truck.png", t: "Cash on Delivery" },
                { icon: "/images/fast-clock.png", t: "Across Pakistan" },
                { icon: "/images/natural-badge.png", t: "Fully natural" },
              ].map((x) => (
                <div key={x.t} className="rounded-[12px] bg-sand px-2 py-3 md:py-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={x.icon} alt="" width={34} height={34} className="mx-auto h-[34px] w-[34px] object-contain" />
                  <p className="mt-2 font-display text-[11.5px] font-semibold uppercase tracking-wide text-plum">{x.t}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-plum/15 md:mt-8">
              {details.map((d, n) => (
                <AccordionItem key={d.q} variant="product" question={d.q} defaultOpen={n === 0}>{d.a}</AccordionItem>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Why */}
      <section className="bg-sand">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 px-5 py-8 sm:grid-cols-2 md:gap-8 md:py-12 lg:grid-cols-4">
          {why.map((w) => (
            <div key={w.title} className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={w.icon} alt="" width={48} height={48} className="h-12 w-12 shrink-0 object-contain" />
              <div>
                <h3 className="font-display text-base font-bold text-plum">{w.title}</h3>
                <p className="text-sm text-ink/65">{w.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-10 md:py-24">
          <p className="eyebrow">Why you&apos;ll love it</p>
          <h2 className="section-title mt-3 max-w-xl">Oil your hair has been asking for.</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 md:mt-10 md:gap-5 lg:grid-cols-4">
            {benefits.map((b, n) => (
              <div key={b.title} className="rounded-[14px] border border-plum/12 bg-white p-4 md:p-6">
                <span className="font-display text-3xl font-medium tabular-nums text-gold-deep">0{n + 1}</span>
                <h3 className="mt-3 font-display text-base font-bold leading-tight text-plum md:mt-4 md:text-lg">{b.title}</h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink/65 md:mt-2 md:text-sm">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="bg-plum-deep text-cream">
        <div className="mx-auto max-w-6xl px-5 py-10 md:py-24">
          <p className="eyebrow !text-gold">How to use</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">Four simple steps.</h2>
          <ol className="mt-6 grid grid-cols-2 gap-x-5 gap-y-6 md:mt-10 md:gap-8 lg:grid-cols-4">
            {howTo.map((h, n) => (
              <li key={h.title} className="border-t border-gold/40 pt-5">
                <span className="font-display text-4xl font-medium tabular-nums text-gold">0{n + 1}</span>
                <h3 className="mt-2 font-display text-lg font-semibold md:mt-3 md:text-xl">{h.title}</h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-cream/75 md:mt-2 md:text-sm">{h.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Family */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-5 px-5 py-10 md:grid-cols-[260px_1fr] md:gap-8 md:py-20">
          <div className="relative mx-auto aspect-square w-36 overflow-hidden rounded-[16px] md:w-full">
            <Image src="/images/chonions-pouch.jpg" alt="Chonions onion crisps" fill sizes="260px" className="object-cover" />
          </div>
          <div>
            <p className="eyebrow">From the same kitchen</p>
            <h2 className="section-title mt-3 max-w-xl">If we trust it in our food, you can trust it on your hair.</h2>
            <p className="mt-4 max-w-xl text-ink/70">Chonions onion crisps are made with this very oil. Try the crisps too.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={chonionsSiteUrl} className="inline-flex h-12 items-center rounded-full border-2 border-plum px-7 font-display text-[13px] font-bold uppercase tracking-[0.14em] text-plum transition hover:bg-plum hover:text-cream">Visit Chonions ↗</a>
              <Link href="/shop" className="inline-flex h-12 items-center rounded-full px-5 font-display text-[13px] font-bold uppercase tracking-[0.14em] text-plum underline underline-offset-4">Back to shop</Link>
            </div>
          </div>
        </div>
      </section>
      <div className="h-16 lg:hidden" aria-hidden />
    </>
  );
}
