"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { QtyStepper } from "@/components/QtyStepper";
import { PageBanner } from "@/components/PageBanner";
import { TrashButton } from "@/components/TrashButton";
import { EASE, forceTransition } from "@/lib/motion";
import { formatPKR, product, shipping } from "@/lib/store";
import { provinces, validateOrder, type OrderErrors, type OrderInput } from "@/lib/order";

export default function CheckoutPage() {
  const cart = useCart();
  const router = useRouter();
  const [errors, setErrors] = useState<OrderErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  if (!cart.ready) return <div className="min-h-[60vh]" />;

  if (cart.quantity === 0) {
    return (
      <>
        <PageBanner compact eyebrow="Checkout" title={<>Check<span className="text-gold">out</span></>} />
        <section className="mx-auto max-w-xl px-5 py-16 text-center">
          <p className="text-ink/70">Your cart is empty.</p>
          <Link href="/shop" className="btn-primary mt-8">Shop the hair oil</Link>
        </section>
      </>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");
    const fd = new FormData(e.currentTarget);
    const data: OrderInput = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? "") || undefined,
      address: String(fd.get("address") ?? ""),
      address2: String(fd.get("address2") ?? "") || undefined,
      city: String(fd.get("city") ?? ""),
      postalCode: String(fd.get("postalCode") ?? "") || undefined,
      province: String(fd.get("province") ?? ""),
      notes: String(fd.get("notes") ?? "") || undefined,
      quantity: cart.quantity,
      paymentMethod: "cod",
    };

    const clientErrors = validateOrder(data);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length) {
      const first = Object.keys(clientErrors)[0];
      document.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        if (json.errors) setErrors(json.errors);
        setServerError(json.error ?? "Please check the highlighted fields.");
        setSubmitting(false);
        return;
      }
      sessionStorage.setItem(
        "chonions-oil-last-order",
        JSON.stringify({ orderId: json.orderId, total: json.total, name: data.name, phone: data.phone }),
      );
      cart.clear();
      router.push("/order-confirmed");
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setSubmitting(false);
    }
  }

  const freeLeft = shipping.freeAbove - cart.subtotal;
  const progress = Math.min(100, Math.round((cart.subtotal / shipping.freeAbove) * 100));

  return (
    <>
      <PageBanner compact eyebrow="Checkout" title={<>Check<span className="text-gold">out</span></>}>
        Cash on Delivery across Pakistan — we&apos;ll confirm by call or WhatsApp before dispatch.
      </PageBanner>

      {/* Progress */}
      <div className="border-b border-plum/10 bg-cream">
        <ol className="mx-auto flex max-w-6xl items-center gap-2 px-5 py-4 font-display text-[10.5px] font-semibold uppercase tracking-[0.08em] text-plum/50 sm:gap-3 sm:text-xs sm:tracking-[0.14em]">
          <li className="flex items-center gap-1.5 text-plum sm:gap-2">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-plum text-cream"><Check /></span>
            <Link href="/cart" className="hover:underline">Cart</Link>
          </li>
          <li className="h-px min-w-3 flex-1 bg-plum/30 sm:max-w-12" aria-hidden />
          <li className="flex items-center gap-1.5 text-plum-deep sm:gap-2">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-plum-deep">2</span>
            <span className="sm:hidden">Details</span>
            <span className="hidden sm:inline">Your details</span>
          </li>
          <li className="h-px min-w-3 flex-1 bg-plum/20 sm:max-w-12" aria-hidden />
          <li className="flex items-center gap-1.5 sm:gap-2">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-plum/30">3</span>
            Confirmed
          </li>
        </ol>
      </div>

      <MobileSummary />

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-5 md:py-14">
          <form onSubmit={onSubmit} noValidate className="grid items-start gap-8 lg:grid-cols-[1fr_390px]">
            <div className="space-y-6">
              <Card step="1" title="Contact" hint="So we can confirm your order.">
                <Field label="Full name" name="name" autoComplete="name" error={errors.name} />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Mobile number" name="phone" type="tel" inputMode="tel" placeholder="0300 1234567" autoComplete="tel" error={errors.phone} />
                  <Field label="Email (optional)" name="email" type="email" autoComplete="email" error={errors.email} />
                </div>
              </Card>

              <Card step="2" title="Delivery address" hint="Where should we send your oil?">
                <div>
                  <label htmlFor="country" className="field-label">Country / region</label>
                  <input id="country" value="Pakistan" readOnly tabIndex={-1} className="field cursor-not-allowed bg-sand/50 text-ink/70" />
                </div>
                <Field label="Address" name="address" placeholder="House #, street, area" autoComplete="address-line1" error={errors.address} />
                <Field label="Apartment, suite, landmark (optional)" name="address2" autoComplete="address-line2" error={errors.address2} />
                <div className="grid gap-5 sm:grid-cols-3">
                  <Field label="City" name="city" autoComplete="address-level2" error={errors.city} />
                  <div>
                    <label htmlFor="province" className="field-label">Province</label>
                    <select id="province" name="province" defaultValue="" className="field" aria-invalid={!!errors.province} autoComplete="address-level1">
                      <option value="" disabled>Select</option>
                      {provinces.map((p) => <option key={p}>{p}</option>)}
                    </select>
                    {errors.province && <p className="mt-1.5 text-sm text-red-700">{errors.province}</p>}
                  </div>
                  <Field label="Postal code (optional)" name="postalCode" inputMode="numeric" maxLength={5} placeholder="54000" autoComplete="postal-code" error={errors.postalCode} />
                </div>
                <div>
                  <label htmlFor="notes" className="field-label">Order notes (optional)</label>
                  <textarea id="notes" name="notes" rows={3} maxLength={500} className="field !h-auto py-3" placeholder="Preferred delivery time, special instructions…" />
                </div>
              </Card>

              <Card step="3" title="Shipping method" hint="Delivered to your door anywhere in Pakistan.">
                <label className="flex cursor-pointer items-center gap-4 rounded-xl border-2 border-plum bg-sand p-5">
                  <input type="radio" name="shipping" defaultChecked className="accent-plum" />
                  <span className="flex-1">
                    <span className="block font-semibold text-plum-deep">Standard delivery</span>
                    <span className="text-sm text-ink/60">Free on orders over {formatPKR(shipping.freeAbove)}</span>
                  </span>
                  <span className="font-semibold tabular-nums text-plum-deep">{cart.shippingFee ? formatPKR(cart.shippingFee) : "Free"}</span>
                </label>
              </Card>

              <Card step="4" title="Payment" hint="Pay when it arrives. Nothing to pay now.">
                <label className="relative flex cursor-pointer items-start gap-4 rounded-xl border-2 border-plum bg-sand p-5">
                  <input type="radio" name="payment" value="cod" defaultChecked className="mt-1 accent-plum" />
                  <span className="flex-1">
                    <span className="block font-semibold text-plum-deep">Cash on Delivery</span>
                    <span className="text-sm text-ink/60">Pay in cash to the rider when your order arrives.</span>
                  </span>
                  <span className="rounded-full bg-gold px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-[0.12em] text-plum-deep">Selected</span>
                </label>
                <div className="flex items-start gap-4 rounded-xl border border-plum/15 bg-sand/40 p-5 opacity-60">
                  <input type="radio" disabled className="mt-1" />
                  <span>
                    <span className="block font-semibold">Card / JazzCash / Easypaisa</span>
                    <span className="text-sm text-ink/60">Coming soon</span>
                  </span>
                </div>
              </Card>
            </div>

            {/* Summary */}
            <aside className="rounded-2xl bg-plum-deep p-6 text-cream shadow-[0_30px_60px_-35px_rgba(58,21,52,0.8)] lg:sticky lg:top-28">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl text-gold">Order summary</h2>
                <Link href="/cart" className="text-xs text-cream/60 underline underline-offset-4 hover:text-cream">Edit cart</Link>
              </div>

              <div className="mt-5 flex gap-4">
                <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-lg bg-cream">
                  <Image src={product.cutout} alt="" fill sizes="64px" className="object-contain p-1.5" />
                </div>
                <div className="flex-1 text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold leading-snug">{product.name}</p>
                      <p className="text-cream/60">{product.size}</p>
                    </div>
                    <TrashButton tone="dark" onClick={cart.clear} label="Remove from order" />
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <QtyStepper size="sm" value={cart.quantity} onChange={cart.setQuantity} />
                    <span className="font-semibold tabular-nums">{formatPKR(cart.subtotal)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-white/5 px-4 py-3 text-xs text-cream/80">
                {cart.shippingFee > 0 ? <p>Add <b className="text-gold">{formatPKR(freeLeft)}</b> more for free shipping.</p> : <p>You&apos;ve unlocked <b className="text-gold">free shipping</b>.</p>}
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gold transition-all duration-700" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <div className="mt-5 space-y-2 border-t border-cream/15 pt-4 text-sm">
                <div className="flex justify-between text-cream/75"><span>Subtotal</span><span className="tabular-nums">{formatPKR(cart.subtotal)}</span></div>
                <div className="flex justify-between text-cream/75"><span>Shipping</span><span className="tabular-nums">{cart.shippingFee ? formatPKR(cart.shippingFee) : "Free"}</span></div>
                <div className="flex justify-between border-t border-cream/15 pt-3 text-lg font-semibold"><span>Total</span><span className="tabular-nums text-gold">{formatPKR(cart.total)}</span></div>
              </div>

              {serverError && <p role="alert" className="mt-4 rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-200">{serverError}</p>}

              <button type="submit" disabled={submitting} className="btn-primary mt-6 w-full cursor-pointer">
                {submitting ? "Placing order…" : `Place order · ${formatPKR(cart.total)}`}
              </button>

              <ul className="mt-5 space-y-2 text-xs text-cream/70">
                {["Cash on Delivery — pay when it arrives", "We call or WhatsApp to confirm before dispatch", "Homemade, fully natural — same oil as Chonions"].map((t) => (
                  <li key={t} className="flex items-start gap-2"><span className="mt-0.5 text-gold"><Check /></span>{t}</li>
                ))}
              </ul>
            </aside>
          </form>
        </div>
      </section>
    </>
  );
}

function Check() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m5 12 5 5 9-10" /></svg>
  );
}

function Card({ step, title, hint, children }: { step: string; title: string; hint: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-2xl border border-plum/15 bg-white p-5 shadow-[0_24px_50px_-40px_rgba(58,21,52,0.6)] md:p-8">
      <legend className="sr-only">{title}</legend>
      <div className="mb-4 flex items-center gap-3 md:mb-6 md:gap-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-plum font-display text-sm font-bold text-cream">{step}</span>
        <div>
          <h2 className="font-display text-xl font-bold leading-tight text-plum-deep">{title}</h2>
          <p className="text-sm text-ink/55">{hint}</p>
        </div>
      </div>
      <div className="space-y-4 md:space-y-5">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  name,
  error,
  ...rest
}: { label: string; name: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="field-label">{label}</label>
      <input id={name} name={name} className="field" aria-invalid={!!error} aria-describedby={error ? `${name}-err` : undefined} {...rest} />
      {error && <p id={`${name}-err`} className="mt-1.5 text-sm text-red-700">{error}</p>}
    </div>
  );
}

/** Collapsible "Show order summary" bar for phones and tablets (the full summary sits under the form on desktop). */
function MobileSummary() {
  const cart = useCart();
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-plum/10 bg-sand lg:hidden">
      <div className="mx-auto max-w-6xl px-5">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full cursor-pointer items-center justify-between gap-3 py-4 text-left text-sm font-semibold text-plum"
        >
          <span className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M6 7h12l-1 13H7L6 7Z" />
              <path d="M9 7a3 3 0 0 1 6 0" />
            </svg>
            {open ? "Hide order summary" : "Show order summary"}
            <svg
              ref={forceTransition(`transform 0.35s ${EASE}`)}
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden
              style={{ transform: open ? "rotate(180deg)" : "none" }}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
          <span className="font-display text-base font-bold tabular-nums text-plum-deep">{formatPKR(cart.total)}</span>
        </button>
        <div
          ref={forceTransition(`grid-template-rows 0.45s ${EASE}, opacity 0.35s ease`)}
          style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
        >
          <div style={{ minHeight: 0, overflow: "hidden" }}>
            <div className="flex items-center gap-4 pb-3">
              <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-lg bg-cream">
                <Image src={product.cutout} alt="" fill sizes="56px" className="object-contain p-1" />
              </div>
              <div className="flex-1 text-sm">
                <p className="font-semibold leading-snug text-ink">{product.name}</p>
                <p className="text-ink/60">{product.size} · Qty {cart.quantity}</p>
              </div>
              <span className="font-semibold tabular-nums">{formatPKR(cart.subtotal)}</span>
            </div>
            <div className="space-y-1.5 border-t border-plum/10 pb-4 pt-3 text-sm text-ink/70">
              <div className="flex justify-between"><span>Subtotal</span><span className="tabular-nums">{formatPKR(cart.subtotal)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span className="tabular-nums">{cart.shippingFee ? formatPKR(cart.shippingFee) : "Free"}</span></div>
              <div className="flex justify-between font-semibold text-ink"><span>Total</span><span className="tabular-nums">{formatPKR(cart.total)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
