"use client";
import Watermark from "./Watermark";
import HeroContent from "./HeroContent";

const Hero = () => {
  return (
    <section className="relative overflow-hidden section isolate" id="sup">
      <Watermark text="SUPARNA" />
      <div className="relative z-10 container min-h-screen flex items-center">
        <HeroContent />
      </div>
    </section>
  );
};
export default Hero;
