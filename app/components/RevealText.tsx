import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { textReveal } from "~/animations/primitives";
import { useReducedMotion } from "~/hooks/useReducedMotion";
import { cn } from "~/utils/cn";

type Props = {
  as?: ElementType;
  by?: "chars" | "words" | "lines";
  delay?: number;
  stagger?: number;
  scrub?: boolean | number;
  className?: string;
  children: ReactNode;
};

export function RevealText({
  as,
  by = "lines",
  delay = 0,
  stagger,
  scrub,
  className,
  children,
}: Props) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) {
      ref.current?.classList.add("is-ready");
      return;
    }
    const cleanup = textReveal(ref.current, { by, delay, stagger, scrub });
    return () => {
      cleanup?.();
    };
  }, [by, delay, stagger, scrub, reduced]);

  return (
    <Tag ref={ref} data-split={by} className={cn(className)}>
      {children}
    </Tag>
  );
}
