import Image from "next/image";
import Link from "next/link";
import { BackToTop } from "./BackToTop";
import { chonionsSiteUrl, contact, formatPKR, shipping } from "@/lib/store";

const icon = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function InstagramIcon() {
  return (
    <svg {...icon}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.6 6.4h.01" strokeWidth="2.6" />
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg {...icon}>
      <path d="M3 21l1.65-4.9A8.5 8.5 0 1 1 8 19.4L3 21z" />
      <path d="M9 8.6c.2-.5.5-.5.8-.5.2 0 .4 0 .5.4l.6 1.4c.1.3 0 .5-.2.7l-.5.6c.8 1.5 1.9 2.4 3.4 3.1l.7-.8c.2-.2.4-.3.7-.2l1.4.7c.3.1.4.3.3.7-.2.9-1 1.5-1.9 1.4-3.3-.5-5.8-3.1-6.4-6.3-.1-.4 0-.8.3-1z" strokeWidth="1.4" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg {...icon}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7.5 7.6 5.2a1.6 1.6 0 0 0 1.8 0l7.6-5.2" />
    </svg>
  );
}
const social = [
  { label: "Instagram", href: contact.instagram, Icon: InstagramIcon },
  { label: "WhatsApp", href: `https://wa.me/${contact.whatsapp}`, Icon: WhatsAppIcon },
  { label: "Email", href: `mailto:${contact.email}`, Icon: MailIcon },
];

const linkClass = "group inline-flex items-center text-cream/75 transition hover:text-gold";

export function Footer() {
  return (
    <footer className="bg-plum-deep leaf-pattern text-cream/80">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-5 py-12 md:grid-cols-[1.5fr_1fr_1fr_1.3fr] md:gap-10 md:py-14">
        {/* Brand */}
        <div className="col-span-2 max-md:order-1 md:col-span-1">
          <div className="flex items-center gap-4">
            <Image src="/images/chonions-logo-full.png" alt="Chonions" width={634} height={698} className="h-20 w-auto drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)]" />
            <div>
              <p className="font-display text-xl font-bold leading-tight text-cream">Onion &amp; Mustard</p>
              <p className="mt-0.5 text-sm text-gold">Sister company by Chonions</p>
            </div>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
            Homemade, fully natural hair oil — from mustard seed till mustard oil. The very same oil we use in Chonions crisps.
          </p>
          <div className="mt-6 flex gap-3">
            {social.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                title={label}
                className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 text-cream/80 transition hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-plum-deep"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <nav aria-label="Explore" className="text-sm max-md:order-3">
          <p className="eyebrow !text-gold mb-4">Explore</p>
          <ul className="space-y-3">
            {[
              ["Home", "/"],
              ["Shop", "/shop"],
              ["About", "/about"],
              ["Cart", "/cart"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className={linkClass}>
                  <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:mr-2 group-hover:w-3" aria-hidden />
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <a href={chonionsSiteUrl} className={linkClass}>
                <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:mr-2 group-hover:w-3" aria-hidden />
                <span className="md:hidden">Chonions crisps</span><span className="hidden md:inline">Chonions onion crisps</span><span aria-hidden className="ml-1.5">↗</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Delivery */}
        <div className="text-sm max-md:order-3">
          <p className="eyebrow !text-gold mb-4">Delivery</p>
          <ul className="space-y-3 text-cream/75">
            <li>Cash on Delivery</li>
            <li>Ships across Pakistan</li>
            <li>{formatPKR(shipping.flatFee)} flat shipping</li>
            <li>Free over {formatPKR(shipping.freeAbove)}</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-2 text-sm max-md:order-2 md:col-span-1">
          <p className="eyebrow !text-gold mb-4">Contact</p>
          <ul className="space-y-3.5 max-md:space-y-0 max-md:divide-y max-md:divide-cream/10 max-md:rounded-2xl max-md:border max-md:border-cream/10 max-md:px-4">
            <li className="max-md:py-3.5">
              <a href={`https://wa.me/${contact.whatsapp}`} className={`${linkClass} max-md:w-full`}>
                <span className="mr-2.5 text-gold"><WhatsAppIcon /></span>
                WhatsApp us
              </a>
            </li>
            <li className="max-md:py-3.5">
              <a href={`mailto:${contact.email}`} className={`${linkClass} max-md:w-full`}>
                <span className="mr-2.5 text-gold"><MailIcon /></span>
                {contact.email}
              </a>
            </li>
            <li className="max-md:py-3.5">
              <a href={contact.instagram} className={`${linkClass} max-md:w-full`}>
                <span className="mr-2.5 text-gold"><InstagramIcon /></span>
                Follow on Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p
        className="select-none overflow-hidden px-3 pb-4 text-center font-display text-[17vw] font-bold uppercase leading-[0.82] tracking-tight text-gold/90 md:whitespace-nowrap md:px-0 md:pb-3 md:text-[9.4vw] md:leading-[0.85]"
        aria-hidden
      >
        <span className="block md:inline">Onion &amp;</span> <span className="block md:inline">Mustard</span>
      </p>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center justify-between gap-4 px-5 py-5 text-center text-xs text-cream/50 sm:flex-row sm:text-left">
          <p>© 2026 Chonions. For external use on hair and scalp only.</p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
