"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { QtyStepper } from "./QtyStepper";
import { formatPKR, product, shipping } from "@/lib/store";

export function ProductBuyBox() {
  const [qty, setQty] = useState(1);
  const { add, closeDrawer } = useCart();
  const router = useRouter();
  const total = product.price * qty;
  const left = Math.max(0, shipping.freeAbove - total);

  return (
    <>
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <QtyStepper value={qty} onChange={(v) => setQty(Math.max(1, v))} />
        <button
          className="inline-flex h-12 min-w-[12rem] flex-1 items-center justify-center gap-2 rounded-full bg-gold px-8 font-display text-[13px] font-bold uppercase tracking-[0.14em] text-plum-deep transition hover:bg-[#f0bb4d] active:scale-[0.99]"
          onClick={() => add(qty)}
        >
          Add to cart · {formatPKR(total)}
        </button>
      </div>
      <button
        className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-full border-2 border-plum font-display text-[13px] font-bold uppercase tracking-[0.14em] text-plum transition hover:bg-plum hover:text-cream"
        onClick={() => { add(qty); closeDrawer(); router.push("/checkout"); }}
      >
        Buy now — Cash on Delivery
      </button>
      <p className="mt-3 text-center text-[13px] text-ink/60">
        {left > 0 ? `Add ${formatPKR(left)} more for free shipping.` : "You get free shipping on this order."}
      </p>

      {/* Mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-plum/15 bg-cream/95 px-5 py-3 backdrop-blur lg:hidden">
        <div>
          <p className="font-display text-lg font-bold leading-none text-plum-deep">{formatPKR(total)}</p>
          <p className="mt-1 text-xs text-ink/55">{qty} × {product.size}</p>
        </div>
        <button className="inline-flex h-11 items-center justify-center rounded-full bg-gold px-7 font-display text-xs font-bold uppercase tracking-[0.14em] text-plum-deep" onClick={() => add(qty)}>
          Add to cart
        </button>
      </div>
    </>
  );
}
