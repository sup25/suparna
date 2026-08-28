/**
 * Self-directed work, kept separate from `projects`, which is client
 * engagements only. Detail for the GitHub-hosted entries comes from the
 * repository READMEs; nothing here is inferred from the stack alone.
 */
export type SideProject = {
  id: string;
  name: string;
  /** One line for the card head. */
  tagline: string;
  description: string;
  /** Public repository, where the source is published. */
  repo?: string;
  /** Live deployment, where one exists. */
  live?: string;
  stack: string[];
  highlights: string[];
  year: string;
  /** Renders wide in the grid. */
  featured?: boolean;
};

export const sideProjects: SideProject[] = [
  {
    id: "scrubix",
    name: "Scrubix",
    tagline: "Self-hostable AI proxy that strips PII before it reaches an LLM",
    description:
      "LLM applications routinely forward raw user text to third-party providers. Scrubix sits between the app and the provider, detects personal data in the request, and redacts it before anything leaves your own infrastructure.",
    repo: "https://github.com/sup25/scrubix",
    live: "https://scrubix-web.fly.dev",
    stack: [
      "Go",
      "Gin",
      "PostgreSQL",
      "sqlc",
      "Redis",
      "Next.js",
      "React",
      "Tailwind CSS",
      "Docker",
      "Fly.io",
    ],
    highlights: [
      "Regex PII detection across six built-in patterns plus custom team-defined rules.",
      "Multi-tenant auth with JWT httpOnly cookies for the dashboard and API keys for machine access.",
      "Redis-backed caching and rate limiting that degrades gracefully when Redis is unavailable.",
      "Every request and redaction event written to an audit log in Postgres, with webhook alerts on redaction.",
      "Provider routing for Groq and Gemini, including Server-Sent Events streaming.",
      "Tested end to end: Vitest, React Testing Library and MSW on the frontend; Postgres and Redis containers for backend integration tests.",
    ],
    year: "2026",
    featured: true,
  },
  {
    id: "edoms",
    name: "EDOMS",
    tagline: "Event-driven order management across five microservices",
    description:
      "An order management system split into independently deployable Auth, Product, Inventory, Order, and Payment services, communicating over a message queue rather than direct calls. Built to work through distributed consistency properly rather than in theory.",
    repo: "https://github.com/sup25/edoms",
    stack: [
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "RabbitMQ",
      "REST APIs",
      "JWT Auth",
    ],
    highlights: [
      "Five services, each independently deployable, coordinating through RabbitMQ event-driven messaging.",
      "PostgreSQL chosen for ACID transactions where order and payment state has to stay consistent.",
      "JWT authentication with role-based access control across every service boundary.",
      "Redis caching, API rate limiting, and hashed credentials throughout.",
    ],
    year: "2025",
  },
  {
    id: "remix-store",
    name: "Remix Store",
    tagline: "Containerised Remix storefront with eSewa payments on AWS",
    description:
      "A full-stack e-commerce platform built to integrate eSewa, Nepal's most widely used digital wallet, and to practise a fully automated release path rather than deploying by hand.",
    repo: "https://github.com/sup25/remix",
    stack: [
      "Remix.js",
      "Prisma",
      "PostgreSQL",
      "Docker",
      "Nginx",
      "AWS EC2",
      "GitHub Actions",
      "eSewa",
    ],
    highlights: [
      "Storefront, cart, and checkout built on Remix with Prisma over PostgreSQL.",
      "eSewa payments integrated end to end, including transaction signing and the redirect flow.",
      "Containerised with Docker and served behind Nginx on EC2.",
      "GitHub Actions pipeline building the image and deploying to EC2, with health checks and rollback. Deployment became one automated path instead of a sequence of manual steps.",
    ],
    year: "2024",
  },
  {
    id: "nextjs-ecommerce-store",
    name: "Next.js E-Commerce Store",
    tagline: "Stripe checkout, Cloudinary delivery, split staging and production",
    description:
      "An e-commerce build used to work through the parts that usually get skipped in a demo project: real payment handling, image delivery at scale, and properly separated environment configuration.",
    stack: [
      "Next.js",
      "Prisma",
      "PostgreSQL",
      "Stripe",
      "Cloudinary",
      "Vercel",
    ],
    highlights: [
      "Storefront built on Next.js with Prisma over PostgreSQL.",
      "Full Stripe checkout integration.",
      "Image delivery optimised through the Cloudinary CDN.",
      "Environment-based configuration driving separate staging and production deployments on Vercel.",
    ],
    year: "2024",
  },
  {
    id: "int-sql-data-analytics",
    name: "SQL Customer Analytics",
    tagline: "Segmentation, cohort and retention analysis in pure SQL",
    description:
      "Advanced analysis of retail transaction data on the contoso_100k sample database: the kind of customer questions that usually get answered in a BI tool, worked through in SQL instead.",
    repo: "https://github.com/sup25/int_sql_data_analytics",
    stack: ["SQL", "PostgreSQL"],
    highlights: [
      "Customer segmentation by lifetime value into low, mid, and high tiers on the 25th and 75th percentiles.",
      "A reusable cohort_analysis view that encapsulates the cohort logic instead of repeating it per query.",
      "Window functions (OVER and ROW_NUMBER()) for ranking and per-cohort analytics.",
      "Retention tracking that classifies customers active or churned on six months of inactivity.",
    ],
    year: "2024",
  },
];
