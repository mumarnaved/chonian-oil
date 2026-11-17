"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PageBanner } from "@/components/PageBanner";
import { contact, formatPKR } from "@/lib/store";

type LastOrder = { orderId: string; total: number; name: string; phone: string };

export default function OrderConfirmed() {
  const [order, setOrder] = useState<LastOrder | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Reading browser storage after mount keeps server and client HTML identical.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("chonions-oil-last-order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  if (!loaded) return <div className="min-h-[60vh] bg-plum-deep" />;

  if (!order) {
    return (
      <>
        <PageBanner eyebrow="Order" title={<>No recent <span className="text-gold">order</span></>} />
        <section className="mx-auto max-w-xl px-5 py-16 text-center">
          <Link href="/shop" className="btn-primary">Back to shop</Link>
        </section>
      </>
    );
  }

  const waText = encodeURIComponent(`Hi! I just placed order ${order.orderId} for the Onion & Mustard Hair Oil.`);

  return (
    <>
    <PageBanner eyebrow="Order confirmed" title={<>Thank you, <span className="text-gold">{order.name.split(" ")[0]}!</span></>} />
    <section className="mx-auto max-w-xl px-5 py-14 md:py-20 text-center">
      <div className="mx-auto grid place-items-center h-16 w-16 rounded-full bg-gold text-plum-deep text-3xl">✓</div>
      <p className="mt-6 text-ink/70 text-lg">
        Your order <span className="font-semibold text-ink">{order.orderId}</span> has been placed.
        We&apos;ll contact you on <span className="font-semibold text-ink">{order.phone}</span> to confirm delivery.
      </p>
      <p className="mt-3 text-ink/70">Amount to pay on delivery: <span className="font-semibold text-ink">{formatPKR(order.total)}</span></p>
      <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
        <a href={`https://wa.me/${contact.whatsapp}?text=${waText}`} className="btn-primary">Message us on WhatsApp</a>
        <Link href="/" className="btn-secondary">Back to home</Link>
      </div>
    </section>
    </>
  );
}
