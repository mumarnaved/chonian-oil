"use client";

import Image from "next/image";
import Link from "next/link";
import { BottleShot } from "./BottleShot";
import { useCart } from "./CartProvider";
import { formatPKR, product } from "@/lib/store";

export const PRODUCT_HREF = "/products/onion-mustard-hair-oil";

/** The primary product: a wide feature card that fits the first screen on desktop. */
export function ShopProductCard() {
  const { add } = useCart();
  const saving = product.compareAtPrice ? Math.round((1 - product.price / product.compareAtPrice) * 100) : 0;

  return (
    <article className="grid overflow-hidden rounded-[18px] border-[1.5px] border-plum bg-white shadow-[0_30px_60px_-40px_rgba(58,21,52,0.55)] md:h-[clamp(430px,calc(100svh-335px),580px)] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <Link href={PRODUCT_HREF} className="group relative block aspect-[4/3] overflow-hidden bg-sand md:aspect-auto" aria-label={`View ${product.name}`}>
        <div className="absolute left-4 top-4 z-10 flex gap-2">
          <span className="rounded-[5px] bg-plum-deep px-2.5 py-1 font-display text-[10.5px] font-semibold uppercase tracking-[0.12em] text-cream">Homemade</span>
          {saving > 0 && (
            <span className="rounded-[5px] bg-gold px-2.5 py-1 font-display text-[10.5px] font-semibold uppercase tracking-[0.12em] text-plum-deep">Save {saving}%</span>
          )}
        </div>
        <BottleShot
          alt={`${product.name} bottle`}
          sizes="(min-width:768px) 32vw, 92vw"
          priority
          hoverPhoto={product.image}
        />
      </Link>

      <div className="flex flex-col justify-center p-6 md:p-8">
        <p className="font-display text-[10.5px] font-semibold uppercase tracking-[0.18em] text-gold-deep">Sister company by Chonions</p>
        <h2 className="mt-2 font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-bold leading-[1.08] tracking-tight text-plum-deep">
          <Link href={PRODUCT_HREF} className="hover:text-plum">{product.name}</Link>
        </h2>
        <p className="mt-1.5 text-sm text-ink/55">Premium nourishing hair oil · {product.size}</p>

        <p className="mt-5 flex items-baseline gap-3">
          <span className="font-display text-3xl font-bold text-plum-deep">{formatPKR(product.price)}</span>
          {product.compareAtPrice ? <span className="text-base text-ink/40 line-through">{formatPKR(product.compareAtPrice)}</span> : null}
        </p>

        <p className="mt-4 text-[14.5px] leading-relaxed text-ink/70">
          The very same mustard oil we use in Chonions crisps, infused with organic onion — homemade and fully natural, for scalp and hair care.
        </p>

        <ul className="mt-5 hidden space-y-2 text-sm text-ink/75 [@media(min-height:820px)]:block">
          {["Homemade in small batches", "Fully natural — nothing artificial", "Cash on Delivery across Pakistan"].map((t) => (
            <li key={t} className="flex items-center gap-2.5">
              <svg className="h-4 w-4 shrink-0 text-gold-deep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m5 12 5 5 9-10" /></svg>
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-6 grid grid-cols-[1fr_auto] gap-3">
          <button
            className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gold px-5 font-display text-[12.5px] font-bold uppercase tracking-[0.1em] text-plum-deep transition hover:bg-[#f0bb4d] active:scale-[0.99]"
            onClick={() => add(1)}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /></svg>
            Add to cart
          </button>
          <Link href={PRODUCT_HREF} className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full border-2 border-plum px-5 font-display text-[12.5px] font-bold uppercase tracking-[0.1em] text-plum transition hover:bg-plum hover:text-cream">
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
