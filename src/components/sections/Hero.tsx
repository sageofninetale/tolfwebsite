"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import SplitType from "split-type";

interface HeroProps {
  animate: boolean;
}

export default function Hero({ animate }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLDivElement>(null);

  // Parallax on scroll
  useEffect(() => {
    if (!sectionRef.current || !bgImgRef.current) return;
    if (window.innerWidth <= 768) return;

    const ctx = gsap.context(() => {
      gsap.to(bgImgRef.current!, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hero entrance animation — triggered after loader exits
  useEffect(() => {
    if (!animate || !headlineRef.current) return;

    // Use SplitType to split headline into words
    const split = new SplitType(headlineRef.current, { types: "words" });
    const words = split.words || [];

    // Wrap each word in overflow container
    words.forEach((word) => {
      const parent = word.parentElement;
      if (!parent) return;
      const wrapper = document.createElement("span");
      wrapper.style.display = "inline-block";
      wrapper.style.overflow = "hidden";
      wrapper.style.verticalAlign = "bottom";
      wrapper.style.marginRight = "0.18em";
      parent.insertBefore(wrapper, word);
      wrapper.appendChild(word);
    });

    const tl = gsap.timeline({ delay: 0.1 });

    // Words slam up from below
    tl.fromTo(
      words,
      { y: "110%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 1.0,
        stagger: 0.07,
        ease: "slam",
      }
    );

    // Sub-text fades in
    if (subRef.current) {
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "luxury" },
        "-=0.5"
      );
    }

    // CTA button
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "luxury" },
        "-=0.5"
      );
    }

    // Scroll indicator
    if (scrollRef.current) {
      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "luxury" },
        "-=0.3"
      );
    }

    return () => {
      tl.kill();
      split.revert();
    };
  }, [animate]);

  return (
    <section id="hero" ref={sectionRef} aria-label="Hero section">
      {/* Background image with parallax */}
      <div className="hero-bg" ref={bgImgRef}>
        <Image
          src="/images/tolftruck1.jpeg"
          alt="Tolf freight truck driving through scenic mountain highway at sunset"
          fill
          priority
          quality={90}
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
        />
      </div>

      {/* Dark gradient overlay */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Content */}
      <div className="hero-content">
        {/* Overline */}
        <div className="hero-tag" aria-hidden="true">
          <span className="hero-tag-dot" />
          <span className="t-label">UK Freight Forwarding</span>
        </div>

        {/* Main headline — split by SplitType */}
        <h1
          className="hero-headline"
          ref={headlineRef}
          style={{ opacity: 1 }}
        >
          Simplifying Global Trade
        </h1>

        {/* Hero bottom row */}
        <div className="hero-bottom">
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Sub text */}
            <p className="hero-sub" ref={subRef} style={{ opacity: 0 }}>
              Tolf manages your full shipping journey across air, sea, road and beyond.
              From UK to anywhere in the world, seamlessly.
            </p>

            {/* CTA */}
            <a
              href="https://tolf.com/quote"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta"
              ref={ctaRef}
              style={{ opacity: 0, alignSelf: "flex-start" }}
              aria-label="Get a freight quote from Tolf"
            >
              Get a Quote
              <svg className="hero-cta-arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="scroll-indicator" ref={scrollRef} style={{ opacity: 0 }} aria-hidden="true">
            <span className="scroll-label">Scroll</span>
            <div className="scroll-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
