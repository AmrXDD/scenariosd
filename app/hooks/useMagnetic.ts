import { useEffect, useRef } from "react";
import { magneticEffect } from "~/animations/primitives";
import { useReducedMotion } from "./useReducedMotion";

export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(
  opts: { strength?: number; radius?: number } = {}
) {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const cleanup = magneticEffect(ref.current, opts);
    return cleanup;
  }, [reduced, opts.strength, opts.radius]);

  return ref;
}
