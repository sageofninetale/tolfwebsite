"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "@/lib/gsap";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef   = useRef<HTMLDivElement>(null);
  const clipsRef    = useRef<(HTMLDivElement | null)[]>([]);   // overflow:hidden wrappers
  const lettersRef  = useRef<(HTMLSpanElement | null)[]>([]);  // inner spans that translate
  const lineRef     = useRef<HTMLDivElement>(null);
  const taglineRef  = useRef<HTMLParagraphElement>(null);
  const tlRef       = useRef<gsap.core.Timeline | null>(null);
  const doneRef     = useRef(false);

  // Click-to-skip: ramp timeline to 8× speed so onComplete fires naturally
  const dismiss = useCallback(() => {
    if (doneRef.current) return;
    tlRef.current?.timeScale(8);
  }, []);

  useEffect(() => {
    const loader  = loaderRef.current;
    const line    = lineRef.current;
    const tagline = taglineRef.current;
    if (!loader) return;

    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];

    // ── Initial state ──────────────────────────────────────────
    gsap.set(letters, { y: "110%" });                             // below clip boundary
    gsap.set(line,    { scaleX: 0, transformOrigin: "left" });
    gsap.set(tagline, { opacity: 0, y: 12 });

    // ── Main timeline ──────────────────────────────────────────
    const tl = gsap.timeline({
      onComplete: () => {
        doneRef.current = true;
        window.removeEventListener("mousemove", onMouse);
        onComplete();
      },
    });
    tlRef.current = tl;

    // 1. Letters rise up, staggered
    tl.to(letters, {
      y: "0%",
      duration: 0.75,
      ease: "power3.out",
      stagger: 0.14,
    }, 0.1);

    // 2. Gold underline grows left → right
    tl.to(line, {
      scaleX: 1,
      duration: 0.65,
      ease: "power2.inOut",
    }, 0.55);

    // 3. Tagline fades in
    tl.to(tagline, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    }, 0.75);

    // 4. Hold
    tl.to({}, { duration: 0.75 });

    // 5. Curtain lifts up
    tl.to(loader, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.85,
      ease: "power4.inOut",
    });

    // ── Mouse parallax (interactive depth) ────────────────────
    // Each letter moves at a different x-speed, creating a sense
    // of 3D depth as the cursor moves. T moves least, F most.
    const onMouse = (e: MouseEvent) => {
      if (doneRef.current) return;
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const rx = (e.clientX - cx) / cx;  // -1 … 1
      const ry = (e.clientY - cy) / cy;

      const clips = clipsRef.current.filter(Boolean) as HTMLDivElement[];
      clips.forEach((clip, i) => {
        const speed = (i - 1.5) * 18;   // T: -27, O: -9, L: 9, F: 27
        gsap.to(clip, {
          x: rx * speed,
          y: ry * speed * 0.35,
          duration: 0.65,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    window.addEventListener("mousemove", onMouse);

    return () => {
      window.removeEventListener("mousemove", onMouse);
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      id="loader"
      ref={loaderRef}
      style={{ clipPath: "inset(0 0 0% 0)" }}
      onClick={dismiss}
    >
      <div id="loader-content">

        {/* ── TOLF ─────────────────────────────────────────── */}
        <div id="loader-brand">
          {["T", "O", "L", "F"].map((letter, i) => (
            // Outer div: moves with mouse parallax (x/y only)
            // Inner span: moves for the clip reveal (y only)
            // The two transforms are independent — no conflicts
            <div
              key={letter}
              className="loader-letter-clip"
              ref={(el) => { clipsRef.current[i] = el; }}
            >
              <span
                className="loader-letter"
                ref={(el) => { lettersRef.current[i] = el; }}
              >
                {letter}
              </span>
            </div>
          ))}
        </div>

        {/* ── Gold underline ────────────────────────────────── */}
        <div ref={lineRef} id="loader-line" />

        {/* ── Tagline ───────────────────────────────────────── */}
        <p ref={taglineRef} id="loader-tagline-center">
          Simplifying Global Trade
        </p>
      </div>

      {/* Corners */}
      <span id="loader-label">Tolf · UK Freight Forwarding</span>
      <span id="loader-corner-right">Click to enter</span>
    </div>
  );
}
