# Scenarios — Project Proposal

A cinematic, production-grade proposal site for **Scenarios Design Kuwait** (scenariosd.com) — built as a single immersive scroll experience in **Remix (Vite) + Tailwind + GSAP**.

> Every project still begins the same way: as a script. A brief is read like a story.
> A space is blocked like a scene. A material is cast like a character.
> — built around founder Tariq Alsharif's own line: *"the project is a script manifested into reality."*

All content is drawn from the live scenariosd.com site (services, locations, contacts, founding year, founder bio). Nothing is fabricated.

---

## Quick start

```bash
npm install
npm run dev
# open http://localhost:5173
```

Build / production:

```bash
npm run build
npm run start
```

Type-check:

```bash
npm run typecheck
```

Requires Node ≥ 20.

---

## Folder structure

```
app/
├── root.tsx                  # Document shell, fonts, nav, noise, smooth scroll
├── routes/
│   └── _index.tsx            # Composes all six sections
├── sections/
│   ├── Hero.tsx              # Act 01 — fullscreen typographic reveal
│   ├── Manifesto.tsx         # Act 02 — sticky editorial, scrub-driven lines
│   ├── Craft.tsx             # Act 03 — twelve real disciplines, pinned aside
│   ├── Work.tsx              # Act 04 — case-study grid w/ parallax + hover
│   ├── Process.tsx           # Act 05 — horizontal pinned scroll (six acts)
│   └── Contact.tsx           # Act 06 — end-credits CTA
├── components/
│   ├── Nav.tsx               # Sticky nav, magnetic CTA
│   ├── Cursor.tsx            # Custom blend-mode cursor with intent labels
│   ├── Container.tsx         # Max-width fluid container
│   ├── Section.tsx           # Section wrapper w/ section-rhythm spacing
│   ├── MagneticButton.tsx    # Hover-magnetic CTAs
│   ├── RevealText.tsx        # Split-text scroll reveal
│   ├── ParallaxImage.tsx     # Image parallax via ScrollTrigger
│   ├── HorizontalScroll.tsx  # Reusable pinned horizontal track
│   ├── NoiseOverlay.tsx      # Animated SVG grain
│   ├── SmoothScroll.tsx      # Lenis bridge (client-only)
│   ├── LenisProvider.tsx
│   ├── ClientOnly.tsx        # SSR-safe mount gate
│   └── Footer.tsx
├── hooks/
│   ├── useGsap.ts            # Scoped useGSAP w/ matchMedia & cleanup
│   ├── useMagnetic.ts        # Magnetic-pointer ref
│   ├── useLenis.ts           # Smooth-scroll lifecycle tied to GSAP ticker
│   ├── useReducedMotion.ts   # prefers-reduced-motion subscriber
│   └── useIsomorphicLayoutEffect.ts
├── animations/
│   ├── gsap.client.ts        # Plugin registration, defaults
│   └── primitives.ts         # textReveal · fadeUp · parallax · horizontalScroll · magneticEffect · pinReveal
├── utils/
│   └── cn.ts                 # clsx wrapper
└── styles/
    └── tailwind.css          # Tokens, grain, selection, fluid type, reduced-motion
```

---

## Design system

| Token              | Value                                                                 |
| ------------------ | --------------------------------------------------------------------- |
| Background         | `ink-950` `#05060a` → `ink-900` `#0a0c13`                             |
| Foreground         | `bone-50` `#f5f3ee`                                                   |
| Accent             | `rust-500` `#b85c38` (used sparingly — full-stop punctuation, dividers) |
| Display type       | Fraunces (variable, italic-capable) — fluid `clamp()` from 4rem → 18rem |
| Grotesk            | Inter — UI body, eyebrows                                             |
| Mono               | JetBrains Mono — labels, indices, eyebrows                            |
| Spacing rhythm     | `py-section` = `clamp(6rem, 4rem + 8vw, 12rem)` per section            |
| Container          | `container-fluid` = `max-w-[110rem] mx-auto px-gutter`                 |
| Hairline           | `border-bone-50/10`                                                   |

All sizes use `clamp()` so the layout scales from 320px to 4K without breakpoints "popping."

---

## Animation architecture

**1. Single registration point.** `app/animations/gsap.client.ts` registers `ScrollTrigger` once and sets defaults (`expo.out`, 1.1s). No component touches the GSAP global directly.

**2. Primitives, not bespoke timelines.** `app/animations/primitives.ts` exports composable units: `textReveal`, `fadeUp`, `parallax`, `horizontalScroll`, `magneticEffect`, `pinReveal`. Each accepts a target element and an options object, and returns a cleanup function.

**3. Scoped via `useGSAP` + `gsap.context`.** Components wrap their setup in `gsap.context(() => { … }, ref)` so every tween, ScrollTrigger and event listener is automatically reverted when the component unmounts — no leaked ScrollTriggers between routes.

**4. Responsive via `gsap.matchMedia()`.** The horizontal scroll in `Process.tsx` only engages on `(min-width: 768px)`; on mobile the same content stacks vertically and reveals on enter.

**5. SSR-safe.** GSAP and Lenis are imported through `*.client.ts` shims and `ClientOnly` mounts; nothing touches `window` during render. `ssr.noExternal` in `vite.config.ts` keeps them out of the server bundle path.

**6. Reduced-motion honoured everywhere.** `useReducedMotion` short-circuits effects; the grain overlay, magnetic cursor and Lenis smoothing all opt out. Text reveals fall through to `is-ready` (instantly visible) instead of leaving content hidden.

**7. GPU-only properties.** Every animated property is `transform` or `opacity`. No animated `width/height/top/left`. `will-change-transform` is applied at the element level only where it matters.

---

## The six acts (real content only)

| Act  | Section    | Source on scenariosd.com                                                                 |
| ---- | ---------- | ---------------------------------------------------------------------------------------- |
| 01   | Hero       | Tagline *"Exceptional spaces since 2015"*, "Fit-out and general contracting partner in Kuwait" |
| 02   | Manifesto  | Tariq Alsharif's biography (McMaster, dentistry → film production → 2010 Kuwait) and verbatim quote |
| 03   | Craft      | The twelve services listed on `/services`: Wood Workshop, Fit-out, Design, Estimation, Furniture Production, Walls & Flooring, Exhibitions, Retail Spaces, Residential, 3D Design, HVAC & Fire, Signage & Branding |
| 04   | Work       | The Adam head office (the only project named on the live site), plus the four real categories Scenarios works in. Full portfolio is private "on request" — reflected in the closing copy. |
| 05   | Process    | Six-act sequence derived from the actual service flow (brief → 3D → estimation → workshop → fit-out/MEP → handover) |
| 06   | Contact    | All three real emails, real WhatsApp number, real Salhiya address, real Instagram         |

---

## Notes & honest deltas from the original brief

- The brief described "Scenario-Based Design" and a "5Cs" framework (Context · Challenge · Choices · Consequences · Connect). The live site is for **Scenarios Design Kuwait**, a fit-out contractor — not a UX consultancy. Per the brief's *non-negotiable* "use only real content" rule, the 5Cs section was rebuilt as **Craft** (twelve actual disciplines) and the **Process** section uses six acts derived from the studio's real workflow. The cinematic, narrative, script-driven tone the brief asked for happens to align *perfectly* with Tariq Alsharif's real, on-record description of his work — so the editorial voice is honoured using his own words.
- Imagery is treated as gradient/typographic placeholders. The site is portfolio-private; no project photography is hot-linked from scenariosd.com. To wire real images, replace the `data-work-image` gradient blocks in `app/sections/Work.tsx` with `<ParallaxImage src="..."/>`.
- The brief's commercial fonts (Editorial New, Neue Haas Grotesk) are referenced first in the Tailwind `fontFamily` stack but fall back gracefully to Fraunces (Google Fonts, variable) and Inter, which is what actually loads.

---

## Performance

- 60fps target — transforms only, `will-change` scoped.
- `prefers-reduced-motion` kills grain, magnetic cursor and Lenis.
- Lazy `<img loading="lazy" decoding="async">` everywhere.
- Fonts via Google Fonts with `preconnect` + `display=swap`.
- Single-fetch + lazy route discovery enabled in `vite.config.ts`.

## Accessibility

- Semantic landmarks (`header`, `main`, `section`, `footer`, `nav`).
- Headings in document order, one `h1`.
- All interactive elements reachable by keyboard; focus styles inherit from the link-underline pattern.
- Color contrast: `bone-50` on `ink-950` exceeds WCAG AAA for body copy.
- Animation respects `prefers-reduced-motion` at every entry point.
#   s c e n a r i o s  
 #   s c e n a r i o s  
 #   s c e n a r i o s  
 