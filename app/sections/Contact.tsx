import { useEffect, useRef } from "react";
import { Container } from "~/components/Container";
import { RevealText } from "~/components/RevealText";
import { ensureGsap } from "~/animations/gsap.client";
import { splitText } from "~/animations/primitives";
import { useReducedMotion } from "~/hooks/useReducedMotion";

export function Contact() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      const giant = ref.current!.querySelector<HTMLElement>("[data-giant]");
      if (giant) {
        const s = splitText(giant, "chars");
        gsap.from(s.chars ?? [], {
          yPercent: 110,
          opacity: 0,
          duration: 1.3,
          stagger: 0.012,
          ease: "expo.out",
          scrollTrigger: { trigger: giant, start: "top 80%", once: true },
        });
      }
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={ref}
      id="contact"
      className="relative bg-ink-950 pt-section pb-section"
    >
      <Container>
        <p className="eyebrow mb-10 sm:mb-12">06 — Contact · End credits</p>

        <h2
          data-giant
          data-split="chars"
          className="heading-display text-fluid-4xl md:text-fluid-5xl uppercase text-balance"
        >
          <span className="block">Begin</span>
          <span className="block italic font-light text-bone-50/85">writing</span>
          <span className="block">your&nbsp;space<span className="text-rust-500">.</span></span>
        </h2>

        <div className="mt-16 md:mt-24 grid grid-cols-1 gap-10 md:gap-12 md:grid-cols-12">
          <RevealText
            as="p"
            by="words"
            className="md:col-span-7 font-display text-fluid-xl md:text-fluid-2xl leading-[1.15] text-pretty"
          >
            <span>Tell us the scene you’re imagining.</span>{" "}
            <span className="italic font-light text-bone-50/70">
              A floor plan, a moodboard, a single sentence —
            </span>{" "}
            <span>we read briefs the way directors read scripts.</span>
          </RevealText>

          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:pl-12">
            <div>
              <p className="eyebrow mb-3">General</p>
              <a className="font-display text-fluid-base sm:text-fluid-lg link-underline break-words" href="mailto:info@scenariosd.com">
                info@scenariosd.com
              </a>
            </div>
            <div>
              <p className="eyebrow mb-3">Suppliers</p>
              <a className="font-display text-fluid-base sm:text-fluid-lg link-underline break-words" href="mailto:Engineer@scenariosd.com">
                Engineer@scenariosd.com
              </a>
            </div>
            <div>
              <p className="eyebrow mb-3">Branding</p>
              <a className="font-display text-fluid-base sm:text-fluid-lg link-underline break-words" href="mailto:reham@scenariosd.com">
                reham@scenariosd.com
              </a>
            </div>
            <div>
              <p className="eyebrow mb-3">Direct · WhatsApp</p>
              <a
                className="font-display text-fluid-base sm:text-fluid-lg link-underline"
                href="https://wa.me/96596000691"
                target="_blank"
                rel="noreferrer"
              >
                +965 9 6000 691
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-20 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
          <a
            href="mailto:info@scenariosd.com?subject=New%20project"
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-bone-50 px-6 sm:px-8 py-3.5 sm:py-4 font-mono text-[11px] sm:text-fluid-sm uppercase tracking-[0.18em] text-ink-950 hover:bg-bone-100 transition-colors duration-500 ease-out-cinema"
            data-cursor="Email"
          >
            Start a project
          </a>
          <a
            href="https://wa.me/96596000691"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center justify-center gap-3 rounded-full border border-bone-50/25 px-6 sm:px-8 py-3.5 sm:py-4 font-mono text-[11px] sm:text-fluid-sm uppercase tracking-[0.18em] text-bone-50 hover:border-bone-50/60 hover:bg-bone-50/[0.04] transition-colors duration-500 ease-out-cinema"
            data-cursor="WhatsApp"
          >
            WhatsApp the studio
          </a>
        </div>
      </Container>
    </section>
  );
}
