"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface NavbarProps {
  visible: boolean;
}

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Road Freight", href: "#road-freight" },
  { label: "Sea Freight", href: "#sea-freight" },
  { label: "Air Freight", href: "#air-freight" },
  { label: "Warehousing", href: "#warehousing" },
  { label: "About", href: "#why-tolf" },
];

export default function Navbar({ visible }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);

  // Slide in after loader
  useEffect(() => {
    if (!navRef.current) return;
    if (visible) {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "luxury", delay: 0.1 }
      );
    }
  }, [visible]);

  // Scrolled state — add background
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const onScroll = () => {
      if (window.scrollY > 60) {
        el.classList.add("scrolled");
      } else {
        el.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scroll to section
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    gsap.to(window, {
      duration: 1.4,
      scrollTo: { y: target, offsetY: 80 },
      ease: "luxury",
    });
  };

  if (!visible) return null;

  return (
    <nav id="navbar" ref={navRef} style={{ opacity: 0 }}>
      {/* Logo */}
      <a href="/" className="nav-logo" aria-label="Tolf Home" style={{ color: "#C8102E" }}>
        TOLF<span style={{ color: "#C8102E" }}>.</span>
      </a>

      {/* Nav links */}
      <ul className="nav-links" role="navigation" aria-label="Main navigation">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="nav-link"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="https://tolf.com/quote"
        target="_blank"
        rel="noopener noreferrer"
        className="nav-cta"
        aria-label="Get a freight quote"
      >
        Get a Quote
      </a>
    </nav>
  );
}
