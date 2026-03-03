"use client";

import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="w-full overflow-hidden -mb-[2px]">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-[80px]"
        >
          <path
            d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z"
            className="fill-gray-100"
          />
        </svg>
      </div>
      <footer className="relative bg-gray-100 section ">
        <div className=" border-t  border-black/10 mb-16" />
        {/* Abstract SVG Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <svg
            className="w-full h-full opacity-[0.06]"
            viewBox="0 0 1200 400"
            preserveAspectRatio="none"
          >
            <path
              d="M0 200 Q300 100 600 200 T1200 200"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M0 250 Q400 150 800 250 T1200 250"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>

        <div className="container  flex flex-col md:flex-row justify-between items-start md:items-end gap-12 pb-16">
          {/* Left Side */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bricolage font-semibold tracking-tight">
              Building something meaningful
            </h2>
            <p className="mt-4 text-sm font-dmSerifDisplay text-black/60 max-w-sm">
              Available for freelance and full-time opportunities. Open to
              collaborations and interesting projects.
            </p>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-start md:items-end gap-6">
            <div className="text-xs font-marcellus text-black/50">
              © {year} Suparna Adhikari
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
