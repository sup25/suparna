"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero backdrop, in three stacked layers (cheapest first):
 *   1. hairline column guides aligned to the content container
 *   2. one oversized outlined wordmark, cropped by the section's bottom edge
 *   3. a barely-there film grain
 *
 * The previous version tiled seven filled Bungee Shade wordmarks at 5% accent
 * with `mix-blend-multiply`, which read as red smudges behind the headline.
 * A single hairline-stroked mark carries the same identity without competing
 * with the type.
 */

/* feTurbulence rendered once into a data URI, a static background image, so
   it costs no repaint (a live CSS filter over this layer would). */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

function HeroBackdrop({ text = "SUPARNA" }: { text?: string }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Column guides, aligned to the content container */}
      <div className="absolute inset-0 hidden justify-center md:flex">
        <div className="grid h-full w-full max-w-container grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border-l border-line/60 last:border-r" />
          ))}
        </div>
      </div>

      {/* 2. Outlined wordmark, anchored low and clipped by the section edge.
             Desktop only: at phone widths the mark is too big to read as a word
             and too faint to read as texture, so it just occupied the bottom of
             a 100dvh hero without earning it. The footer mark carries the
             identity on mobile instead. */}
      <div
        className="hero-watermark absolute inset-x-0 bottom-[-3.5vw] hidden justify-center md:flex"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 45%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 45%, black 100%)",
        }}
      >
        <span
          className="hero-wordmark block whitespace-nowrap font-bricolage font-extrabold leading-[0.78]"
          style={{
            fontSize: "clamp(5rem, 21vw, 20rem)",
            letterSpacing: "-0.045em",
            color: "transparent",
            WebkitTextStroke: "1.5px rgb(var(--fg) / 0.09)",
          }}
        >
          {text}
        </span>
      </div>

      {/* 3. Grain */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-multiply"
        style={{ backgroundImage: GRAIN, backgroundSize: "140px 140px" }}
      />
    </div>
  );
}

/** Ultra-light arrow for the nested CTA icon. */
function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* Anyone who asked the OS for less motion gets the composed layout with
         no entrance timeline and no scrub. The CSS guard in globals.css can't
         reach GSAP's inline transforms. */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ".hero-title-line",
            ".hero-rule",
            ".hero-subtitle",
            ".hero-cta",
            ".hero-meta",
            ".hero-wordmark",
          ],
          { opacity: 1, y: 0, yPercent: 0, scaleX: 1, filter: "none" },
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        /* Each title line sits in an overflow-hidden mask and slides up into it */
        tl.fromTo(
          ".hero-title-line",
          { yPercent: 110 },
          { yPercent: 0, duration: 1, stagger: 0.09 },
        )
          .fromTo(
            ".hero-rule",
            { scaleX: 0 },
            { scaleX: 1, duration: 0.9, transformOrigin: "left center" },
            "-=0.6",
          )
          .fromTo(
            ".hero-subtitle",
            { opacity: 0, y: 20, filter: "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9 },
            "-=0.6",
          )
          .fromTo(
            ".hero-cta",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
            "-=0.65",
          )
          .fromTo(
            ".hero-meta",
            { opacity: 0 },
            { opacity: 1, duration: 0.6 },
            "-=0.4",
          )
          .fromTo(
            ".hero-wordmark",
            { opacity: 0, yPercent: 12 },
            { opacity: 1, yPercent: 0, duration: 1.4 },
            0.2,
          );

        /* Parallax: content drifts up, wordmark down, as the hero scrolls out */
        const scrollTrigger = {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        };

        gsap.to(".hero-content", {
          yPercent: -12,
          ease: "none",
          scrollTrigger,
        });
        gsap.to(".hero-watermark", {
          yPercent: 14,
          ease: "none",
          scrollTrigger,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleLines = ["Full Stack", "Developer", "based in Nepal"];

  return (
    <section
      ref={sectionRef}
      id="sup"
      className="section relative isolate overflow-hidden"
    >
      <HeroBackdrop />

      <div className="container relative z-10 flex min-h-[100dvh] flex-col justify-center py-28">
        <div className="hero-content w-full">
          {/* Title */}
          <h1 className="font-bricolage text-display-sm font-bold text-fg sm:text-display-md lg:text-display-xl">
            {titleLines.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span className="hero-title-line block">{line}</span>
              </span>
            ))}
          </h1>

          <div
            className="hero-rule my-9 h-px w-full bg-line-strong"
            aria-hidden="true"
          />

          {/* Statement left, actions right. The subtitle no longer spans the
              full container width, which is what made it break mid-word. */}
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-16">
            <p className="hero-subtitle max-w-md text-pretty font-inter text-lg font-medium leading-relaxed text-fg-muted sm:text-xl">
              {site.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/#contact"
                className="hero-cta group inline-flex items-center gap-4 rounded-full bg-fg py-2 pl-6 pr-2 transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-accent active:scale-[0.98]"
              >
                <span className="font-inter text-sm font-semibold text-bg-elevated">
                  Start a project
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-bg-elevated/15 text-bg-elevated transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-[2px] group-hover:translate-x-[2px] group-hover:scale-105">
                  <ArrowUpRight />
                </span>
              </Link>

              <Link
                href="/#works"
                className="hero-cta inline-flex items-center rounded-full border border-line-strong px-6 py-[1.15rem] font-inter text-sm font-semibold leading-none text-fg transition-[color,border-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-accent hover:text-accent active:scale-[0.98]"
              >
                See selected work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
