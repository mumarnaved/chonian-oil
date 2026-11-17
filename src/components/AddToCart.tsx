"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartProvider";
import { QtyStepper } from "./QtyStepper";
import { formatPKR, product } from "@/lib/store";

export function AddToCart({ glass = false }: { glass?: boolean }) {
  const [qty, setQty] = useState(1);
  const { add, closeDrawer } = useCart();
  const router = useRouter();

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <QtyStepper glass={glass} value={qty} onChange={(v) => setQty(Math.max(1, Math.min(v, 20)))} />
        <button className="btn-primary flex-1 min-w-36 sm:min-w-40 whitespace-nowrap" onClick={() => add(qty)}>
          Add to cart<span className="hidden sm:inline"> · {formatPKR(product.price * qty)}</span>
        </button>
      </div>
      <button
        className="btn-secondary w-full"
        onClick={() => {
          add(qty);
          closeDrawer();
          router.push("/checkout");
        }}
      >
        Buy now — Cash on Delivery
      </button>
    </div>
  );
}

export function SimpleAddButton({ label = "Add to cart", className = "btn-primary" }: { label?: string; className?: string }) {
  const { add } = useCart();
  return (
    <button className={className} onClick={() => add(1)}>
      {label}
    </button>
  );
}
