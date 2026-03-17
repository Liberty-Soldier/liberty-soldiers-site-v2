import { fetchAllHeadlines } from "@/lib/rss";
import { getAllReports } from "@/lib/reports";
import Link from "next/link";
import NewsFeedClient from "../NewsFeedClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Geopolitics & War | Liberty Soldiers",
  description:
    "Filtered geopolitical and war-related headlines plus Liberty Soldiers reports focused on conflict, escalation, military developments, and global power shifts.",
  alternates: {
    canonical: "https://libertysoldiers.com/news/geopolitics-war",
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

function isGeopoliticsWar(item: Item) {
  const c = `${item.category || ""} ${item.hardCategory || ""}`.toLowerCase();
  const t = `${item.title || ""} ${item.summary || ""}`.toLowerCase();

  if (
    c.includes("war") ||
    c.includes("geopolitics") ||
    c.includes("iran war")
  ) {
    return true;
  }

  return (
    t.includes("iran") ||
    t.includes("israel") ||
    t.includes("gaza") ||
    t.includes("russia") ||
    t.includes("ukraine") ||
    t.includes("china") ||
    t.includes("taiwan") ||
    t.includes("missile") ||
    t.includes("drone") ||
    t.includes("strike") ||
    t.includes("airstrike") ||
    t.includes("ceasefire") ||
    t.includes("nato") ||
    t.includes("houthi") ||
    t.includes("hezbollah") ||
    t.includes("hormuz") ||
    t.includes("troops") ||
    t.includes("military") ||
    t.includes("war")
  );
}

async function fetchAllHeadlinesWithTimeout(ms = 8000): Promise<Item[]> {
  return Promise.race([
    fetchAllHeadlines() as Promise<Item[]>,
    new Promise<Item[]>((resolve) =>
      setTimeout(() => resolve([]), ms)
    ),
  ]);
}

export default async function GeopoliticsWarPage() {
  let externalItems: Item[] = [];
  let originalItems: Item[] = [];

  try {
    const headlines = await fetchAllHeadlinesWithTimeout(8000);

    externalItems = headlines
      .filter(isGeopoliticsWar)
      .map((item) => ({
        ...item,
        kind: "external" as const,
        isOriginal: false,
      }));
  } catch {
    externalItems = [];
  }

  try {
    originalItems = getAllReports()
      .map((r) => ({
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
      }))
      .filter(isGeopoliticsWar);
  } catch {
    originalItems = [];
  }

  const items: Item[] = [...originalItems, ...externalItems].sort(
    (a, b) => (b.publishedAt || 0) - (a.publishedAt || 0)
  );

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <section className="relative overflow-hidden border-b border-zinc-200 bg-zinc-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/global-trade-port.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/50 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] text-red-400">
              Filtered Lane
            </div>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Geopolitics & War
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-zinc-200 sm:text-base">
              Conflict monitoring, military escalation, strategic pressure,
              regional flashpoints, and global power shifts — filtered into one
              focused lane.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-600 motion-safe:animate-pulse" />
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Latest Geopolitics & War Signals
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
