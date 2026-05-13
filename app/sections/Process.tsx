import { useEffect, useRef } from "react";
import { Container } from "~/components/Container";
import { RevealText } from "~/components/RevealText";
import { ensureGsap } from "~/animations/gsap.client";
import { useReducedMotion } from "~/hooks/useReducedMotion";

const acts = [
  {
    step: "Act I",
    title: "Read the brief like a script",
    body: "Site visit, intent capture, constraints. We understand a space by understanding what is meant to happen in it — and what is not.",
  },
  {
    step: "Act II",
    title: "Block the scene — 3D & layout",
    body: "Dimension take-offs and concept development. Detailed layouts, materials cast like characters, sightlines and flow blocked like coverage.",
  },
  {
    step: "Act III",
    title: "Cost the production — estimation",
    body: "Honest projections from design through execution. Engineering consultation that pressure-tests the design before a single wall is built.",
  },
  {
    step: "Act IV",
    title: "Fabricate — our wood workshop",
    body: "Shuwaikh Industrial Area: skilled craftspeople and our own joinery floor. Furniture, fixtures and finishes built to drawing, not improvised on site.",
  },
  {
    step: "Act V",
    title: "Fit-out, MEP & finishing",
    body: "Walls, flooring, HVAC, fire, signage — sequenced under one site manager. No translations between trades, no excuses between drawings.",
  },
  {
    step: "Act VI",
    title: "Handover — the space, alive",
    body: "Punch-list, snag, sign-off, opening day. We treat handover like a premiere — every cue rehearsed before the audience arrives.",
  },
];

export function Process() {
  const ref = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current || !trackRef.current) return;
    const { gsap, ScrollTrigger } = ensureGsap();

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current!;
        const horizontal = gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth + 48),
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            pin: true,
            scrub: 1,
            end: () => "+=" + (track.scrollWidth - window.innerWidth + 48),
            invalidateOnRefresh: true,
          },
        });

        const cards = track.querySelectorAll<HTMLElement>("[data-act]");
        cards.forEach((card) => {
          const fill = card.querySelector<HTMLElement>("[data-act-fill]");
          if (fill) {
            gsap.fromTo(
              fill,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontal,
                  start: "left 80%",
                  end: "right 30%",
                  scrub: true,
                },
              }
            );
          }
        });
      });
    }, ref);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [reduced]);

  return (
    <section
      ref={ref}
      id="process"
      className="relative bg-ink-900 py-section overflow-hidden border-y hairline"
    >
      <Container className="mb-16 md:mb-24">
        <header className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end md:gap-10">
          <p className="eyebrow md:col-span-2">05 — Process</p>
          <RevealText
            as="h2"
            by="words"
            className="heading-display text-fluid-3xl md:text-fluid-4xl md:col-span-7 text-balance"
          >
            <span>A&nbsp;space&nbsp;in</span>{" "}
            <span className="italic font-light">six&nbsp;acts</span>{" "}
            <span>— from&nbsp;script to&nbsp;opening&nbsp;day.</span>
          </RevealText>
          <p className="md:col-span-3 text-fluid-base text-bone-50/70 text-pretty">
            One contract. One accountable team. One rhythm of work — design,
            joinery, MEP and finishing under the same roof.
          </p>
        </header>
      </Container>

      <div
        ref={trackRef}
        className="flex flex-col md:flex-row md:flex-nowrap gap-10 md:gap-0 px-gutter md:pl-gutter will-change-transform"
      >
        {acts.map((a, i) => (
          <article
            key={a.step}
            data-act
            className="relative md:min-w-[78vw] lg:min-w-[58vw] xl:min-w-[48vw] md:pr-16 md:pl-2 md:py-12 md:border-r hairline border-t md:border-t-0 hairline pt-8 md:pt-0"
          >
            <div className="grid grid-cols-12 gap-4 sm:gap-6 md:gap-10">
              <p
                data-act-num
                className="col-span-12 font-mono text-fluid-xs uppercase tracking-[0.22em] text-rust-500"
              >
                {a.step} — {String(i + 1).padStart(2, "0")} / {acts.length}
              </p>
              <h3
                data-act-head
                className="col-span-12 md:col-span-10 heading-display text-fluid-2xl md:text-fluid-3xl leading-[0.95] text-balance"
              >
                {a.title}
              </h3>
              <p
                data-act-body
                className="col-span-12 md:col-span-8 text-fluid-base text-bone-50/70 text-pretty"
              >
                {a.body}
              </p>
              <div className="col-span-12 mt-12 hidden md:block">
                <div className="relative h-px w-full bg-bone-50/10 overflow-hidden">
                  <div
                    data-act-fill
                    className="absolute left-0 top-0 h-px w-full bg-rust-500 origin-left scale-x-0"
                  />
                </div>
                <p className="mt-3 font-mono text-fluid-xs uppercase tracking-[0.22em] text-bone-50/45">
                  Phase {i + 1} of {acts.length}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
