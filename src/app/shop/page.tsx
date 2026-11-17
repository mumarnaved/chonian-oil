import type { Metadata } from "next";
import Link from "next/link";
import { AccordionItem } from "@/components/AccordionItem";
import { SimpleAddButton } from "@/components/AddToCart";
import { BottleShot } from "@/components/BottleShot";
import { LoopVideo } from "@/components/LoopVideo";
import { PageBanner } from "@/components/PageBanner";
import { ShopCatalog } from "@/components/ShopCatalog";
import { contact, formatPKR, product, shipping } from "@/lib/store";

export const metadata: Metadata = {
  title: "Shop | Organic Onion & Mustard Hair Oil — by Chonions",
  description: "Buy homemade onion & mustard hair oil online. The same oil as Chonions crisps. Cash on Delivery across Pakistan.",
};

const why = [
  { icon: "/images/homemade-jars.png", title: "Homemade", text: "Made by us at home, in small batches." },
  { icon: "/images/natural-badge.png", title: "Fully natural", text: "Nothing artificial — no fragrance, colour or fillers." },
  { icon: "/images/oil-drops.png", title: "Same oil as Chonions", text: "The oil we trust in our food, bottled for hair." },
  { icon: "/images/organic-badge.png", title: "The organic match", text: "Mustard for warmth, organic onion for strength." },
];

const inside = [
  "Nourishes the scalp",
  "Helps strengthen hair from root to tip",
  "Softness and natural shine",
  "Fully natural and homemade",
];

const faqs = [
  { q: "Is this really the same oil used in Chonions crisps?", a: "Yes. Chonions is our snack brand, and this is the same homemade onion-and-mustard oil we use in making Chonions onion crisps — now bottled for your hair." },
  { q: "How do I pay?", a: "Add the oil to your cart, fill in your delivery details at checkout and pay in cash when your order arrives. We deliver across Pakistan." },
  { q: "How much does delivery cost?", a: `Delivery is ${formatPKR(shipping.flatFee)}, and free on orders of ${formatPKR(shipping.freeAbove)} or more.` },
  { q: "Is it suitable for sensitive skin?", a: "Mustard oil feels warm on the skin and can irritate some people. Do a small patch test behind the ear 24 hours before first use, and avoid contact with the eyes." },
];

export default function ShopPage() {
  return (
    <>
      <PageBanner compact eyebrow="Home  /  Shop" title={<>Shop <span className="text-gold">Onion &amp; Mustard</span></>} />

      <ShopCatalog />

      {/* Full-width story band */}
      <section className="relative isolate overflow-hidden bg-plum-deep text-cream">
        <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: "url(/videos/seed-oil-poster.jpg)" }} aria-hidden />
        <LoopVideo name="seed-oil" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <span className="absolute inset-0 -z-10 bg-gradient-to-r from-plum-deep/92 via-plum-deep/65 to-plum-deep/25" aria-hidden />
        <div className="mx-auto flex min-h-[420px] max-w-6xl flex-col justify-center px-5 py-16 md:min-h-[480px]">
          <p className="eyebrow !text-gold">Our story</p>
          <p className="mt-4 max-w-2xl font-display text-[clamp(2rem,5vw,3.6rem)] font-bold leading-[1.04] tracking-tight">
            From mustard seed <span className="text-gold">till mustard oil.</span>
          </p>
          <p className="mt-4 max-w-md leading-relaxed text-cream/85">Homemade and fully natural — see how every bottle is made.</p>
          <Link href="/about" className="mt-7 inline-flex h-12 w-fit items-center rounded-full bg-gold px-8 font-display text-[13px] font-bold uppercase tracking-[0.14em] text-plum-deep transition hover:bg-[#f0bb4d]">
            Read our story
          </Link>
        </div>
      </section>

      {/* Why */}
      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-5 py-10 md:py-20">
          <p className="eyebrow text-center">Why Onion &amp; Mustard</p>
          <h2 className="section-title mt-3 text-center">Simple, honest, homemade.</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:mt-10 md:gap-x-8 md:gap-y-10 lg:grid-cols-4">
            {why.map((w) => (
              <div key={w.title} className="text-center">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cream ring-1 ring-plum/10 md:h-20 md:w-20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={w.icon} alt="" width={44} height={44} className="h-11 w-11" />
                </span>
                <h3 className="mt-3 font-display text-base font-bold leading-tight text-plum md:mt-5 md:text-lg">{w.title}</h3>
                <p className="mx-auto mt-1.5 max-w-[15rem] text-[13px] leading-relaxed text-ink/65 md:text-sm">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spotlight */}
      <section className="bg-plum-deep text-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-6 px-5 py-10 md:grid-cols-2 md:gap-16 md:py-20">
          <div className="relative mx-auto aspect-[16/10] w-full max-w-md overflow-hidden rounded-[14px] md:aspect-[4/5]">
            <BottleShot alt="Organic Onions & Mustard Hair Oil" sizes="(min-width:768px) 40vw, 90vw" />
          </div>
          <div>
            <p className="eyebrow !text-gold">In every bottle</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Mustard oil, infused with organic onion.
            </h2>
            <ul className="mt-4 space-y-2 md:mt-6 md:space-y-3">
              {inside.map((i) => (
                <li key={i} className="flex items-start gap-3 text-cream/85">
                  <svg className="mt-1 h-4 w-4 shrink-0 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m5 12 5 5 9-10" /></svg>
                  {i}
                </li>
              ))}
            </ul>
            <p className="mt-5 flex items-baseline gap-3 md:mt-8">
              <span className="font-display text-3xl font-bold text-gold">{formatPKR(product.price)}</span>
              {product.compareAtPrice ? <span className="text-cream/50 line-through">{formatPKR(product.compareAtPrice)}</span> : null}
              <span className="text-sm text-cream/60">/ {product.size}</span>
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 md:mt-5 md:gap-4">
              <SimpleAddButton label="Add to cart" className="inline-flex h-12 items-center justify-center rounded-[10px] bg-gold px-8 font-display text-[13px] font-bold uppercase tracking-[0.14em] text-plum-deep transition hover:bg-[#f0bb4d]" />
              <span className="text-sm text-cream/65">Cash on Delivery · free shipping over {formatPKR(shipping.freeAbove)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery */}
      <section className="border-b border-plum/10 bg-cream">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 md:grid-cols-3 md:gap-8 md:py-12">
          {[
            { icon: "/images/cod-truck.png", title: "Cash on Delivery", text: "Pay in cash when your order arrives." },
            { icon: "/images/fast-clock.png", title: "Delivery across Pakistan", text: `${formatPKR(shipping.flatFee)} flat — free over ${formatPKR(shipping.freeAbove)}.` },
            { icon: "/images/organic-badge.png", title: "Questions? Just ask", text: "Message us on WhatsApp and we'll help." },
          ].map((d) => (
            <div key={d.title} className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={d.icon} alt="" width={44} height={44} className="h-11 w-11 shrink-0 object-contain" />
              <div>
                <h3 className="font-display text-base font-bold text-plum">{d.title}</h3>
                <p className="text-sm text-ink/65">{d.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1fr_1.6fr] md:py-20">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="section-title mt-3">Before you order.</h2>
          </div>
          <div className="border-t border-plum/15">
            {faqs.map((f) => (
              <AccordionItem key={f.q} variant="shop" question={f.q}>{f.a}</AccordionItem>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp */}
      <section className="bg-gold">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-2xl font-bold text-plum-deep sm:text-3xl">Prefer to order on WhatsApp?</p>
            <p className="mt-2 max-w-xl text-plum-deep/80">Message us and we&apos;ll confirm your order.</p>
          </div>
          <a href={`https://wa.me/${contact.whatsapp}`} className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-plum-deep px-8 font-display font-semibold text-cream transition hover:bg-plum">
            Message us on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
