"use client";

import { useId, useState, type ReactNode } from "react";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/** Inline !important so the transition runs even if the OS asks for reduced motion or the stylesheet is stale. */
const force = (value: string) => (el: HTMLElement | null) => {
  if (el) el.style.setProperty("transition", value, "important");
};

type Variant = "home" | "shop" | "product";

const styles: Record<Variant, { wrap: string; btn: string; panel: string; icon: "svg" | string }> = {
  home: {
    wrap: "",
    btn: "gap-8 py-6 text-lg leading-snug hover:text-plum-deep",
    panel: "pb-6 pr-12 leading-relaxed text-ink/70",
    icon: "svg",
  },
  shop: {
    wrap: "border-b border-plum/15 py-5",
    btn: "gap-6 text-lg",
    panel: "max-w-xl pt-3 text-sm leading-relaxed text-ink/70",
    icon: "h-7 w-7 text-base",
  },
  product: {
    wrap: "border-b border-plum/15 py-4",
    btn: "gap-4 text-base",
    panel: "pt-3 text-sm leading-relaxed text-ink/70",
    icon: "h-6 w-6 text-sm",
  },
};

/** Animated FAQ row: the answer slides open and fades in, the plus turns into a cross. */
export function AccordionItem({
  question,
  children,
  variant = "shop",
  defaultOpen = false,
}: {
  question: string;
  children: ReactNode;
  variant?: Variant;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const s = styles[variant];

  return (
    <div className={s.wrap}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full cursor-pointer items-center justify-between text-left font-display font-semibold text-plum transition-colors ${s.btn}`}
      >
        <span>{question}</span>
        {s.icon === "svg" ? (
          <svg
            ref={force(`transform 0.4s ${EASE}`) as never}
            viewBox="0 0 20 20"
            className={`acc-icon h-5 w-5 shrink-0 text-gold-deep ${open ? "rotate-45" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M10 3v14M3 10h14" />
          </svg>
        ) : (
          <span
            ref={force(`transform 0.4s ${EASE}, background-color 0.3s ease, color 0.3s ease`)}
            className={`acc-icon grid shrink-0 place-items-center rounded-full border ${open ? "rotate-45 border-plum bg-plum text-cream" : "border-plum/25 text-plum"} ${s.icon}`}
            aria-hidden
          >
            +
          </span>
        )}
      </button>
      <div
        id={id}
        role="region"
        ref={force(`grid-template-rows 0.45s ${EASE}, opacity 0.35s ease`)}
        className={`acc-panel ${open ? "is-open" : ""}`}
        style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
      >
        <div style={{ minHeight: 0, overflow: "hidden" }}>
          <p className={s.panel}>{children}</p>
        </div>
      </div>
    </div>
  );
}
