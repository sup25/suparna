"use client";

import { useLayoutEffect } from "react";
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
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".hero-label", { opacity: 0, y: 16 });
      gsap.set(".title-inner", { y: "110%" });
      gsap.set(".hero-subtitle", { opacity: 0, y: 20 });
      gsap.set(".accent-line", {
        scaleX: 0,
        transformOrigin: "left center",
      });

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      tl.to(".hero-label", {
        opacity: 1,
        y: 0,
        duration: 0.7,
      })
        .to(
          ".title-inner",
          {
            y: "0%",
            duration: 1,
            stagger: 0.1,
          },
          "-=0.3",
        )
        .to(
          ".hero-subtitle",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.5",
        )
        .to(".accent-line", {
          scaleX: 1,
          duration: 0.8,
        });

      if (heroRef.current) {
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
      }

      /* ---------------- WATERMARK PARALLAX ---------------- */

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
  }, [containerRef, heroRef, watermarkRef]);
};
