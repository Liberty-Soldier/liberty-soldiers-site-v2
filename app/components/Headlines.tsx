import { fetchAllHeadlines } from "@/lib/rss";

export default async function Headlines() {
  const headlines = await fetchAllHeadlines();

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold mb-3">Live Headlines</h2>
      <ul className="space-y-2">
        {headlines.slice(0, 20).map((h, i) => (
          <li key={i}>
            <a
              className="underline"
              href={h.url}
              target="_blank"
              rel="noreferrer"
            >
              {h.title}
            </a>{" "}
            <span className="opacity-70">— {h.source}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
