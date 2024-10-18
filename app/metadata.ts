import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(`https://suparna.com.np`),
  title: "Suparna Adhikari | Full-Stack Developer & Software Engineer",
  description:
    "Experienced full-stack developer dedicated to creating intuitive and engaging web and mobile applications.",
  alternates: {
    canonical: "./",
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
    title: "Suparna Adhikari | Full-Stack Developer & Software Engineer",
    description:
      "Experienced full-stack developer dedicated to creating intuitive and engaging web and mobile applications.",
    url: "https://suparna.com.np",
    siteName: "Suparna Adhikari",
    locale: "en_US",
    type: "website",
  },
};
