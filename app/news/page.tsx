// app/news/page.tsx
import { fetchAllHeadlines } from "@/lib/rss";
import ShareButton from "./ShareButton";
import Link from "next/link";
import { getLatestReports } from "@/lib/reports";

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

  const parts = clean
    .split(/(?:\.|\!|\?)\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (parts.length >= 2) {
    return parts.slice(0, 2).map((s) => (/[.!?]$/.test(s) ? s : s + "."));
  }

  const chunk1 = clean.slice(0, 90).trim();
  const chunk2 = clean.slice(90, 180).trim();
  const out = [chunk1, chunk2].filter(Boolean);

  return out.slice(0, 2).map((s) => (/[.!?]$/.test(s) ? s : s + "."));
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map((v) => Number(v));
  const dt = new Date(y, (m ?? 1) - 1, d ?? 1);
  return dt.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default async function NewsPage() {
  let items: Item[] = [];

  try {
    items = (await fetchAllHeadlines()) as Item[];
  } catch {
    items = [];
  }

  const latestReports = getLatestReports(10);

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              News Feed
            </h1>
          </div>

          <Link
            href="/"
            className="text-sm text-zinc-700 hover:text-zinc-900 whitespace-nowrap"
          >
            ← Home
          </Link>
        </div>

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
  {items.map((h, idx) => {
    const shareHrefAbs = `https://libertysoldiers.com/news/share?u=${encodeURIComponent(
      h.url
    )}`;

    const thumb = h.image || faviconFromUrl(h.url);
    const bullets = bulletsFromSummary(h.summary);

    const INSERT_AFTER = 12; // show reports after 12 headline cards
    const shouldInsertReports = idx === INSERT_AFTER;

    return (
      <div key={`${h.url}-${idx}`} className="contents">
        {/* Mid-feed Reports block */}
        {shouldInsertReports && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">
                    Liberty Soldiers Reports
                  </h2>
                  <p className="mt-1 text-zinc-600">
                    Original investigative reports and analysis.
                  </p>
                </div>

                <Link
                  href="/reports"
                  className="text-sm text-zinc-700 hover:text-zinc-900 whitespace-nowrap"
                >
                  View all reports →
                </Link>
              </div>

              {latestReports.length === 0 ? (
                <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-zinc-700">
                  No reports published yet.
                </div>
              ) : (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {latestReports.slice(0, 6).map((r) => (
                    <Link
                      key={r.slug}
                      href={`/news/${r.slug}`}
                      className="block rounded-xl border border-zinc-200 bg-zinc-50 p-4 transition hover:border-zinc-300"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-[11px] uppercase tracking-wide text-zinc-500">
                          Report
                        </span>
                        <span className="text-xs text-zinc-500 whitespace-nowrap">
                          {formatDate(r.dateISO)}
                        </span>
                      </div>

                      <h3 className="mt-1 font-semibold leading-snug hover:underline">
                        {r.title}
                      </h3>

                      <p className="mt-2 text-sm text-zinc-700">{r.excerpt}</p>

                      <div className="mt-3 text-xs text-zinc-600">
                        By{" "}
                        <span className="font-medium text-zinc-800">
                          {r.byline}
                        </span>
                      </div>

                      <span className="mt-3 inline-block text-xs text-zinc-600">
                        Read →
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Headline card */}
                              <div className="rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-zinc-300">
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
                      
                                <a href={h.url} className="block mt-1" target="_blank" rel="noreferrer">
                                  <h3 className="font-semibold leading-snug hover:underline">
                                    {h.title}
                                  </h3>
                                </a>
                      
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
                                  <ShareButton wrapperUrl={shareHrefAbs} title={h.title} />
                                </div>
                              </div>
                            </div>
                          );
                        })}
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

