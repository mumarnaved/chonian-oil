"use client";

import { useEffect, useRef } from "react";

/**
 * Silent, looping background video with a still poster.
 * - Autoplay works because the video is muted + inline; we also nudge play() in case the browser needs it.
 * - Reduced-motion users see only the poster image.
 * Files live in /public/videos/<name>.mp4|webm and <name>-poster.jpg
 */
export function LoopVideo({ name, className = "" }: { name: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      className={`motion-reduce:hidden ${className}`}
      poster={`/videos/${name}-poster.jpg`}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
    >
      <source src={`/videos/${name}.webm`} type="video/webm" />
      <source src={`/videos/${name}.mp4`} type="video/mp4" />
    </video>
  );
}
