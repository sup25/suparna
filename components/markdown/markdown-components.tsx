import type { Components } from "react-markdown";

/**
 * Element overrides for blog post bodies. Headings get scroll offsets so
 * in-page anchors (added by rehype-slug) don't land under the sticky navbar.
 *
 * Every override drops `node` before spreading. react-markdown hands each
 * component the mdast node alongside the element's own props, and spreading it
 * through put `node="[object Object]"` on more or less every tag in every post:
 * invalid HTML, and a React warning for an unknown DOM attribute. Anything
 * added here needs the same treatment; `...props` straight off the parameter is
 * how it comes back.
 */
export const markdownComponents: Components = {
  h1: ({ node: _node, ...props }) => (
    <h1
      className="scroll-mt-28 border-b border-line pb-4 font-bricolage text-3xl font-bold leading-tight tracking-tight text-fg sm:text-4xl"
      {...props}
    />
  ),
  h2: ({ node: _node, ...props }) => (
    <h2
      className="mt-12 scroll-mt-28 border-b border-line pb-3 font-bricolage text-2xl font-semibold leading-tight tracking-tight text-fg sm:text-3xl"
      {...props}
    />
  ),
  h3: ({ node: _node, ...props }) => (
    <h3
      className="mt-8 scroll-mt-28 font-bricolage text-xl font-semibold leading-snug text-fg sm:text-2xl"
      {...props}
    />
  ),
  p: ({ node: _node, ...props }) => (
    <p
      className="font-inter text-[0.975rem] leading-[1.8] text-fg-muted"
      {...props}
    />
  ),
  a: ({ node: _node, href, ...props }) => {
    const isExternal = !!href?.startsWith("http");
    return (
      <a
        href={href}
        className="font-medium text-accent underline decoration-accent-border decoration-2 underline-offset-2 transition-colors hover:decoration-accent"
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...props}
      />
    );
  },
  code: ({ node: _node, className, children, ...props }) => {
    const isBlock = !!className?.includes("language-");

    if (isBlock) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }

    return (
      <code
        className="rounded-md border border-line bg-bg-subtle px-1.5 py-0.5 font-mono text-[0.85em] text-fg"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ node: _node, ...props }) => (
    <pre
      className="my-6 overflow-x-auto rounded-xl border border-line bg-[#171717] text-sm shadow-sm"
      {...props}
    />
  ),
  blockquote: ({ node: _node, ...props }) => (
    <blockquote
      className="my-6 rounded-r-xl border-l-4 border-accent bg-accent-soft py-4 pl-6 pr-4 font-inter italic text-fg"
      {...props}
    />
  ),
  ul: ({ node: _node, ...props }) => (
    <ul
      className="my-4 ml-6 list-outside list-disc space-y-2 font-inter text-fg-muted"
      {...props}
    />
  ),
  ol: ({ node: _node, ...props }) => (
    <ol
      className="my-4 ml-6 list-outside list-decimal space-y-2 font-inter text-fg-muted"
      {...props}
    />
  ),
  li: ({ node: _node, ...props }) => (
    <li className="pl-2 leading-relaxed" {...props} />
  ),
  hr: () => <hr className="my-10 border-line" />,
  table: ({ node: _node, ...props }) => (
    <div className="my-6 overflow-x-auto">
      <table
        className="w-full border-collapse text-left font-inter text-sm"
        {...props}
      />
    </div>
  ),
  th: ({ node: _node, ...props }) => (
    <th
      className="border border-line bg-bg-subtle px-4 py-2 font-semibold text-fg"
      {...props}
    />
  ),
  td: ({ node: _node, ...props }) => (
    <td className="border border-line px-4 py-2 text-fg-muted" {...props} />
  ),
  strong: ({ node: _node, ...props }) => (
    <strong className="font-semibold text-fg" {...props} />
  ),
};
