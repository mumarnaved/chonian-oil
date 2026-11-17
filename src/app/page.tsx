import Link from "next/link";
import { AccordionItem } from "@/components/AccordionItem";
import Image from "next/image";
import { SimpleAddButton } from "@/components/AddToCart";
import { BottleSlot, ScrollBottle } from "@/components/ScrollBottle";
import { FixedBackdrop, MustardField } from "@/components/ScrollSections";
import { TrustMarquee } from "@/components/TrustMarquee";
import { LoopVideo } from "@/components/LoopVideo";
import { chonionsSiteUrl, contact, formatPKR, product, shipping } from "@/lib/store";


const journey = [
  { step: "01", title: "Mustard seed", text: "It starts with whole mustard seed — the same seed we pick for our own kitchen." },
  { step: "02", title: "Pressed into oil", text: "The seed is pressed into pure mustard oil. No blends, no shortcuts." },
  { step: "03", title: "Onion essence", text: "Organic onion is infused into the warm oil — the organic match for mustard." },
  { step: "04", title: "Bottled at home", text: "Made in small batches and bottled by hand. From mustard seed till mustard oil." },
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


const trustBoxes = [
  {
    eyebrow: "Homemade",
    title: "Oil you can trust",
    text: "Made at home in small batches, the same way we make it for our own kitchen and for Chonions crisps.",
    cta: false,
  },
  {
    eyebrow: "Fully natural",
    title: "Onion & mustard, the organic match",
    text: "Pure mustard oil infused with organic onion essence. Nothing artificial is added.",
    cta: false,
  },
  {
    eyebrow: "Seed to bottle",
    title: "From mustard seed till mustard oil",
    text: "We follow the oil the whole way, from the seed to the bottle that reaches your door.",
    cta: true,
  },
];

const faqs = [
  {
    q: "Is this really the same oil used in Chonions crisps?",
    a: "Yes. Chonions is our snack brand, and this is the same homemade onion-and-mustard oil we use in making Chonions onion crisps — now bottled for your hair.",
  },
  {
    q: "What is in the bottle?",
    a: "Mustard oil infused with organic onion essence. It is fully natural and homemade, with nothing artificial added.",
  },
  {
    q: "How do I pay?",
    a: "Add the oil to your cart, fill in your delivery details at checkout and pay in cash when your order arrives. We deliver across Pakistan.",
  },
  {
    q: "How much does delivery cost?",
    a: `Delivery is ${formatPKR(shipping.flatFee)}, and free on orders of ${formatPKR(shipping.freeAbove)} or more.`,
  },
  {
    q: "Is it suitable for sensitive skin?",
    a: "Mustard oil feels warm on the skin and can irritate some people. Do a small patch test behind the ear 24 hours before first use, and avoid contact with the eyes.",
  },
];

export default function Home() {
  return (
    <>
      <ScrollBottle />

      {/* ───────── 1 · HERO (bottle right) ───────── */}
      <section id="shop" className="relative overflow-hidden min-h-[calc(100svh-30px)] lg:h-[calc(100svh-30px)] lg:min-h-[520px]">
        {/* Dawn mustard field, kept soft behind a cream wash so the text stays easy to read */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/videos/field-poster.jpg)" }} aria-hidden />
        <LoopVideo name="field" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-plum-deep/65 via-plum-deep/30 to-plum-deep/10 lg:bg-gradient-to-r lg:from-plum-deep/65 lg:via-plum-deep/30 lg:to-plum-deep/5" aria-hidden />
        <div className="relative flex min-h-[calc(100svh-30px)] items-end px-5 pb-8 pt-28 lg:h-full lg:min-h-0 lg:pl-[clamp(1.5rem,4vw,4rem)] lg:pr-[clamp(1rem,3vw,3rem)] lg:pb-[clamp(2.5rem,9vh,5rem)] lg:pt-[clamp(6rem,14vh,9rem)]">
          <div className="glass-panel max-w-[46rem]">
            <p className="eyebrow !text-[#f3cf75]">Sister company by Chonions</p>
            <h1 className="mt-3 font-display text-[clamp(2rem,9vw,2.9rem)] lg:text-[min(7.4vh,4.3vw,4.4rem)] lg:whitespace-nowrap font-bold tracking-tight text-cream leading-[1.04]">
              The oil behind Chonions crisps,<br className="hidden lg:block" /> now <span className="text-gold">for your hair.</span>
            </h1>
            <p className="mt-4 max-w-[40rem] text-[clamp(0.9rem,2.1vh,1.15rem)] text-cream/90 leading-relaxed">
              {product.name} — made at home from pure mustard oil and organic onion essence. The very
              same oil we use in making Chonions, bottled for hair health and strength.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#benefits" className="btn-primary !bg-gold !text-plum-deep hover:!bg-[#f0bb4d]">Explore benefits</a>
              <Link href="/about" className="btn-secondary">Our story</Link>
            </div>
          </div>
        </div>
        <p className="hidden lg:flex [@media(max-height:760px)]:!hidden absolute bottom-3 left-1/2 -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.25em] text-cream/80">
          Scroll <span className="animate-bounce">↓</span>
        </p>
      </section>

      {/* ───────── TRUST STRIP ───────── */}
      <TrustMarquee />

      {/* ───────── 2 · SAME OIL AS CHONIONS (bottle joins the pack) ───────── */}
      <section id="story" className="bg-plum text-cream leaf-pattern">
        <div className="mx-auto max-w-6xl px-5 py-12 md:py-32 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="relative">
            <div className="relative aspect-[16/11] overflow-hidden rounded-[3px] shadow-[0_40px_70px_-30px_rgba(0,0,0,0.7)] md:mr-16">
              <Image
                src="/images/chonions-pouch.jpg"
                alt="Chonions onion crisps pack on a kitchen table"
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <Seal className="absolute -top-10 -left-3 md:-left-10 h-28 w-28 md:h-36 md:w-36" />
            {/* the bottle lands here, standing beside the Chonions pack */}
            <BottleSlot rotate={8} className="absolute -right-2 md:-right-4 -bottom-10 h-[230px] md:h-[440px] w-28 md:w-32" />
          </div>
          <div>
            <p className="eyebrow !text-[#f3cf75]">One oil · two products</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight leading-[1.1]">
              If we trust it in our food, you can trust it on your hair.
            </h2>
            <p className="mt-4 text-cream/80 leading-relaxed text-base md:mt-6 md:text-lg">
              Chonions onion crisps are made with our own homemade onion and mustard oil. This bottle holds exactly
              that same oil — nothing swapped, nothing diluted. The ingredients that make Chonions irresistibly
              crunchy are the ones that have nourished hair in Pakistani homes for generations.
            </p>
            <p className="mt-4 hidden text-cream/80 leading-relaxed md:block">
              Onion and mustard are the organic match: mustard oil carries warmth and nourishment, onion essence adds
              its strengthening goodness.
            </p>
            <a href={chonionsSiteUrl} className="mt-5 inline-flex items-center gap-2 text-gold md:mt-8 font-semibold underline underline-offset-4 hover:text-cream">
              Discover Chonions onion crisps ↗
            </a>
          </div>
        </div>
      </section>

      {/* ───────── 3 · SEED TO OIL (bottle right) ───────── */}
      <section className="mx-auto max-w-6xl px-5 py-12 md:py-32 grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-center">
        <div>
          <p className="eyebrow">Homemade, start to finish</p>
          <h2 className="section-title mt-4">From mustard seed till mustard oil.</h2>
          <p className="mt-4 text-ink/70 text-base leading-relaxed md:mt-5 md:text-lg">
            We don&apos;t buy oil and relabel it. Every bottle is made by us, at home, the same way we make it for
            Chonions.
          </p>
          <ol className="mt-6 border-b border-plum/20 md:mt-10">
            {journey.map((j) => (
              <li key={j.step} className="grid grid-cols-[4.25rem_1fr] sm:grid-cols-[5.5rem_1fr] items-baseline gap-x-3 border-t border-plum/20 py-4 md:py-6">
                <span className="font-display text-4xl sm:text-5xl font-medium leading-none tabular-nums text-gold-deep">{j.step}</span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-plum">{j.title}</h3>
                  <p className="mt-1.5 text-sm text-ink/70 leading-relaxed max-w-md">{j.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <BottleSlot rotate={-10} glow="plum" className="h-[230px] md:h-[520px] w-full" />
      </section>

      {/* ───────── FIXED BACKGROUND: boxes scroll over a still image ───────── */}
      <FixedBackdrop video="oil">
        <div className="mx-auto max-w-6xl px-5 py-[18vh] md:py-[30vh] flex flex-col gap-[24vh] md:gap-[38vh]">
          {trustBoxes.map((b, i) => (
            <div
              key={b.title}
              className={`relative mx-auto w-full max-w-[620px] min-h-[241px] md:mx-0 md:h-[241px] md:w-[620px] rounded-[3px] bg-plum-deep text-cream px-7 py-7 shadow-[0_45px_80px_-30px_rgba(25,5,22,0.85)] ${
                i % 2 ? "md:self-start" : "md:self-end"
              }`}
            >
              <span className="pointer-events-none absolute inset-2.5 border border-gold/35" aria-hidden />
              <div className="relative flex h-full flex-col justify-between gap-4 px-1.5">
                <div>
                  <div className="flex items-center justify-between font-display text-[11px] font-semibold uppercase tracking-[0.22em]">
                    <span className="text-gold">{b.eyebrow}</span>
                    <span className="text-cream/45 tabular-nums">
                      0{i + 1} / 0{trustBoxes.length}
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-[1.3rem] md:text-[1.45rem] font-bold uppercase leading-[1.1] tracking-tight">{b.title}</h2>
                  <p className="mt-2.5 text-sm text-cream/75 leading-relaxed">{b.text}</p>
                </div>
                {b.cta && (
                  <div>
                    <SimpleAddButton label={`Add to cart · ${formatPKR(product.price)}`} className="btn-primary !py-2.5 !text-sm" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </FixedBackdrop>

      {/* ───────── 4 · BENEFITS (bottle left) ───────── */}
      <section id="benefits" className="bg-sand">
        <div className="mx-auto max-w-6xl px-5 py-12 md:py-32 grid md:grid-cols-[1fr_1.5fr] gap-10 md:gap-16 items-center">
          <BottleSlot rotate={12} anim="left" className="order-2 md:order-1 h-[230px] md:h-[540px] w-full" />
          <div className="order-1 md:order-2">
            <p className="eyebrow">For hair health &amp; strength</p>
            <h2 className="section-title mt-4">What a regular oiling does.</h2>
            <p className="mt-4 text-ink/70 text-base leading-relaxed md:mt-5 md:text-lg">
              The traditional champi, made with oil you can trust. Results build with regular use.
            </p>
            <dl className="mt-6 divide-y md:mt-10 divide-plum/20 border-y border-plum/20">
              {benefits.map((b) => (
                <div key={b.title} className="grid gap-1 py-4 md:py-6 sm:grid-cols-[11rem_1fr] sm:gap-8">
                  <dt className="font-display text-lg font-semibold leading-snug text-plum">{b.title}</dt>
                  <dd className="text-sm text-ink/70 leading-relaxed">{b.text}</dd>
                </div>
              ))}
            </dl>
            <SimpleAddButton label={`Add to cart · ${formatPKR(product.price)}`} className="btn-primary mt-8" />
          </div>
        </div>
      </section>

      {/* ───────── 5 · INGREDIENTS (bottle centre, between the two) ───────── */}
      <section className="mx-auto max-w-6xl px-5 py-12 md:py-32">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">What&apos;s inside</p>
          <h2 className="section-title mt-4">Two ingredients. Fully natural.</h2>
        </div>
        <div className="mt-8 grid md:mt-12 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-10 items-center">
          <Ingredient
            label="The base"
            name="Mustard oil"
            text="Pressed from mustard seed. Warming and rich, the base of every traditional hair oiling."
          />
          <BottleSlot rotate={0} anim="pop" className="h-[230px] md:h-[460px] w-full md:w-48" />
          <Ingredient
            label="The infusion"
            side="right"
            name="Organic onion essence"
            text="Infused from organic onions — the same onions that go into Chonions crisps."
          />
        </div>
      </section>

      {/* ───────── IN MOTION: field-to-bottle film (portrait) ───────── */}
      <section className="bg-cream border-t border-plum/10">
        <div className="mx-auto max-w-6xl px-5 py-12 md:py-28 grid md:grid-cols-[1fr_340px] gap-8 md:gap-24 items-center">
          <div>
            <p className="eyebrow">The organic match</p>
            <h2 className="section-title mt-4">Onion &amp; mustard, in one bottle.</h2>
            <p className="mt-5 text-ink/70 text-lg leading-relaxed max-w-xl">
              From mustard seed till mustard oil — homemade, fully natural, and made with organic onion and mustard.
              The same oil that goes into Chonions, bottled for your hair.
            </p>
            <ul className="mt-5 max-w-md divide-y md:mt-8 divide-plum/20 border-y border-plum/20">
              {["Homemade in small batches", "Fully natural, organic onion & mustard", "Same oil as Chonions crisps"].map((t, i) => (
                <li key={t} className="flex items-baseline gap-4 py-3 md:py-4">
                  <span className="font-display text-sm font-semibold tabular-nums text-gold-deep">0{i + 1}</span>
                  <span className="font-display text-lg font-semibold text-plum">{t}</span>
                </li>
              ))}
            </ul>
            <SimpleAddButton label={`Add to cart · ${formatPKR(product.price)}`} className="btn-primary mt-8" />
          </div>
          <figure className="relative mx-auto aspect-[4/5] w-full max-w-[340px] md:aspect-[9/16] overflow-hidden rounded-[3px] bg-plum-deep shadow-[0_40px_70px_-35px_rgba(58,21,52,0.7)]">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/videos/story-poster.jpg)" }} aria-hidden />
            <LoopVideo name="story" className="absolute inset-0 h-full w-full object-cover" />
            <span className="pointer-events-none absolute inset-2.5 border border-cream/40" aria-hidden />
          </figure>
        </div>
      </section>

      {/* ───────── 6 · HOW TO USE (bottle right, tilted like it's pouring) ───────── */}
      <section id="how-to-use" className="bg-plum-deep text-cream leaf-pattern">
        <div className="mx-auto max-w-6xl px-5 py-12 md:py-32 grid md:grid-cols-[1.5fr_1fr] gap-10 md:gap-16 items-center">
          <div>
            <p className="eyebrow !text-[#f3cf75]">How to use</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">Your weekly champi.</h2>
            <ol className="mt-6 grid grid-cols-2 gap-x-5 gap-y-6 md:mt-10 md:gap-8">
              {howTo.map((h, i) => (
                <li key={h.title} className="border-t border-gold/40 pt-5">
                  <span className="text-gold text-sm font-semibold">Step {i + 1}</span>
                  <h3 className="mt-1.5 font-display text-xl md:mt-2 md:text-2xl">{h.title}</h3>
                  <p className="mt-2 text-[13px] text-cream/75 leading-relaxed md:mt-3 md:text-sm">{h.text}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-cream/60 md:mt-10">
              Patch test before first use. For external use on hair and scalp only. Keep away from eyes.
            </p>
          </div>
          <BottleSlot rotate={-32} anim="right" className="h-[230px] md:h-[480px] w-full" />
        </div>
      </section>

      {/* ───────── 7 · FAQ (title + bottle left, question cards right) ───────── */}
      <section id="faq" className="bg-sand">
        <div className="mx-auto max-w-6xl px-5 py-12 md:py-32 grid md:grid-cols-[1fr_1.6fr] gap-10 md:gap-16 items-center">
          <div className="text-center md:text-left">
            <p className="eyebrow">Questions</p>
            <h2 className="section-title mt-4">Hair oil FAQs</h2>
            <p className="mt-4 text-ink/70">Have more questions? Message us.</p>
            <a href={`https://wa.me/${contact.whatsapp}`} className="btn-secondary mt-6">
              Contact us on WhatsApp
            </a>
            <BottleSlot rotate={-6} glow="plum" anim="rise" className="mt-6 h-[220px] md:mt-8 md:h-[380px] w-full" />
          </div>
          <div className="divide-y divide-plum/20 border-y border-plum/20">
            {faqs.map((f) => (
              <AccordionItem key={f.q} variant="home" question={f.q}>{f.a}</AccordionItem>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 8 · CLOSING STATEMENT: mustard plants grow up as you scroll ───────── */}
      <section className="relative overflow-hidden pt-14 md:pt-32">
        <span
          className="pointer-events-none select-none absolute inset-x-0 text-center font-display font-bold uppercase leading-none tracking-tight text-gold/15 max-md:bottom-[calc(max(46vh,320px)-0.5rem)] max-md:text-[15vw] md:top-[38%] md:text-[19vw]"
          aria-hidden
        >
          Mustard
        </span>
        <div className="relative mx-auto max-w-3xl px-5 text-center">
          <p className="eyebrow">Sister company by Chonions</p>
          <h2 className="section-title mt-4">Grown as mustard. Made at home. Poured for your hair.</h2>
          <p className="mt-4 text-ink/70 text-base leading-relaxed md:mt-5 md:text-lg">
            Homemade and fully natural — the same oil we use in making Chonions, now bottled for hair health and
            strength. Order today and pay cash on delivery.
          </p>
          <SimpleAddButton label={`Add to cart · ${formatPKR(product.price)}`} className="btn-primary mt-8" />
        </div>
        <MustardField className="mt-12 h-[46vh] min-h-[320px] max-h-[560px] md:mt-12 md:h-[52vh]">
          <BottleSlot rotate={0} glow="none" anim="swing" className="absolute left-1/2 bottom-4 -translate-x-1/2 h-[88%] w-40" />
        </MustardField>
      </section>
    </>
  );
}

function Ingredient({
  label,
  name,
  text,
  side = "left",
}: {
  label: string;
  name: string;
  text: string;
  side?: "left" | "right";
}) {
  return (
    <div className={`border-t border-plum/30 pt-6 ${side === "left" ? "md:text-right" : ""}`}>
      <p className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-deep">{label}</p>
      <h3 className="mt-3 font-display text-3xl md:text-4xl font-bold leading-[1.05] tracking-tight text-plum">{name}</h3>
      <p className={`mt-4 text-ink/70 leading-relaxed max-w-sm ${side === "left" ? "md:ml-auto" : ""}`}>{text}</p>
    </div>
  );
}

function Seal({ className = "" }: { className?: string }) {
  return (
    <div className={`z-10 rounded-full bg-gold text-plum-deep shadow-xl ${className}`} aria-hidden>
      <svg viewBox="0 0 120 120" className="h-full w-full motion-safe:animate-[spin_24s_linear_infinite]">
        <defs>
          <path id="seal-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <text fontSize="10" fontWeight="700" fill="currentColor" style={{ fontFamily: "var(--font-display)" }}>
          <textPath href="#seal-circle" textLength="268" lengthAdjust="spacing">HOMEMADE • FULLY NATURAL • SAME OIL •</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-center font-display text-[8px] md:text-[11px] font-bold uppercase leading-tight">
        One oil
        <br />
        two products
      </span>
    </div>
  );
}
