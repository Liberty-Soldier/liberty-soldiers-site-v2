// app/news/page.tsx
import { fetchAllHeadlines } from "@/lib/rss";
import ShareButton from "./ShareButton";

export const metadata = {
  title: "News Feed | Liberty Soldiers",
  description:
    "Live headlines for situational awareness plus original Liberty Soldiers reports and analysis.",
  alternates: {
    canonical: "https://libertysoldiers.com/news",
  },
};

export const revalidate = 600;

type Item = { title: string; url: string; source: string; publishedAt?: number };

function humanAgo(input?: number | string | Date): string {
  if (!input) return "Just now";
  const ts = typeof input === "number" ? input : new Date(input).getTime();
  if (!Number.isFinite(ts)) return "Just now";

  const diff = Date.now() - ts;
  const sec = Math.max(1, Math.floor(diff / 1000));
  if (sec < 60) return `${sec}s ago`;

  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;

  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;

  const d = Math.floor(hr / 24);
  return `${d}d ago`;
}

export default async function NewsPage() {
  let items: Item[] = [];

  try {
    items = await fetchAllHeadlines();
  } catch {
    items = [];
  }

  const colSize = Math.ceil(items.length / 3) || 0;
  const cols: Item[][] = [
    items.slice(0, colSize),
    items.slice(colSize, colSize * 2),
    items.slice(colSize * 2),
  ];

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              News Feed
            </h1>
            <p className="mt-1 text-zinc-600">
              Live headlines relevant to world events and prophetic times.
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              External sources for situational awareness. Not endorsements.
            </p>
          </div>

          <a
            href="/"
            className="text-sm text-zinc-700 hover:text-zinc-900 whitespace-nowrap"
          >
            ← Home
          </a>
        </div>

        {/* Liberty Soldiers Reports */}
        <section className="mb-12">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">
                Liberty Soldiers Reports
              </h2>
              <p className="mt-1 text-zinc-600">
                Original investigative reports and analysis.
              </p>
            </div>

            <a href="/news" className="text-sm text-zinc-700 hover:text-zinc-900">
              View all →
            </a>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="/news/dispensationalism-middle-east"
              className="block rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-zinc-300"
            >
              <span className="text-[11px] uppercase tracking-wide text-zinc-500">
                Report
              </span>
              <h3 className="mt-1 font-semibold leading-snug hover:underline">
                How Dispensationalism Scripts the Middle East
              </h3>
              <p className="mt-2 text-sm text-zinc-700">
                From Sunday sermons to congressional votes, a theology that reshapes
                foreign policy.
              </p>
              <span className="mt-3 inline-block text-xs text-zinc-600">
                Read →
              </span>
            </a>

            <a
              href="/news/first-report"
              className="block rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-zinc-300"
            >
              <span className="text-[11px] uppercase tracking-wide text-zinc-500">
                Report
              </span>
              <h3 className="mt-1 font-semibold leading-snug hover:underline">
                The Mechanism of Alignment
              </h3>
              <p className="mt-2 text-sm text-zinc-700">
                How truth is neutralized through agreement, conformity, and
                manufactured consensus.
              </p>
              <span className="mt-3 inline-block text-xs text-zinc-600">
                Read →
              </span>
            </a>
          </div>
        </section>

        {/* Live RSS headlines */}
        <section className="border-t border-zinc-200 pt-10">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold">Latest Headlines</h2>
            <p className="mt-1 text-zinc-600">
              External headlines for situational awareness.
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              External sources are not endorsements.
            </p>
          </div>

          {items.length === 0 ? (
            <div className="rounded-xl border border-zinc-200 bg-white p-6 text-zinc-700">
              No headlines yet. If this persists, check{" "}
              <code className="text-zinc-900">lib/news.config.ts</code> has feeds
              and that deployment finished.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cols.map((col, i) => (
                <div key={i} className="space-y-3">
                  {col.map((h, idx) => {
                    const shareHrefAbs =
                      `https://libertysoldiers.com/news/share?u=${encodeURIComponent(
                        h.url
                      )}` +
                      `&t=${encodeURIComponent(h.title)}` +
                      `&s=${encodeURIComponent(h.source)}` +
                      (h.publishedAt
                        ? `&p=${encodeURIComponent(String(h.publishedAt))}`
                        : "");

                    const wrapperHrefRel =
                      `/news/share?u=${encodeURIComponent(h.url)}` +
                      `&t=${encodeURIComponent(h.title)}` +
                      `&s=${encodeURIComponent(h.source)}` +
                      (h.publishedAt
                        ? `&p=${encodeURIComponent(String(h.publishedAt))}`
                        : "");

                    return (
                      <div
                        key={`${h.url}-${idx}`}
                        className="rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-zinc-300"
                      >
                        <span className="text-[11px] uppercase tracking-wide text-zinc-500">
                          {h.source}
                        </span>

                        {/* Default click goes to Liberty Soldiers wrapper (we'll revert next step if you want) */}
                        <a href={wrapperHrefRel} className="block mt-1">
                          <h3 className="font-semibold leading-snug hover:underline">
                            {h.title}
                          </h3>
                        </a>

                        <div className="mt-2 flex items-center justify-between gap-3">
                          <span className="text-xs text-zinc-500">
                            {humanAgo(h.publishedAt)}
                          </span>

                          <div className="flex items-center gap-3">
                            <a
                              href={h.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-zinc-600 hover:text-zinc-900 underline-offset-4 hover:underline"
                              aria-label="Open original source in a new tab"
                            >
                              Open original
                            </a>

                            <ShareButton url={shareHrefAbs} title={h.title} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}





