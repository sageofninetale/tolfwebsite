"use client";

import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "@/lib/gsap";

interface SplitHeadingProps {
  as?: "h1" | "h2" | "h3";
  children: string;
  className?: string;
  delay?: number;
  id?: string;
  style?: React.CSSProperties;
}

/**
 * SplitHeading — scroll-triggered word-by-word heading reveal.
 * Uses SplitType to split text into words, then GSAP ScrollTrigger
 * to animate each word in with a blur + rise.
 */
export default function SplitHeading({
  as: Tag = "h2",
  children,
  className = "",
  delay = 0,
  id,
  style,
}: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const split = new SplitType(el, { types: "words" });
    const words = split.words || [];

    gsap.set(words, { y: "60%", opacity: 0, filter: "blur(8px)" });

    const anim = gsap.to(words, {
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.85,
      stagger: 0.07,
      ease: "slam",
      delay,
      scrollTrigger: {
        trigger: el,
        start: "top 82%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      anim.kill();
      split.revert();
    };
  }, [delay]);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={className}
      id={id}
      style={{ overflow: "hidden", ...style }}
    >
      {children}
    </Tag>
  );
}
