/**
 * Single source of truth for site-wide identity.
 * Every route, metadata block, and JSON-LD graph reads from here.
 */
export const site = {
  name: "Suparna Adhikari",
  role: "Full Stack Developer",
  url: "https://suparna.com.np",
  locale: "en_US",

  // Confirmed canonical contact address (the CV's suparnaa51@ is not used publicly).
  email: "asuparna25@gmail.com",
  phone: "+977 986-114-2179",

  location: {
    area: "Chabahil",
    city: "Kathmandu",
    country: "Nepal",
    countryCode: "NP",
  },

  yearsExperience: "3+",

  tagline: "Full Stack Developer based in Nepal",
  subtitle:
    "I build production systems end to end from API design and data modelling to cloud infrastructure.",

  summary:
    "Full Stack Developer with 3+ years of experience building and scaling production systems end-to-end. Led architecture decisions across SaaS, e-commerce, and mobile platforms, owning systems from API design and database architecture to cloud infrastructure and deployment.",

  socials: {
    linkedin: "https://www.linkedin.com/in/suparna-adhikari-b78b46176/",
    github: "https://github.com/sup25",
    resume:
      "https://docs.google.com/document/d/1Xp8EGjwug3os5o-FwqaYJzM7p6TDC0x4PdmqAACLBuo/edit?tab=t.0",
  },

  ogImage:
    "https://res.cloudinary.com/dmufwerzv/image/upload/v1732027708/suparna_js2fzt.png",
} as const;

export const navigation = [
  { id: "sup", name: "Sup", href: "/#sup" },
  { id: "about", name: "About", href: "/#about" },
  { id: "experience", name: "Experience", href: "/#experience" },
  { id: "works", name: "Works", href: "/#works" },
  { id: "side-projects", name: "Side projects", href: "/#side-projects" },
  { id: "contact", name: "Contact", href: "/#contact" },
] as const;
