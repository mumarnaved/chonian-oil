"use client";

import { useEffect, useRef } from "react";
import { LoopVideo } from "./LoopVideo";

/**
 * Section whose background stays still while the content boxes scroll over it.
 * Give it a still `image`, or a looping `video` (files in /public/videos/<video>.mp4|webm + <video>-poster.jpg).
 * (A fixed layer clipped to the section — works on iOS, unlike background-attachment: fixed.)
 */
export function FixedBackdrop({
  image,
  video,
  children,
  className = "",
}: {
  image?: string;
  video?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const still = image ?? (video ? `/videos/${video}-poster.jpg` : undefined);
  return (
    <section className={`relative [clip-path:inset(0)] ${className}`}>
      <div className="fixed inset-0 -z-10 overflow-hidden bg-plum-deep motion-reduce:absolute" aria-hidden>
        {still && <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${still})` }} />}
        {video && <LoopVideo name={video} className="absolute inset-0 h-full w-full object-cover" />}
        {video && <div className="absolute inset-0 bg-plum-deep/25" />}
      </div>
      {children}
    </section>
  );
}

/* ───────── Mustard plants that grow up from the bottom as you scroll ───────── */

// Three hand-built mustard plant illustrations live in /public/images/plants (mustard-1..3.svg).
// To use different artwork, replace those files — keep the plant standing on the bottom edge.
const plants = [
  { x: 3, h: 74, d: 0.25, flip: false, v: 2 },
  { x: 15, h: 100, d: 0.05, flip: true, v: 1 },
  { x: 28, h: 82, d: 0.3, flip: false, v: 3 },
  { x: 40, h: 94, d: 0.12, flip: true, v: 2 },
  { x: 60, h: 96, d: 0.1, flip: false, v: 3 },
  { x: 72, h: 80, d: 0.28, flip: true, v: 1 },
  { x: 85, h: 100, d: 0, flip: false, v: 2 },
  { x: 97, h: 76, d: 0.2, flip: true, v: 1 },
];

export function MustardField({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      // 0 when the field's top edge enters the screen, 1 once the whole field is in view
      const p = Math.max(0, Math.min(1, (window.innerHeight - r.top) / (r.height * 1.05)));
      el.style.setProperty("--p", p.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {plants.map((pl, i) => (
        <div
          key={i}
          className={`absolute bottom-0 aspect-[560/800] ${i % 2 ? "hidden sm:block" : ""}`}
          style={{
            left: `${pl.x}%`,
            height: `${pl.h}%`,
            // each plant starts a little later (d) so they come up one after another
            transform: `translateX(-50%) translateY(calc(clamp(0, 1 - (var(--p, 1) - ${pl.d}) / ${1 - pl.d}, 1) * 105%))`,
          }}
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/images/plants/mustard-${pl.v}.svg`}
            alt=""
            width={560}
            height={800}
            loading="lazy"
            decoding="async"
            className="h-full w-full origin-bottom motion-safe:animate-[sway_6s_ease-in-out_infinite]"
            style={{ scale: pl.flip ? "-1 1" : undefined, animationDelay: `${i * -0.7}s` }}
          />
        </div>
      ))}
      {children}
    </div>
  );
}
