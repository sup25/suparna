"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const NotFoundPage = () => {
  const containerVariants = {
    hidden: { opacity: 0, x: "-100vw" },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 120, delay: 0.5 },
    },
    exit: { opacity: 0, x: "100vw", transition: { ease: "easeInOut" } },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      boxShadow: "0px 0px 8px rgba(255, 215, 0, 0.8)",
      transition: { yoyo: 10 },
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-[80vh] text-center bg-[rgb(var(--background))]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h1 className="text-9xl font-extrabold font-dmSerifDisplay text-[rgb(var(--foreground))] mb-6">
        404
      </motion.h1>
      <motion.p className="text-lg font-inter text-[rgb(var(--foreground))] mb-8">
        Oops! The page you're looking for does not exist.
      </motion.p>

      <motion.a
        href="/"
        className="px-8 py-3 font-inter bg-[rgb(var(--foreground))] text-[rgb(var(--background))] font-semibold rounded-lg  transition-colors duration-300"
        variants={buttonVariants}
        whileHover={buttonVariants.hover}
      >
        Go Back Home
      </motion.a>
    </motion.div>
  );
};

export default NotFoundPage;
