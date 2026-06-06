"use client";

import { useEffect, useRef, useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const onScroll = () => {
      el.classList.toggle("scrolled", window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
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
    <>
      <nav id="navbar" ref={navRef} style={{ opacity: 0 }}>
        <a href="/" className="nav-logo" aria-label="Tolf Home" style={{ color: "#C8102E" }}>
          TOLF<span style={{ color: "#C8102E" }}>.</span>
        </a>

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

        <a
          href="https://tolf.com/quote"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta"
          aria-label="Get a freight quote"
        >
          Get a Quote
        </a>

        <button
          className={`nav-hamburger${menuOpen ? " is-open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          <span className="nav-hamburger-bar" />
          <span className="nav-hamburger-bar" />
          <span className="nav-hamburger-bar" />
        </button>
      </nav>

      <div
        className={`mobile-nav${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Mobile navigation"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="mobile-nav-link"
            onClick={(e) => handleNavClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="https://tolf.com/quote"
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-nav-cta"
          onClick={() => setMenuOpen(false)}
        >
          Get a Quote
        </a>
      </div>
    </>
  );
}
