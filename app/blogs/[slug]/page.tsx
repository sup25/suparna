import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import MarkdownRenderer from "@/components/markdown/markdown-renderer";
import TableOfContents from "@/components/blog/table-of-contents";
import { JsonLd } from "@/components/seo/json-ld";
import {
  articleSchema,
  breadcrumbSchema,
  buildMetadata,
  jsonLdGraph,
} from "@/lib/seo";
import { publishedPosts, postBySlug } from "@/content/posts";
import { extractToc } from "@/lib/toc";

type Params = { params: Promise<{ slug: string }> };

/** Prerenders every published post at build time. */
export function generateStaticParams() {
  return publishedPosts.map((post) => ({ slug: post.slug }));
}

/** Unknown slugs 404 rather than rendering an empty shell. */
export const dynamicParams = false;

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = postBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: "Post not found",
      description: "This post does not exist.",
      path: `/blogs/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blogs/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    tags: post.tags,
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = postBySlug(slug);

  if (!post) notFound();

  const toc = extractToc(post.body);

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          articleSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blogs" },
            { name: post.title, path: `/blogs/${post.slug}` },
          ]),
        )}
      />

      <div className="section pt-32">
        <article className="container pb-section">
          <Link
            href="/blogs"
            className="mb-10 inline-flex items-center gap-2 font-inter text-sm font-medium text-fg-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All posts
          </Link>

          <header className="mb-12 border-b border-line pb-8">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-accent-border bg-accent-soft px-2.5 py-1 font-inter text-[11px] font-medium text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="max-w-4xl font-bricolage text-display-sm font-bold leading-[1.08] tracking-tight text-fg md:text-display-md">
              {post.title}
            </h1>

            <p className="mt-5 max-w-prose font-inter text-lg leading-relaxed text-fg-muted">
              {post.description}
            </p>

            <div className="mt-7 flex items-center gap-5 font-inter text-xs text-fg-subtle">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                <time dateTime={post.date}>{post.displayDate}</time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {post.readTime}
              </span>
            </div>
          </header>

          {/* Prose keeps its 72ch measure; the rail takes up the rest of the
              1280px container so the page reads as one full-width layout. */}
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
            <div className="min-w-0">
              <MarkdownRenderer content={post.body} />

              <div className="mt-16 border-t border-line pt-8">
                <p className="font-inter text-sm text-fg-muted">
                  Working on something similar?{" "}
                  <Link
                    href="/#contact"
                    className="font-medium text-accent underline decoration-accent-border decoration-2 underline-offset-2 hover:decoration-accent"
                  >
                    Get in touch
                  </Link>
                  .
                </p>
              </div>
            </div>

            <aside className="hidden lg:block">
              <TableOfContents entries={toc} />
            </aside>
          </div>
        </article>
      </div>
    </>
  );
}
