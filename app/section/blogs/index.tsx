"use client";
import React from "react";
import { motion } from "framer-motion";
import { useSwipeableMobile } from "@/app/hooks/useSwipeableMobile";

const Blogs = () => {
  const { swipeHandlers, isMobile } = useSwipeableMobile({
    pathLeft: "",
    pathRight: "/contact",
  });
  return (
    <div {...(isMobile ? swipeHandlers : {})} className="section">
      <div className="container">
        <div className="min-h-[75vh] bg-[rgb(var(--background))] text-white flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl py-4"
          >
            <h1 className="md:text-6xl text-4xl font-dmSerifDisplay font-semibold text-[rgb(var(--foreground))] mb-4">
              Coming Soon!
            </h1>
            <p className="text-lg text-[rgb(var(--foreground))] font-inter my-6">
              I&apos;m working hard to bring something awesome.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
