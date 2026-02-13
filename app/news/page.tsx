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

export const revalidate = 600;

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-600 motion-safe:animate-pulse" />
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              News Feed
            </h1>
            <span className="hidden sm:inline text-zinc-300">/</span>
            <h2 className="hidden sm:block text-2xl font-extrabold tracking-tight text-red-600">
              Latest Headlines
            </h2>
          </div>

          <Link
            href="/"
            className="text-sm text-zinc-700 hover:text-zinc-900 whitespace-nowrap"
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
            <NewsFeedClient items={items} latestReports={latestReports} />
          )}
        </section>
      </div>
    </main>
  );
}


