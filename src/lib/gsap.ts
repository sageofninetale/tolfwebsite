/**
 * lib/gsap.ts
 * Client-side only GSAP registration with all required plugins.
 * Import this file anywhere you need GSAP — it handles the plugin
 * registration once and exports the ready-to-use gsap instance.
 */
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, CustomEase);

  // Luxury easing used across all animations
  CustomEase.create("luxury", "0.25, 0.10, 0.00, 1.00");
  CustomEase.create("slam", "0.22, 1, 0.36, 1");

  // Tell ScrollTrigger not to fight with Lenis
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, ScrollToPlugin, CustomEase };
