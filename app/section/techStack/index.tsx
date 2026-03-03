"use client";

import { useState } from "react";

import {
  FaShopify,
  FaGitAlt,
  FaHtml5,
  FaCss3Alt,
  FaAws,
  FaFigma,
  FaWordpress,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiReact,
  SiPrisma,
  SiMongodb,
  SiTailwindcss,
  SiTypescript,
  SiVisualstudiocode,
  SiNodedotjs,
  SiRemix,
  SiDocker,
  SiStrapi,
  SiVercel,
  SiPostgresql,
} from "react-icons/si";

function MarqueeColumn({
  technologies,
  duration = 30,
}: {
  technologies: Array<{ name: string; Icon: any }>;
  duration?: number;
}) {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="flex-1 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          animation: `techstack-marquee ${duration}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {[...Array(4)].map((_, copyIdx) =>
          technologies.map(({ name, Icon }) => (
            <div
              key={`${copyIdx}-${name}`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                backgroundColor: "var(--red-shade)",
              }}
            >
              <Icon style={{ width: 22, height: 22, color: "#000" }} />
              <span
                style={{ fontSize: "10px", color: "#9ca3af", fontWeight: 300 }}
              >
                {name}
              </span>
            </div>
          )),
        )}
      </div>
    </div>
  );
}

export const TechStackSection = () => {
  return (
    <div
      style={{
        position: "relative",
        height: "560px",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes techstack-marquee {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-25%); }
        }
      `}</style>

      {/* Marquee columns */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          gap: "12px",
        }}
      >
        <MarqueeColumn
          technologies={[
            { name: "React", Icon: SiReact },
            { name: "Node.js", Icon: SiNodedotjs },
            { name: "TypeScript", Icon: SiTypescript },
            { name: "PostgreSQL", Icon: SiPostgresql },
            { name: "Docker", Icon: SiDocker },
            { name: "AWS", Icon: FaAws },
          ]}
          duration={30}
        />
        <MarqueeColumn
          technologies={[
            { name: "Next.js", Icon: SiNextdotjs },
            { name: "Prisma", Icon: SiPrisma },
            { name: "MongoDB", Icon: SiMongodb },
            { name: "Tailwind", Icon: SiTailwindcss },
            { name: "Strapi", Icon: SiStrapi },
            { name: "Remix", Icon: SiRemix },
          ]}
          duration={38}
        />
        <MarqueeColumn
          technologies={[
            { name: "HTML", Icon: FaHtml5 },
            { name: "CSS", Icon: FaCss3Alt },
            { name: "Git", Icon: FaGitAlt },
            { name: "Figma", Icon: FaFigma },
            { name: "Vercel", Icon: SiVercel },
            { name: "VS Code", Icon: SiVisualstudiocode },
            { name: "Shopify", Icon: FaShopify },
            { name: "WordPress", Icon: FaWordpress },
          ]}
          duration={46}
        />
      </div>

      {/* Fade overlays */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "120px",
          background:
            "linear-gradient(to bottom, rgb(var(--background)) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          background:
            "linear-gradient(to top, rgb(var(--background)) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />
    </div>
  );
};
