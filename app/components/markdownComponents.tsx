import React from "react";
import { Components } from "react-markdown";

export const components: Components = {
  h1: ({ node, ...props }) => (
    <h1
      className="text-4xl font-dmSerifDisplay font-bold text-[rgb(var(--foreground))] border-b border-gray-200 tracking-tight leading-tight pb-4 mb-6"
      {...props}
    />
  ),
  h2: ({ node, ...props }) => (
    <h2
      className="text-3xl font-marcellus  font-semibold text-[rgb(var(--foreground))] border-b border-gray-200 tracking-tight leading-tight mt-8 pb-3 mb-4"
      {...props}
    />
  ),
  h3: ({ node, ...props }) => (
    <h3
      className="text-2xl font-marcellus  font-semibold text-[rgb(var(--foreground))] border-b border-gray-200 tracking-tight leading-snug mt-6  mb-3"
      {...props}
    />
  ),
  code: ({ node, className, children, ...props }) => {
    const isInline = !className?.includes("language-");
    return isInline ? (
      <code
        className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    ) : (
      <code
        className={`${
          className || ""
        } bg-gray-800 text-gray-200 dark:bg-gray-900 dark:text-gray-100 rounded-xl p-4 my-6 block overflow-x-auto shadow-lg`}
        {...props}
      >
        {children}
      </code>
    );
  },
  a: ({ node, ...props }) => (
    <a className="font-bold font-inter " rel="noopener noreferrer" {...props} />
  ),
  p: ({ node, ...props }) => (
    <p className="text-base font-inter  leading-relaxed " {...props} />
  ),
  blockquote: ({ node, ...props }) => (
    <blockquote
      className="font-inter border-[#FFD700] border-l-4  pl-6 py-4 my-6 bg-blue-50 dark:bg-blue-900/20 italic text-gray-700 dark:text-gray-300 rounded-r-xl"
      {...props}
    />
  ),
  ul: ({ node, ...props }) => (
    <ul
      className="list-disc font-inter list-outside ml-6 my-4 space-y-2"
      {...props}
    />
  ),
  li: ({ node, ...props }) => (
    <li className="pl-2 font-inter leading-relaxed" {...props} />
  ),
  ol: ({ node, ...props }) => (
    <ol
      className="list-decimal  font-inter list-outside ml-6 my-4 space-y-2"
      {...props}
    />
  ),
  hr: ({ node, ...props }) => (
    <hr
      className="my-8 border-0 h-px bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 shadow-sm"
      {...props}
    />
  ),
};
