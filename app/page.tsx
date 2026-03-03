"use client";
import Hero from "./section/hero";

import AboutSection from "./section/about";
import BentoLayout from "./section/works";
import ContactSection from "./section/contact";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <AboutSection />
      <BentoLayout />
      <ContactSection />
    </div>
  );
}
