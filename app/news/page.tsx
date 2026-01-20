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

type Item = {
  title: string;
  url: string;
  source: string;
  publishedAt?: number;
  image?: string;
  summary?: string;
  category?: string;
};

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

function faviconFromUrl(articleUrl: string): string {
  try {
    const u = new URL(articleUrl);
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
      u.hostname
    )}&sz=128`;
  } catch {
    return "/briefing-fallback.jpg";
  }
}

function bulletsFromSummary(summary?: string): string[] {
  if (!summary) return [];
  const clean = summary.replace(/\s+/g, " ").trim();
  if (!clean) return [];

  // Try sentence split first
  const parts = clean
    .split(/(?:\.|\!|\?)\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (parts.length >= 2) {
    return parts.slice(0, 2).map((s) => (/[.!?]$/.test(s) ? s : s + "."));
  }

  // Fallback: split into chunks (~90 chars) if no punctuation
  const chunk1 = clean.slice(0, 90).trim();
  const chunk2 = clean.slice(90, 180).trim();
  const out = [chunk1, chunk2].filter(Boolean);

  return out.slice(0, 2).map((s) => (/[.!?]$/.test(s) ? s : s + "."));
}

export default async function NewsPage() {
  let items: Item[] = [];

  try {
    items = (await fetchAllHeadlines()) as Item[];
  } catch {
    items = [];
  }

const cols: Item[][] = [[], [], []];
items.forEach((it, idx) => {
  cols[idx % 3].push(it);
});

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
              External headlines for situational awareness.
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              External sources are not endorsements.
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

            <a href="/" className="text-sm text-zinc-700 hover:text-zinc-900">
              Home →
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
                From Sunday sermons to congressional votes, a theology that
                reshapes foreign policy.
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
              Click a headline to open the original source.
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Use Share to post an X-friendly Liberty Soldiers link.
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
                    `https://libertysoldiers.com/news/share?u=${encodeURIComponent(h.url)}` +
                    `&t=${encodeURIComponent(h.title)}` +
                    `&s=${encodeURIComponent(h.source)}` +
                    (h.publishedAt ? `&p=${encodeURIComponent(String(h.publishedAt))}` : "") +
                    (h.image ? `&i=${encodeURIComponent(h.image)}` : "") +
                    (h.summary ? `&x=${encodeURIComponent(h.summary)}` : "");

                    const thumb = h.image || faviconFromUrl(h.url);
                    const bullets = bulletsFromSummary(h.summary);

                    return (
                      <div
                        key={`${h.url}-${idx}`}
                        className="rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-zinc-300"
                      >
                        {/* Thumbnail */}
                        <div className="mb-3 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
                          <img
                            src={thumb}
                            alt=""
                            className="h-32 w-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        <div className="flex items-start justify-between gap-3">
                          <span className="text-[11px] uppercase tracking-wide text-zinc-500">
                            {h.source}
                          </span>

                          <span className="text-xs text-zinc-500 whitespace-nowrap">
                            {humanAgo(h.publishedAt)}
                          </span>
                        </div>

                        {h.category && (
                          <div className="mt-2">
                            <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700">
                              {h.category}
                            </span>
                          </div>
                          )}

                        {/* Headline click goes to original */}
                        <a
                          href={h.url}
                          target="_blank"
                          rel="noreferrer"
                          className="block mt-1"
                        >
                          <h3 className="font-semibold leading-snug hover:underline">
                            {h.title}
                          </h3>
                        </a>

                        {/* 2 bullets from RSS summary/description */}
                        {bullets.length > 0 && (
                          <ul className="mt-3 space-y-1 text-sm text-zinc-700">
                            {bullets.map((b, ii) => (
                              <li key={ii} className="flex gap-2">
                                <span className="text-zinc-400">•</span>
                                <span className="leading-snug">{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        <div className="mt-3 flex items-center justify-end">
                          <ShareButton url={shareHrefAbs} title={h.title} />
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



