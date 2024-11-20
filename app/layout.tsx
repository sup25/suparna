import {
  Inter,
  DM_Serif_Display,
  Marcellus,
  Bricolage_Grotesque,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import { ThemeProvider } from "./context/themeProvider";
import Navbar from "./components/navbar";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { metadata } from "./metadata";
import Footer from "./components/footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-marcellus",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
});
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bricolage",
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

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <TooltipProvider>
          <body
            className={`${geistSans.variable} ${inter.variable} ${marcellus.variable} ${bricolage.variable} ${dmSerifDisplay.variable} ${geistMono.variable} antialiased bg-[rgb(var(--background))] text-[rgb(var(--foreground))]`}
          >
            <Navbar />
            {children}
            <Footer />
          </body>
        </TooltipProvider>
      </ThemeProvider>
    </html>
  );
}
