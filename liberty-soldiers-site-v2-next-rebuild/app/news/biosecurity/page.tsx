import { fetchAllHeadlines } from "@/lib/rss";
import { getAllReports } from "@/lib/reports";
import Link from "next/link";
import NewsFeedClient from "../NewsFeedClient";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = {
  title: "Biosecurity | Liberty Soldiers",
  description:
    "Filtered headlines and reports focused on outbreaks, health policy, biosecurity, emergency powers, and public-health control signals.",
  alternates: {
    canonical: "https://libertysoldiers.com/news/biosecurity",
  },
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

function isBiosecurity(item: Item) {
  const c = `${item.category || ""} ${item.hardCategory || ""}`.toLowerCase();
  const t = `${item.title} ${item.summary || ""}`.toLowerCase();

  if (c.includes("biosecurity") || c.includes("health")) return true;

  return (
    t.includes("pandemic") ||
    t.includes("outbreak") ||
    t.includes("quarantine") ||
    t.includes("lockdown") ||
    t.includes("public health") ||
    t.includes("emergency powers") ||
    t.includes("bird flu") ||
    t.includes("who ")
  );
}

export default async function BiosecurityPage() {
  let externalItems: Item[] = [];
  let originalItems: Item[] = [];

  try {
    externalItems = ((await fetchAllHeadlines()) as Item[])
      .filter(isBiosecurity)
      .map((item) => ({
        ...item,
        kind: "external",
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
      .filter(isBiosecurity);
  } catch {
    originalItems = [];
  }

  const items: Item[] = [...originalItems, ...externalItems].sort(
    (a, b) => (b.publishedAt || 0) - (a.publishedAt || 0)
  );

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
              Biosecurity
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-zinc-200 sm:text-base">
              Outbreak monitoring, public-health policy, emergency powers,
              health-security narratives, and biosecurity control signals.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-600 motion-safe:animate-pulse" />
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Latest Biosecurity Signals
            </h2>
          </div>

          <Link href="/news" className="whitespace-nowrap text-sm text-zinc-700 hover:text-zinc-900">
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
