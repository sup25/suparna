"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Animate } from "@/app/animation";

const Navbar = () => {
  const pathname = usePathname();
  const [active, setActive] = useState("");

  const isHome = pathname === "/";

  const Links = [
    { id: "sup", name: "Sup", href: "/#sup" },
    { id: "about", name: "About", href: "/#about" },
    { id: "works", name: "Works", href: "/#works" },
    { id: "contact", name: "Contact", href: "/#contact" },
  ];

  // Only run section detection on homepage
  useEffect(() => {
    if (!isHome) {
      setActive(""); // prevent sup being active on blog
      return;
    }

    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.6 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isHome]);

  const base =
    "relative md:text-xl sm:text-sm text-xs font-inter font-bold uppercase cursor-pointer transition-colors duration-300";

  const underline =
    "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-current";

  return (
    <Animate.ZoomIn className="section sticky top-6 z-50 flex justify-center">
      <div className="container flex justify-center">
        <nav className="flex w-fit justify-center rounded-full px-4 py-2 backdrop-blur-lg bg-white/30 shadow-md border border-white/20">
          <div className="md:space-x-4 space-x-2 flex items-center">
            {Links.map((link) => {
              const isActive = isHome && active === link.id;

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`${base} ${
                    isActive ? `${underline} text-black` : "text-gray-700"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Blog link */}
            <Link
              href="/blogs"
              className={`${base} ${
                pathname.startsWith("/blogs")
                  ? `${underline} text-black`
                  : "text-gray-700"
              }`}
            >
              Blog
            </Link>
          </div>
        </nav>
      </div>
    </Animate.ZoomIn>
  );
};

export default Navbar;
