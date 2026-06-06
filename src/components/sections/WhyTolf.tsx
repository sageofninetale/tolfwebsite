"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SplitHeading from "@/components/ui/SplitHeading";
import StatCounter from "@/components/ui/StatCounter";
import { STATS } from "@/lib/constants";

export default function WhyTolf() {
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax background
  useEffect(() => {
    const el = bgRef.current;
    const section = sectionRef.current;
    if (!el || !section) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="why-tolf" ref={sectionRef} aria-labelledby="why-tolf-heading">
      {/* Parallax background */}
      <div className="why-bg" aria-hidden="true" ref={bgRef}>
        <Image
          src="/images/cinematic-low.jpeg"
          alt="Cinematic logistics photography"
          fill
          quality={85}
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
      <div className="why-overlay" aria-hidden="true" />

      <div className="why-content">
        {/* Header */}
        <div className="why-header">
          <p className="t-label" style={{ marginBottom: "1rem" }}>Why Choose Tolf</p>
          <SplitHeading
            as="h2"
            className="t-h2"
            id="why-tolf-heading"
            style={{ maxWidth: "30rem", margin: "0 auto" }}
          >
            Built For Global Trade
          </SplitHeading>
        </div>

        {/* Stats grid */}
        <div className="stats-grid" role="list" aria-label="Company statistics">
          {STATS.map((stat) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
