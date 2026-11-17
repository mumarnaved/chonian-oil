"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";
import { QtyStepper } from "./QtyStepper";
import { TrashButton } from "./TrashButton";
import { EASE, forceTransition } from "@/lib/motion";
import { formatPKR, product, shipping } from "@/lib/store";

export function CartDrawer() {
  const cart = useCart();
  const { drawerOpen, closeDrawer } = cart;
  const [removing, setRemoving] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeDrawer]);

  // Lock page scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const remaining = shipping.freeAbove - cart.subtotal;
  const progress = Math.min(100, Math.round((cart.subtotal / shipping.freeAbove) * 100));

  // Stagger the content in after the panel has started to slide.
  const reveal = (i: number) => ({
    ref: forceTransition(`opacity 0.5s ease ${drawerOpen ? 160 + i * 70 : 0}ms, transform 0.6s ${EASE} ${drawerOpen ? 160 + i * 70 : 0}ms`),
    style: { opacity: drawerOpen ? 1 : 0, transform: drawerOpen ? "none" : "translateY(14px)" },
  });

  function removeItem() {
    setRemoving(true);
    timer.current = setTimeout(() => {
      cart.setQuantity(0);
      setRemoving(false);
    }, 380);
  }

  return (
    <div className={`fixed inset-0 z-50 ${drawerOpen ? "" : "pointer-events-none"}`} aria-hidden={!drawerOpen}>
      <div
        ref={forceTransition("opacity 0.45s ease, backdrop-filter 0.45s ease")}
        className="absolute inset-0 bg-plum-deep/45"
        style={{ opacity: drawerOpen ? 1 : 0, backdropFilter: drawerOpen ? "blur(3px)" : "blur(0px)" }}
        onClick={closeDrawer}
      />
      <aside
        role="dialog"
        aria-label="Your cart"
        ref={forceTransition(`transform 0.6s ${EASE}`)}
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-[-30px_0_60px_-30px_rgba(58,21,52,0.55)]"
        style={{ transform: drawerOpen ? "translateX(0)" : "translateX(105%)" }}
      >
        <div {...reveal(0)} className="flex h-16 items-center justify-between border-b border-plum/10 px-6">
          <h2 className="font-display text-xl text-plum">
            Your cart
            {cart.quantity > 0 && <span className="ml-2 rounded-full bg-gold px-2 py-0.5 align-middle text-xs font-bold text-plum-deep">{cart.quantity}</span>}
          </h2>
          <button onClick={closeDrawer} className="grid h-9 w-9 cursor-pointer place-items-center rounded-full text-2xl leading-none text-ink/60 transition hover:rotate-90 hover:bg-plum/5 hover:text-plum" aria-label="Close cart">
            ×
          </button>
        </div>

        {cart.quantity === 0 ? (
          <div className="grid flex-1 place-items-center px-8 text-center">
            <div {...reveal(1)}>
              <p className="mb-5 text-ink/70">Your cart is empty.</p>
              <button onClick={() => cart.add(1)} className="btn-primary cursor-pointer">
                Add a bottle · {formatPKR(product.price)}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div {...reveal(1)} className="mb-6 rounded-xl bg-sand px-4 py-3 text-sm text-plum-deep">
                {cart.shippingFee > 0 ? <p>Add <b>{formatPKR(remaining)}</b> more for free shipping.</p> : <p>You&apos;ve unlocked free shipping.</p>}
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-plum/10">
                  <div
                    ref={forceTransition(`width 0.8s ${EASE} 0.3s`)}
                    className="h-full rounded-full bg-gold"
                    style={{ width: drawerOpen ? `${progress}%` : "0%" }}
                  />
                </div>
              </div>

              {/* Item — slides away when removed */}
              <div
                {...reveal(2)}
                ref={forceTransition(`opacity 0.35s ease, transform 0.38s ${EASE}`)}
                style={{
                  opacity: removing ? 0 : drawerOpen ? 1 : 0,
                  transform: removing ? "translateX(40px)" : drawerOpen ? "none" : "translateY(14px)",
                }}
                className="flex gap-4"
              >
                <div className="relative h-28 w-20 shrink-0 overflow-hidden rounded-lg bg-white">
                  <Image src={product.cutout} alt="" fill sizes="80px" className="object-contain p-1.5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold leading-snug text-ink">{product.name}</p>
                      <p className="text-sm text-ink/60">{product.size}</p>
                    </div>
                    <TrashButton onClick={removeItem} label="Remove bottle from cart" />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <QtyStepper size="sm" value={cart.quantity} min={1} onChange={cart.setQuantity} />
                    <span className="font-semibold tabular-nums">{formatPKR(cart.subtotal)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div {...reveal(3)} className="space-y-2 border-t border-plum/10 px-6 py-5 text-sm">
              <Row label="Subtotal" value={formatPKR(cart.subtotal)} />
              <Row label="Shipping" value={cart.shippingFee ? formatPKR(cart.shippingFee) : "Free"} />
              <Row label="Total" value={formatPKR(cart.total)} bold />
              <Link href="/checkout" onClick={closeDrawer} className="btn-primary mt-3 w-full">
                Checkout
              </Link>
              <Link href="/cart" onClick={closeDrawer} className="block pt-1 text-center text-plum underline underline-offset-4">
                View cart
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "pt-1 text-base font-semibold text-ink" : "text-ink/70"}`}>
      <span>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}
