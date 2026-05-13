import type { gsap as gsapType } from "gsap";
import SplitType from "split-type";
import { ensureGsap } from "./gsap.client";

type GSAP = typeof gsapType;

export interface RevealOptions {
  by?: "chars" | "words" | "lines";
  stagger?: number;
  duration?: number;
  delay?: number;
  yPercent?: number;
  start?: string;
  scrub?: boolean | number;
  once?: boolean;
}

export function splitText(el: Element, by: "chars" | "words" | "lines" = "lines") {
  const split = new SplitType(el as HTMLElement, {
    types: by,
    tagName: "span",
  });
  (el as HTMLElement).dataset.split = by;
  (el as HTMLElement).classList.add("is-ready");
  return split;
}

export function textReveal(target: Element, opts: RevealOptions = {}) {
  const { gsap, ScrollTrigger } = ensureGsap();
  const {
    by = "lines",
    stagger = 0.06,
    duration = 1.1,
    delay = 0,
    yPercent = 110,
    start = "top 85%",
    scrub = false,
    once = true,
  } = opts;

  const split = splitText(target, by);
  const items =
    by === "chars" ? split.chars : by === "words" ? split.words : split.lines;
  if (!items || items.length === 0) return null;

  if (by === "lines") {
    items.forEach((line) => {
      const wrapper = document.createElement("span");
      wrapper.style.display = "block";
      wrapper.style.overflow = "hidden";
      line.parentNode?.insertBefore(wrapper, line);
      wrapper.appendChild(line);
      (line as HTMLElement).style.display = "block";
      (line as HTMLElement).style.willChange = "transform";
    });
  }

  const tween = gsap.fromTo(
    items,
    { yPercent, opacity: by === "chars" ? 0 : 1 },
    {
      yPercent: 0,
      opacity: 1,
      duration,
      delay,
      stagger,
      ease: "expo.out",
      scrollTrigger: scrub
        ? { trigger: target, start, end: "bottom 30%", scrub }
        : { trigger: target, start, once },
    }
  );

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
    split.revert();
    ScrollTrigger.refresh();
  };
}

export function fadeUp(
  target: Element | Element[],
  opts: { delay?: number; y?: number; stagger?: number; start?: string } = {}
) {
  const { gsap } = ensureGsap();
  const { delay = 0, y = 40, stagger = 0.08, start = "top 88%" } = opts;
  const tween = gsap.fromTo(
    target,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "expo.out",
      delay,
      stagger,
      scrollTrigger: { trigger: target as Element, start, once: true },
    }
  );
  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}

export function parallax(
  target: Element,
  opts: { yPercent?: number; start?: string; end?: string } = {}
) {
  const { gsap } = ensureGsap();
  const { yPercent = -15, start = "top bottom", end = "bottom top" } = opts;
  const tween = gsap.fromTo(
    target,
    { yPercent: -yPercent },
    {
      yPercent,
      ease: "none",
      scrollTrigger: { trigger: target, start, end, scrub: true },
    }
  );
  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}

export function horizontalScroll(
  container: Element,
  track: Element,
  opts: { snap?: boolean } = {}
) {
  const { gsap, ScrollTrigger } = ensureGsap();
  const sections = (track as HTMLElement).children;
  const count = sections.length;
  if (count === 0) return () => {};

  const tween = gsap.to(track, {
    x: () => -((track as HTMLElement).scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      end: () => "+=" + ((track as HTMLElement).scrollWidth - window.innerWidth),
      snap: opts.snap ? 1 / (count - 1) : undefined,
      invalidateOnRefresh: true,
    },
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
    ScrollTrigger.refresh();
  };
}

export function magneticEffect(
  el: HTMLElement,
  opts: { strength?: number; radius?: number } = {}
) {
  const { gsap } = ensureGsap();
  const { strength = 0.35, radius = 120 } = opts;
  const xTo = gsap.quickTo(el, "x", { duration: 0.55, ease: "expo.out" });
  const yTo = gsap.quickTo(el, "y", { duration: 0.55, ease: "expo.out" });

  const onMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.hypot(dx, dy);
    if (dist > radius) return reset();
    xTo(dx * strength);
    yTo(dy * strength);
  };
  const reset = () => {
    xTo(0);
    yTo(0);
  };

  window.addEventListener("mousemove", onMove, { passive: true });
  el.addEventListener("mouseleave", reset);

  return () => {
    window.removeEventListener("mousemove", onMove);
    el.removeEventListener("mouseleave", reset);
    reset();
  };
}

export function pinReveal(
  container: Element,
  opts: { start?: string; end?: string } = {}
) {
  const { gsap, ScrollTrigger } = ensureGsap();
  const { start = "top top", end = "+=120%" } = opts;
  const st = ScrollTrigger.create({
    trigger: container,
    start,
    end,
    pin: true,
    pinSpacing: true,
    anticipatePin: 1,
  });
  return () => st.kill();
}

export type AnimationCleanup = (() => void) | null;
export type { GSAP };
