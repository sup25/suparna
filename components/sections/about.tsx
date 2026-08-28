"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "./section-header";
import { SkillGroups, TechMarquee } from "./tech-stack";
import { aboutParagraphs } from "@/content/about";
import { education, certifications } from "@/content/experience";
import { site } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * Splits the bio into word tokens for the staggered reveal. Whitespace tokens
 * are kept so the text still wraps naturally, but are excluded from animation.
 */
const tokens = aboutParagraphs.flatMap((paragraph, pIndex) =>
  paragraph.flatMap((segment) =>
    segment.text.split(/(\s+)/).map((word) => ({
      word,
      highlight: segment.highlight,
      isSpace: /^\s+$/.test(word),
      pIndex,
    })),
  ),
);

const paragraphCount = aboutParagraphs.length;

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-word",
        { opacity: 0.08, y: 8, filter: "blur(2px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.012,
          duration: 0.42,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        },
      );

      gsap.fromTo(
        ".about-divider",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.4,
          ease: "power3.inOut",
          transformOrigin: "top center",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        },
      );

      gsap.fromTo(
        ".about-right",
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power2.out",
          delay: 0.25,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        },
      );

      gsap.fromTo(
        ".about-credential",
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".about-credentials", start: "top 88%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section section-y">
      <div className="container w-full">
        <SectionHeader
          index="01"
          eyebrow="About"
          title="Full stack, end to end"
          intro={site.summary}
        />

        <div className="flex flex-col items-stretch lg:flex-row">
          {/* Bio */}
          <div className="flex min-w-0 flex-[56] flex-col pr-0 lg:pr-14">
            <p className="eyebrow mb-5">Background</p>

            {Array.from({ length: paragraphCount }).map((_, pIndex) => (
              <p
                key={pIndex}
                className="font-inter text-[0.95rem] leading-[1.9] text-fg-muted md:text-base lg:text-[1.05rem] [&:not(:first-of-type)]:mt-6"
              >
                {tokens
                  .filter((t) => t.pIndex === pIndex)
                  .map((token, i) =>
                    token.isSpace ? (
                      <span key={i}>{token.word}</span>
                    ) : (
                      <span
                        key={i}
                        className={
                          token.highlight
                            ? "about-word inline-block font-medium text-fg"
                            : "about-word inline-block"
                        }
                      >
                        {token.word}
                      </span>
                    ),
                  )}
              </p>
            ))}

            {/* Education + certifications */}
            <div className="about-credentials mt-12 border-t border-line pt-8">
              <p className="eyebrow mb-5">Education & certifications</p>

              <div className="about-credential mb-5">
                <p className="font-inter text-sm font-medium text-fg">
                  {education.degree}
                </p>
                <p className="mt-1 font-inter text-[0.8rem] text-fg-subtle">
                  {education.institution} · {education.start}-{education.end}
                </p>
              </div>

              <ul className="space-y-3">
                {certifications.map((cert) => (
                  <li key={cert.name} className="about-credential">
                    <p className="font-inter text-sm text-fg">{cert.name}</p>
                    <p className="mt-0.5 font-inter text-[0.8rem] text-fg-subtle">
                      {cert.issuer} · {cert.date}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-1 hidden self-stretch lg:block">
            <div
              className="about-divider h-full w-px bg-line"
              style={{ transformOrigin: "top center" }}
              aria-hidden="true"
            />
          </div>
          <div className="my-10 block h-px bg-line lg:hidden" aria-hidden="true" />

          {/* Skills */}
          <div className="about-right flex min-w-0 flex-[44] flex-col pl-0 lg:pl-14">
            <p className="eyebrow mb-5">Tech stack</p>
            <SkillGroups />
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-6">
          <TechMarquee />
        </div>
      </div>
    </section>
  );
}
