"use client";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-cream/80 transition hover:border-gold hover:text-gold"
    >
      Back to top
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="transition group-hover:-translate-y-0.5">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
