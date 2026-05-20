import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ForwardedRef,
} from "react";
import { cn } from "~/utils/cn";

type Ctx = { open: () => void; close: () => void; isOpen: boolean };

const RequestDeckContext = createContext<Ctx | null>(null);

export function useRequestDeck() {
  const ctx = useContext(RequestDeckContext);
  if (!ctx) {
    throw new Error("useRequestDeck must be used within RequestDeckProvider");
  }
  return ctx;
}

export const PORTFOLIO_HREF = "/scenarios-portfolio.pdf";

export function RequestDeckProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <RequestDeckContext.Provider value={value}>
      {children}
      <RequestDeckModal />
    </RequestDeckContext.Provider>
  );
}

function RequestDeckModal() {
  const { isOpen, close } = useRequestDeck();
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) return;
    const t = window.setTimeout(() => {
      setCompany("");
      setPhone("");
      setSubmitted(false);
    }, 400);
    return () => window.clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 80);
    return () => window.clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!company.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[70] flex items-center justify-center px-4 sm:px-6 transition-opacity duration-500 ease-out-cinema",
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        aria-label="Close"
        tabIndex={isOpen ? 0 : -1}
        onClick={close}
        className="absolute inset-0 cursor-default bg-ink-950/85 backdrop-blur-xl"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-deck-title"
        className={cn(
          "relative w-full max-w-lg overflow-hidden rounded-3xl border hairline bg-ink-900 shadow-[0_30px_120px_-20px_rgba(0,0,0,0.7)] transition-[transform,opacity] duration-700 ease-out-cinema",
          isOpen ? "translate-y-0 scale-100" : "translate-y-6 scale-95"
        )}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close dialog"
          tabIndex={isOpen ? 0 : -1}
          className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-bone-50/15 text-bone-50/80 transition-colors duration-300 hover:border-bone-50/40 hover:text-bone-50"
        >
          <span aria-hidden className="relative block h-3 w-3">
            <span className="absolute inset-0 my-auto h-px w-3 rotate-45 bg-current" />
            <span className="absolute inset-0 my-auto h-px w-3 -rotate-45 bg-current" />
          </span>
        </button>

        <div className="p-6 sm:p-8 md:p-10">
          {!submitted ? (
            <form onSubmit={handleSubmit} noValidate>
              <p className="eyebrow mb-3">— Portfolio</p>
              <h2
                id="request-deck-title"
                className="heading-display text-fluid-2xl md:text-fluid-3xl text-balance"
              >
                Request the deck
                <span className="text-rust-500">.</span>
              </h2>
              <p className="mt-4 text-fluid-sm text-bone-50/70 text-pretty">
                Share your company name and number — we'll unlock the link to
                the latest Scenarios portfolio.
              </p>

              <div className="mt-7 sm:mt-8 space-y-5">
                <Field
                  ref={firstFieldRef}
                  id="rd-company"
                  label="Company"
                  value={company}
                  onChange={setCompany}
                  placeholder="e.g. Adam Group"
                  autoComplete="organization"
                  required
                />
                <Field
                  id="rd-phone"
                  label="Phone"
                  value={phone}
                  onChange={setPhone}
                  placeholder="+965 9 000 0000"
                  type="tel"
                  autoComplete="tel"
                  required
                />
              </div>

              <div className="mt-8 sm:mt-10 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50/45">
                  Your details stay with Scenarios.
                </p>
                <button
                  type="submit"
                  tabIndex={isOpen ? 0 : -1}
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-rust-500 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-50 transition-colors duration-500 ease-out-cinema hover:bg-rust-600"
                >
                  Get the link
                  <span
                    aria-hidden
                    className="transition-transform duration-500 ease-out-cinema group-hover:translate-x-1"
                  >
                    ↗
                  </span>
                </button>
              </div>
            </form>
          ) : (
            <div>
              <p className="eyebrow mb-3">— Portfolio · Unlocked</p>
              <h2
                id="request-deck-title"
                className="heading-display text-fluid-2xl md:text-fluid-3xl text-balance"
              >
                Thank you
                <span className="text-rust-500">.</span>
              </h2>
              <p className="mt-4 text-fluid-sm text-bone-50/70 text-pretty">
                Your link is ready. Tap below to download the Scenarios
                company profile. If anything's missing, write to{" "}
                <a
                  className="link-underline text-bone-50"
                  href="mailto:reham@scenariosd.com"
                >
                  reham@scenariosd.com
                </a>
                .
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href={PORTFOLIO_HREF}
                  download
                  tabIndex={isOpen ? 0 : -1}
                  className="group inline-flex flex-1 items-center justify-center gap-3 rounded-full bg-bone-50 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-950 transition-colors duration-500 ease-out-cinema hover:bg-bone-100"
                >
                  Download portfolio (PDF)
                  <span
                    aria-hidden
                    className="transition-transform duration-500 ease-out-cinema group-hover:translate-y-px"
                  >
                    ↓
                  </span>
                </a>
                <button
                  type="button"
                  onClick={close}
                  tabIndex={isOpen ? 0 : -1}
                  className="inline-flex items-center justify-center rounded-full border border-bone-50/25 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-50 transition-colors duration-500 ease-out-cinema hover:border-bone-50/60 hover:bg-bone-50/[0.04]"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-px left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-rust-500/60 to-transparent"
        />
      </div>
    </div>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
};

const Field = forwardRef(function Field(
  props: FieldProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const {
    id,
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    autoComplete,
    required,
  } = props;
  return (
    <div className="group">
      <label
        htmlFor={id}
        className="block font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50/55"
      >
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="mt-2 w-full border-0 border-b border-bone-50/15 bg-transparent px-0 py-2.5 font-display text-fluid-lg text-bone-50 placeholder:text-bone-50/30 outline-none transition-[border-color] duration-300 focus:border-bone-50/60"
      />
    </div>
  );
});
