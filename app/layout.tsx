import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import { ThemeProvider } from "./context/themeProvider";
import Navbar from "./components/navbar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Suparna Adhikari",
  description:
    "Full-stack developer skilled in HTML5, CSS3, JavaScript, Node.js, React.js, Next.js, and mobile application development. Dedicated to blending design and development to create intuitive, engaging, and accessible web and mobile experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body
          className={`${geistSans.variable} ${inter.variable} ${dmSerifDisplay.variable} ${geistMono.variable} antialiased bg-[rgb(var(--background))] text-[rgb(var(--foreground))]`}
        >
          <Navbar />
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
