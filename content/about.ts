export type BioSegment = { text: string; highlight: boolean };

/**
 * The bio, as paragraphs of highlightable segments. Highlighted segments render
 * darker and heavier, and drive the word-by-word scroll reveal in the About
 * section.
 *
 * Grounded in the CV: every claim here maps to a role in content/experience.ts.
 */
export const aboutParagraphs: BioSegment[][] = [
  [
    { text: "I am a ", highlight: false },
    { text: "full stack developer with 3+ years", highlight: true },
    {
      text: " of building and scaling production systems end to end, across ",
      highlight: false,
    },
    { text: "SaaS, e-commerce, and mobile platforms", highlight: true },
    {
      text: ". Most of what I do sits on both sides of the API boundary. I own systems from ",
      highlight: false,
    },
    {
      text: "database architecture and API design through to cloud infrastructure and deployment",
      highlight: true,
    },
    { text: ".", highlight: false },
  ],
  [
    { text: "On the frontend I work primarily in ", highlight: false },
    { text: "Next.js, React, and Remix", highlight: true },
    { text: ", with ", highlight: false },
    { text: "React Native", highlight: true },
    {
      text: " for cross-platform mobile. On the backend, ",
      highlight: false,
    },
    {
      text: "Node.js and Express over PostgreSQL and MongoDB",
      highlight: true,
    },
    { text: ", with ", highlight: false },
    { text: "REST APIs, JWT auth, and role-based access control", highlight: true },
    {
      text: " as the default shape. I have replaced polling with ",
      highlight: false,
    },
    { text: "WebSocket-based real-time sync", highlight: true },
    { text: ", and led a migration from a ", highlight: false },
    {
      text: "Next.js monolith to a decoupled three-tier architecture",
      highlight: true,
    },
    {
      text: " so tiers could deploy independently instead of failing together.",
      highlight: false,
    },
  ],
  [
    { text: "I am comfortable owning the parts either side of the code: ", highlight: false },
    {
      text: "AWS EC2 infrastructure, Docker, and CI/CD pipelines in GitHub Actions",
      highlight: true,
    },
    { text: ", plus payment and content integrations: ", highlight: false },
    { text: "Stripe, Shopify Liquid, Strapi, and eSewa", highlight: true },
    {
      text: ". I also write the documentation nobody volunteers for: ",
      highlight: false,
    },
    { text: "Swagger API specs and internal architecture guides", highlight: true },
    { text: ", because onboarding is a feature.", highlight: false },
  ],
];
