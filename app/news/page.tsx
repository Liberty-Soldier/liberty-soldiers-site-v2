// app/news/page.tsx
import { fetchAllHeadlines } from "@/lib/rss";
import Link from "next/link";
import { getLatestReports } from "@/lib/reports";
import NewsFeedClient from "./NewsFeedClient";

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
            <NewsFeedClient items={items} latestReports={latestReports} />
          )}
        </section>
      </div>
    </main>
  );
}
