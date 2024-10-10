import React from "react";
import { motion } from "framer-motion";

const Description = () => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 1, delay: 0.5 }}
      style={{ display: "flex", justifyContent: "start" }}
    >
      <p className="w-full max-w-screen-sm font-inter ">
        "As a full-stack developer, I specialize in seamlessly integrating
        front-end and back-end technologies to create cohesive web applications.
        My commitment to bridging the gap between design and functionality
        ensures that users enjoy an intuitive experience while achieving optimal
        performance"
      </p>
    </motion.div>
  );
};

export default Description;
