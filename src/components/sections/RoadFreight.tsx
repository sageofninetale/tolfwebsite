"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SplitHeading from "@/components/ui/SplitHeading";
import ImageReveal from "@/components/ui/ImageReveal";

export default function RoadFreight() {
  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax on image wrapper
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
      id="road-freight"
      className="service-detail-section"
      ref={sectionRef}
      aria-labelledby="road-freight-heading"
    >
      <div className="service-detail-inner">
        {/* Text — left */}
        <div className="service-text-col">
          <div className="service-detail-tag">
            <span className="service-detail-tag-dot" aria-hidden="true" />
            <span className="t-label">Road Freight</span>
          </div>

          <SplitHeading
            as="h2"
            className="t-h2 service-detail-heading"
            id="road-freight-heading"
          >
            The Road Ahead
          </SplitHeading>

          <p className="service-detail-body">
            From express groupage to full truck loads across the UK and mainland Europe,
            Tolf&apos;s road freight service combines speed, flexibility, and real-time
            visibility. Our vetted carrier network ensures your cargo arrives on time,
            every time.
          </p>

          <ul className="service-detail-features" aria-label="Road freight features">
            <li>Full Truck Load (FTL) &amp; Groupage (LTL)</li>
            <li>UK-wide collection and delivery</li>
            <li>Mainland Europe routes</li>
            <li>Real-time GPS tracking</li>
            <li>Temperature-controlled transport available</li>
          </ul>

          <a
            href="https://tolf.com/quote"
            target="_blank"
            rel="noopener noreferrer"
            className="service-detail-cta"
            aria-label="Get a road freight quote"
          >
            Get a Road Freight Quote
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Image — right with clip-path reveal + parallax */}
        <div className="service-img-col">
          <ImageReveal>
            <div
              ref={imgWrapperRef}
              style={{ position: "absolute", inset: 0, width: "100%", height: "112%" }}
            >
              <Image
                src="/images/tolftruck2.jpeg"
                alt="Tolf road freight truck on a mountain road, aerial view"
                fill
                quality={90}
                sizes="50vw"
                style={{ objectFit: "cover", objectPosition: "80% 95%" }}
              />
            </div>
          </ImageReveal>
        </div>
      </div>
    </section>
  );
}
