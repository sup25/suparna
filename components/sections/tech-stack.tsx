"use client";

import type { IconType } from "react-icons";
import {
  FaAws,
  FaCss3Alt,
  FaFigma,
  FaGitAlt,
  FaHtml5,
  FaShopify,
  FaWordpress,
} from "react-icons/fa";
import {
  SiDocker,
  SiExpress,
  SiFirebase,
  SiGithubactions,
  SiGo,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiRabbitmq,
  SiReact,
  SiRedis,
  SiRemix,
  SiStripe,
  SiStrapi,
  SiSwagger,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVitest,
} from "react-icons/si";
import { skillGroups } from "@/content/skills";

/** Icons for the marquee band. Text content lives in the grouped list below. */
const marqueeIcons: { name: string; Icon: IconType }[] = [
  { name: "TypeScript", Icon: SiTypescript },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "Go", Icon: SiGo },
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Remix", Icon: SiRemix },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Express", Icon: SiExpress },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "MySQL", Icon: SiMysql },
  { name: "Redis", Icon: SiRedis },
  { name: "RabbitMQ", Icon: SiRabbitmq },
  { name: "Prisma", Icon: SiPrisma },
  { name: "Swagger", Icon: SiSwagger },
  { name: "Vitest", Icon: SiVitest },
  { name: "AWS", Icon: FaAws },
  { name: "Docker", Icon: SiDocker },
  { name: "GitHub Actions", Icon: SiGithubactions },
  { name: "Vercel", Icon: SiVercel },
  { name: "Netlify", Icon: SiNetlify },
  { name: "Firebase", Icon: SiFirebase },
  { name: "Stripe", Icon: SiStripe },
  { name: "Shopify", Icon: FaShopify },
  { name: "Strapi", Icon: SiStrapi },
  { name: "WordPress", Icon: FaWordpress },
  { name: "Tailwind", Icon: SiTailwindcss },
  { name: "Git", Icon: FaGitAlt },
  { name: "HTML", Icon: FaHtml5 },
  { name: "CSS", Icon: FaCss3Alt },
  { name: "Figma", Icon: FaFigma },
];

/** Grouped skills: the real content, straight from the CV. */
export function SkillGroups() {
  return (
    <dl className="space-y-6">
      {skillGroups.map((group) => (
        <div
          key={group.label}
          className="grid gap-2 sm:grid-cols-[7.5rem_1fr] sm:gap-4"
        >
          <dt className="eyebrow pt-1">{group.label}</dt>
          <dd className="flex flex-wrap gap-1.5">
            {group.items.map((item) => (
              <span
                key={item}
                className="rounded-md border border-line bg-bg-elevated px-2.5 py-1 font-inter text-[0.8rem] text-fg-muted"
              >
                {item}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Thin horizontal icon band. Decorative, since every technology named here also
 * appears as text in SkillGroups, so nothing is lost to crawlers.
 */
export function TechMarquee() {
  const track = [...marqueeIcons, ...marqueeIcons];

  return (
    <div
      className="relative w-full overflow-hidden py-4"
      aria-hidden="true"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <style>{`
        @keyframes tech-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .tech-marquee-track {
          animation: tech-marquee 45s linear infinite;
        }
        .tech-marquee-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .tech-marquee-track { animation: none; }
        }
      `}</style>

      <div className="tech-marquee-track flex w-max items-center gap-10">
        {track.map(({ name, Icon }, i) => (
          <Icon
            key={`${name}-${i}`}
            size={26}
            className="shrink-0 text-fg-faint transition-colors hover:text-accent"
            title={name}
          />
        ))}
      </div>
    </div>
  );
}
