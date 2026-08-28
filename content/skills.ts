/**
 * Grouped skills. Drives the About tech-stack panel and JSON-LD `knowsAbout`.
 * Sourced from the CV, plus the stack proven in content/side-projects.ts:
 * Go/Gin, Redis, RabbitMQ, sqlc, Fly.io and the Vitest suite all come from
 * shipped repositories rather than the CV list.
 */
export const skillGroups = [
  {
    label: "Languages",
    items: ["JavaScript (ES6+)", "TypeScript", "Go"],
  },
  {
    label: "Frontend",
    items: ["React.js", "Next.js", "Remix.js", "React Native"],
  },
  {
    label: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "Gin",
      "REST APIs",
      "WebSockets",
      "RabbitMQ",
      "Microservices",
    ],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "SQL"],
  },
  {
    label: "ORM & Tools",
    items: ["Prisma", "sqlc", "Swagger", "JWT Auth"],
  },
  {
    label: "Cloud & DevOps",
    items: [
      "AWS (EC2)",
      "Docker",
      "CI/CD (GitHub Actions)",
      "Fly.io",
      "Vercel",
      "Netlify",
      "Firebase",
    ],
  },
  {
    label: "Testing",
    items: ["Vitest", "React Testing Library", "MSW"],
  },
  {
    label: "Integrations",
    items: [
      "Stripe",
      "Stripe Connect",
      "Shopify (Liquid)",
      "Strapi",
      "Cloudinary",
      "WordPress",
    ],
  },
] as const;

/** Flat list for JSON-LD `knowsAbout`. */
export const allSkills = skillGroups.flatMap((g) => [...g.items]);
