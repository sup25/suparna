import type { Metadata, Viewport } from "next";
import "./globals.css";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { fontVariables } from "@/lib/fonts";
import { jsonLdGraph, personSchema, websiteSchema } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Full Stack Developer & Software Engineer in Nepal`,
    /* Child routes supply only their own title; the name is appended here. */
    template: `%s | ${site.name}`,
  },
  description: site.summary,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Full Stack Developer in Nepal",
    "Full Stack Developer Kathmandu",
    "Hire Full Stack Developer in Nepal",
    "React Developer in Nepal",
    "Next.js Developer in Nepal",
    "Node.js Developer in Nepal",
    "React Native Developer Nepal",
    "Software Engineer in Nepal",
    "Web Developer in Nepal",
    "TypeScript Developer",
    "AWS Developer Nepal",
    "Shopify Developer Nepal",
    "Suparna Adhikari",
  ],
  alternates: { canonical: site.url },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  /* Files now resolve: these live in /public, which is where Next serves
     static assets from. They were previously in app/public and all 404'd. */
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    title: `${site.name} | Full Stack Developer & Software Engineer in Nepal`,
    description: site.summary,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.name}, ${site.role} in ${site.location.city}, ${site.location.country}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Full Stack Developer in Nepal`,
    description: site.summary,
    images: [site.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#fafaf9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="antialiased">
        {/* One connected graph for the whole site; page-level nodes reference
            the Person and WebSite entities declared here by @id. */}
        <JsonLd data={jsonLdGraph(personSchema(), websiteSchema())} />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-fg focus:px-4 focus:py-2 focus:font-inter focus:text-sm focus:text-bg-elevated"
        >
          Skip to content
        </a>

        <Navbar />

        <div className="flex min-h-screen flex-col">
          <main id="main" className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
