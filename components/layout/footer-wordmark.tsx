"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { wordmarkCrop, wordmarkSize } from "@/lib/wordmark";

gsap.registerPlugin(ScrollTrigger);

/**
 * Footer counterpart to the hero wordmark, and the close of the same gesture.
 * The hero draws SUPARNA as a hairline outline and lets it scroll away; this
 * one redraws that outline, then pours a fill up into it letter by letter as
 * the footer arrives. Page opens as an empty mark, closes as a solid one.
 *
 * Two layers, identical per-letter markup, stacked in one grid cell so both
 * rows resolve to the same box and register exactly. Splitting the fill into
 * letters is free here: the gradient runs vertically, so a per-letter gradient
 * and a per-word one paint the same pixels.
 *
 * The fill is accent-tinted and densest at the baseline. It gets a clear band
 * of its own: footer.tsx reserves `wordmarkBand()` of bottom padding so nothing
 * overlaps it and it needs no scrim painted back over the top.
 *
 * Geometry (size, crop, band) lives in lib/wordmark.ts rather than here, so the
 * server-rendered footer can reserve the space without pulling in this client
 * component.
 */

/**
 * A real fill rather than a wash. The first pass faded to fully transparent by
 * the cap height, so the top half of every letter simply was not there and the
 * mark read as a smear instead of a word. It now keeps weight all the way up:
 * accent-dense at the baseline, still legibly inked at the top.
 */
const FILL =
  "linear-gradient(to top, rgb(var(--accent) / 0.32) 0%, rgb(var(--fg) / 0.22) 42%, rgb(var(--fg) / 0.13) 74%, rgb(var(--fg) / 0.08) 100%)";

export default function FooterWordmark({
  text = "SUPARNA",
}: {
  text?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const letters = [...text];
  const type = { fontSize: wordmarkSize(text), letterSpacing: "-0.06em" };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* Reduced motion gets the composed mark with no entrance and no scrub.
         The CSS guard in globals.css can't reach GSAP's inline transforms. */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".fw-outline-letter", ".fw-fill-letter"], {
          opacity: 1,
          yPercent: 0,
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const scrollTrigger = { trigger: rootRef.current, start: "top 95%" };

        /* Outline draws in first, left to right, so there is something for the
           fill to arrive into rather than both landing at once. */
        gsap.fromTo(
          ".fw-outline-letter",
          { opacity: 0, yPercent: 10 },
          {
            opacity: 1,
            yPercent: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.045,
            scrollTrigger,
          },
        );

        gsap.fromTo(
          ".fw-fill-letter",
          { opacity: 0, yPercent: 34 },
          {
            opacity: 1,
            yPercent: 0,
            duration: 1.3,
            ease: "power4.out",
            stagger: 0.055,
            delay: 0.18,
            scrollTrigger,
          },
        );

        /* Counterpart to the hero's parallax: there the mark drifts down as the
           section leaves, here it rises as the footer lands. */
        gsap.fromTo(
          ".fw-stack",
          { yPercent: 9 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 1,
            },
          },
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const row =
    "flex whitespace-nowrap font-bricolage font-extrabold leading-[0.72] [grid-area:1/1]";

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-x-0 z-0 overflow-hidden"
      style={{ bottom: wordmarkCrop(text) }}
      aria-hidden="true"
    >
      <div className="fw-stack grid justify-center">
        {/* Layer 1: the hero's hairline outline, redrawn */}
        <div className={row} style={type}>
          {letters.map((char, i) => (
            <span
              key={`o-${i}`}
              className="fw-outline-letter block"
              style={{
                color: "transparent",
                WebkitTextStroke: "1.5px rgb(var(--fg) / 0.16)",
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Layer 2: the fill, rising into it */}
        <div className={row} style={type}>
          {letters.map((char, i) => (
            <span
              key={`f-${i}`}
              className="fw-fill-letter block"
              style={{
                backgroundImage: FILL,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
