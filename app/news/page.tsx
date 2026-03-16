// app/news/page.tsx
import { fetchAllHeadlines } from "@/lib/rss";
import { getAllReports } from "@/lib/reports";
import Link from "next/link";
import NewsFeedClient from "./NewsFeedClient";

export const metadata = {
  title: "News Feed | Liberty Soldiers",
  description:
    "Live headlines for situational awareness plus original Liberty Soldiers reports, articles, and analysis.",
  alternates: { canonical: "https://libertysoldiers.com/news" },
};

export const revalidate = 180;

type Item = {
  title: string;
  url: string;
  source: string;
  publishedAt?: number;
  image?: string;
  summary?: string;
  category?: string;
  hardCategory?: string;
  kind?: "external" | "report" | "analysis" | "brief" | "news";
  byline?: string;
  isOriginal?: boolean;
};

export default async function NewsPage() {
  let externalItems: Item[] = [];
  let originalItems: Item[] = [];

  try {
    externalItems = ((await fetchAllHeadlines()) as Item[]).map((item) => ({
      ...item,
      kind: "external",
      isOriginal: false,
    }));
  } catch {
    externalItems = [];
  }

  try {
    originalItems = getAllReports().map((r) => ({
      title: r.title,
      url: `/news/${r.slug}`,
      source: "Liberty Soldiers",
      publishedAt: r.dateISO
        ? new Date(`${r.dateISO}T12:00:00Z`).getTime()
        : 0,
      image: r.coverImage,
      summary: r.excerpt,
      category: r.category,
      hardCategory: r.hardCategory,
      kind: r.kind,
      byline: r.byline,
      isOriginal: true,
    }));
  } catch {
    originalItems = [];
  }

  const items: Item[] = [...originalItems, ...externalItems].sort(
    (a, b) => (b.publishedAt || 0) - (a.publishedAt || 0)
  );

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      {/* ===== HERO BAND ===== */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-zinc-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/global-trade-port.jpg)" }}
        />

        {/* Slightly reduced overlay darkness */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/45 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] text-red-400">
              Live Monitor
            </div>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Global News Signal Feed
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-zinc-200 sm:text-base">
              Real-time situational awareness headlines across geopolitics,
              financial stress signals, military escalation, technological
              control systems, and narrative shifts shaping global perception —
              plus original Liberty Soldiers reports and articles.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-600 motion-safe:animate-pulse" />
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Latest Headlines
            </h2>
          </div>

          <Link
            href="/"
            className="whitespace-nowrap text-sm text-zinc-700 hover:text-zinc-900"
          >
            ← Home
          </Link>
        </div>

        <section className="border-t border-zinc-200 pt-6">
          {items.length === 0 ? (
            <div className="rounded-xl border border-zinc-200 bg-white p-6 text-zinc-700">
              No headlines yet. If this persists, check{" "}
              <code className="text-zinc-900">lib/news.config.ts</code>.
            </div>
          ) : (
            <NewsFeedClient items={items} />
          )}
        </section>
      </div>
    </main>
  );
}
