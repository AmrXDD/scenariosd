import { useEffect, useRef } from "react";
import { Container } from "~/components/Container";
import { RevealText } from "~/components/RevealText";
import { ensureGsap } from "~/animations/gsap.client";
import { useReducedMotion } from "~/hooks/useReducedMotion";

const paragraphs = [
  "Scenarios began as a film script — Tariq Alsharif left dentistry, studied Multi-Media and Film Production at McMaster, and built sets, lit rooms, arranged furniture until he understood how space behaves on camera.",
  "In 2010 he brought that craft home to Kuwait and turned it inward — from staging fictions to staging the everyday. Showrooms. Diwaniyas. Retail floors. Workshops.",
  "Every project still begins the same way: as a script. A brief is read like a story. A space is blocked like a scene. A material is cast like a character. Nothing is decorative; everything is intentional.",
];

export function Manifesto() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current || !stickyRef.current) return;
    const { gsap, ScrollTrigger } = ensureGsap();

    const ctx = gsap.context(() => {
      const items = sectionRef.current!.querySelectorAll<HTMLElement>("[data-manifesto-line]");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0.18, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: "expo.out",
            scrollTrigger: {
              trigger: item,
              start: "top 78%",
              end: "top 38%",
              scrub: 0.8,
            },
          }
        );
      });

      const quote = sectionRef.current!.querySelector("[data-manifesto-quote]");
      if (quote) {
        gsap.fromTo(
          quote,
          { yPercent: 8 },
          {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: stickyRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative bg-ink-950 py-section"
    >
      <Container className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-20">
        <aside className="md:col-span-4">
          <div ref={stickyRef} className="md:sticky md:top-32">
            <p className="eyebrow mb-5 sm:mb-6">02 — Manifesto</p>
            <RevealText
              as="h2"
              by="words"
              className="heading-display text-fluid-2xl md:text-fluid-3xl mb-8 sm:mb-10 text-balance"
            >
              <span>A&nbsp;project is&nbsp;a</span>{" "}
              <span className="italic font-light text-rust-500">script</span>{" "}
              <span>manifested</span>{" "}
              <span>into&nbsp;reality.</span>
            </RevealText>

            <figure className="mb-8 sm:mb-10 overflow-hidden rounded-sm border hairline">
              <img
                src="https://scenariosd.com/wp-content/uploads/2025/04/tariq-e1745157142409.webp"
                alt="Tariq Alsharif, founder of Scenarios Design Kuwait"
                loading="lazy"
                decoding="async"
                className="block w-full aspect-[4/5] object-cover grayscale-[20%] contrast-[1.05]"
              />
            </figure>

            <blockquote
              data-manifesto-quote
              className="border-l hairline pl-5 sm:pl-6 font-display italic text-fluid-base text-bone-50/75 will-change-transform"
            >
              “Scenarios is a reflection of my passion. The project is a script
              manifested into reality with every client.”
              <footer className="mt-4 font-mono text-[10px] sm:text-[11px] not-italic uppercase tracking-[0.22em] text-bone-50/55">
                — Tariq Alsharif, Founder
              </footer>
            </blockquote>
          </div>
        </aside>

        <div className="md:col-span-7 md:col-start-6 space-y-12 sm:space-y-16 md:space-y-24">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              data-manifesto-line
              className="font-display text-fluid-xl md:text-fluid-2xl leading-[1.1] text-pretty"
            >
              <span className="mr-3 align-top font-mono text-fluid-xs uppercase tracking-[0.22em] text-rust-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              {p}
            </p>
          ))}

          <div className="grid grid-cols-2 gap-6 border-t hairline pt-12 md:grid-cols-4">
            {[
              ["2010", "First brief"],
              ["2015", "Studio est."],
              ["12", "Disciplines"],
              ["1", "Roof, end-to-end"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-fluid-2xl leading-none">{n}</p>
                <p className="mt-2 font-mono text-fluid-xs uppercase tracking-[0.22em] text-bone-50/55">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
