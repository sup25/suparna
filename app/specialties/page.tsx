"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { specialties } from "./specialties";

const iconVariants = {
  hover: { scale: 1.2, rotate: 5, transition: { duration: 0.3 } },
};

const SpecialtiesPage = () => {
  const [pausedIndex, setPausedIndex] = useState<number | null>(null);

  return (
    <div className="h-[80vh] bg-[rgb(var(--background))] flex flex-col items-center justify-center p-6 space-y-12">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-5xl font-dmSerifDisplay font-bold text-[rgb(var(--foreground))] mb-4">
          My Specialties
        </h1>
        <p className="text-xl text-[rgb(var(--foreground))] font-inter my-6">
          Discover the unique skills and expertise I bring to the table. Each
          specialty is designed to enhance user experience and drive results.
        </p>
      </motion.div>

      {/* Marquee Layout for Icons */}
      <div className="w-full overflow-hidden">
        <Marquee gradient={false} speed={40} className="py-20">
          {specialties.map((specialty, index) => (
            <div className="mx-6" key={index}>
              <motion.div
                variants={iconVariants}
                whileHover="hover"
                className="relative bg-[rgb(var(--foreground))] rounded-full shadow-lg flex justify-center items-center group cursor-pointer"
                style={{ width: "120px", height: "120px" }}
                onMouseEnter={() => setPausedIndex(index)}
                onMouseLeave={() => setPausedIndex(null)}
              >
                <motion.div
                  animate={{ rotate: pausedIndex === index ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {specialty.icon}
                </motion.div>
                {/* Tooltip */}
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: pausedIndex === index ? 1 : 0,
                    y: pausedIndex === index ? 0 : 20,
                  }}
                  className="absolute bottom-full mb-4 px-4 py-2 text-sm bg-black text-white rounded-full whitespace-nowrap"
                >
                  {specialty.name}
                </motion.span>
              </motion.div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default SpecialtiesPage;
