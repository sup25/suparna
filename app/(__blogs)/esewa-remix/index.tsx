"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";
import "highlight.js/styles/base16/tomorrow-night.css";
import { esewaRemix } from "@/app/(__blogs)/esewa-remix/esewaRemix";
import { components } from "../../components/markdownComponents";
import { motion } from "framer-motion";

export default function MarkdownPage() {
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
            className="rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6 sm:p-8"
          >
            <ReactMarkdown
              className="markdown-content"
              components={components}
              remarkPlugins={[remarkGfm, remarkToc]}
              rehypePlugins={[rehypeHighlight, rehypeSlug]}
            >
              {esewaRemix}
            </ReactMarkdown>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
