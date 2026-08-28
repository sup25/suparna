"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "./section-header";
import { experience } from "@/content/experience";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* The spine draws downward as the timeline scrolls into view */
      gsap.fromTo(
        ".xp-spine",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: ".xp-list",
            start: "top 75%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".xp-role").forEach((role) => {
        gsap.fromTo(
          role,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: role, start: "top 86%" },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="section section-y">
      <div className="container w-full">
        <SectionHeader
          index="02"
          eyebrow="Experience"
          title="Where I've worked"
          intro="Four engagements across product SaaS, remote agency delivery, independent freelance work, and an in-house frontend team."
        />

        <div className="xp-list relative pl-8 sm:pl-12">
          {/* Timeline spine */}
          <div
            className="absolute left-[3px] top-2 h-full w-px bg-line sm:left-[7px]"
            aria-hidden="true"
          >
            <div
              className="xp-spine h-full w-full bg-accent/40"
              style={{ transformOrigin: "top center" }}
            />
          </div>

          <ol className="space-y-14">
            {experience.map((role) => (
              <li key={role.id} className="xp-role relative">
                {/* Node */}
                <span
                  className="absolute -left-8 top-1.5 flex h-[9px] w-[9px] items-center justify-center sm:-left-12"
                  aria-hidden="true"
                >
                  <span
                    className={
                      role.endISO === null
                        ? "h-[9px] w-[9px] rounded-full bg-accent ring-4 ring-accent-soft"
                        : "h-[9px] w-[9px] rounded-full border border-line-strong bg-bg"
                    }
                  />
                </span>

                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <div className="min-w-0">
                    <h3 className="font-bricolage text-xl font-bold text-fg sm:text-2xl">
                      {role.title}
                    </h3>
                    <p className="mt-1 font-inter text-sm font-medium text-accent">
                      {role.company}
                      <span className="font-normal text-fg-subtle">
                        {" "}
                        · {role.location}
                      </span>
                    </p>
                  </div>

                  <p className="shrink-0 font-inter text-xs uppercase tracking-wider text-fg-subtle">
                    <time dateTime={role.startISO}>{role.start}</time>
                    {" - "}
                    {role.endISO ? (
                      <time dateTime={role.endISO}>{role.end}</time>
                    ) : (
                      <span className="text-accent">{role.end}</span>
                    )}
                  </p>
                </div>

                <ul className="mt-5 space-y-2.5">
                  {role.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="relative pl-5 font-inter text-[0.9rem] leading-relaxed text-fg-muted"
                    >
                      <span
                        className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-fg-faint"
                        aria-hidden="true"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {role.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-line bg-bg-elevated px-2 py-0.5 font-inter text-[0.7rem] text-fg-subtle"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
