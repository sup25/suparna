/**
 * Renders a JSON-LD graph. Server-rendered, so crawlers see it in the initial
 * HTML without executing anything.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is built from local content files, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
