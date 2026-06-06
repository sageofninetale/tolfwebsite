"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SplitHeading from "@/components/ui/SplitHeading";
import ImageReveal from "@/components/ui/ImageReveal";

export default function AirFreight() {
  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const wrapper = imgWrapperRef.current;
    const section = sectionRef.current;
    if (!wrapper || !section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapper,
        { yPercent: -12 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="air-freight"
      className="service-detail-section"
      ref={sectionRef}
      aria-labelledby="air-freight-heading"
    >
      <div className="service-detail-inner">
        {/* Text — left */}
        <div className="service-text-col">
          <div className="service-detail-tag">
            <span className="service-detail-tag-dot" aria-hidden="true" />
            <span className="t-label">Air Freight</span>
          </div>

          <SplitHeading
            as="h2"
            className="t-h2 service-detail-heading"
            id="air-freight-heading"
          >
            Above Every Deadline
          </SplitHeading>

          <p className="service-detail-body">
            When time is critical, Tolf&apos;s air freight service delivers.
            We connect your cargo to a global network of airlines and freight
            carriers, ensuring rapid transit from origin to destination with
            full customs handling and real-time tracking.
          </p>

          <ul className="service-detail-features" aria-label="Air freight features">
            <li>Express and standard airfreight options</li>
            <li>Global airline network coverage</li>
            <li>Door-to-door and airport-to-airport</li>
            <li>Full customs clearance included</li>
            <li>Dangerous goods and specialist cargo</li>
          </ul>

          <a
            href="https://tolf.com/quote"
            target="_blank"
            rel="noopener noreferrer"
            className="service-detail-cta"
            aria-label="Get an air freight quote"
          >
            Get an Air Freight Quote
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Image — right */}
        <div className="service-img-col">
          <ImageReveal>
            <div
              ref={imgWrapperRef}
              style={{ position: "absolute", inset: 0, width: "100%", height: "112%" }}
            >
              <Image
                src="/images/airfreight.jpeg"
                alt="Cargo aircraft on tarmac at dusk, ready for Tolf air freight operations"
                fill
                quality={90}
                sizes="50vw"
                style={{ objectFit: "cover", objectPosition: "center 60%" }}
              />
            </div>
          </ImageReveal>
        </div>
      </div>
    </section>
  );
}
