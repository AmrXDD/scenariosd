export function smoothScrollTo(target: string | HTMLElement, offset = -8) {
  if (typeof window === "undefined") return;
  const el =
    typeof target === "string"
      ? (document.querySelector(target) as HTMLElement | null)
      : target;
  if (!el) return;

  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.4, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}
