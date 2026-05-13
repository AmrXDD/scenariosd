import { useRef } from "react";
import { useGSAP as useGSAPBase } from "@gsap/react";
import { gsap } from "gsap";
import { ensureGsap } from "~/animations/gsap.client";

type Setup = (ctx: { gsap: typeof gsap; root: HTMLElement }) => void | (() => void);

export function useGsap<T extends HTMLElement = HTMLDivElement>(
  setup: Setup,
  deps: React.DependencyList = []
) {
  const ref = useRef<T | null>(null);

  useGSAPBase(
    () => {
      if (typeof window === "undefined") return;
      ensureGsap();
      if (!ref.current) return;
      const cleanup = setup({ gsap, root: ref.current });
      return cleanup;
    },
    { scope: ref, dependencies: [...deps] }
  );

  return ref;
}
