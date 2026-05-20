import { useEffect, useRef } from "react";
import { Link } from "@remix-run/react";
import { Container } from "~/components/Container";
import { RevealText } from "~/components/RevealText";
import { MagneticButton } from "~/components/MagneticButton";
import { ensureGsap } from "~/animations/gsap.client";
import { useReducedMotion } from "~/hooks/useReducedMotion";
import { useRequestDeck } from "~/components/RequestDeckModal";
import { projects } from "~/data/projects";
import { cn } from "~/utils/cn";

export function Work() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const { open: openDeck } = useRequestDeck();

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
              onClick={openDeck}
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
                key={p.slug}
                data-work-card
                className={cn(
                  "grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10 md:items-end"
                )}
              >
                <Link
                  to={`/work/${p.slug}`}
                  prefetch="intent"
                  data-cursor="View"
                  aria-label={`Open ${p.title} case study`}
                  className={cn(
                    "group/card md:col-span-7 relative aspect-[4/5] overflow-hidden rounded-sm border hairline bg-ink-900 outline-none focus-visible:ring-2 focus-visible:ring-rust-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950",
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
                    <div className="flex items-end justify-between gap-4">
                      <h3 className="font-display text-fluid-2xl md:text-fluid-3xl leading-[1.0] text-balance">
                        {p.title}
                      </h3>
                      <span
                        aria-hidden
                        className="hidden sm:inline-flex shrink-0 items-center gap-2 rounded-full border border-bone-50/25 bg-ink-950/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50/85 backdrop-blur-sm transition-transform duration-500 ease-out-cinema group-hover/card:translate-x-0.5"
                      >
                        View case <span>↗</span>
                      </span>
                    </div>
                  </div>
                </Link>

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

                  <div
                    data-work-meta-item
                    className={cn(reverse && "md:flex md:justify-end")}
                  >
                    <Link
                      to={`/work/${p.slug}`}
                      prefetch="intent"
                      className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50 link-underline"
                    >
                      Read case study
                      <span aria-hidden>↗</span>
                    </Link>
                  </div>
                </aside>
              </article>
            );
          })}
        </div>

        <footer className="mt-20 md:mt-32 flex flex-col items-start gap-6 border-t hairline pt-10 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-fluid-base text-bone-50/70 text-pretty">
            We take good care of our clients' privacy — our portfolio is shared
            on request.{" "}
            <button
              type="button"
              onClick={openDeck}
              className="text-bone-50 link-underline"
            >
              Click here
            </button>{" "}
            to get instant access to our portfolio file. Or contact{" "}
            <a
              href="mailto:reham@scenariosd.com"
              className="text-bone-50 link-underline"
            >
              reham@scenariosd.com
            </a>
            .
          </p>
          <button
            type="button"
            onClick={openDeck}
            data-cursor="Deck"
            className="font-mono text-fluid-xs uppercase tracking-[0.22em] text-bone-50 link-underline"
          >
            Download company profile ↓
          </button>
        </footer>
      </Container>
    </section>
  );
}
