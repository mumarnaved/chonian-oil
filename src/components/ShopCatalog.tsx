"use client";

import Image from "next/image";
import { useState } from "react";
import { ShopProductCard } from "@/components/ShopProductCard";
import { chonionsSiteUrl } from "@/lib/store";

type Filter = "all" | "oil";

export function ShopCatalog() {
  const [filter, setFilter] = useState<Filter>("all");
  const showCrisps = filter === "all";

  const pill = (active: boolean) =>
    `cursor-pointer rounded-full px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.14em] transition ${active ? "bg-plum-deep text-cream" : "border border-plum/20 text-plum hover:bg-plum hover:text-cream"}`;

  return (
    <>
      {/* Toolbar */}
      <div className="border-b border-plum/10 bg-cream">
        <div className="mx-auto flex max-w-6xl items-center gap-3 overflow-x-auto px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.14em] whitespace-nowrap">
          <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")} className={pill(filter === "all")}>All products</button>
          <button type="button" aria-pressed={filter === "oil"} onClick={() => setFilter("oil")} className={pill(filter === "oil")}>Hair oil</button>
          <a href={chonionsSiteUrl} className="rounded-full border border-plum/20 px-4 py-2 text-plum transition hover:bg-plum hover:text-cream">Chonions crisps ↗</a>
          <span className="ml-auto hidden text-plum/55 sm:inline">Showing 1 product</span>
        </div>
      </div>

      {/* Grid — the oil is the primary product, Chonions crisps the small companion */}
      <section className="bg-cream">
        <div className={`mx-auto grid max-w-6xl items-start gap-6 px-5 py-6 md:gap-8 md:py-8 ${showCrisps ? "md:grid-cols-[1fr_396px]" : "md:grid-cols-1"}`}>
          <ShopProductCard />

          {showCrisps ? (
          <div className="relative mx-auto flex w-full max-w-[396px] flex-col gap-4 md:h-[clamp(430px,calc(100svh-335px),580px)] md:w-[396px] md:before:absolute md:before:-bottom-3 md:before:-left-4 md:before:-top-3 md:before:w-[1.5px] md:before:bg-plum/70 md:before:content-['']">
            <a href={chonionsSiteUrl} className="group flex aspect-[396/330] w-full flex-col overflow-hidden rounded-[16px] border-[1.5px] border-plum bg-plum-deep md:aspect-auto md:h-[60%] md:shrink-0">
              <span className="relative block flex-1 overflow-hidden bg-sand">
                <span className="absolute left-3 top-3 z-10 rounded-[5px] bg-gold px-2.5 py-1 font-display text-[10.5px] font-semibold uppercase tracking-[0.12em] text-plum-deep">Sister brand</span>
                <Image src="/images/chonions-pouch.jpg" alt="Chonions onion crisps pouch" fill sizes="396px" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
              </span>
              <span className="flex items-center justify-between gap-3 px-4 py-3 text-cream">
                <span>
                  <span className="block font-display text-[15px] font-bold leading-tight">Chonions onion crisps</span>
                  <span className="block text-[12px] text-cream/70">Made with the same oil</span>
                </span>
                <span className="inline-flex h-9 shrink-0 items-center rounded-full bg-gold px-4 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-plum-deep transition group-hover:bg-cream">Visit ↗</span>
              </span>
            </a>

            <div className="flex flex-1 flex-col justify-center rounded-[16px] border-[1.5px] border-plum bg-sand/60 px-5 py-4">
              <p className="font-display text-[10.5px] font-semibold uppercase tracking-[0.16em] text-gold-deep">One oil, two ways</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink/80">
                The mustard oil in every Chonions crisp is the same one bottled here for your hair, from mustard seed till mustard oil. Homemade and fully natural.
              </p>
            </div>
          </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
