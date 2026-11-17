"use client";

export function QtyStepper({
  value,
  onChange,
  min = 1,
  size = "md",
  glass = false,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  size?: "sm" | "md";
  glass?: boolean;
}) {
  const btn =
    size === "sm"
      ? "h-8 w-8 text-base"
      : "h-12 w-12 text-lg";
  return (
    <div className={`inline-flex items-center rounded-full border ${glass ? "border-white/50 bg-white/10 text-cream backdrop-blur-sm" : "border-plum/20 bg-white"}`}>
      <button
        type="button"
        aria-label="Decrease quantity"
        className={`${btn} rounded-full ${glass ? "text-cream hover:bg-white/15" : "text-plum hover:bg-plum/5"} disabled:opacity-30`}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
      >
        −
      </button>
      <span className={`min-w-8 text-center font-semibold tabular-nums ${glass ? "text-cream" : "text-ink"} ${size === "sm" ? "text-sm" : ""}`}>
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        className={`${btn} rounded-full ${glass ? "text-cream hover:bg-white/15" : "text-plum hover:bg-plum/5"}`}
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  );
}
