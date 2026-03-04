"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const Navbar = () => {
  const pathname = usePathname();
  const [active, setActive] = useState("");
  const navRef = useRef<HTMLDivElement>(null);

  const isHome = pathname === "/";

  const Links = [
    { id: "sup", name: "Sup", href: "/#sup" },
    { id: "about", name: "About", href: "/#about" },
    { id: "works", name: "Works", href: "/#works" },
    { id: "contact", name: "Contact", href: "/#contact" },
  ];

  /* ---------------- GSAP NAVBAR ANIMATION ---------------- */

  useEffect(() => {
    if (!navRef.current) return;

    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      },
    );
  }, []);

  /* ---------------- SECTION ACTIVE DETECTION ---------------- */

  useEffect(() => {
    if (!isHome) {
      setActive("");
      return;
    }

    const sections = document.querySelectorAll(
      "#sup, #about, #works, #contact",
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isHome]);

  const base =
    "relative inline-block md:text-xl sm:text-sm text-xs font-inter font-bold uppercase cursor-pointer transition-colors duration-300";

  const underline =
    "after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-full after:bg-current";

  return (
    <div ref={navRef} className="section sticky top-6 z-50 flex justify-center">
      <div className="container flex justify-center">
        <nav className="flex w-fit justify-center rounded-full px-5 py-3 md:px-4 md:py-2 backdrop-blur-lg bg-white/30 shadow-md border border-white/20">
          <div className="flex items-center space-x-3 md:space-x-4">
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
    </div>
  );
};

export default Navbar;
