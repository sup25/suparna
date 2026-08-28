"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "./section-header";
import { projects, type Project } from "@/content/projects";

/**
 * Registered here explicitly. The previous version called
 * `gsap.registerPlugin()` with no arguments and relied on a sibling section
 * having imported ScrollTrigger first. The card animations worked only as a
 * side effect of unrelated import order.
 */
gsap.registerPlugin(ScrollTrigger);

/** Grid spans per card: [mobileCol, mobileRow, desktopCol, desktopRow] */
const spans: [number, number, number, number][] = [
  [2, 2, 2, 2], // Appsha: hero tile
  [1, 1, 1, 1], // Battalion Admin
  [1, 2, 1, 2], // Battalion App: tall
  [1, 1, 1, 1], // Battalion Tools
  [1, 1, 1, 1], // Cramers
  [1, 1, 1, 1], // Graze & Co
  [2, 1, 2, 1], // CStoreSync: wide
];

function ProjectCard({
  project,
  span,
  index,
}: {
  project: Project;
  span: [number, number, number, number];
  index: number;
}) {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          delay: (index % 3) * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [index]);

  const [mCol, mRow, dCol, dRow] = span;
  const isLarge = dCol === 2 && dRow === 2;

  return (
    <article
      ref={cardRef}
      className="bento-card group relative overflow-hidden rounded-xl sm:rounded-2xl"
      style={
        {
          "--dc": dCol,
          "--dr": dRow,
          gridColumn: `span ${mCol}`,
          gridRow: `span ${mRow}`,
        } as React.CSSProperties
      }
    >
      {/* One link covering the card, no nested anchors */}
      <Link
        href={`/work/${project.slug}`}
        className="absolute inset-0 z-20 flex flex-col justify-end p-3 sm:p-5"
        aria-label={`${project.title}: read the case study`}
      >
        <div>
          <div className="mb-1 font-inter text-[9px] uppercase tracking-[0.25em] text-white/60 sm:mb-2 sm:text-[10px]">
            {project.type}
          </div>

          <h3 className="font-bricolage text-sm font-semibold leading-tight text-white sm:text-lg md:text-xl">
            {project.title}
          </h3>

          {isLarge && (
            <p className="mt-2 hidden max-w-md font-inter text-xs leading-relaxed text-white/70 sm:block">
              {project.summary}
            </p>
          )}

          <div className="mt-2 flex flex-wrap gap-1 sm:mt-3 sm:gap-1.5">
            {project.tags.slice(0, isLarge ? 5 : 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/20 bg-white/10 px-1.5 py-0.5 font-inter text-[8px] font-medium text-white/80 backdrop-blur-sm sm:px-2.5 sm:py-1 sm:text-[10px]"
              >
                {tag}
              </span>
            ))}
          </div>

          <span className="mt-3 inline-flex items-center gap-1.5 font-inter text-[10px] font-semibold uppercase tracking-wider text-white/0 transition-colors duration-300 group-hover:text-white sm:text-[11px]">
            Read case study
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>

      {/* Image */}
      <Image
        src={project.image}
        alt={`${project.title}, ${project.type}`}
        fill
        sizes={
          isLarge
            ? "(max-width: 640px) 100vw, 66vw"
            : "(max-width: 640px) 50vw, 33vw"
        }
        priority={index === 0}
        className="card-image object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />

      {/* Legibility scrim */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: isLarge
            ? "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.12) 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.05) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Accent wash on hover */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgb(var(--accent) / 0.18) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />
    </article>
  );
}

export default function WorksSection() {
  return (
    <section id="works" className="section section-y">
      <style>{`
        .bento-grid {
          display: grid;
          gap: 10px;
          grid-template-columns: repeat(2, 1fr);
          grid-auto-rows: 155px;
        }
        @media (min-width: 640px) {
          .bento-grid {
            gap: 12px;
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: 210px;
          }
          .bento-grid .bento-card {
            grid-column: span var(--dc);
            grid-row: span var(--dr);
          }
        }
      `}</style>

      <div className="container">
        <SectionHeader
          index="03"
          eyebrow="Selected work"
          title="Things I've shipped"
          intro="Client platforms, storefronts, and internal tools, each with a short write-up of what the problem was and what the work actually involved."
        />

        <div className="bento-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              span={spans[index] ?? [1, 1, 1, 1]}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
