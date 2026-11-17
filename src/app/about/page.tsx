import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LoopVideo } from "@/components/LoopVideo";
import { PageBanner } from "@/components/PageBanner";
import { chonionsSiteUrl } from "@/lib/store";

export const metadata: Metadata = {
  title: "About | Onion & Mustard Hair Oil — by Chonions",
  description:
    "Homemade, fully natural onion & mustard hair oil — the same oil used in Chonions onion crisps. From mustard seed till mustard oil.",
};

const journey = [
  { step: "01", title: "Mustard seed", text: "It starts with whole mustard seed — the same seed we pick for our own kitchen." },
  { step: "02", title: "Pressed into oil", text: "The seed is pressed into pure mustard oil. No blends, no shortcuts." },
  { step: "03", title: "Onion essence", text: "Organic onion is infused into the warm oil — the organic match for mustard." },
  { step: "04", title: "Bottled at home", text: "Made in small batches and bottled by hand. From mustard seed till mustard oil." },
];


export default function AboutPage() {
  return (
    <>
      <PageBanner eyebrow="About" title={<>Homemade, from mustard seed <span className="text-gold">till mustard oil.</span></>}>
        Onion &amp; Mustard is the sister company of Chonions — one oil, made at home, now bottled for your hair.
      </PageBanner>

      {/* Story */}
      <section className="mx-auto grid max-w-6xl items-center gap-6 px-5 py-10 md:grid-cols-2 md:gap-16 md:py-24">
        <div>
          <p className="eyebrow">Our story</p>
          <h2 className="section-title mt-3 md:mt-4">One oil, two ways to enjoy it.</h2>
          <p className="mt-4 text-base leading-relaxed text-ink/75 md:mt-5 md:text-lg">
            It began in the kitchen. The oil we use to make Chonions onion crisps is the oil we have always made at
            home — pure mustard oil, infused with organic onion.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-ink/75 md:mt-4 md:text-base">
            Onion and mustard have nourished hair in Pakistani homes for generations. So we bottled that very same oil
            for your hair and scalp, and gave it a name of its own: Onion &amp; Mustard, the sister company of Chonions.
          </p>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[16px] md:aspect-[4/3] border-[1.5px] border-plum bg-sand">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/videos/oil-food-poster.jpg)" }} aria-hidden />
          <LoopVideo name="oil-food" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </section>

      {/* Same oil */}
      <section className="bg-plum-deep text-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-5 px-5 py-10 md:grid-cols-[320px_1fr] md:gap-16 md:py-20">
          <div className="mx-auto w-36 md:w-full">
            <Image src="/images/chonions-logo-full.png" alt="Chonions" width={634} height={698} className="h-auto w-full" />
          </div>
          <div>
            <p className="eyebrow !text-gold">Sister company by Chonions</p>
            <h2 className="mt-3 font-display text-[26px] font-bold leading-tight tracking-tight sm:text-4xl md:mt-4 md:text-3xl">
              If we trust it in our food, you can trust it on your hair.
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-cream/80 md:mt-5 md:text-base">
              Chonions crisps are made with our homemade onion and mustard oil. This bottle holds exactly that same
              oil — nothing swapped, nothing diluted.
            </p>
            <a href={chonionsSiteUrl} className="mt-5 inline-flex items-center gap-2 font-semibold md:mt-7 text-gold underline underline-offset-4 hover:text-cream">
              Discover Chonions onion crisps ↗
            </a>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-6xl px-5 py-10 md:py-24">
        <p className="eyebrow">How it&apos;s made</p>
        <h2 className="section-title mt-4 max-w-2xl">Homemade, start to finish.</h2>
        <ol className="mt-6 grid md:mt-10 gap-x-10 border-b border-plum/20 md:grid-cols-2">
          {journey.map((j) => (
            <li key={j.step} className="grid grid-cols-[4.25rem_1fr] items-start gap-x-3 border-t border-plum/20 py-4 sm:grid-cols-[5rem_1fr] md:py-6">
              <span className="font-display text-4xl font-medium leading-none tabular-nums text-gold-deep sm:text-5xl">{j.step}</span>
              <div>
                <h3 className="font-display text-xl font-semibold leading-none text-plum sm:pt-1.5">{j.title}</h3>
                <p className="mt-2.5 max-w-md text-sm leading-relaxed text-ink/70">{j.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="bg-gold">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-2xl font-bold text-plum-deep sm:text-3xl">Try the oil behind Chonions.</p>
            <p className="mt-2 text-plum-deep/80">Cash on Delivery across Pakistan.</p>
          </div>
          <Link href="/shop" className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-plum-deep px-8 font-display font-semibold text-cream transition hover:bg-plum">
            Shop the hair oil
          </Link>
        </div>
      </section>
    </>
  );
}
