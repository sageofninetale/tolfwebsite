"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamically import globe.gl client-side only (SSR: false)
const InteractiveGlobe = dynamic(
  () => import("@/components/ui/InteractiveGlobe"),
  { ssr: false }
);

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer id="footer" aria-label="Site footer">
      <div className="footer-top">
        {/* Left Column - Headline, Description, and Links stacked below */}
        <div className="footer-left">
          <h2 className="footer-headline">
            Get your cargo moving.
          </h2>
          <p className="footer-description">
            Tolf manages the complete shipping process for businesses across the UK and worldwide. 
            From air and sea freight to custom clearance and distribution, our vetted carrier network 
            ensures your cargo arrives on time, every time.
          </p>
          
          {/* Navigation Links stacked below */}
          <div className="footer-links-stacked">
            <div className="footer-links-col">
              <a href="#services" className="footer-link">Services</a>
              <a href="#road-freight" className="footer-link">Road Freight</a>
              <a href="#sea-freight" className="footer-link">Sea Freight</a>
              <a href="#air-freight" className="footer-link">Air Freight</a>
              <a href="#warehousing" className="footer-link">Warehousing</a>
            </div>
            <div className="footer-links-col">
              <a href="https://tolf.com/quote" target="_blank" rel="noopener noreferrer" className="footer-link">Get a Quote</a>
              <a href="https://tolf.com" target="_blank" rel="noopener noreferrer" className="footer-link">About Us</a>
              <a href="https://tolf.com" target="_blank" rel="noopener noreferrer" className="footer-link">Careers</a>
              <a href="https://tolf.com" target="_blank" rel="noopener noreferrer" className="footer-link">Contact</a>
            </div>
          </div>
        </div>

        {/* Right Column - Auto-rotating Freight Globe */}
        <div className="footer-right">
          <div className="footer-globe-container">
            <InteractiveGlobe />
          </div>
        </div>
      </div>

      {/* TOLF wordmark */}
      <div className="footer-logo-wrapper" aria-hidden="true">
        <span className="footer-logo-text" style={{ color: "#C8102E" }}>TOLF</span>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-text">
          <span>© {currentYear} Tolf. All rights reserved.</span>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Tolf on LinkedIn"
            style={{ display: "inline-flex", alignItems: "center", marginLeft: "0.25rem" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ color: "#888888", transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#888888")}
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
        <div className="footer-bottom-text">
          Designed by Äryan
        </div>
        <div className="footer-bottom-text">
          Regulated by HMRC & BIFA Member
        </div>
      </div>
    </footer>
  );
}
