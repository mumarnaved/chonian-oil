"use client";

/** Small round delete (bin) button used to remove an item from the cart. */
export function TrashButton({
  onClick,
  label = "Remove from cart",
  className = "",
  tone = "light",
}: {
  onClick: () => void;
  label?: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`group/trash inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border transition active:scale-95 ${
        tone === "dark"
          ? "border-cream/25 text-cream/75 hover:border-red-300 hover:bg-red-400/15 hover:text-red-200"
          : "border-plum/20 text-plum/70 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
      } ${className}`}
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3.5 6h17" />
        <path d="M9 6V4.2c0-.66.54-1.2 1.2-1.2h3.6c.66 0 1.2.54 1.2 1.2V6" />
        <path d="M18.2 6 17.4 19.2a1.8 1.8 0 0 1-1.8 1.7H8.4a1.8 1.8 0 0 1-1.8-1.7L5.8 6" />
        <path d="M10 10.5v6M14 10.5v6" />
      </svg>
    </button>
  );
}
