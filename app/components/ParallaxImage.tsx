import { useEffect, useRef } from "react";
import { parallax } from "~/animations/primitives";
import { useReducedMotion } from "~/hooks/useReducedMotion";
import { cn } from "~/utils/cn";

type Props = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  intensity?: number;
  caption?: string;
};

export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  intensity = 12,
  caption,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const img = ref.current.querySelector("img");
    if (!img) return;
    const cleanup = parallax(img, { yPercent: intensity });
    return cleanup;
  }, [intensity, reduced]);

  return (
    <figure ref={ref} className={cn("relative overflow-hidden", className)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cn(
          "h-full w-full object-cover scale-[1.15] will-change-transform",
          imgClassName
        )}
      />
      {caption ? (
        <figcaption className="absolute bottom-4 left-4 font-mono text-fluid-xs uppercase tracking-[0.22em] text-bone-50/70">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
