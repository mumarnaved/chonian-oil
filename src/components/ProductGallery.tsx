"use client";

import Image from "next/image";
import { useState } from "react";
import { BottleShot } from "./BottleShot";

const slides = [
  { src: "/images/bottle-cutout.webp", alt: "Organic Onions & Mustard Hair Oil bottle", pos: "50% 50%", bg: "bg-sand", studio: true },
  { src: "/images/bottle.jpg", alt: "Organic Onions & Mustard Hair Oil on a wooden table", pos: "72% 62%", bg: "bg-sand" },
  { src: "/videos/oil-poster.jpg", alt: "Mustard oil poured beside red onion and mustard seed", pos: "40% 50%", bg: "bg-plum-deep" },
  { src: "/images/chonions-pouch.jpg", alt: "Chonions onion crisps — made with the same oil", pos: "50% 50%", bg: "bg-sand" },
];

export function ProductGallery() {
  const [i, setI] = useState(0);
  const s = slides[i];
  return (
    <div className="lg:sticky lg:top-28">
      <div className={`relative aspect-[4/3] overflow-hidden rounded-[16px] lg:aspect-square ${s.bg}`}>
        {s.studio ? (
          <BottleShot key={s.src} alt={s.alt} sizes="(min-width:1024px) 48vw, 94vw" priority />
        ) : (
        <Image
          key={s.src}
          src={s.src}
          alt={s.alt}
          fill
          priority
          sizes="(min-width:1024px) 48vw, 94vw"
          className="object-cover animate-[fadein_.4s_ease]"
          style={{ objectPosition: s.pos }}
        />
        )}
        <span className="absolute left-4 top-4 rounded-[5px] bg-plum-deep px-2.5 py-1 font-display text-[10.5px] font-semibold uppercase tracking-[0.12em] text-cream">
          Homemade
        </span>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-3">
        {slides.map((t, n) => (
          <button
            key={t.src}
            type="button"
            onClick={() => setI(n)}
            aria-label={`Show image ${n + 1}`}
            aria-current={n === i}
            className={`relative aspect-square overflow-hidden rounded-[10px] ${t.bg} ring-2 transition ${n === i ? "ring-plum" : "ring-transparent opacity-70 hover:opacity-100"}`}
          >
            <Image src={t.src} alt="" fill sizes="120px" className={t.studio ? "object-contain p-1.5" : "object-cover"} style={{ objectPosition: t.pos }} />
          </button>
        ))}
      </div>
    </div>
  );
}
