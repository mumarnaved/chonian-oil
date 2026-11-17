"use client";

/**
 * Scroll-driven bottle.
 *
 * Each section on the page contains an invisible <BottleSlot />. One bottle sits in the slot that
 * is on screen and scrolls with its section. When the next section's slot comes into view, the old
 * bottle fades out and a new one drops in from the top of the screen with a flip and a small bounce,
 * then settles into the new slot. Change a section's layout and the bottle follows automatically.
 *
 * Users with "reduce motion" turned on get a static bottle inside every slot instead.
 */

import { useEffect, useRef } from "react";

const SRC = "/images/bottle-cutout.webp";
const RATIO = 320 / 1190; // cut-out width / height
const BASE_H = 600; // rendered height before scaling

/** How the bottle arrives in a slot. Give neighbouring sections different ones so the page doesn't feel repetitive. */
export type BottleAnim = "drop" | "left" | "right" | "rise" | "pop" | "swing";

export function BottleSlot({
  rotate = 0,
  className = "",
  glow = "gold",
  anim = "drop",
}: {
  rotate?: number;
  className?: string;
  glow?: "gold" | "plum" | "none";
  anim?: BottleAnim;
}) {
  const glowClass =
    glow === "gold"
      ? "bg-[radial-gradient(circle,rgba(217,176,92,0.45)_0%,rgba(217,176,92,0.12)_45%,transparent_70%)]"
      : glow === "plum"
        ? "bg-[radial-gradient(circle,rgba(90,35,80,0.22)_0%,rgba(90,35,80,0.06)_45%,transparent_70%)]"
        : "";
  return (
    <div
      data-bottle-slot
      data-rotate={rotate}
      data-anim={anim}
      className={`${/(^|\s)(absolute|fixed)(\s|$)/.test(className) ? "" : "relative "}${className}`}
      aria-hidden
    >
      {glow !== "none" && (
        <div className={`absolute left-1/2 top-1/2 h-[80%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full ${glowClass}`} />
      )}
      {/* Static fallback for reduced-motion users */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={SRC}
        alt=""
        className="hidden motion-reduce:block absolute left-1/2 top-1/2 h-full w-auto max-w-none -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl"
        style={{ rotate: `${rotate}deg` }}
      />
    </div>
  );
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (t: number) => Math.max(0, Math.min(1, t));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t: number) => {
  const c1 = 1.1;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

const OUT_MS = 170; // old bottle leaving
const IN_MS = 1000; // new bottle dropping in + flipping

export function ScrollBottle() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let slots = Array.from(document.querySelectorAll<HTMLElement>("[data-bottle-slot]"));
    const refreshSlots = () => {
      slots = Array.from(document.querySelectorAll<HTMLElement>("[data-bottle-slot]"));
    };
    window.addEventListener("resize", refreshSlots);

    let active = -1;
    let pending = -1;
    let phase: "in" | "out" | "idle" = "idle";
    let t0 = 0;
    let raf = 0;

    const tick = (now: number) => {
      if (slots.length) {
        const vh = window.innerHeight;
        const info = slots.map((s) => {
          const r = s.getBoundingClientRect();
          const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
          return {
            x: r.left + r.width / 2,
            y: r.top + r.height / 2,
            h: r.height,
            rot: Number(s.dataset.rotate ?? 0),
            anim: (s.dataset.anim ?? "drop") as BottleAnim,
            v: r.height > 0 ? visible / r.height : 0,
          };
        });

        let best = 0;
        info.forEach((q, i) => {
          if (q.v > info[best].v) best = i;
        });

        if (active === -1 || active >= info.length) {
          // Wait until a slot is actually on screen, so the drop-in is seen the first time it appears.
          if (info[best].v < 0.05) {
            el.style.opacity = "0";
            raf = requestAnimationFrame(tick);
            return;
          }
          active = best;
          phase = "in";
          t0 = now;
        } else if (phase !== "out" && best !== active && info[best].v > info[active].v + 0.12) {
          phase = "out";
          pending = best;
          t0 = now;
        }

        if (phase === "out" && now - t0 >= OUT_MS) {
          active = pending;
          phase = "in";
          t0 = now;
        }

        const pose = info[active];
        const vw = window.innerWidth;
        let x = pose.x;
        let y = pose.y;
        let rotY = 0;
        let rot = pose.rot;
        let opacity = 1;
        let scale = pose.h / BASE_H;

        if (phase === "out") {
          // Leave in the opposite direction to how the next bottle will arrive.
          const next = info[pending] ?? pose;
          const q = clamp01((now - t0) / OUT_MS);
          opacity = 1 - q;
          scale *= 1 - 0.1 * q;
          if (next.anim === "left") x += 90 * q;
          else if (next.anim === "right") x -= 90 * q;
          else if (next.anim === "rise") y += 70 * q;
          else y -= 60 * q;
        } else if (phase === "in") {
          const p = clamp01((now - t0) / IN_MS);
          const e = easeOutCubic(p);
          const b = easeOutBack(p);
          opacity = clamp01(p * 5);
          switch (pose.anim) {
            case "left": // rolls in from the left edge
              x = lerp(-BASE_H * RATIO, pose.x, b);
              rot = pose.rot - 300 * (1 - e);
              break;
            case "right": // rolls in from the right edge
              x = lerp(vw + BASE_H * RATIO, pose.x, b);
              rot = pose.rot + 300 * (1 - e);
              break;
            case "rise": // lifts up from below, tilting upright
              y = lerp(window.innerHeight + pose.h * 0.6, pose.y, b);
              rot = pose.rot + 28 * (1 - e);
              scale *= lerp(0.7, 1, e);
              break;
            case "pop": // zooms out of nothing while spinning
              scale *= lerp(0.15, 1, b);
              rotY = 720 * e;
              rot = pose.rot * e;
              opacity = clamp01(p * 3);
              break;
            case "swing": // hangs from the top and swings to rest
              y = lerp(-pose.h * 0.6, pose.y, e);
              rot = pose.rot + 50 * (1 - p) * Math.cos(p * Math.PI * 3);
              scale *= lerp(0.9, 1, e);
              break;
            default: // drop: falls from the top with a flip and a small bounce
              y = lerp(-pose.h * 0.6, pose.y, b);
              rotY = 360 * e;
              rot = pose.rot * e;
              scale *= lerp(0.85, 1, e);
          }
          if (p >= 1) phase = "idle";
        }

        el.style.opacity = opacity.toFixed(3);
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) perspective(1100px) rotateY(${rotY}deg) rotate(${rot}deg) scale(${scale})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", refreshSlots);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden motion-reduce:hidden" aria-hidden>
      <div
        ref={ref}
        className="absolute left-0 top-0 opacity-0 will-change-transform"
        style={{ height: BASE_H, width: BASE_H * RATIO }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SRC}
          alt=""
          width={320}
          height={1190}
          fetchPriority="high"
          className="h-full w-full drop-shadow-[0_30px_40px_rgba(40,10,35,0.45)]"
        />
      </div>
    </div>
  );
}
