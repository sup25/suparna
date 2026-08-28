import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/sections/section-header";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata, breadcrumbSchema, jsonLdGraph } from "@/lib/seo";
import { publishedPosts } from "@/content/posts";

export const metadata = buildMetadata({
  title: "Blog: Notes on connected hardware, privacy, and payments",
  description:
    "Write-ups on shipping Bluetooth Low Energy in Expo, access control over a proximity transport, redacting PII from LLM requests, and regional payment gateways.",
  path: "/blogs",
});

export default function BlogsPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blogs" },
          ]),
        )}
      />

      <div className="section pt-32">
        <div className="container pb-section">
          <SectionHeader
            eyebrow="Writing"
            title="Notes from the build"
            intro="Things I've worked through on production systems, written up while the details were still fresh."
          />

          {publishedPosts.length === 0 ? (
            <p className="font-inter text-fg-muted">
              No posts published yet. Check back soon.
            </p>
          ) : (
            <ul className="grid gap-5">
              {publishedPosts.map((post) => (
                <li key={post.slug}>
                  <article className="group rounded-2xl border border-line bg-bg-elevated transition-colors duration-300 hover:border-accent-border">
                    <Link href={`/blogs/${post.slug}`} className="block p-7">
                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-accent-border bg-accent-soft px-2.5 py-1 font-inter text-[11px] font-medium text-accent"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h2 className="font-bricolage text-xl font-bold leading-snug text-fg transition-colors group-hover:text-accent sm:text-2xl">
                        {post.title}
                      </h2>

                      <p className="mt-3 max-w-2xl font-inter text-[0.925rem] leading-relaxed text-fg-muted">
                        {post.description}
                      </p>

                      <div className="mt-6 flex flex-col justify-between gap-4 border-t border-line pt-5 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-5 font-inter text-xs text-fg-subtle">
                          <span className="flex items-center gap-1.5">
                            <Calendar
                              className="h-3.5 w-3.5"
                              aria-hidden="true"
                            />
                            <time dateTime={post.date}>{post.displayDate}</time>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                            {post.readTime}
                          </span>
                        </div>

                        <span className="flex items-center gap-1.5 font-inter text-sm font-semibold text-accent transition-transform duration-300 group-hover:translate-x-1">
                          Read more
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </span>
                      </div>
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
