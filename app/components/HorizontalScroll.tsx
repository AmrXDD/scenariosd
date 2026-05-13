import { useEffect, useRef, type ReactNode } from "react";
import { horizontalScroll } from "~/animations/primitives";
import { useReducedMotion } from "~/hooks/useReducedMotion";
import { cn } from "~/utils/cn";

type Props = {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
};

export function HorizontalScroll({ children, className, trackClassName }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !containerRef.current || !trackRef.current) return;
    const mq = window.matchMedia("(min-width: 768px)");
    if (!mq.matches) return;
    const cleanup = horizontalScroll(containerRef.current, trackRef.current);
    return cleanup;
  }, [reduced]);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      <div
        ref={trackRef}
        className={cn(
          "flex flex-col md:flex-row md:flex-nowrap gap-12 md:gap-0 will-change-transform",
          trackClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
