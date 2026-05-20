import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { Container } from "~/components/Container";
import { Footer } from "~/components/Footer";
import { RevealText } from "~/components/RevealText";
import { ensureGsap } from "~/animations/gsap.client";
import { useReducedMotion } from "~/hooks/useReducedMotion";
import { useRequestDeck } from "~/components/RequestDeckModal";
import { getProject, projects, type Project } from "~/data/projects";
import { cn } from "~/utils/cn";

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug;
  const project = slug ? getProject(slug) : undefined;
  if (!project) {
    throw new Response("Not Found", { status: 404 });
  }
  const i = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(i + 1) % projects.length];
  return json({ project, next });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [{ title: "Case — Scenarios" }];
  return [
    { title: `${data.project.title} — Scenarios Design Kuwait` },
    { name: "description", content: data.project.brief },
    { property: "og:title", content: `${data.project.title} — Scenarios` },
    { property: "og:description", content: data.project.brief },
    { property: "og:image", content: data.project.image },
    { name: "theme-color", content: "#05060a" },
  ];
};

export default function ProjectPage() {
  const { project, next } = useLoaderData<typeof loader>();
  const { open: openDeck } = useRequestDeck();
  const heroRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !heroRef.current) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const ctx = gsap.context(() => {
      const img = heroRef.current!.querySelector<HTMLElement>("[data-hero-img]");
      if (img) {
        gsap.fromTo(
          img,
          { yPercent: -8, scale: 1.08 },
          {
            yPercent: 6,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, heroRef);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [reduced]);

  return (
    <main className="relative">
      <ProjectHero project={project} heroRef={heroRef} />

      <BeforeAfter project={project} />

      <WhatWeDid project={project} />

      <Outcome project={project} />

      <CaseFooter project={project} next={next} onOpenDeck={openDeck} />

      <Footer />
    </main>
  );
}

function ProjectHero({
  project,
  heroRef,
}: {
  project: Project;
  heroRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <section className="relative bg-ink-950 pt-32 sm:pt-36 md:pt-40 pb-section">
      <Container>
        <div className="mb-10 sm:mb-14 flex items-center justify-between gap-4">
          <Link
            to="/#work"
            prefetch="intent"
            className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-bone-50/70 hover:text-bone-50 transition-colors"
          >
            <span aria-hidden>←</span>
            Back to selected work
          </Link>
          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-bone-50/45">
            {project.index} · {project.year}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12 items-end">
          <div className="md:col-span-8">
            <p className="eyebrow mb-4">{project.location}</p>
            <RevealText
              as="h1"
              by="words"
              className="heading-display text-fluid-4xl md:text-fluid-5xl text-balance"
            >
              <span>{project.title}</span>
              <span className="text-rust-500">.</span>
            </RevealText>
            <p className="mt-6 max-w-2xl font-display text-fluid-lg md:text-fluid-xl leading-[1.25] text-bone-50/85 text-pretty">
              {project.brief}
            </p>
          </div>

          <dl className="md:col-span-4 grid grid-cols-2 gap-x-6 gap-y-5 border-t hairline pt-6">
            <MetaItem label="Scope" value={project.scope} />
            <MetaItem label="Year" value={project.year} />
            {project.meta.duration && (
              <MetaItem label="Duration" value={project.meta.duration} />
            )}
            {project.meta.area && (
              <MetaItem label="Setting" value={project.meta.area} />
            )}
            {project.meta.discipline && (
              <MetaItem
                label="Discipline"
                value={project.meta.discipline}
                wide
              />
            )}
          </dl>
        </div>
      </Container>

      <div
        ref={heroRef}
        className="container-fluid mt-14 md:mt-20"
      >
        <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-sm border hairline bg-ink-900">
          <img
            data-hero-img
            src={project.image}
            alt={project.alt}
            loading="eager"
            decoding="async"
            className="absolute inset-0 -inset-y-6 h-[calc(100%+3rem)] w-full object-cover will-change-transform"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-ink-950/30 via-transparent to-ink-950/40"
          />
        </div>
      </div>
    </section>
  );
}

function MetaItem({
  label,
  value,
  wide,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div className={cn(wide && "col-span-2")}>
      <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50/45">
        {label}
      </dt>
      <dd className="mt-1.5 font-display text-fluid-base text-bone-50 text-pretty">
        {value}
      </dd>
    </div>
  );
}

function BeforeAfter({ project }: { project: Project }) {
  return (
    <section className="relative bg-ink-950 py-section border-t hairline">
      <Container>
        <header className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end md:gap-10 pb-12 md:pb-16">
          <p className="eyebrow md:col-span-2">— Before / After</p>
          <RevealText
            as="h2"
            by="words"
            className="heading-display text-fluid-3xl md:text-fluid-4xl md:col-span-7 text-balance"
          >
            <span>The&nbsp;site,&nbsp;then</span>{" "}
            <span className="italic font-light">the&nbsp;script.</span>
          </RevealText>
          <p className="md:col-span-3 text-fluid-sm text-bone-50/65 text-pretty">
            Two frames. The room as we found it, and the room as we handed it
            back.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
          <Frame label="Before — site condition" tone="muted">
            {project.before ? (
              <img
                src={project.before.src}
                alt={project.before.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <BeforePlaceholder />
            )}
          </Frame>

          <Frame label="After — handover">
            <img
              src={project.image}
              alt={project.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-950/40"
            />
          </Frame>
        </div>
      </Container>
    </section>
  );
}

function Frame({
  children,
  label,
  tone,
}: {
  children: React.ReactNode;
  label: string;
  tone?: "muted";
}) {
  return (
    <figure
      className={cn(
        "relative aspect-[4/3] overflow-hidden rounded-sm border hairline",
        tone === "muted" ? "bg-ink-800" : "bg-ink-900"
      )}
    >
      {children}
      <figcaption className="absolute left-0 right-0 bottom-0 flex items-center justify-between gap-4 p-4 sm:p-5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-bone-50/85">
        <span>{label}</span>
      </figcaption>
    </figure>
  );
}

function BeforePlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(184,92,56,0.12),transparent_55%),linear-gradient(140deg,#0a0c13_0%,#1a1f30_100%)] text-bone-50/60">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50/45">
        Site survey — pre-build
      </span>
      <p className="mt-3 font-display italic text-fluid-base text-bone-50/55">
        photo placeholder
      </p>
    </div>
  );
}

function WhatWeDid({ project }: { project: Project }) {
  return (
    <section className="relative bg-ink-950 py-section border-t hairline">
      <Container>
        <header className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end md:gap-10 pb-12 md:pb-16">
          <p className="eyebrow md:col-span-2">— What we did</p>
          <RevealText
            as="h2"
            by="words"
            className="heading-display text-fluid-3xl md:text-fluid-4xl md:col-span-7 text-balance"
          >
            <span>One&nbsp;team,</span>{" "}
            <span className="italic font-light">one&nbsp;set&nbsp;of&nbsp;drawings,</span>{" "}
            <span>one&nbsp;handover.</span>
          </RevealText>
        </header>

        <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {project.whatWeDid.map((step, i) => (
            <li
              key={i}
              className="relative pl-12 sm:pl-14 border-t hairline pt-6"
            >
              <span className="absolute left-0 top-6 font-mono text-[10px] uppercase tracking-[0.22em] text-rust-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-display text-fluid-lg md:text-fluid-xl leading-[1.22] text-bone-50 text-pretty">
                {step}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-14 md:mt-20 flex flex-wrap gap-1.5 sm:gap-2 border-t hairline pt-8">
          <p className="w-full font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50/45 mb-3">
            — Materials
          </p>
          {project.materials.map((m) => (
            <span
              key={m}
              className="rounded-full border border-bone-50/15 px-3 py-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-bone-50/75"
            >
              {m}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Outcome({ project }: { project: Project }) {
  return (
    <section className="relative bg-ink-900 py-section border-t hairline">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 md:items-end">
          <p className="eyebrow md:col-span-2">— Outcome</p>
          <RevealText
            as="p"
            by="words"
            className="md:col-span-10 heading-display text-fluid-2xl md:text-fluid-3xl text-balance"
          >
            <span>{project.outcome}</span>
          </RevealText>
        </div>
      </Container>
    </section>
  );
}

function CaseFooter({
  project,
  next,
  onOpenDeck,
}: {
  project: Project;
  next: Project;
  onOpenDeck: () => void;
}) {
  return (
    <section className="relative bg-ink-950 py-section border-t hairline">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-end">
          <div className="md:col-span-7">
            <p className="eyebrow mb-5">— Next</p>
            <Link
              to={`/work/${next.slug}`}
              prefetch="intent"
              className="group block"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-50/55">
                {next.index} · {next.location}
              </p>
              <h3 className="mt-3 heading-display text-fluid-3xl md:text-fluid-4xl text-bone-50 text-balance">
                <span className="link-underline">{next.title}</span>
                <span aria-hidden className="ml-3 inline-block transition-transform duration-500 ease-out-cinema group-hover:translate-x-1">
                  ↗
                </span>
              </h3>
              <p className="mt-4 max-w-xl text-fluid-sm text-bone-50/65 text-pretty">
                {next.brief}
              </p>
            </Link>
          </div>

          <div className="md:col-span-5 md:pl-10 space-y-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50/45">
              — Take this with you
            </p>
            <p className="font-display text-fluid-lg md:text-fluid-xl text-bone-50 text-pretty">
              Get the full Scenarios company profile — every discipline, every
              service, in one PDF.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={onOpenDeck}
                data-cursor="Deck"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-bone-50 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-950 hover:bg-bone-100 transition-colors duration-500 ease-out-cinema"
              >
                Download Company Profile
                <span aria-hidden className="transition-transform duration-500 ease-out-cinema group-hover:translate-y-px">↓</span>
              </button>
              <Link
                to="/#contact"
                prefetch="intent"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-bone-50/25 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-50 hover:border-bone-50/60 hover:bg-bone-50/[0.04] transition-colors duration-500 ease-out-cinema"
              >
                Start a project
              </Link>
            </div>
            <p className="pt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50/40">
              Case: {project.title}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
