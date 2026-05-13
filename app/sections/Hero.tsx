import { useEffect, useRef } from "react";
import { ensureGsap } from "~/animations/gsap.client";
import { splitText } from "~/animations/primitives";
import { Container } from "~/components/Container";
import { MagneticButton } from "~/components/MagneticButton";
import { useReducedMotion } from "~/hooks/useReducedMotion";
import { smoothScrollTo } from "~/utils/smoothScroll";

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;
    const { gsap, ScrollTrigger } = ensureGsap();

    const ctx = gsap.context(() => {
      const headlines = ref.current!.querySelectorAll<HTMLElement>("[data-hero-line]");
      const splits = Array.from(headlines).map((h) => splitText(h, "chars"));

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        delay: reduced ? 0 : 0.2,
      });

      tl.set("[data-hero-overline], [data-hero-meta], [data-hero-cta], [data-hero-scroll]", {
        opacity: 0,
        y: 24,
      });

      if (!reduced) {
        splits.forEach((s, i) => {
          tl.from(
            s.chars ?? [],
            {
              yPercent: 130,
              opacity: 0,
              duration: 1.3,
              stagger: 0.012,
            },
            i === 0 ? 0 : "-=0.95"
          );
        });
      } else {
        headlines.forEach((h) => h.classList.add("is-ready"));
      }

      tl.to(
        "[data-hero-overline]",
        { opacity: 1, y: 0, duration: 1 },
        reduced ? 0 : 0.05
      )
        .to(
          "[data-hero-meta]",
          { opacity: 1, y: 0, duration: 1, stagger: 0.08 },
          reduced ? 0 : "-=0.6"
        )
        .to(
          "[data-hero-cta]",
          { opacity: 1, y: 0, duration: 1, stagger: 0.08 },
          reduced ? 0 : "-=0.7"
        )
        .to(
          "[data-hero-scroll]",
          { opacity: 1, y: 0, duration: 0.9 },
          reduced ? 0 : "-=0.4"
        );

      if (!reduced && bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        const onMove = (e: MouseEvent) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 14;
          const y = (e.clientY / window.innerHeight - 0.5) * 14;
          gsap.to(bgRef.current, {
            x,
            y,
            duration: 1.4,
            ease: "expo.out",
            overwrite: "auto",
          });
        };
        window.addEventListener("mousemove", onMove, { passive: true });
        return () => {
          window.removeEventListener("mousemove", onMove);
          ScrollTrigger.getAll().forEach((s) => s.kill());
        };
      }
    }, ref);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-ink-950 pb-16 pt-24 sm:pb-20 sm:pt-28 md:pt-32 lg:pt-36"
    >
      <div
        ref={bgRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 will-change-transform"
      >
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_30%,rgba(184,92,56,0.18),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,#05060a_100%)]" />
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full opacity-[0.08]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <Container className="relative grid h-full grid-rows-[auto_1fr_auto] gap-8 sm:gap-10 md:gap-12">
        <div className="flex flex-wrap items-baseline justify-between gap-2 sm:gap-4">
          <p data-hero-overline className="eyebrow">
            Sc / Kuwait — Est. 2015
          </p>
          <p data-hero-overline className="eyebrow hidden sm:block">
            (01) Fit-out · General Contracting
          </p>
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="heading-display text-fluid-hero leading-[1.04] md:leading-[1.0]">
            <span
              data-hero-line
              data-split="chars"
              className="block uppercase"
              aria-label="Exceptional"
            >
              Exceptional
            </span>
            <span
              data-hero-line
              data-split="chars"
              className="block italic font-light text-bone-50/85"
              aria-label="spaces,"
            >
              spaces,
            </span>
            <span
              data-hero-line
              data-split="chars"
              className="block uppercase"
              aria-label="scripted"
            >
              scripted
            </span>
            <span
              data-hero-line
              data-split="chars"
              className="block uppercase"
              aria-label="into reality."
            >
              into reality<span className="text-rust-500">.</span>
            </span>
          </h1>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-12 md:items-end md:gap-10">
            <p
              data-hero-meta
              className="md:col-span-5 max-w-md text-fluid-base text-bone-50/70 text-pretty"
            >
              Scenarios is a Kuwait-based fit-out & general contracting studio.
              We design, fabricate and finish the spaces your business inhabits —
              from a 3×3 booth to a full retail rollout.
            </p>

            <div
              data-hero-meta
              className="md:col-span-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-bone-50/55 space-y-1"
            >
              <p>Founded 2010 · Tariq Alsharif</p>
              <p>Salhiya, Kuwait City</p>
            </div>

            <div
              data-hero-cta
              className="md:col-span-4 flex flex-col sm:flex-row flex-wrap gap-3 md:justify-end"
            >
              <MagneticButton
                variant="solid"
                size="lg"
                data-cursor="Begin"
                className="w-full sm:w-auto"
                onClick={() => smoothScrollTo("#contact", -8)}
              >
                Start a project
              </MagneticButton>
              <MagneticButton
                variant="outline"
                size="lg"
                data-cursor="See"
                className="w-full sm:w-auto"
                onClick={() => smoothScrollTo("#work", -8)}
              >
                Selected work
              </MagneticButton>
            </div>
          </div>
        </div>

        <div
          data-hero-scroll
          className="flex items-end justify-between gap-6 pb-2"
        >
          <p className="font-mono text-fluid-xs uppercase tracking-[0.22em] text-bone-50/55">
            (Scroll) — A script in six acts
          </p>
          <div className="flex items-center gap-3 font-mono text-fluid-xs uppercase tracking-[0.22em] text-bone-50/55">
            <span>01 / Hero</span>
            <span aria-hidden className="block h-px w-12 bg-bone-50/30" />
          </div>
        </div>
      </Container>
    </section>
  );
}
