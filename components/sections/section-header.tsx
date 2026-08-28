"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SectionHeaderProps = {
  title: string;
  /** Small uppercase label above the title. */
  eyebrow?: string;
  /** Two-digit section index, e.g. "01". */
  index?: string;
  /** Supporting line under the title. */
  intro?: string;
};

export default function SectionHeader({
  title,
  eyebrow,
  index,
  intro,
}: SectionHeaderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: containerRef.current, start: "top 85%" };

      gsap.fromTo(
        ".sh-rule",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.1,
          ease: "power3.inOut",
          transformOrigin: "top center",
          scrollTrigger: trigger,
        },
      );

      gsap.fromTo(
        ".sh-reveal",
        { opacity: 0, x: -14 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.2,
          scrollTrigger: trigger,
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="mb-14">
      <div className="flex items-stretch gap-5">
        <div
          className="sh-rule w-[3px] shrink-0 self-stretch bg-fg"
          style={{ transformOrigin: "top center" }}
          aria-hidden="true"
        />

        <div className="min-w-0 py-1">
          {(eyebrow || index) && (
            <div className="sh-reveal mb-3 flex items-center gap-3">
              {index && (
                <span className="font-inter text-eyebrow font-bold text-accent">
                  {index}
                </span>
              )}
              {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            </div>
          )}

          <h2 className="sh-reveal font-bricolage text-display-sm font-bold text-fg md:text-display-md">
            {title}
          </h2>

          {intro && (
            <p className="sh-reveal mt-5 max-w-2xl font-inter text-[0.975rem] leading-relaxed text-fg-muted">
              {intro}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
