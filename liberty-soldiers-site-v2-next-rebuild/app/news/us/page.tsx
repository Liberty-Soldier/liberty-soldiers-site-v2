import { fetchAllHeadlines } from "@/lib/rss";
import Link from "next/link";
import NewsFeedClient from "../NewsFeedClient";


export const runtime = "nodejs";
export const revalidate = 180;

export const metadata = {
  title: "US | Liberty Soldiers",
  description:
    "Filtered headlines focused on the United States, Washington, Congress, federal power, and domestic policy signals.",
  alternates: {
    canonical: "https://libertysoldiers.com/news/us",
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

function isUS(item: Item) {
  const t = `${item.title} ${item.summary || ""}`.toLowerCase();

  return (
    t.includes("u.s.") ||
    t.includes("u.s ") ||
    t.includes("united states") ||
    t.includes("america") ||
    t.includes("american") ||
    t.includes("washington") ||
    t.includes("congress") ||
    t.includes("white house") ||
    t.includes("federal") ||
    t.includes("pentagon") ||
    t.includes("senate") ||
    t.includes("house republicans") ||
    t.includes("house democrats") ||
    t.includes("supreme court")
  );
}

export default async function USPage() {
  let items: Item[] = [];

  try {
    items = ((await fetchAllHeadlines()) as Item[])
      .filter(isUS)
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
              US
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-zinc-200 sm:text-base">
              Washington, Congress, federal agencies, domestic power shifts,
              policy pressure, and internal U.S. developments.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-600 motion-safe:animate-pulse" />
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Latest US Signals
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