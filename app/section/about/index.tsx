"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TechStackSection } from "../techStack";
import { segments } from "./segments";
import SectionHeader from "../sectionHeader";

gsap.registerPlugin(ScrollTrigger);

function buildTokens() {
  return segments.flatMap((seg) => {
    const words = seg.text.split(/(\s+)/);
    return words.map((word) => ({
      word,
      highlight: seg.highlight,
      isSpace: /^\s+$/.test(word),
    }));
  });
}

const tokens = buildTokens();

export default function AboutSection() {
  const sectionRef = useRef(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rightColRef = useRef(null);
  const dividerRef = useRef(null);
  const eyebrowRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Vertical accent line on header

      // Eyebrow labels
      gsap.fromTo(
        eyebrowRefs.current.filter(Boolean),
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.4,
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        },
      );

      // Vertical divider
      gsap.fromTo(
        dividerRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power3.inOut",
          delay: 0.3,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        },
      );

      // Right column
      gsap.fromTo(
        rightColRef.current,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power2.out",
          delay: 0.45,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        },
      );

      // Word-by-word reveal
      const nonSpaceWords = wordRefs.current.filter(
        (el): el is HTMLSpanElement => !!el && !el.dataset.space,
      );
      gsap.fromTo(
        nonSpaceWords,
        { opacity: 0.06, y: 8, filter: "blur(2px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.014,
          duration: 0.42,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "bottom 80%",
            scrub: false,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section">
      <div className="w-full container">
        {/* ── Section header ── */}
        <SectionHeader title="About" />

        {/* ── Two-column body ── */}
        <div className="flex flex-col lg:flex-row items-stretch">
          {/* ── LEFT: bio text ── */}
          <div className="flex-[56] min-w-0 pr-0 lg:pr-14 flex flex-col text-justify">
            <p
              ref={(el) => {
                eyebrowRefs.current[0] = el;
              }}
              className="text-[10px] tracking-[0.28em] uppercase text-[#b0b0b0] font-inter mb-5"
            >
              Background
            </p>

            <p className="font-inter text-[0.95rem] md:text-[1rem] lg:text-[1.05rem] leading-[1.9] text-[#606060]">
              {tokens.map((token, i) => {
                const ref = (el: HTMLSpanElement | null) => {
                  wordRefs.current[i] = el;
                };

                if (token.isSpace) {
                  return (
                    <span key={i} ref={ref} data-space="true">
                      {token.word}
                    </span>
                  );
                }

                if (token.highlight) {
                  return (
                    <span
                      key={i}
                      ref={ref}
                      data-highlight="true"
                      className="text-[#111] font-medium inline-block"
                    >
                      {token.word}
                    </span>
                  );
                }

                return (
                  <span key={i} ref={ref} className="inline-block">
                    {token.word}
                  </span>
                );
              })}
            </p>
          </div>

          {/* ── Vertical divider ── */}
          <div className="hidden lg:block self-stretch mx-1">
            <div
              ref={dividerRef}
              className="w-px h-full bg-[#e8e8e8]"
              style={{ transformOrigin: "top center" }}
            />
          </div>

          {/* Horizontal divider mobile */}
          <div className="block lg:hidden my-10 h-px bg-[#efefef]" />

          {/* ── RIGHT: tech stack ── */}
          <div
            ref={rightColRef}
            className="flex-[44] min-w-0 pl-0 lg:pl-14 flex flex-col"
          >
            <p
              ref={(el) => {
                eyebrowRefs.current[1] = el;
              }}
              className="text-[10px] tracking-[0.28em] uppercase text-[#b0b0b0] font-inter mb-5"
            >
              Tech Stack
            </p>
            <div className="flex-1 min-h-0">
              <TechStackSection />
            </div>
          </div>
        </div>

        {/* ── Bottom signature ── */}
        <div className="mt-16 flex items-center gap-5">
          <div className="h-px flex-1 bg-[#efefef]" />
          <span className="text-[9px] tracking-[0.35em] uppercase text-[#ccc] font-inter">
            Suparna Adhikari
          </span>
        </div>
      </div>
    </section>
  );
}
