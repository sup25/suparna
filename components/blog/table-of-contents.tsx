"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/toc";
import { cn } from "@/lib/utils";

/**
 * Sticky contents rail for the post page. Client-side only because of the
 * scroll-spy. The entries themselves are extracted on the server, so the
 * links are in the initial HTML either way.
 */
export default function TableOfContents({ entries }: { entries: TocEntry[] }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (!entries.length) return;

    const headings = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!headings.length) return;

    /* Same approach as the navbar: track whichever heading is nearest the top
       of the viewport rather than reacting to each intersection in turn. */
    const observer = new IntersectionObserver(
      (observed) => {
        const visible = observed
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -66% 0px", threshold: [0, 1] },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length < 2) return null;

  return (
    <nav aria-label="On this page" className="sticky top-28">
      <p className="eyebrow mb-5">On this page</p>

      <ul className="space-y-1 border-l border-line">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              className={cn(
                "-ml-px block border-l-2 py-1.5 font-inter text-[0.8rem] leading-snug transition-[color,border-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                entry.depth === 3 ? "pl-7" : "pl-4",
                active === entry.id
                  ? "border-accent font-medium text-accent"
                  : "border-transparent text-fg-subtle hover:text-fg",
              )}
              aria-current={active === entry.id ? "location" : undefined}
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
