import React, { useState } from "react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { FileUser } from "lucide-react";

const Connection = () => {
  const variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  const iconVariants = {
    initial: { rotate: 0, boxShadow: "none" },
    hover: { rotate: 15, boxShadow: "0px 8px 15px var(--shadow-color)" },
  };

  const tooltips = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/suparna-adhikari-b78b46176/",
      icon: <FaLinkedinIn size={50} />,
    },
    {
      name: "GitHub",
      url: "https://github.com/sup25",
      icon: <FaGithub size={50} />,
    },
    {
      name: "Resume",
      url: "https://drive.google.com/file/d/1NlgiCMh9XmEvm8r2IFhFHAjklk3qb5Cm/view",
      icon: <FileUser size={50} />,
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 1, delay: 0.5 }}
      style={{ display: "flex", justifyContent: "start" }}
    >
      <div className="flex space-x-4 flex-wrap">
        {tooltips.map((tooltip, index) => (
          <motion.a
            key={index}
            href={tooltip.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-[var(--border-color)] text-[rgb(var(--foreground))] relative group"
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
            transition={{ duration: 0.3 }}
          >
            {tooltip.icon}
            <span
              className="absolute opacity-0 group-hover:opacity-100 bg-[var(--bg-color)] text-[var(--text-color)] text-sm px-2 py-1 rounded transition-opacity duration-300"
              style={{
                bottom: "70px",
                whiteSpace: "nowrap",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              {tooltip.name}
            </span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default Connection;
