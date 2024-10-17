"use client";
import React from "react";
import { motion } from "framer-motion";

const Contact: React.FC = () => {
  const handleContact = () => {
    window.location.href = "mailto:asuparna25@gmail.com";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.section
      className="relative py-28  overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container relative mx-auto px-4 max-w-4xl">
        <motion.h2
          className="text-6xl font-extrabold font-dmSerifDisplay text-center text-[rgb(var(--foreground))] mb-8"
          variants={itemVariants}
        >
          Let&apos;s Connect!
        </motion.h2>
        <motion.p
          className="text-2xl text-center font-inter text-[rgb(var(--foreground))]-800 mb-12"
          variants={itemVariants}
        >
          I&apos;m always excited to collaborate on new projects and ideas.
          Let&apos;s create something amazing together!
        </motion.p>

        <motion.div
          className="flex flex-col items-center gap-12"
          variants={itemVariants}
        >
          <div className="relative">
            <ContactButton handleContact={handleContact} />
            <AnimatedPaperPlane />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

interface ContactButtonProps {
  handleContact: () => void;
}

const ContactButton = ({ handleContact }: ContactButtonProps) => (
  <motion.button
    className="bg-[rgb(var(--foreground))] text-[rgb(var(--background))] font-semibold py-4 px-10 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={handleContact}
  >
    <span className="inline-flex font-inter items-center gap-3 text-xl">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 12v.01M12 12v.01M8 12v.01M21 16.95a8.982 8.982 0 01-3.14.705 9 9 0 111.682-10.717"
        />
      </svg>
      Get In Touch
    </span>
  </motion.button>
);

const AnimatedPaperPlane = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    className="absolute w-20 h-20 text-[rgb(var(--foreground))] opacity-60 pointer-events-none"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      top: "-50%",
      left: "50%",
      translateX: "-50%",
    }}
    animate={{
      rotate: [0, 360],
      y: ["-50%", "150%"],
      x: ["-100%", "100%"],
      scale: [1, 0.8, 1],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    }}
  >
    <path d="M21 2L3 11l7 3.5L13 21l8-19z" />
    <path d="M21 2L10 14.5" />
  </motion.svg>
);

export default Contact;
