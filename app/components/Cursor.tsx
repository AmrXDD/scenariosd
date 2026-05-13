import { useEffect, useRef } from "react";
import { ensureGsap } from "~/animations/gsap.client";
import { useReducedMotion } from "~/hooks/useReducedMotion";

export function Cursor() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const { gsap } = ensureGsap();
    const ringX = gsap.quickTo(ring, "x", { duration: 0.55, ease: "expo.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.55, ease: "expo.out" });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });

    let active = false;

    const onMove = (e: MouseEvent) => {
      if (!active) {
        ring.style.opacity = "1";
        dot.style.opacity = "1";
        active = true;
      }
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, [data-cursor], [role='button']"
      ) as HTMLElement | null;

      if (interactive) {
        ring.dataset.state = "hover";
        const label = interactive.dataset.cursor;
        if (labelRef.current) labelRef.current.textContent = label ?? "";
      } else {
        ring.dataset.state = "rest";
        if (labelRef.current) labelRef.current.textContent = "";
      }
    };

    const onLeave = () => {
      ring.style.opacity = "0";
      dot.style.opacity = "0";
      active = false;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        data-state="rest"
        className="pointer-events-none fixed left-0 top-0 z-[80] -translate-x-1/2 -translate-y-1/2 opacity-0 mix-blend-difference"
      >
        <div className="relative grid h-12 w-12 place-items-center rounded-full border border-bone-50/60 transition-[transform,background-color,border-color] duration-500 ease-out-cinema data-[state=hover]:scale-150 data-[state=hover]:border-bone-50 data-[state=hover]:bg-bone-50/10">
          <span
            ref={labelRef}
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-50"
          />
        </div>
      </div>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone-50 opacity-0 mix-blend-difference"
      />
    </>
  );
}
