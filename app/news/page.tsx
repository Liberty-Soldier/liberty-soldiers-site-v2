// app/news/page.tsx
import { fetchAllHeadlines } from "@/lib/rss";
import Link from "next/link";
import NewsFeedClient from "./NewsFeedClient";

export const metadata = {
  title: "News Feed | Liberty Soldiers",
  description:
    "Live headlines for situational awareness plus original Liberty Soldiers reports and analysis.",
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
};

export default async function NewsPage() {
  let items: Item[] = [];

  try {
    items = (await fetchAllHeadlines()) as Item[];
  } catch {
    items = [];
  }

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      
      {/* ===== HERO BAND ===== */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-zinc-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/og-default.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/55 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] text-red-400">
              Live Monitor
            </div>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Global News Signal Feed
            </h1>

            <p className="mt-3 text-sm sm:text-base text-zinc-200 leading-relaxed">
              Real-time situational awareness headlines across geopolitics,
              financial stress signals, military escalation, technological
              control systems, and narrative shifts shaping global perception.
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
