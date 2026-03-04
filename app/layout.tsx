import { metadata } from "./metadata";

import {
  Inter,
  Marcellus,
  Bricolage_Grotesque,
  Rampart_One,
  Barriecito,
  Bungee_Shade,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import Navbar from "./components/navbar";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import Footer from "./components/footer";

export { metadata };

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marcellus",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bricolage",
});

const rampartOne = Rampart_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rampart-one",
});

const barriecito = Barriecito({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-barriecito",
});

const bungeeShade = Bungee_Shade({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bungee-shade",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`
        ${inter.variable}
       
        ${marcellus.variable}
        ${bricolage.variable}
        ${rampartOne.variable}
        ${barriecito.variable}
        ${bungeeShade.variable}
        ${geistSans.variable}
        ${geistMono.variable}
      `}
    >
      <body className="antialiased ">
        <TooltipProvider>
          <Navbar />
          <main className="flex flex-col min-h-screen">
            <div className="flex-grow">{children}</div>
            <Footer />
          </main>
        </TooltipProvider>
      </body>
    </html>
  );
}
