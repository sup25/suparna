"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaRegCopyright } from "react-icons/fa";

const CopyRight = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className=" flex justify-center text-center mt-24 text-[rgb(var(--foreground))] items-center"
    >
      <motion.span
        animate={{ rotateY: 360 }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "linear",
        }}
        className="inline-block text-2xl mr-1"
      >
        <FaRegCopyright size={20} />
      </motion.span>
      {currentYear} Suparna Adhikari.
    </motion.div>
  );
};

export default CopyRight;
