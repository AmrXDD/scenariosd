import { useEffect, useRef, useState } from "react";
import { ensureGsap } from "~/animations/gsap.client";
import { useReducedMotion } from "~/hooks/useReducedMotion";
import { useMagnetic } from "~/hooks/useMagnetic";
import { cn } from "~/utils/cn";

const HREF = "https://wa.me/96596000691";
const LABEL = "WhatsApp the studio";

export function WhatsAppButton() {
  const ref = useRef<HTMLDivElement | null>(null);
  const btnRef = useMagnetic<HTMLAnchorElement>({ strength: 0.25, radius: 110 });
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setVisible(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (reduced || !ref.current) return;
    const { gsap } = ensureGsap();
    gsap.to(ref.current, {
      opacity: visible ? 1 : 0,
      y: visible ? 0 : 24,
      scale: visible ? 1 : 0.92,
      duration: 0.8,
      ease: "expo.out",
      pointerEvents: visible ? "auto" : "none",
    });
  }, [visible, reduced]);

  return (
    <div
      ref={ref}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[55] opacity-0 pointer-events-none"
      style={{ willChange: "transform, opacity" }}
    >
      <a
        ref={btnRef}
        href={HREF}
        target="_blank"
        rel="noreferrer"
        aria-label={LABEL}
        data-cursor="WhatsApp"
        className={cn(
          "group relative flex items-center gap-3 rounded-full",
          "border border-bone-50/15 bg-ink-900/85 backdrop-blur-xl",
          "px-3 py-3 sm:pl-3 sm:pr-5 sm:py-3",
          "shadow-[0_10px_40px_-12px_rgba(0,0,0,0.7)]",
          "transition-[background-color,border-color,padding] duration-500 ease-out-cinema",
          "hover:bg-ink-800/90 hover:border-bone-50/30"
        )}
      >
        <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-bone-50 text-ink-950">
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-bone-50/40 motion-safe:animate-ping"
          />
          <svg
            viewBox="0 0 32 32"
            className="relative h-5 w-5"
            fill="currentColor"
            aria-hidden
          >
            <path d="M16.001 3.2C8.94 3.2 3.2 8.94 3.2 16c0 2.265.592 4.476 1.717 6.42L3.2 28.8l6.55-1.72A12.74 12.74 0 0 0 16 28.8C23.06 28.8 28.8 23.06 28.8 16S23.06 3.2 16.001 3.2Zm0 23.4a10.49 10.49 0 0 1-5.36-1.47l-.384-.227-3.886 1.02 1.038-3.79-.25-.39A10.4 10.4 0 0 1 5.6 16C5.6 10.26 10.26 5.6 16.001 5.6 21.74 5.6 26.4 10.26 26.4 16c0 5.74-4.66 10.6-10.399 10.6Zm5.7-7.79c-.31-.155-1.834-.905-2.118-1.008-.283-.103-.49-.155-.696.155-.207.31-.798 1.008-.978 1.215-.18.207-.36.232-.67.078-.31-.155-1.31-.483-2.495-1.54-.923-.823-1.546-1.84-1.726-2.15-.18-.31-.02-.477.135-.632.139-.139.31-.36.465-.54.155-.18.207-.31.31-.516.103-.207.052-.387-.026-.542-.078-.155-.696-1.68-.954-2.305-.252-.605-.51-.523-.696-.533l-.594-.01a1.14 1.14 0 0 0-.825.387c-.283.31-1.082 1.058-1.082 2.58 0 1.523 1.107 2.994 1.262 3.2.155.207 2.18 3.33 5.28 4.668.738.32 1.314.51 1.763.652.74.235 1.413.202 1.945.123.594-.09 1.834-.75 2.094-1.473.258-.722.258-1.342.18-1.473-.077-.13-.282-.207-.593-.362Z" />
          </svg>
        </span>
        <span className="hidden sm:flex flex-col leading-tight">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50/55">
            Live
          </span>
          <span className="font-display text-[15px] text-bone-50">
            WhatsApp the studio
          </span>
        </span>
      </a>
    </div>
  );
}
