import { useEffect } from "react";
import Lenis from "lenis";
import { ensureGsap } from "~/animations/gsap.client";
import { useReducedMotion } from "./useReducedMotion";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function useLenis() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const { gsap, ScrollTrigger } = ensureGsap();

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      smoothWheel: true,
    });

    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, [reduced]);
}
