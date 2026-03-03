"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  containerRef: React.RefObject<HTMLDivElement>;
  heroRef: React.RefObject<HTMLDivElement>;
  watermarkRef: React.RefObject<HTMLDivElement>;
}

export const useHeroAnimation = ({
  containerRef,
  heroRef,
  watermarkRef,
}: Props) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-label", { opacity: 0, y: 16, duration: 0.7 })
        .from(".title-inner", { y: "110%", duration: 1, stagger: 0.1 }, "-=0.3")
        .from(".hero-subtitle", { opacity: 0, y: 20, duration: 0.8 }, "-=0.5")
        .from(".accent-line", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.8,
        });

      // Content parallax
      gsap.to(".hero-content", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Watermark parallax
      if (watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);
};
