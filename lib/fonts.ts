import { Inter, Bricolage_Grotesque } from "next/font/google";

/**
 * Two faces: Inter for UI/body, Bricolage Grotesque for display headings and
 * the oversized hero wordmark.
 * (Bungee Shade was loaded only for the old hero watermark, which now draws
 * an outlined Bricolage wordmark instead, one less font on the critical path.)
 */

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

export const fontVariables = [inter.variable, bricolage.variable].join(" ");
