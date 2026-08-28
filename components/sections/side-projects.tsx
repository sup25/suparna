"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub } from "react-icons/fa";
import SectionHeader from "./section-header";
import { sideProjects, type SideProject } from "@/content/side-projects";

gsap.registerPlugin(ScrollTrigger);

/** Ultra-light arrow, matching the hero CTA. */
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

/**
 * Cards use a nested enclosure (an outer tray with a hairline ring, holding an
 * inner core at a concentric radius) rather than sitting flat on the page
 * behind a single 1px border like the rest of the site's cards.
 */
function SideProjectCard({ project }: { project: SideProject }) {
  const { name, tagline, description, repo, live, stack, highlights, featured } =
    project;

  return (
    <article
      className={`os-card group rounded-[1.75rem] bg-bg-subtle p-1.5 ring-1 ring-fg/[0.06] transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-[0_24px_60px_-32px_rgb(var(--fg)/0.28)] ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <div className="flex h-full flex-col rounded-[calc(1.75rem-0.375rem)] bg-bg-elevated p-7 shadow-[inset_0_1px_0_rgb(255_255_255/0.9)] sm:p-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h3 className="font-bricolage text-xl font-bold text-fg sm:text-2xl">
              {name}
            </h3>
            <p className="mt-1.5 max-w-lg font-inter text-sm font-medium text-accent">
              {tagline}
            </p>
          </div>

          <span className="eyebrow shrink-0 pt-2">{project.year}</span>
        </div>

        <p className="mt-5 max-w-2xl font-inter text-[0.925rem] leading-relaxed text-fg-muted">
          {description}
        </p>

        <ul
          className={`mt-6 space-y-2.5 border-t border-line pt-6 ${
            featured ? "sm:columns-2 sm:gap-x-10 sm:space-y-0" : ""
          }`}
        >
          {highlights.map((item) => (
            <li
              key={item}
              className={`relative pl-5 font-inter text-[0.875rem] leading-relaxed text-fg-muted ${
                featured ? "sm:mb-2.5 sm:break-inside-avoid" : ""
              }`}
            >
              <span
                className="absolute left-0 top-[0.55em] h-1 w-1 rounded-full bg-accent"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-line bg-bg-subtle px-2 py-0.5 font-inter text-[0.7rem] text-fg-subtle"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions pinned to the card foot so cards of unequal height align.
            Not every side project has published source, so the row can be
            empty, hence the whole block is conditional rather than the
            individual links. */}
        {(repo || live) && (
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
            {repo && (
              <a
                href={repo}
                target="_blank"
                rel="noopener noreferrer"
                className="group/cta inline-flex items-center gap-3 rounded-full bg-fg py-1.5 pl-5 pr-1.5 transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-accent active:scale-[0.98]"
              >
                <span className="inline-flex items-center gap-2 font-inter text-sm font-semibold text-bg-elevated">
                  <FaGithub size={15} aria-hidden="true" />
                  View source
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-elevated/15 text-bg-elevated transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/cta:-translate-y-[2px] group-hover/cta:translate-x-[2px] group-hover/cta:scale-105">
                  <ArrowUpRight />
                </span>
              </a>
            )}

            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-line-strong px-5 py-[0.8rem] font-inter text-sm font-semibold leading-none text-fg transition-[color,border-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-accent hover:text-accent active:scale-[0.98]"
              >
                Live demo
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default function SideProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".os-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="side-projects" className="section section-y">
      <div className="container">
        <SectionHeader
          index="04"
          eyebrow="Side projects"
          title="Things I build on my own time"
          intro="Self-directed builds, several with the source public on GitHub, where I go deeper on the parts client work doesn't always call for: Go services, event-driven architecture, and analytics in raw SQL."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {sideProjects.map((project) => (
            <SideProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
