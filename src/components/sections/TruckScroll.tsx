"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function TruckScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const truckRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !truckRef.current) return;

    const section = sectionRef.current;
    const truck = truckRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: "top top",
        end: "+=250%",
        scrub: 1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Drive the progress bar
          if (progressRef.current) {
            progressRef.current.style.width = `${self.progress * 100}%`;
          }
        },
      },
    });

    // Truck travels from off-screen left to off-screen right
    tl.fromTo(
      truck,
      { xPercent: -130 },
      {
        xPercent: 130,
        ease: "none",
      }
    );

    // Text fades in at 20% progress, fades out at 80%
    if (textRef.current) {
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=250%",
          scrub: 1.5,
        },
      });

      textTl
        .fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.2, ease: "luxury" }
        )
        .to(
          textRef.current,
          { opacity: 0, y: -30, duration: 0.2, ease: "luxury" },
          0.6
        );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <div id="truck-scroll" ref={sectionRef} aria-label="Road freight showcase">
      {/* Background — dimmed aerial hub */}
      <div className="truck-scroll-bg" aria-hidden="true">
        <Image
          src="/images/tolftruck3.jpeg"
          alt="Aerial view of a major logistics hub"
          fill
          quality={85}
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Large ghost text — decorative */}
      <div className="truck-text-overlay" ref={textRef} aria-hidden="true">
        <h2>Moving Cargo<br />Across Borders</h2>
      </div>

      {/* The truck that moves */}
      <div
        className="truck-image-wrapper"
        ref={truckRef}
        aria-hidden="true"
        style={{ xPercent: -130 } as React.CSSProperties}
      >
        <Image
          src="/images/tolftruck1.jpeg"
          alt="Tolf freight truck"
          width={900}
          height={506}
          quality={90}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
            filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.6))",
          }}
        />
      </div>

      {/* Progress bar at bottom */}
      <div className="truck-progress-bar" aria-hidden="true">
        <div
          className="truck-progress-fill"
          ref={progressRef}
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
}
