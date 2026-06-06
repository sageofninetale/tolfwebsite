"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SplitHeading from "@/components/ui/SplitHeading";
import ImageReveal from "@/components/ui/ImageReveal";

export default function SeaFreight() {
  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax
  useEffect(() => {
    const wrapper = imgWrapperRef.current;
    const section = sectionRef.current;
    if (!wrapper || !section) return;

    const ctx = gsap.context(() => {
      gsap.to(wrapper, {
        yPercent: 12,
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
    <section
      id="sea-freight"
      className="service-detail-section"
      ref={sectionRef}
      aria-labelledby="sea-freight-heading"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="service-detail-inner reverse">
        {/* Image — left (reversed via CSS direction) */}
        <div className="service-img-col">
          <ImageReveal>
            <div
              ref={imgWrapperRef}
              style={{ position: "absolute", inset: 0, width: "100%", height: "115%" }}
            >
              <Image
                src="/images/ship1.jpeg"
                alt="Top-down aerial view of a container ship at sea carrying Tolf cargo"
                fill
                quality={90}
                sizes="50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </ImageReveal>
        </div>

        {/* Text — right */}
        <div className="service-text-col">
          <div className="service-detail-tag">
            <span className="service-detail-tag-dot" aria-hidden="true" />
            <span className="t-label">Sea Freight</span>
          </div>

          <SplitHeading
            as="h2"
            className="t-h2 service-detail-heading"
            id="sea-freight-heading"
          >
            Ocean-Wide Reach
          </SplitHeading>

          <p className="service-detail-body">
            Whether you need a full container or a shared load, Tolf&apos;s sea freight
            solutions connect your business to ports worldwide. We handle all
            documentation, customs, and last-mile delivery with precision.
          </p>

          <ul className="service-detail-features" aria-label="Sea freight features">
            <li>FCL &amp; LCL ocean freight</li>
            <li>All major global trade lanes</li>
            <li>Port-to-door and door-to-door</li>
            <li>Dangerous goods handling</li>
            <li>Reefer and dry cargo</li>
          </ul>

          <a
            href="https://tolf.com/quote"
            target="_blank"
            rel="noopener noreferrer"
            className="service-detail-cta"
            aria-label="Get a sea freight quote"
          >
            Get a Sea Freight Quote
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
