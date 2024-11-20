import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(`https://suparna.com.np`),
  title: "Suparna Adhikari | Full-Stack Developer & Software Engineer",
  description:
    "Experienced full-stack developer dedicated to creating intuitive and engaging web and mobile applications.",
  alternates: {
    canonical: "https://suparna.com.np",
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
    images: [
      {
        url: "https://res.cloudinary.com/dmufwerzv/image/upload/v1732027708/suparna_js2fzt.png",
        width: 1200,
        height: 630,
        alt: "Suparna Adhikari's Profile Preview Image",
      },
    ],
  },
};
