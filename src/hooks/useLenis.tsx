"use client";

import { useEffect, useRef } from "react";

/**
 * useLenis — initialises Lenis smooth scroll and connects it to GSAP ScrollTrigger.
 * Must be mounted at the root layout level.
 */
export function useLenis() {
  const lenisRef = useRef<InstanceType<typeof import("lenis").default> | null>(null);

  useEffect(() => {
    let lenis: InstanceType<typeof import("lenis").default>;
    let rafId: number;

    async function init() {
      const { default: Lenis } = await import("lenis");
      const { ScrollTrigger } = await import("@/lib/gsap");

      lenis = new Lenis({
        lerp: 0.08,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
      });

      lenisRef.current = lenis;

      // Connect Lenis to GSAP ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => {
        lenis.raf(time * 1000);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    init();

    return () => {
      cancelAnimationFrame(rafId);
      lenisRef.current?.destroy();
    };
  }, []);

  return lenisRef;
}
