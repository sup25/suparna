import GithubSlugger from "github-slugger";

export type TocEntry = {
  /** Anchor id. Matches what rehype-slug puts on the rendered heading. */
  id: string;
  text: string;
  depth: 2 | 3;
};

/** Strips the inline markdown a heading might carry, so the label reads clean. */
function plainText(markdown: string): string {
  return markdown
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .trim();
}

/**
 * Pulls h2/h3 headings out of a post body for the sidebar contents rail.
 *
 * Slugs come from the same github-slugger instance semantics rehype-slug uses,
 * including its duplicate-suffix counter, so every id here resolves to a real
 * heading in the rendered article.
 *
 * h1 is skipped: the page renders the post title as the only h1, so a heading
 * of that level inside the body would be a duplicate rather than a section.
 */
export function extractToc(markdown: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const entries: TocEntry[] = [];
  let inFence = false;

  for (const line of markdown.split("\n")) {
    /* Fenced code can contain lines starting with #, which are comments or
       shell prompts rather than headings. */
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{1,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const depth = match[1].length;
    const text = plainText(match[2]);
    if (!text) continue;

    /* Every heading is slugged, including h1, so the duplicate counter stays in
       step with rehype-slug even though h1 isn't listed. */
    const id = slugger.slug(text);
    if (depth === 1) continue;

    entries.push({ id, text, depth: depth as 2 | 3 });
  }

  return entries;
}
