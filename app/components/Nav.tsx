import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "@remix-run/react";
import { ensureGsap } from "~/animations/gsap.client";
import { smoothScrollTo } from "~/utils/smoothScroll";
import { cn } from "~/utils/cn";
import { useRequestDeck } from "~/components/RequestDeckModal";

const links = [
  { label: "Manifesto", href: "#manifesto" },
  { label: "Craft", href: "#craft" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const ref = useRef<HTMLElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  const { open: openDeck } = useRequestDeck();
  const onHome = location.pathname === "/";

  useEffect(() => {
    if (typeof window === "undefined") return;
    ensureGsap();

    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (!onHome) {
        setActive("");
        return;
      }
      const sections = links
        .map((l) => document.querySelector(l.href) as HTMLElement | null)
        .filter(Boolean) as HTMLElement[];
      const y = window.scrollY + window.innerHeight * 0.35;
      let current = "";
      for (const s of sections) {
        if (s.offsetTop <= y) current = `#${s.id}`;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const goToAnchor = (href: string) => {
    if (onHome) {
      smoothScrollTo(href, -8);
      history.replaceState(null, "", href);
    } else {
      navigate(`/${href}`);
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setOpen(false);
    goToAnchor(href);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setOpen(false);
    if (onHome) {
      smoothScrollTo("#hero", -8);
      history.replaceState(null, "", "/");
    } else {
      navigate("/");
    }
  };

  const handleDeckClick = () => {
    setOpen(false);
    openDeck();
  };

  return (
    <>
      <header
        ref={ref}
        className="fixed inset-x-0 top-0 z-50 pointer-events-none"
      >
        <div className="container-fluid pt-3 sm:pt-5">
          <div
            className={cn(
              "pointer-events-auto mx-auto flex items-center gap-3 rounded-full border transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500 ease-out-cinema",
              "px-3 py-2 sm:px-4 sm:py-2.5",
              scrolled
                ? "bg-ink-900/70 border-bone-50/15 backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]"
                : "bg-ink-900/30 border-bone-50/10 backdrop-blur-md"
            )}
          >
            <a
              href="/"
              onClick={handleLogoClick}
              data-cursor="Top"
              className="group flex items-center pl-1.5 pr-2 sm:pl-2 sm:pr-3"
              aria-label="Scenarios Design Kuwait — home"
            >
              <img
                src="https://scenariosd.com/wp-content/uploads/2025/11/png-logo-wite-no-bkgound.png"
                alt="Scenarios Design Kuwait"
                width={160}
                height={64}
                className="h-10 sm:h-12 w-auto object-contain"
                loading="eager"
                decoding="async"
              />
            </a>

            <span aria-hidden className="hidden md:block h-6 w-px bg-bone-50/15" />

            <nav className="hidden md:flex flex-1" aria-label="Primary">
              <ul className="flex items-center gap-1">
                {links.map((l) => {
                  const isActive = active === l.href;
                  return (
                    <li key={l.href}>
                      <a
                        href={onHome ? l.href : `/${l.href}`}
                        onClick={(e) => handleNavClick(e, l.href)}
                        data-cursor={l.label}
                        className={cn(
                          "relative inline-flex items-center rounded-full px-3.5 lg:px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-500 ease-out-cinema",
                          isActive
                            ? "text-ink-950 bg-bone-50"
                            : "text-bone-50/75 hover:text-bone-50"
                        )}
                      >
                        {l.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <button
              type="button"
              onClick={handleDeckClick}
              data-cursor="Deck"
              className="ml-auto hidden md:inline-flex items-center gap-2 rounded-full border border-bone-50/20 px-3.5 lg:px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-50/80 hover:text-bone-50 hover:border-bone-50/45 transition-colors duration-500 ease-out-cinema"
            >
              <span aria-hidden className="text-bone-50/60">↓</span>
              Company Profile
            </button>

            <a
              href={onHome ? "#contact" : "/#contact"}
              onClick={(e) => handleNavClick(e, "#contact")}
              data-cursor="Talk"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-rust-500 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-50 hover:bg-rust-600 transition-colors duration-500 ease-out-cinema"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-bone-50 animate-pulse" />
              Start a project
            </a>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="md:hidden ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-bone-50/15 text-bone-50 transition-colors duration-300 active:bg-bone-50/10"
            >
              <span className="relative block h-4 w-5">
                <span
                  className={cn(
                    "absolute left-0 right-0 top-1 h-px bg-bone-50 transition-transform duration-500 ease-out-cinema",
                    open && "translate-y-[7px] rotate-45"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 right-0 top-1/2 h-px bg-bone-50 transition-opacity duration-300",
                    open && "opacity-0"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 right-0 bottom-1 h-px bg-bone-50 transition-transform duration-500 ease-out-cinema",
                    open && "-translate-y-[7px] -rotate-45"
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-opacity duration-500 ease-out-cinema",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-ink-950/85 backdrop-blur-xl" />
        <nav
          className={cn(
            "absolute inset-x-3 top-20 max-h-[calc(100dvh-6rem)] overflow-y-auto overflow-x-hidden rounded-3xl border hairline bg-ink-900/95 transition-transform duration-700 ease-out-cinema origin-top",
            open ? "scale-100 translate-y-0" : "scale-95 -translate-y-4"
          )}
          aria-label="Mobile primary"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-6 pt-6 pb-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50/45">
              Menu
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50/30">
              Sc / 2026
            </p>
          </div>

          <ul className="px-6">
            {links.map((l, i) => (
              <li key={l.href}>
                <a
                  href={onHome ? l.href : `/${l.href}`}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className="flex items-baseline gap-5 border-b hairline last:border-b-0 py-4 font-display text-[1.75rem] leading-none"
                >
                  <span className="w-6 shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="space-y-3 border-t hairline bg-ink-950/40 px-6 py-5">
            <button
              type="button"
              onClick={handleDeckClick}
              className="flex w-full items-center justify-between gap-3 rounded-full border border-bone-50/15 px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-50"
            >
              <span>Download Company Profile</span>
              <span aria-hidden className="text-bone-50/40">PDF</span>
            </button>

            <a
              href={onHome ? "#contact" : "/#contact"}
              onClick={(e) => handleNavClick(e, "#contact")}
              className="flex items-center justify-center gap-2 rounded-full bg-rust-500 px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-50"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-bone-50 animate-pulse" />
              Start a project
            </a>
          </div>

          <div className="border-t hairline px-6 py-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50/45">
              Salhiya, Kuwait City
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50/30">
              Est. 2015
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
