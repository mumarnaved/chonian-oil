import Image from "next/image";

/**
 * Studio shot: the whole bottle on a soft warm backdrop, never cropped.
 * With `hoverPhoto`, the lifestyle photo fades in on hover (parent needs the `group` class).
 */
export function BottleShot({
  alt,
  sizes,
  priority = false,
  hoverPhoto,
  pad = "py-[7%]",
}: {
  alt: string;
  sizes: string;
  priority?: boolean;
  hoverPhoto?: string;
  pad?: string;
}) {
  return (
    <>
      <span
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,#fbf3e2_0%,#efdfc2_55%,#e3cda6_100%)]"
        aria-hidden
      />
      {/* floor shadow */}
      <span className="absolute bottom-[5%] left-1/2 h-[4%] w-[34%] -translate-x-1/2 rounded-[50%] bg-plum-deep/25 blur-md" aria-hidden />
      <div className={`absolute inset-0 ${pad}`}>
        <div className="relative h-full w-full">
          <Image
            src="/images/bottle-cutout.webp"
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-contain drop-shadow-[0_18px_22px_rgba(58,21,52,0.28)] transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </div>
      {hoverPhoto ? (
        <Image
          src={hoverPhoto}
          alt=""
          aria-hidden
          fill
          sizes={sizes}
          className="object-cover object-[72%_60%] opacity-0 transition duration-500 group-hover:opacity-100"
        />
      ) : null}
    </>
  );
}
