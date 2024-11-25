"use client";
import EsewaRemix from "./esewa-remix.mdx";
import { mdxComponents } from "../../components/MDXComponents";
import { motion } from "framer-motion";
const EsewaRemixBlog = () => {
  return (
    <div className="section">
      <div className="container">
        <div className="px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="  rounded-xl  shadow-sm ring-1 ring-gray-900/5 p-6 sm:p-8"
          >
            <EsewaRemix components={mdxComponents} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EsewaRemixBlog;
