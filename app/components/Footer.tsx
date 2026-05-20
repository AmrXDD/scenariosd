import { useLocation, useNavigate } from "@remix-run/react";
import { RevealText } from "./RevealText";
import { useRequestDeck } from "~/components/RequestDeckModal";
import { smoothScrollTo } from "~/utils/smoothScroll";

export function Footer() {
  const { open: openDeck } = useRequestDeck();
  const location = useLocation();
  const navigate = useNavigate();

  const goContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname === "/") {
      smoothScrollTo("#contact", -8);
    } else {
      navigate("/#contact");
    }
  };

  return (
    <footer className="relative border-t hairline bg-ink-900 text-bone-50">
      <div className="container-fluid pt-section pb-10 sm:pb-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <p className="eyebrow mb-5 sm:mb-6">— Sc/2026 · Kuwait</p>
            <RevealText
              as="h2"
              by="lines"
              className="heading-display text-fluid-3xl md:text-fluid-4xl text-balance"
            >
              <span>Have&nbsp;a&nbsp;space</span>
              <span className="block italic font-light text-bone-50/70">that&nbsp;needs</span>
              <span>writing&nbsp;into&nbsp;reality?</span>
            </RevealText>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
              <a
                href="/#contact"
                onClick={goContact}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-rust-500 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-50 hover:bg-rust-600 transition-colors duration-500 ease-out-cinema"
                data-cursor="Talk"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-bone-50 animate-pulse" />
                Start a project
              </a>
              <button
                type="button"
                onClick={openDeck}
                data-cursor="Deck"
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-bone-50/25 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-50 hover:border-bone-50/60 hover:bg-bone-50/[0.04] transition-colors duration-500 ease-out-cinema"
              >
                <span aria-hidden className="text-bone-50/65 transition-transform duration-500 ease-out-cinema group-hover:translate-y-px">↓</span>
                Download Company Profile
                <span aria-hidden className="text-bone-50/40">PDF</span>
              </button>
            </div>
          </div>

          <div className="md:col-span-5 md:pl-12 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 self-end">
            <div>
              <p className="eyebrow mb-3 sm:mb-4">Studio</p>
              <p className="font-display text-fluid-base sm:text-fluid-lg leading-snug">
                Ahmadi Tower, Office 3
                <br />
                Al Soor Street, Salhiya
                <br />
                Kuwait City
              </p>
            </div>
            <div>
              <p className="eyebrow mb-3 sm:mb-4">Direct</p>
              <ul className="space-y-2 font-display text-fluid-base sm:text-fluid-lg leading-snug break-words">
                <li>
                  <a className="link-underline" href="mailto:info@scenariosd.com">
                    info@scenariosd.com
                  </a>
                </li>
                <li>
                  <a
                    className="link-underline"
                    href="mailto:Engineer@scenariosd.com"
                  >
                    Engineer@scenariosd.com
                  </a>
                </li>
                <li>
                  <a className="link-underline" href="mailto:reham@scenariosd.com">
                    reham@scenariosd.com
                  </a>
                </li>
                <li>
                  <a
                    className="link-underline"
                    href="https://wa.me/96596000691"
                    target="_blank"
                    rel="noreferrer"
                  >
                    +965 9 6000 691
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-section grid grid-cols-1 gap-6 border-t hairline pt-8 md:grid-cols-3 md:items-end">
          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-bone-50/55">
            © Scenarios Design Kuwait
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> · </span>
            Exceptional spaces since 2015
          </p>

          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-bone-50/55 md:text-center">
            Made by{" "}
            <a
              href="https://covalenstudios.cloud"
              target="_blank"
              rel="noreferrer"
              data-cursor="Covalen"
              className="text-bone-50 link-underline"
            >
              Amr Ghamrawy
            </a>{" "}
            <span aria-hidden>·</span>{" "}
            <a
              href="https://covalenstudios.cloud"
              target="_blank"
              rel="noreferrer"
              className="text-bone-50/80 link-underline"
            >
              CovalenStudios ↗
            </a>
          </p>

          <ul className="flex items-center gap-6 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] md:justify-end">
            <li>
              <button
                type="button"
                onClick={openDeck}
                className="link-underline"
              >
                Company profile ↓
              </button>
            </li>
            <li>
              <a
                href="https://instagram.com/scenarios.design"
                target="_blank"
                rel="noreferrer"
                className="link-underline"
              >
                Instagram ↗
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/96596000691"
                target="_blank"
                rel="noreferrer"
                className="link-underline"
              >
                WhatsApp ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        aria-hidden
        className="select-none overflow-hidden border-t hairline py-2"
      >
        <div className="flex whitespace-nowrap animate-ticker">
          {Array.from({ length: 2 }).map((_, i) => (
            <span
              key={i}
              className="font-display italic text-[14vw] leading-[0.9] text-bone-50/10 px-8"
            >
              Scenarios — Exceptional spaces — Since 2015 — Kuwait — Scenarios —
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
