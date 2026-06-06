"use client";

import { useEffect, useRef } from "react";
import Globe from "globe.gl";

export default function InteractiveGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const arcsData = [
      { startLat: 51.5074, startLng: -0.1278, endLat: 25.2048, endLng: 55.2708, initialGap: 0.0 },
      { startLat: 25.2048, startLng: 55.2708, endLat: 1.3521, endLng: 103.8198, initialGap: 0.2 },
      { startLat: 1.3521, startLng: 103.8198, endLat: 31.2304, endLng: 121.4737, initialGap: 0.4 },
      { startLat: 31.2304, startLng: 121.4737, endLat: 40.7128, endLng: -74.0060, initialGap: 0.6 },
      { startLat: 40.7128, startLng: -74.0060, endLat: -23.5505, endLng: -46.6333, initialGap: 0.8 },
      { startLat: -23.5505, startLng: -46.6333, endLat: -33.8688, endLng: 151.2093, initialGap: 1.0 },
      { startLat: -33.8688, startLng: 151.2093, endLat: 51.5074, endLng: -0.1278, initialGap: 1.2 },
    ];

    const size = container.clientWidth || 440;

    const globeInstance = new Globe(container)
      .width(size)
      .height(size)
      .backgroundColor("rgba(0,0,0,0)")
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
      .showAtmosphere(true)
      .atmosphereColor("rgba(29, 46, 84, 0.7)")
      .atmosphereAltitude(0.15)
      .arcsData(arcsData)
      .arcColor(() => "rgba(201, 168, 76, 0.9)")
      .arcStroke(0.8)
      .arcDashLength(0.35)
      .arcDashGap(0.65)
      .arcDashAnimateTime(1200)
      .arcDashInitialGap((d: any) => d.initialGap);

    const controls = globeInstance.controls() as any;
    if (controls) {
      controls.enableZoom = false;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
    }

    globeRef.current = globeInstance;

    const ro = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      const s = Math.floor(width);
      if (s > 0 && globeRef.current) {
        globeRef.current.width(s).height(s);
      }
    });
    ro.observe(container);

    return () => {
      ro.disconnect();
      if (typeof globeInstance._destructor === "function") {
        globeInstance._destructor();
      } else {
        container.innerHTML = "";
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
