// components/SpecialtyIcons.tsx
import { FaShopify, FaGitAlt, FaHtml5, FaCss3Alt, FaAws } from "react-icons/fa";
import {
  SiNextdotjs,
  SiReact,
  SiPrisma,
  SiMongodb,
  SiTailwindcss,
  SiTypescript,
  SiVisualstudiocode,
  SiNodedotjs,
  SiWordpress,
  SiRemix,
  SiDocker,
  SiAwselasticloadbalancing,
} from "react-icons/si";

export const specialties = [
  {
    name: "React",
    icon: <SiReact className="text-[rgb(var(--background))] w-12 h-12" />,
  },
  {
    name: "Shopify",
    icon: <FaShopify className="text-[rgb(var(--background))] w-12 h-12" />, // w-8 = 30px, w-12 = 50px
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs className="text-[rgb(var(--background))] w-12 h-12" />,
  },
  {
    name: "Node.js",
    icon: <SiNodedotjs className="text-[rgb(var(--background))] w-12 h-12" />,
  },
  {
    name: "Remix",
    icon: <SiRemix className="text-[rgb(var(--background))] w-12 h-12" />,
  },
  {
    name: "WordPress",
    icon: <SiWordpress className="text-[rgb(var(--background))] w-12 h-12" />,
  },
  {
    name: "Docker",
    icon: <SiDocker className="text-[rgb(var(--background))] w-12 h-12" />,
  },
  {
    name: "Aws",
    icon: <FaAws className="text-[rgb(var(--background))] w-12 h-12" />,
  },
  {
    name: "Prisma",
    icon: <SiPrisma className="text-[rgb(var(--background))] w-12 h-12" />,
  },
  {
    name: "MongoDB",
    icon: <SiMongodb className="text-[rgb(var(--background))] w-12 h-12" />,
  },
  {
    name: "Git",
    icon: <FaGitAlt className="text-[rgb(var(--background))] w-12 h-12" />,
  },
  {
    name: "HTML5",
    icon: <FaHtml5 className="text-[rgb(var(--background))] w-12 h-12" />,
  },
  {
    name: "CSS3",
    icon: <FaCss3Alt className="text-[rgb(var(--background))] w-12 h-12" />,
  },
  {
    name: "TailwindCSS",
    icon: <SiTailwindcss className="text-[rgb(var(--background))] w-12 h-12" />,
  },
  {
    name: "TypeScript",
    icon: <SiTypescript className="text-[rgb(var(--background))] w-12 h-12" />,
  },
  {
    name: "VS Code",
    icon: (
      <SiVisualstudiocode className="text-[rgb(var(--background))] w-12 h-12" />
    ),
  },
];
