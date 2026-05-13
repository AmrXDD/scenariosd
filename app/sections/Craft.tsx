import { useEffect, useRef, useState } from "react";
import { Container } from "~/components/Container";
import { RevealText } from "~/components/RevealText";
import { ensureGsap } from "~/animations/gsap.client";
import { useReducedMotion } from "~/hooks/useReducedMotion";
import { cn } from "~/utils/cn";

type Discipline = {
  index: string;
  title: string;
  body: string;
  cluster: string;
};

const disciplines: Discipline[] = [
  {
    index: "01",
    title: "Fit-out",
    cluster: "Build",
    body: "Turn-key fit-out for retail, F&B, offices, and private interiors — we love working with local designers and bringing their drawings to life on site.",
  },
  {
    index: "02",
    title: "Wood Workshop",
    cluster: "Make",
    body: "Our own joinery floor in Shuwaikh Industrial Area. Skilled craftspeople, any scale — from a single console to a full retail rollout.",
  },
  {
    index: "03",
    title: "Furniture Production",
    cluster: "Make",
    body: "Custom pieces fabricated for diwaniyas, homes, retail spaces and restaurants — designed, prototyped and finished under one roof.",
  },
  {
    index: "04",
    title: "3D Design",
    cluster: "Design",
    body: "From dimension take-offs to fully developed concepts with detailed layouts — the script before the build.",
  },
  {
    index: "05",
    title: "Engineering & Estimation",
    cluster: "Design",
    body: "We evaluate how functional a design can be in reality, assess feasibility, and produce honest cost projections from design through execution.",
  },
  {
    index: "06",
    title: "Walls & Flooring",
    cluster: "Finish",
    body: "Gypsum, cladding, paint, glass, mirrors, doors, cubicles, soundproofing, tile, concrete, marble, wood, self-leveling — the surfaces a space lives on.",
  },
  {
    index: "07",
    title: "HVAC & Fire",
    cluster: "Systems",
    body: "Air-conditioning, ventilation and fire systems sized from proper heat-load calculations and the realities of each site.",
  },
  {
    index: "08",
    title: "Signage & Branding",
    cluster: "Finish",
    body: "Illuminated and non-illuminated signage executed against brand guidelines — the last sentence of the script.",
  },
  {
    index: "09",
    title: "Exhibitions",
    cluster: "Build",
    body: "Booth conceptualization, branding and delivery — from 3×3 standard sizes to bespoke dimensions.",
  },
  {
    index: "10",
    title: "Retail Spaces",
    cluster: "Build",
    body: "Design and execution for retail with consultation tuned to optimal ROI — store as stage.",
  },
  {
    index: "11",
    title: "Residential",
    cluster: "Build",
    body: "Private homes and diwaniyas — projects shown by request to protect our clients’ privacy.",
  },
  {
    index: "12",
    title: "End-to-End",
    cluster: "Studio",
    body: "Design, fabrication, MEP and finishing under one roof. One contract, one accountability, one rhythm of work.",
  },
];

export function Craft() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced || !ref.current) return;
    const { gsap, ScrollTrigger } = ensureGsap();

    const ctx = gsap.context(() => {
      const cards = ref.current!.querySelectorAll<HTMLElement>("[data-craft-card]");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 90%", once: true },
          }
        );
        ScrollTrigger.create({
          trigger: card,
          start: "top 55%",
          end: "bottom 55%",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });
      });
    }, ref);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={ref}
      id="craft"
      className="relative bg-ink-900 py-section border-y hairline"
    >
      <Container>
        <header className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end md:gap-10 pb-16 md:pb-section">
          <p className="eyebrow md:col-span-2">03 — Craft</p>
          <RevealText
            as="h2"
            by="words"
            className="heading-display text-fluid-3xl md:text-fluid-4xl md:col-span-7 text-balance"
          >
            <span>Twelve&nbsp;disciplines.</span>{" "}
            <span className="italic font-light">One&nbsp;roof.</span>{" "}
            <span>Zero&nbsp;handoffs.</span>
          </RevealText>
          <p className="md:col-span-3 text-fluid-base text-bone-50/70 text-pretty">
            We are designers, engineers and joiners working in the same building.
            That proximity is the product — fewer translations between intent and
            execution.
          </p>
        </header>

        <div className="relative grid grid-cols-1 gap-x-12 md:grid-cols-12">
          <aside className="hidden md:col-span-4 md:block">
            <div className="sticky top-32">
              <p className="eyebrow mb-6">Now reading</p>
              <p className="font-mono text-fluid-xs uppercase tracking-[0.22em] text-bone-50/55 mb-3">
                {disciplines[active].cluster}
              </p>
              <p className="font-display text-fluid-3xl leading-[0.95] text-bone-50 transition-opacity duration-700 ease-out-cinema">
                {disciplines[active].title}
              </p>
              <div className="mt-8 h-px w-full bg-bone-50/10">
                <div
                  className="h-px bg-rust-500 transition-[width] duration-700 ease-out-cinema"
                  style={{ width: `${((active + 1) / disciplines.length) * 100}%` }}
                />
              </div>
              <p className="mt-3 font-mono text-fluid-xs uppercase tracking-[0.22em] text-bone-50/45">
                {String(active + 1).padStart(2, "0")} / {disciplines.length}
              </p>
            </div>
          </aside>

          <ul className="md:col-span-8 space-y-px">
            {disciplines.map((d, i) => (
              <li
                key={d.index}
                data-craft-card
                className={cn(
                  "group relative grid grid-cols-12 gap-2 sm:gap-4 border-t hairline py-7 sm:py-10 transition-colors duration-700 ease-out-cinema",
                  i === active && "bg-ink-950/40"
                )}
              >
                <span className="col-span-12 sm:col-span-2 font-mono text-[10px] sm:text-fluid-xs uppercase tracking-[0.22em] text-bone-50/45">
                  {d.index}
                </span>
                <div className="col-span-12 sm:col-span-10">
                  <h3 className="font-display text-fluid-xl md:text-fluid-2xl leading-tight">
                    <span
                      className={cn(
                        "transition-colors duration-500 ease-out-cinema",
                        i === active ? "text-bone-50" : "text-bone-50/55 group-hover:text-bone-50"
                      )}
                    >
                      {d.title}
                    </span>
                    <span className="ml-3 font-mono text-fluid-xs uppercase tracking-[0.22em] text-bone-50/35">
                      / {d.cluster}
                    </span>
                  </h3>
                  <p className="mt-3 max-w-2xl text-fluid-base text-bone-50/70 text-pretty">
                    {d.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
