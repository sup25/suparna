export type Role = {
  id: string;
  title: string;
  company: string;
  location: string;
  start: string;
  end: string | "Present";
  /** ISO dates for JSON-LD / <time> elements. */
  startISO: string;
  endISO: string | null;
  highlights: string[];
  technologies: string[];
};

/**
 * Work history, newest first. Mostly verbatim from the CV. The Appsha CRM and
 * notification bullets are additions, since both shipped after the CV was written.
 */
export const experience: Role[] = [
  {
    id: "appsha",
    title: "Full Stack Developer",
    company: "Appsha",
    location: "Banasthali, Kathmandu",
    start: "Jul 2025",
    end: "Present",
    startISO: "2025-07",
    endISO: null,
    highlights: [
      "Led migration from a monolithic Next.js app to a decoupled 3-tier architecture, enabling independent deployments and eliminating a single point of failure.",
      "Designed and built RESTful APIs with JWT authentication and role-based access control, powering core platform functionality.",
      "Engineered a WebSocket-based real-time system for live data sync, eliminating polling and reducing server load.",
      "Built a live notification system on that WebSocket layer, with persisted delivery so events survive a closed session and stay consistent across open tabs.",
      "Built the platform's CRM end to end: automatic contact capture from every conversion event, full interaction history per contact, in-app email logged against the record, and deals and tasks for follow-up.",
      "Built an event-driven transactional email system using Loops, handling lifecycle events such as trials, upgrades, downgrades, and payment failures.",
      "Integrated Strapi CMS, enabling non-technical teams to manage content and reducing update turnaround to same-day delivery.",
      "Developed a Gemini-powered AI content generation system with a reusable service and prompt architecture.",
      "Authored Swagger API documentation and internal architecture guides, improving developer onboarding efficiency.",
      "Managed AWS infrastructure (EC2, database, messaging), ensuring reliable production uptime across all platform services.",
    ],
    technologies: [
      "Next.js",
      "Node.js",
      "Strapi",
      "Loops",
      "REST APIs",
      "WebSockets",
      "Swagger",
      "AWS",
    ],
  },
  {
    id: "carthagos",
    title: "Mid-Level Software Engineer",
    company: "Carthagos",
    location: "Portugal (Remote)",
    start: "May 2023",
    end: "Jul 2025",
    startISO: "2023-05",
    endISO: "2025-07",
    highlights: [
      "Built admin dashboards in Next.js across multiple client projects, including the panel governing access to Battalion's connected toolboxes: pairing devices to the people authorised to open them, editable from either the device or the user side, with keypad codes and user suspension handled in the same place.",
      "Developed and shipped a cross-platform React Native app to iOS and Android that speaks to Battalion's smart toolboxes over Bluetooth Low Energy, covering device pairing and owner approval, live battery, temperature and lock state read off the unit, heater and lock control, and state management, REST API integration and offline data persistence end to end.",
      "Delivered custom Shopify storefronts with tailored Liquid themes and third-party integrations, improving conversion UX for e-commerce clients.",
      "Integrated REST APIs across multiple client projects, ensuring reliable data flow and consistency across systems.",
    ],
    technologies: [
      "Next.js",
      "React.js",
      "React Native",
      "Bluetooth Low Energy (BLE)",
      "Node.js",
      "Shopify (Liquid)",
      "Tailwind CSS",
      "REST APIs",
    ],
  },
  {
    id: "freelance",
    title: "Full Stack Developer",
    company: "Freelance",
    location: "Kathmandu (Remote)",
    start: "Apr 2023",
    end: "Present",
    startISO: "2023-04",
    endISO: null,
    highlights: [
      "Built and deployed full-stack MERN and PERN applications end-to-end on AWS EC2, covering database schema design, backend services, and frontend delivery for independent clients.",
      "Engineered a role-based employee management system with task assignment workflows, access control for admin and employee roles, and full CRUD operations, reducing manual HR tracking overhead for the client.",
      "Developed dynamic Next.js web applications with custom backend logic and third-party API integrations, delivering responsive, production-ready products on time and within scope.",
      "Delivered custom WordPress (Elementor) websites for small business clients, handling the full project lifecycle from scoping to deployment.",
    ],
    technologies: [
      "Node.js",
      "Next.js",
      "Remix.js",
      "PostgreSQL",
      "MongoDB",
      "Express",
      "AWS EC2",
      "WordPress",
    ],
  },
  {
    id: "dazzle",
    title: "Frontend Developer",
    company: "Dazzle Marketing Solutions",
    location: "New Baneshwor, Kathmandu",
    start: "Apr 2023",
    end: "May 2023",
    startISO: "2023-04",
    endISO: "2023-05",
    highlights: [
      "Built a responsive React.js marketing website with reusable component architecture, ensuring pixel-perfect implementation of designer specifications.",
      "Optimised page performance and collaborated with the design team to deliver a clean, user-friendly UI on schedule.",
    ],
    technologies: ["React.js", "Tailwind CSS"],
  },
];

export const education = {
  degree: "Bachelor of Computer Science and Information Technology",
  institution: "Tribhuvan University",
  start: "2018",
  end: "2022",
};

export const certifications = [
  {
    name: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services",
    date: "Mar 2025",
  },
  {
    name: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "Jan 2022",
  },
  {
    name: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "Aug 2021",
  },
];
