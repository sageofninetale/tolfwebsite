"use client";

import { useState, useCallback } from "react";
import { useLenis } from "@/hooks/useLenis";

import Loader from "@/components/sections/Loader";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import MissionStatement from "@/components/sections/MissionStatement";
import Services from "@/components/sections/Services";
import WhyTolf from "@/components/sections/WhyTolf";
import RoadFreight from "@/components/sections/RoadFreight";
import SeaFreight from "@/components/sections/SeaFreight";
import AirFreight from "@/components/sections/AirFreight";
import Warehousing from "@/components/sections/Warehousing";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);

  // Initialise Lenis smooth scroll at the root
  useLenis();

  const handleLoaderComplete = useCallback(() => {
    setLoaderDone(true);
    // Unlock scroll
    document.body.style.overflow = "";
  }, []);

  return (
    <>
      {/* Preloader — fixed overlay */}
      <Loader onComplete={handleLoaderComplete} />

      {/* Main site — becomes visible as loader exits */}
      <main id="main-content" tabIndex={-1}>
        {/* Fixed navigation */}
        <Navbar visible={loaderDone} />

        {/* 1. Hero — full-screen entrance */}
        <Hero animate={loaderDone} />

        {/* 2. Mission statement panel expansion */}
        <MissionStatement />

        {/* 3. Services grid */}
        <Services />

        {/* 4. Why Tolf — stats */}
        <WhyTolf />

        {/* Thin gold divider */}
        <div
          style={{
            height: "1px",
            background: "var(--bg-divider)",
            width: "100%",
          }}
          aria-hidden="true"
        />

        {/* 5. Road Freight */}
        <RoadFreight />

        {/* 6. Sea Freight */}
        <SeaFreight />

        {/* 7. Air Freight */}
        <AirFreight />

        {/* 8. Warehousing */}
        <Warehousing />

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
