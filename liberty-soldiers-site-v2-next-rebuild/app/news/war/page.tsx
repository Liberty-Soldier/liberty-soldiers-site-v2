import { fetchAllHeadlines } from "@/lib/rss";
import Link from "next/link";
import NewsFeedClient from "../NewsFeedClient";


export const runtime = "nodejs";
export const revalidate = 180;

export const metadata = {
  title: "War | Liberty Soldiers",
  description:
    "Filtered headlines focused on war, military escalation, strategic chokepoints, conflict signals, and geopolitical flashpoints.",
  alternates: {
    canonical: "https://libertysoldiers.com/news/war",
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

function isWar(item: Item) {
  const t = `${item.title} ${item.summary || ""}`.toLowerCase();

  return (
    t.includes("war") ||
    t.includes("military") ||
    t.includes("missile") ||
    t.includes("strike") ||
    t.includes("airstrike") ||
    t.includes("troops") ||
    t.includes("drone") ||
    t.includes("conflict") ||
    t.includes("battlefield") ||
    t.includes("ceasefire") ||
    t.includes("nato") ||
    t.includes("iran") ||
    t.includes("israel") ||
    t.includes("gaza") ||
    t.includes("ukraine") ||
    t.includes("russia") ||
    t.includes("china") ||
    t.includes("taiwan") ||
    t.includes("houthi") ||
    t.includes("hezbollah") ||
    t.includes("hormuz") ||
    t.includes("defense") ||
    t.includes("defence") ||
    t.includes("naval")
  );
}

export default async function WarPage() {
  let allItems: Item[] = [];
  let items: Item[] = [];
  let debugError = "";

  try {
    allItems = (await fetchAllHeadlines()) as Item[];
    items = allItems
      .filter(isWar)
      .map((item) => ({
        ...item,
        kind: "external" as const,
        isOriginal: false,
      }))
      .sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0));
  } catch (error) {
    debugError = error instanceof Error ? error.message : "Unknown error";
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
              War
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-zinc-200 sm:text-base">
              Military escalation, armed conflict, regional flashpoints,
              strategic risk, and open geopolitical confrontation.
            </p>
            <p className="mt-4 text-xs text-zinc-300">
              total: {allItems.length} • matched: {items.length}
              {debugError ? ` • error: ${debugError}` : ""}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-600 motion-safe:animate-pulse" />
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Latest War Signals
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