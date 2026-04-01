import { fetchAllHeadlines } from "@/lib/rss";
import Link from "next/link";
import NewsFeedClient from "../NewsFeedClient";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const revalidate = 180;

export const metadata = {
  title: "Global | Liberty Soldiers",
  description:
    "Filtered global headlines covering international developments, geopolitical shifts, and major world events.",
  alternates: {
    canonical: "https://libertysoldiers.com/news/global",
  },
};

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

function isGlobal(_item: Item) {
  return true;
}

export default async function GlobalPage() {
  let items: Item[] = [];

  try {
    items = ((await fetchAllHeadlines()) as Item[])
      .filter(isGlobal)
      .map((item) => ({
        ...item,
        kind: "external" as const,
        isOriginal: false,
      }))
      .sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0));
  } catch {
    items = [];
  }

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <section className="relative overflow-hidden border-b border-zinc-200 bg-zinc-900">
        <div className="absolute inset-0 bg-zinc-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/35" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] text-red-400">
              Filtered Lane
            </div>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Global
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-zinc-200 sm:text-base">
              International developments, cross-border tensions, global political
              shifts, and the broader world picture.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-600 motion-safe:animate-pulse" />
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Latest Global Signals
            </h2>
          </div>

          <Link
            href="/news"
            className="whitespace-nowrap text-sm text-zinc-700 hover:text-zinc-900"
          >
            ← All News
          </Link>
        </div>

        <section className="border-t border-zinc-200 pt-6">
          {items.length === 0 ? (
            <div className="rounded-xl border border-zinc-200 bg-white p-6 text-zinc-700">
              No filtered headlines yet.
            </div>
          ) : (
            <NewsFeedClient items={items} />
          )}
        </section>
      </div>
    </main>
  );
}