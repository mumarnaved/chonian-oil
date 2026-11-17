"use client";

import { useEffect, useRef } from "react";
import "./announcement-bar.css";
import { mountAnnouncementBar } from "@/lib/announcement-bar";
import { formatPKR, shipping } from "@/lib/store";

// The lines shown in the top bar, one after another. Edit, add or remove freely.
const messages = [
  `Sister company by <b style="color:var(--vs-announcement-bar-accent)">Chonions</b>`,
  "Cash on Delivery across Pakistan",
  `Free shipping over ${formatPKR(shipping.freeAbove)}`,
];

const INTERVAL_MS = 3500; // how long each line stays

const html = `
<div class="vs-announcement-bar-inner">
  <div class="vs-announcement-bar-viewport">
    <ul>${messages.map((m) => `<li><span>${m}</span></li>`).join("")}</ul>
  </div>
  <button class="vs-announcement-bar-close" type="button" aria-label="Dismiss announcements"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
</div>`;

export function AnnouncementBar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mountAnnouncementBar(ref.current);
  }, []);

  return (
    <div
      ref={ref}
      className="vs-announcement-bar"
      data-mode="rotate"
      data-interval={INTERVAL_MS}
      role="region"
      aria-label="Announcements"
      style={
        {
          "--vs-announcement-bar-bg": "var(--color-plum-deep)",
          "--vs-announcement-bar-ink": "var(--color-cream)",
          "--vs-announcement-bar-accent": "var(--color-gold)",
          "--vs-announcement-bar-progress": "#EFDDBC",
          "--vs-announcement-bar-size": "12px",
        } as React.CSSProperties
      }
      // The bar's script adds its own arrows and progress line, so React leaves the inside alone.
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
