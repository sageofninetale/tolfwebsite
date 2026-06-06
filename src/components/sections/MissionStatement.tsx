"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function MissionStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const text = textRef.current;
    if (!section || !panel || !text) return;

    // Initial state — wider on mobile so it doesn't look like a thin strip
    const isMobile = window.innerWidth <= 768;
    gsap.set(panel, { width: isMobile ? "90vw" : "50vw", height: "55vh" });
    gsap.set(text, { opacity: 0 });

    const ctx = gsap.context(() => {
      gsap.to(panel, {
        width: "100vw",
        height: "100vh",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: "+=200%",
          scrub: 1.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Text fades in only after panel reaches 60% of full size
            if (text) {
              const progress = Math.max(0, (self.progress - 0.6) / 0.4);
              text.style.opacity = String(Math.min(1, progress));
            }
          },
        },
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <div
      id="mission-statement"
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
      }}
      aria-label="Tolf mission statement"
    >
      {/* Full-viewport background image — always visible behind/around panel */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        <Image
          src="/images/tolftruck3.jpeg"
          alt="Tolf logistics aerial view"
          fill
          priority
          quality={90}
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        {/* Subtle dark overlay on the background so the panel edge reads clearly */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
          }}
        />
      </div>

      {/* The panel — grows from center to fullscreen */}
      <div
        ref={panelRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50vw",
          height: "55vh",
          background: "#0A0A0A",
          borderRadius: 0,           /* Hard edges, no radius */
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
        aria-hidden="false"
      >
        {/* Text content — fades in at 60% panel scale */}
        <div
          ref={textRef}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "3rem",
            gap: "1.5rem",
            opacity: 0,
            maxWidth: "780px",
            width: "100%",
          }}
        >
          {/* Overline */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--accent-gold)",
            }}
            aria-hidden="true"
          >
            Our Promise
          </p>

          {/* Main headline */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 5vw, 5rem)",
              lineHeight: 0.9,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              whiteSpace: "pre-line",
            }}
          >
            {`We move your cargo.\nWe simplify your world.`}
          </h2>

          {/* Thin gold rule */}
          <div
            style={{
              width: "3rem",
              height: "1px",
              background: "var(--accent-gold)",
              opacity: 0.6,
              flexShrink: 0,
            }}
            aria-hidden="true"
          />

          {/* Body copy */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "#888888",
              maxWidth: "500px",
            }}
          >
            From a single parcel to full container loads. Tolf handles air,
            sea, road and everything in between. Any origin. Any destination.
            Seamlessly.
          </p>
        </div>
      </div>
    </div>
  );
}
