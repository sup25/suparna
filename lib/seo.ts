import type { Metadata } from "next";
import { site } from "@/content/site";
import { allSkills } from "@/content/skills";
import { experience, education, certifications } from "@/content/experience";

/* -------------------------------------------------------------------------- */
/*  Metadata                                                                  */
/* -------------------------------------------------------------------------- */

type PageMetaInput = {
  title: string;
  description: string;
  /** Path relative to the site root, e.g. "/blogs" or "/work/appsha". */
  path: string;
  /** Absolute image URL. Falls back to the site-wide OG image. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
  noIndex?: boolean;
};

/**
 * Builds a complete Metadata object for a route.
 *
 * Every page gets an explicit canonical URL. This matters more than it looks:
 * the previous setup used `canonical: "./"` everywhere, which resolves
 * relative to the current path and produced a different canonical per route
 * without ever being reviewed.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  tags,
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = new URL(path, site.url).toString();
  const ogImage = image ?? site.ogImage;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(tags ? { tags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/* -------------------------------------------------------------------------- */
/*  JSON-LD                                                                   */
/* -------------------------------------------------------------------------- */

const PERSON_ID = `${site.url}/#person`;
const SITE_ID = `${site.url}/#website`;

/**
 * The Person entity, referenced by @id from every other node so search engines
 * resolve one identity across the whole site rather than a separate Person per
 * page. Enriched from the CV: real job history, education, certifications.
 */
export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.name,
    url: site.url,
    email: `mailto:${site.email}`,
    telephone: site.phone,
    image: site.ogImage,
    jobTitle: site.role,
    description: site.summary,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.area,
      addressCountry: site.location.countryCode,
    },
    sameAs: [site.socials.linkedin, site.socials.github],
    knowsAbout: allSkills,
    worksFor: experience
      .filter((r) => r.endISO === null)
      .map((r) => ({ "@type": "Organization", name: r.company })),
    hasOccupation: experience.map((role) => ({
      "@type": "Occupation",
      name: role.title,
      occupationLocation: { "@type": "Place", name: role.location },
    })),
    alumniOf: {
      "@type": "EducationalOrganization",
      name: education.institution,
    },
    hasCredential: certifications.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.name,
      recognizedBy: { "@type": "Organization", name: c.issuer },
    })),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: site.url,
    name: site.name,
    description: site.summary,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.path, site.url).toString(),
    })),
  };
}

export function articleSchema(post: {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}) {
  const url = new URL(`/blogs/${post.slug}`, site.url).toString();
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    keywords: post.tags.join(", "),
    inLanguage: "en",
  };
}

export function caseStudySchema(project: {
  slug: string;
  title: string;
  summary: string;
  year: string;
  image: string;
  caseStudy: { stack: string[] };
}) {
  const url = new URL(`/work/${project.slug}`, site.url).toString();
  return {
    "@type": "CreativeWork",
    "@id": `${url}#work`,
    name: project.title,
    description: project.summary,
    url,
    image: project.image,
    dateCreated: project.year,
    creator: { "@id": PERSON_ID },
    keywords: project.caseStudy.stack.join(", "),
  };
}

/**
 * Wraps nodes into a single @graph. One script tag per page, one connected
 * graph, rather than several disconnected Person copies.
 */
export function jsonLdGraph(...nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
