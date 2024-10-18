"use client";
import { usePathname } from "next/navigation";
import type { Metadata } from "next";

export default function getMetadata(): Metadata {
  const pathname = usePathname();

  const defaultTitle = "Suparna Adhikari | Full-Stack Developer & Innovator";
  const defaultDescription =
    "Experienced full-stack developer dedicated to creating intuitive and engaging web and mobile applications.";

  const titles: Record<string, string> = {
    "/works": "Works | Suparna Adhikari",
    "/specialties": "Specialties | Suparna Adhikari",
    "/contact": "Contact | Suparna Adhikari",
  };

  const descriptions: Record<string, string> = {
    "/works":
      "Discover a diverse range of projects and innovations involving Suparna Adhikari.",
    "/specialties":
      "Discover the specialties and skills of Suparna Adhikari, including front-end and back-end expertise.",
    "/contact":
      "Get in touch with Suparna Adhikari, a full-stack developer and innovator.",
  };

  const title = titles[pathname] || defaultTitle;
  const description = descriptions[pathname] || defaultDescription;

  const canonical = `https://suparna.com.np${pathname === "/" ? "" : pathname}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    authors: [{ name: "Suparna Adhikari" }],
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        {
          url: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          url: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      apple: [{ url: "/apple-touch-icon.png" }],
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Suparna Adhikari",
      locale: "en_US",
      type: "website",
    },
  };
}
