/**
 * Structured data for search engines.
 *
 * Only pass data built on the server from constants or validated API data.
 * `<` is escaped so a string value can never close the script tag.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
