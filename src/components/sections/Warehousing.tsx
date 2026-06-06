"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SplitHeading from "@/components/ui/SplitHeading";

export default function Warehousing() {
  const bgRevealRef = useRef<HTMLDivElement>(null);
  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Clip-path wipe on the background + parallax
  useEffect(() => {
    const bg = bgRevealRef.current;
    const imgWrapper = imgWrapperRef.current;
    const section = sectionRef.current;
    if (!bg || !section) return;

    // On mobile skip all animations — CSS handles layout
    if (window.innerWidth <= 768) {
      gsap.set(bg, { clearProps: "clipPath" });
      return;
    }

    gsap.set(bg, { clipPath: "inset(0 100% 0 0)" });

    const ctx = gsap.context(() => {
      gsap.to(bg, {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.6,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      if (imgWrapper) {
        gsap.to(imgWrapper, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="warehousing"
      ref={sectionRef}
      aria-labelledby="warehousing-heading"
    >
      {/* Full-bleed image with clip-path wipe */}
      <div className="warehousing-bg" ref={bgRevealRef} aria-hidden="true">
        <div
          ref={imgWrapperRef}
          style={{ position: "absolute", inset: 0, width: "100%", height: "115%" }}
        >
          <Image
            src="/images/cinematic-wide.jpeg"
            alt="Tolf warehousing facility with cargo operations"
            fill
            quality={90}
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      <div className="warehousing-overlay" aria-hidden="true" />

      {/* Content overlay */}
      <div className="warehousing-content">
        <div className="service-detail-tag" style={{ marginBottom: "1.5rem" }}>
          <span className="service-detail-tag-dot" aria-hidden="true" />
          <span className="t-label">Warehousing &amp; Distribution</span>
        </div>

        <SplitHeading
          as="h2"
          className="t-h2"
          id="warehousing-heading"
          style={{ marginBottom: "1.5rem" }}
        >
          Storage. Sorted.
        </SplitHeading>

        <p className="t-body" style={{ maxWidth: "36rem", marginBottom: "2rem" }}>
          Tolf&apos;s UK warehousing facilities offer secure, flexible storage with
          full inventory management, pick-and-pack, and distribution services.
          Scale up or down as your business demands.
        </p>

        <a
          href="https://tolf.com/quote"
          target="_blank"
          rel="noopener noreferrer"
          className="service-detail-cta"
          aria-label="Enquire about Tolf warehousing"
        >
          Enquire About Warehousing
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
