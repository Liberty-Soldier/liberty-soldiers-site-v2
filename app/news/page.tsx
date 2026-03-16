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
function classifyLane(item: Item): string {
  const c = `${item.category || ""} ${item.hardCategory || ""}`.toLowerCase();
  const t = `${item.title} ${item.summary || ""}`.toLowerCase();

  if (
    c.includes("war") ||
    c.includes("geopolitics") ||
    c.includes("iran war") ||
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
    t.includes("war") ||
    t.includes("military")
  ) {
    return "geopolitics-war";
  }

  if (
    c.includes("power") ||
    c.includes("control") ||
    c.includes("technocracy") ||
    c.includes("digital id") ||
    c.includes("control systems") ||
    c.includes("censorship") ||
    c.includes("speech") ||
    t.includes("digital id") ||
    t.includes("biometric") ||
    t.includes("surveillance") ||
    t.includes("facial recognition") ||
    t.includes("censorship") ||
    t.includes("social credit") ||
    t.includes("cbdc")
  ) {
    return "power-control";
  }

  if (
    c.includes("finance") ||
    c.includes("markets") ||
    c.includes("crypto") ||
    t.includes("market") ||
    t.includes("stocks") ||
    t.includes("bond") ||
    t.includes("yield") ||
    t.includes("fed") ||
    t.includes("inflation") ||
    t.includes("oil") ||
    t.includes("crude") ||
    t.includes("bitcoin") ||
    t.includes("ethereum") ||
    t.includes("crypto")
  ) {
    return "markets-finance";
  }

  if (
    c.includes("religion") ||
    c.includes("ideology") ||
    c.includes("persecution") ||
    t.includes("church") ||
    t.includes("christian") ||
    t.includes("jewish") ||
    t.includes("mosque") ||
    t.includes("synagogue") ||
    t.includes("religion") ||
    t.includes("pastor") ||
    t.includes("imam") ||
    t.includes("persecution")
  ) {
    return "religion-ideology";
  }

  if (
    c.includes("prophecy") ||
    t.includes("prophecy") ||
    t.includes("end time") ||
    t.includes("end-time") ||
    t.includes("endtime") ||
    t.includes("tribulation") ||
    t.includes("rapture") ||
    t.includes("antichrist") ||
    t.includes("mark of the beast") ||
    t.includes("revelation") ||
    t.includes("daniel") ||
    t.includes("eschatology")
  ) {
    return "prophecy-watch";
  }

  if (
    c.includes("biosecurity") ||
    c.includes("health") ||
    t.includes("pandemic") ||
    t.includes("outbreak") ||
    t.includes("quarantine") ||
    t.includes("lockdown") ||
    t.includes("public health") ||
    t.includes("emergency powers") ||
    t.includes("bird flu")
  ) {
    return "biosecurity";
  }

  return "other";
}

function pickAllNewsBalanced(items: Item[], take = 80): Item[] {
  const sorted = items
    .slice()
    .sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0));

  const requiredLanes = [
    "geopolitics-war",
    "power-control",
    "markets-finance",
    "religion-ideology",
    "prophecy-watch",
    "biosecurity",
  ];

  const picked: Item[] = [];
  const used = new Set<string>();

  for (const lane of requiredLanes) {
    const match = sorted.find(
      (item) => !used.has(item.url) && classifyLane(item) === lane
    );
    if (match) {
      picked.push(match);
      used.add(match.url);
    }
  }

  for (const item of sorted) {
    if (picked.length >= take) break;
    if (used.has(item.url)) continue;
    picked.push(item);
    used.add(item.url);
  }

  return picked;
}
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

  const items: Item[] = pickAllNewsBalanced(
  [...originalItems, ...externalItems],
  80
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
