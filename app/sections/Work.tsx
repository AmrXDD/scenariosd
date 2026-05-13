import { useEffect, useRef } from "react";
import { Container } from "~/components/Container";
import { RevealText } from "~/components/RevealText";
import { MagneticButton } from "~/components/MagneticButton";
import { ensureGsap } from "~/animations/gsap.client";
import { useReducedMotion } from "~/hooks/useReducedMotion";
import { cn } from "~/utils/cn";

type Project = {
  index: string;
  title: string;
  location: string;
  scope: string;
  year: string;
  brief: string;
  note: string;
  materials: string[];
  image: string;
  alt: string;
};

const projects: Project[] = [
  {
    index: "Case 01",
    title: "Adam — Head Office",
    location: "Kuwait City",
    scope: "Fit-out · Joinery · Walls & Flooring",
    year: "Featured",
    brief:
      "A corporate floor staged as a calm, considered backdrop for the people who work inside it.",
    note: "End-to-end delivery from the Scenarios studio: design coordination, joinery from our Shuwaikh workshop, walls, lighting and finishing — all sequenced under one site manager.",
    materials: ["Veneered joinery", "Soft acoustics", "Warm directional lighting"],
    image:
      "https://scenariosd.com/wp-content/uploads/2025/04/whatsapp-image-2025-04-07-at-1.47.40-pm-4.jpeg",
    alt: "Adam head office interior in Kuwait — Scenarios Design fit-out",
  },
  {
    index: "Case 02",
    title: "Commercial Interior",
    location: "Kuwait City",
    scope: "Design · Fit-out · Finishing",
    year: "2025",
    brief:
      "A workspace shaped by material restraint. Joinery, walls and lighting built in-house to the same script.",
    note: "Detailed layouts and 3D were developed with the client before a single wall was framed. Every cabinet, every reveal, every surface was prototyped at our workshop and delivered to site as a kit of parts.",
    materials: ["Custom millwork", "Soft white walls", "Hard-wearing flooring"],
    image:
      "https://scenariosd.com/wp-content/uploads/2025/04/20250415_144156.jpg",
    alt: "Scenarios Design fit-out commercial interior in Kuwait",
  },
  {
    index: "Case 03",
    title: "Recent Build",
    location: "Kuwait",
    scope: "Joinery · Walls & Flooring · MEP",
    year: "2025",
    brief:
      "A fresh delivery from the Scenarios floor — the script staged, the room ready for its first audience.",
    note: "Joinery, walls, flooring and MEP coordinated end-to-end. Materials cast like characters — every junction drawn, fabricated and signed off against the same set of shop drawings.",
    materials: ["Wood-on-wood detailing", "HVAC integration", "Layered lighting"],
    image:
      "https://scenariosd.com/wp-content/uploads/2025/12/20251128_151259.jpg",
    alt: "Recent Scenarios Design build in Kuwait",
  },
  {
    index: "Case 04",
    title: "Retail / Studio Floor",
    location: "Kuwait",
    scope: "Concept · Fabrication · Fit-out",
    year: "2024",
    brief:
      "Retail floor as stage — sightlines, materials and signage tuned for the brand’s real customer journey.",
    note: "From dimension take-offs through 3D concept, into fabrication at our workshop, and onto site as a turn-key install — one accountable team for the entire production.",
    materials: ["Display joinery", "Brand signage", "Retail-grade flooring"],
    image: "https://scenariosd.com/wp-content/uploads/2025/04/img_66851.jpg",
    alt: "Retail interior delivered by Scenarios Design Kuwait",
  },
];

export function Work() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const { gsap, ScrollTrigger } = ensureGsap();

    const ctx = gsap.context(() => {
      const cards = ref.current!.querySelectorAll<HTMLElement>("[data-work-card]");
      cards.forEach((card) => {
        const inner = card.querySelector<HTMLElement>("[data-work-image]");
        const meta = card.querySelectorAll<HTMLElement>("[data-work-meta-item]");

        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );

        if (meta.length) {
          gsap.fromTo(
            meta,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.08,
              ease: "expo.out",
              scrollTrigger: { trigger: card, start: "top 82%", once: true },
            }
          );
        }

        if (inner) {
          gsap.fromTo(
            inner,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        const onEnter = () => {
          gsap.to(inner, { scale: 1.05, duration: 1.0, ease: "expo.out" });
        };
        const onLeave = () => {
          gsap.to(inner, { scale: 1, duration: 1.0, ease: "expo.out" });
        };
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        return () => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        };
      });
    }, ref);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [reduced]);

  return (
    <section ref={ref} id="work" className="relative bg-ink-950 py-section">
      <Container>
        <header className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end md:gap-10 pb-14 md:pb-20">
          <p className="eyebrow md:col-span-2">04 — Selected Work</p>
          <RevealText
            as="h2"
            by="words"
            className="heading-display text-fluid-3xl md:text-fluid-4xl md:col-span-7 text-balance"
          >
            <span>Spaces&nbsp;we’ve</span>{" "}
            <span className="italic font-light">staged.</span>{" "}
            <span>People&nbsp;we’ve</span>{" "}
            <span className="italic font-light">housed.</span>
          </RevealText>
          <div className="md:col-span-3 flex md:justify-end">
            <MagneticButton
              variant="outline"
              data-cursor="Portfolio"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.href =
                    "mailto:info@scenariosd.com?subject=Portfolio%20Request";
                }
              }}
            >
              Request the deck
            </MagneticButton>
          </div>
        </header>

        <div className="space-y-20 sm:space-y-24 md:space-y-32">
          {projects.map((p, i) => {
            const reverse = i % 2 === 1;
            return (
              <article
                key={p.title}
                data-work-card
                data-cursor="View"
                className={cn(
                  "grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10 md:items-end"
                )}
              >
                <div
                  className={cn(
                    "md:col-span-7 relative aspect-[4/5] overflow-hidden rounded-sm border hairline bg-ink-900",
                    reverse ? "md:col-start-6" : "md:col-start-1"
                  )}
                >
                  <img
                    data-work-image
                    src={p.image}
                    alt={p.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 -inset-y-6 h-[calc(100%+3rem)] w-full object-cover will-change-transform"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-b from-ink-950/30 via-transparent to-ink-950/65"
                  />
                  <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6 md:p-8">
                    <div className="flex items-baseline justify-between font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-bone-50/85">
                      <span>{p.index}</span>
                      <span>{p.year}</span>
                    </div>
                    <h3 className="font-display text-fluid-2xl md:text-fluid-3xl leading-[1.0] text-balance">
                      {p.title}
                    </h3>
                  </div>
                </div>

                <aside
                  className={cn(
                    "md:col-span-4 md:self-end space-y-5 sm:space-y-6 md:pb-2",
                    reverse
                      ? "md:col-start-1 md:row-start-1 md:text-right"
                      : "md:col-start-9"
                  )}
                >
                  <div data-work-meta-item className="space-y-1">
                    <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-rust-500">
                      {p.index} — {p.year}
                    </p>
                    <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-bone-50/55">
                      {p.location}
                    </p>
                  </div>

                  <p
                    data-work-meta-item
                    className="font-display text-fluid-lg md:text-fluid-xl leading-[1.18] text-bone-50 text-pretty"
                  >
                    {p.brief}
                  </p>

                  <p
                    data-work-meta-item
                    className="text-fluid-sm text-bone-50/70 text-pretty leading-relaxed"
                  >
                    {p.note}
                  </p>

                  <div
                    data-work-meta-item
                    className={cn(
                      "pt-3 sm:pt-4 border-t hairline space-y-2",
                      reverse && "md:flex md:flex-col md:items-end"
                    )}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50/40">
                      Scope
                    </p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-50/80">
                      {p.scope}
                    </p>
                  </div>

                  <ul
                    data-work-meta-item
                    className={cn(
                      "flex flex-wrap gap-1.5 sm:gap-2",
                      reverse && "md:justify-end"
                    )}
                  >
                    {p.materials.map((m) => (
                      <li
                        key={m}
                        className="rounded-full border border-bone-50/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-50/65"
                      >
                        {m}
                      </li>
                    ))}
                  </ul>
                </aside>
              </article>
            );
          })}
        </div>

        <footer className="mt-20 md:mt-32 flex flex-col items-start gap-6 border-t hairline pt-10 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-fluid-base text-bone-50/65 text-pretty">
            The complete portfolio — including private residences — is shared on
            request. We hold our clients’ privacy as carefully as their finishes.
          </p>
          <a
            href="mailto:info@scenariosd.com?subject=Portfolio%20Request"
            className="font-mono text-fluid-xs uppercase tracking-[0.22em] text-bone-50 link-underline"
          >
            info@scenariosd.com ↗
          </a>
        </footer>
      </Container>
    </section>
  );
}
