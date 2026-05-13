import { RevealText } from "./RevealText";

export function Footer() {
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
