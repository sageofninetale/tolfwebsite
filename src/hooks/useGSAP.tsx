"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * useGSAP — wraps GSAP context for proper React cleanup.
 * Use this inside any component to register animations safely.
 */
export function useGSAP(
  callback: (context: gsap.Context) => void,
  dependencies: React.DependencyList = []
) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      callback(ctx);
    }, containerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return containerRef;
}
