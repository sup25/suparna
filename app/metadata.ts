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
