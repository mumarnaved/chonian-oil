export function PageBanner({
  eyebrow,
  title,
  children,
  compact = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-plum-deep">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/videos/field-poster.jpg)" }} aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-plum-deep/85 via-plum-deep/65 to-plum-deep/35" aria-hidden />
      <div className={`relative mx-auto max-w-6xl px-5 ${compact ? "pt-32 pb-6 md:pt-[7.4rem] md:pb-5" : "pt-32 pb-10 md:pt-36 md:pb-12"}`}>
        <p className="eyebrow !text-[#f3cf75]">{eyebrow}</p>
        <h1 className={`mt-2 font-display font-bold leading-[1.05] tracking-tight text-cream ${compact ? "text-[clamp(1.7rem,3.6vw,2.5rem)]" : "mt-3 text-[clamp(1.9rem,5vw,3.2rem)]"}`}>{title}</h1>
        {children ? <p className="mt-3 max-w-2xl text-cream/85 leading-relaxed">{children}</p> : null}
      </div>
    </section>
  );
}
