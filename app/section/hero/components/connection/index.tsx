import React from "react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const Connection = () => {
  const variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  const iconVariants = {
    initial: { rotate: 0, boxShadow: "none" },
    hover: { rotate: 15, boxShadow: "0px 8px 15px var(--shadow-color)" },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 1, delay: 0.5 }}
      style={{ display: "flex", justifyContent: "start" }}
    >
      <div className="flex space-x-4 flex-wrap">
        <motion.a
          href="https://www.linkedin.com/in/suparna-adhikari-b78b46176/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 border border-[var(--border-color)] "
          variants={iconVariants}
          initial="initial"
          whileHover="hover"
          transition={{ duration: 0.3 }}
        >
          <FaLinkedinIn size={50} />
        </motion.a>
        <motion.a
          href="https://github.com/sup25"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 border border-[var(--border-color)] "
          variants={iconVariants}
          initial="initial"
          whileHover="hover"
          transition={{ duration: 0.3 }}
        >
          <FaGithub size={50} />
        </motion.a>
      </div>
    </motion.div>
  );
};

export default Connection;
