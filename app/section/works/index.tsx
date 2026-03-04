"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { projects } from "./projects";
import Link from "next/link";
import SectionHeader from "../sectionHeader";

gsap.registerPlugin();

const cardConfig = [
  { mobileCol: 2, mobileRow: 2, desktopCol: 2, desktopRow: 2 }, // 1 — hero
  { mobileCol: 1, mobileRow: 1, desktopCol: 1, desktopRow: 1 }, // 2
  { mobileCol: 1, mobileRow: 1, desktopCol: 1, desktopRow: 1 }, // 3
  { mobileCol: 1, mobileRow: 2, desktopCol: 1, desktopRow: 2 }, // 4 — tall
  { mobileCol: 1, mobileRow: 1, desktopCol: 2, desktopRow: 1 }, // 5 — desktop wide
  { mobileCol: 1, mobileRow: 1, desktopCol: 1, desktopRow: 1 }, // 6
  { mobileCol: 2, mobileRow: 1, desktopCol: 1, desktopRow: 1 }, // 7 — mobile full-width
];

function ProjectCard({
  project,
  config,
  index,
}: {
  project: (typeof projects)[0];
  config: (typeof cardConfig)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const animation = gsap.fromTo(
      el,
      { opacity: 0, y: 30, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        delay: index * 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      },
    );

    const enter = () =>
      gsap.to(el.querySelector(".card-image"), {
        scale: 1.05,
        duration: 0.5,
        ease: "power2.out",
      });
    const leave = () =>
      gsap.to(el.querySelector(".card-image"), {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });

    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);

    return () => {
      animation.kill();
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, [index]);

  const Content = (
    <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-5">
      <div>
        <div
          className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-1 sm:mb-2"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          {project.type}
        </div>

        <h3 className="font-semibold  font-bricolage leading-tight text-white text-sm sm:text-lg md:text-xl">
          {project.title}
        </h3>

        <div className="flex flex-wrap gap-1  sm:gap-1.5 mt-2 sm:mt-3">
          {project.tags.slice(0, 6).map((tag) => (
            <span
              key={tag}
              className="text-[8px] sm:text-[10px] px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full font-medium"
              style={{
                background: "rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,0,0,0.4)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
  const { mobileCol, mobileRow, desktopCol, desktopRow } = config;
  const isLarge = desktopCol === 2 && desktopRow === 2;

  return (
    <div
      ref={cardRef}
      className="bento-card group relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer"
      style={
        {
          "--dc": desktopCol,
          "--dr": desktopRow,
          gridColumn: `span ${mobileCol}`,
          gridRow: `span ${mobileRow}`,
        } as React.CSSProperties
      }
    >
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="card-image w-full h-full object-cover"
          style={{ transformOrigin: "center" }}
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: isLarge
            ? "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
        }}
      />

      {/* Content */}
      {project.link ? (
        <Link
          href={project.link}
          target="_blank"
          className="absolute inset-0 flex flex-col justify-end p-3 sm:p-5"
        >
          {Content}
        </Link>
      ) : (
        <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-5">
          {Content}
        </div>
      )}

      {/* Hover shine */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,0,0,0.08) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}

export default function BentoLayout() {
  return (
    <section id="works" className="section py-16 sm:py-24">
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
        {/* Header */}
        <SectionHeader title="Selected Works" />

        {/* Bento Grid */}
        <div className="bento-grid">
          {projects.map((project, index) => {
            const config = cardConfig[index] ?? {
              mobileCol: 1,
              mobileRow: 1,
              desktopCol: 1,
              desktopRow: 1,
            };
            return (
              <ProjectCard
                key={project.id}
                project={project}
                config={config}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
