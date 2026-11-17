"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { QtyStepper } from "@/components/QtyStepper";
import { TrashButton } from "@/components/TrashButton";
import { PageBanner } from "@/components/PageBanner";
import { formatPKR, product } from "@/lib/store";

export default function CartPage() {
  const cart = useCart();

  return (
    <>
    <PageBanner compact eyebrow="Cart" title={<>Your <span className="text-gold">cart</span></>} />
    <section className="mx-auto max-w-5xl px-5 py-6 md:py-14">

      {!cart.ready ? null : cart.quantity === 0 ? (
        <div className="rounded-[10px] bg-sand px-6 py-10 text-center md:p-12">
          <p className="text-ink/70">Your cart is empty.</p>
          <Link href="/shop" className="btn-primary mt-6">Shop the hair oil</Link>
        </div>
      ) : (
        <div className="grid items-start gap-5 md:grid-cols-[1fr_340px] md:gap-8">
          <div className="flex gap-4 rounded-[10px] bg-sand p-4 md:gap-5 md:p-6">
            <div className="relative h-32 w-20 shrink-0 md:h-36 md:w-24 overflow-hidden rounded-xl bg-cream">
              <Image src={product.cutout} alt="" fill sizes="96px" className="object-contain p-1.5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-lg leading-snug">{product.name}</p>
              <p className="text-sm text-ink/60">{product.size} · {formatPKR(product.price)} each</p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <QtyStepper value={cart.quantity} onChange={cart.setQuantity} />
                <div className="flex items-center gap-2 text-sm text-ink/60">
                  <TrashButton onClick={cart.clear} label="Remove from cart" />
                  <span>Remove</span>
                </div>
              </div>
            </div>
          </div>

          <Summary />
        </div>
      )}
    </section>
    </>
  );
}

function Summary() {
  const cart = useCart();
  return (
    <div className="space-y-3 rounded-[10px] bg-plum-deep p-5 text-sm md:p-6 text-cream md:sticky md:top-24">
      <div className="flex justify-between text-cream/75"><span>Subtotal</span><span>{formatPKR(cart.subtotal)}</span></div>
      <div className="flex justify-between text-cream/75"><span>Shipping</span><span>{cart.shippingFee ? formatPKR(cart.shippingFee) : "Free"}</span></div>
      <div className="flex justify-between text-base font-semibold pt-3 border-t border-cream/15"><span>Total</span><span>{formatPKR(cart.total)}</span></div>
      <Link href="/checkout" className="btn-primary w-full !mt-5">Proceed to checkout</Link>
      <p className="text-xs text-cream/60 text-center">Cash on Delivery across Pakistan</p>
    </div>
  );
}
