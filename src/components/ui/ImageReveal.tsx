"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * ImageReveal — wraps any image in a clip-path wipe animation.
 * Clip path starts at inset(0 100% 0 0) and wipes to inset(0 0% 0 0)
 * as the element enters the viewport. Inner image also scales in.
 */
export default function ImageReveal({
  children,
  className = "",
  delay = 0,
}: ImageRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    // On mobile, skip animation — CSS already forces clip-path: none
    if (window.innerWidth <= 768) {
      gsap.set(wrapper, { clearProps: "clipPath" });
      gsap.set(inner, { clearProps: "transform" });
      return;
    }

    // Set initial state
    gsap.set(wrapper, { clipPath: "inset(0 100% 0 0)" });
    gsap.set(inner, { scale: 1.1 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        delay,
      });

      // Wipe from left to right
      tl.to(wrapper, {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.4,
        ease: "power3.inOut",
      });

      // Ken Burns — scale inner image down to 1
      tl.to(
        inner,
        {
          scale: 1,
          duration: 1.8,
          ease: "luxury",
        },
        "<"
      );
    });

    return () => ctx.revert();
  }, [delay]);

  return (
    <div
      className={`image-reveal-wrapper ${className}`}
      ref={wrapperRef}
      style={{ clipPath: "inset(0 100% 0 0)" }}
    >
      <div ref={innerRef} style={{ width: "100%", height: "100%", transform: "scale(1.1)" }}>
        {children}
      </div>
    </div>
  );
}
