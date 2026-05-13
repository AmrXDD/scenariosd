import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "~/utils/cn";
import { useMagnetic } from "~/hooks/useMagnetic";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "ghost" | "outline";
  size?: "md" | "lg";
  icon?: ReactNode;
};

const base =
  "group inline-flex items-center justify-center gap-3 rounded-full font-mono uppercase tracking-[0.18em] transition-colors duration-500 ease-out-cinema will-change-transform";

const variants = {
  solid: "bg-bone-50 text-ink-950 hover:bg-bone-100",
  ghost: "bg-transparent text-bone-50 hover:text-bone-100",
  outline:
    "border border-bone-50/25 text-bone-50 hover:border-bone-50/60 hover:bg-bone-50/[0.04]",
};

const sizes = {
  md: "px-6 py-3 text-fluid-xs",
  lg: "px-8 py-4 text-fluid-sm",
};

export const MagneticButton = forwardRef<HTMLButtonElement, Props>(
  function MagneticButton(
    { variant = "outline", size = "md", icon, className, children, ...rest },
    _ref
  ) {
    const magRef = useMagnetic<HTMLButtonElement>({ strength: 0.3, radius: 140 });
    return (
      <button
        ref={magRef}
        className={cn(base, variants[variant], sizes[size], className)}
        {...rest}
      >
        <span className="inline-block translate-y-px">{children}</span>
        {icon ? <span aria-hidden>{icon}</span> : null}
      </button>
    );
  }
);
