"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useCart } from "./CartProvider";
import { AnnouncementBar } from "./AnnouncementBar";
import { CapsuleNav } from "./CapsuleNav";

/**
 * Floating navigation: logo pill (left), frosted capsule nav (centre), cart pill (right).
 * They sit just under the announcement bar and glide up to the top edge once the bar scrolls away.
 */
export function Header() {
  const { quantity, openDrawer } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const update = () => {
      const bar = document.querySelector(".vs-announcement-bar");
      const bottom = bar ? Math.max(0, bar.getBoundingClientRect().bottom) : 0;
      root.style.setProperty("--nav-top", `${Math.max(10, bottom + 10)}px`);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const bar = document.querySelector(".vs-announcement-bar");
    const ro = bar ? new ResizeObserver(update) : null;
    if (bar && ro) ro.observe(bar);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ro?.disconnect();
    };
  }, [pathname]);

  return (
    <>
      <AnnouncementBar />
      <div
        className="pointer-events-none fixed inset-x-0 z-40 flex items-start justify-between px-3 sm:px-5 lg:px-8"
        style={{ top: "var(--nav-top, 40px)" }}
      >
        <Link href="/" className="pointer-events-auto -mt-1 block" aria-label="Onion & Mustard hair oil by Chonions — home">
          <Image
            src="/images/chonions-logo-full.png"
            alt="Chonions"
            width={634}
            height={698}
            priority
            className="h-[52px] w-auto drop-shadow-[0_3px_10px_rgba(20,5,18,0.55)] transition-transform hover:scale-105 lg:h-[72px]"
          />
        </Link>
        <button
          onClick={openDrawer}
          className="frost-pill pointer-events-auto relative inline-flex items-center gap-1.5 px-3 max-lg:mt-[3px] max-lg:!h-10 font-display text-[13px] font-semibold transition hover:bg-plum-deep/80 sm:gap-2 sm:px-5"
          aria-label={`Open cart, ${quantity} items`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M6 7h12l-1 13H7L6 7Z" />
            <path d="M9 7a3 3 0 0 1 6 0" />
          </svg>
          Cart
          {quantity > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-xs text-plum-deep sm:static">{quantity}</span>
          )}
        </button>
      </div>
      <CapsuleNav />
    </>
  );
}
