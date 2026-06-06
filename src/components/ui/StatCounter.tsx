"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface StatCounterProps {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

/**
 * StatCounter — animates a number from 0 to targetValue on scroll entry.
 */
export default function StatCounter({
  value,
  suffix,
  label,
  description,
}: StatCounterProps) {
  const valueRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = valueRef.current;
    const container = containerRef.current;
    if (!el || !container) return;

    const counter = { value: 0 };

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        value,
        duration: 2.2,
        ease: "power2.out",
        snap: { value: 1 },
        onUpdate: () => {
          el.textContent = `${Math.floor(counter.value)}${suffix}`;
        },
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, [value, suffix]);

  return (
    <div className="stat-item" ref={containerRef}>
      <span className="stat-value" ref={valueRef}>
        0{suffix}
      </span>
      <p className="stat-label">{label}</p>
      <p className="stat-desc">{description}</p>
    </div>
  );
}
