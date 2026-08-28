import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { markdownComponents } from "./markdown-components";

/**
 * Server component: the rendered HTML ships in the initial response, so blog
 * post content is visible to crawlers. The previous renderer was a client
 * component, which meant post bodies existed only after hydration.
 *
 * No table-of-contents plugin runs here. The contents list lives in the sticky
 * sidebar rail on the post page, built from lib/toc.ts, rather than being
 * injected into the body under a "Table of Contents" heading.
 */
export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      className="markdown-content"
      components={markdownComponents}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight, rehypeSlug]}
    >
      {content}
    </ReactMarkdown>
  );
}
