"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import "./capsule-nav.css";
import { mountCapsuleNav } from "@/lib/capsule-nav";

// The three pages of the site. The gold pill follows the page you are on.
const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
];

const html = `<ul class="vs-capsule-nav-list">${links
  .map((l) => `<li><a class="vs-capsule-nav-link" href="${l.href}">${l.label}</a></li>`)
  .join("")}</ul>`;

function activeIndex(pathname: string) {
  if (pathname.startsWith("/shop") || pathname.startsWith("/products") || pathname.startsWith("/cart") || pathname.startsWith("/checkout")) return 1;
  if (pathname.startsWith("/about")) return 2;
  return 0;
}

export function CapsuleNav() {
  const ref = useRef<HTMLElement>(null);
  const api = useRef<{ select: (i: number) => void } | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const nav = ref.current;
    if (!nav) return;
    api.current = mountCapsuleNav(nav) as { select: (i: number) => void } | null;
    api.current?.select(activeIndex(window.location.pathname));

    // Client-side navigation instead of a full page load.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a.vs-capsule-nav-link") as HTMLAnchorElement | null;
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      router.push(a.getAttribute("href") || "/");
    };
    nav.addEventListener("click", onClick);
    return () => nav.removeEventListener("click", onClick);
  }, [router]);

  useEffect(() => {
    api.current?.select(activeIndex(pathname));
  }, [pathname]);

  return (
    <nav
      ref={ref}
      className="vs-capsule-nav"
      aria-label="Primary"
      data-hide="off"
      data-compact-at="96"
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
