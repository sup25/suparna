"use client";
import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import { components } from "../components/markdownComponents";

interface MarkdownPageProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="section">
      <div className="container">
        <div className="py-8 md:py-16">
          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="my-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium transition-all duration-200"
          >
            ← Back to Blog
          </button>

          <div
            ref={containerRef}
            className="rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6 sm:p-8"
          >
            <ReactMarkdown
              className="markdown-content"
              components={components}
              remarkPlugins={[remarkGfm, remarkToc]}
              rehypePlugins={[rehypeHighlight, rehypeSlug]}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
