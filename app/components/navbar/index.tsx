"use client";
import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../context/themeProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Animate } from "@/app/animation";

const Navbar = () => {
  const pathname = usePathname();
  const { isDarkTheme, toggleTheme } = useTheme();

  const Links = [
    { id: "sup", name: "Sup", href: "/" },
    { id: "works", name: "works", href: "/works" },
    { id: "specialties", name: "specialties", href: "/specialties" },
    { id: "contact", name: "contact", href: "/contact" },
    { id: "blogs", name: "blogs", href: "/blogs" },
  ];

  return (
    <Animate.ZoomIn className="section sticky top-6 z-[99999] flex justify-center mb-5">
      <div className="container flex justify-center">
        <nav
          className={`flex ${
            isDarkTheme
              ? "bg-[rgb(var(--foreground))] text-black"
              : "bg-[rgb(var(--foreground))] text-white"
          } shadow px-4 py-2 w-fit justify-center rounded-full transition-colors duration-300`}
        >
          <div className="md:space-x-4 space-x-2 flex items-center">
            {Links.map((link) => (
              <Link
                href={link.href}
                className={`relative md:text-xl sm:text-sm text-xs font-inter font-bold uppercase cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-current after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100 ${
                  pathname === link.href ? "after:scale-x-100" : ""
                }`}
                key={link.id}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              className="ml-4 p-2 bg-transparent rounded focus:outline-none"
            >
              {isDarkTheme ? (
                <FaSun className="text-yellow-400 hover:text-yellow-500 transition duration-300" />
              ) : (
                <FaMoon className="text-white hover:text-gray-300 transition duration-300" />
              )}
            </button>
          </div>
        </nav>
      </div>
    </Animate.ZoomIn>
  );
};

export default Navbar;
