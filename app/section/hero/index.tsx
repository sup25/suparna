"use client";

import { useRef } from "react";
import Watermark from "./Watermark";
import HeroContent from "./HeroContent";
import { useHeroAnimation } from "@/app/hooks/useHeroAnimation";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useHeroAnimation({
    containerRef,
    heroRef,
    watermarkRef,
  });

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden section isolate"
      id="sup"
    >
      <Watermark ref={watermarkRef} />

      <div
        ref={heroRef}
        className="relative z-10 container min-h-screen flex items-center "
      >
        <HeroContent />
      </div>
    </section>
  );
};

export default Hero;
