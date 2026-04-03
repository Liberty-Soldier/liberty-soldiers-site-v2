// app/reports/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getAllReports } from "@/lib/reports";
import { getPublished } from "@/lib/published-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "Reports Desk | Liberty Soldiers",
  description:
    "Filed intelligence, original reports, and investigative analysis from Liberty Soldiers.",
  alternates: { canonical: "https://libertysoldiers.com/reports/" },
  openGraph: {
    title: "Reports Desk | Liberty Soldiers",
    description:
      "Filed intelligence, original reports, and investigative analysis from Liberty Soldiers.",
    url: "https://libertysoldiers.com/reports/",
    siteName: "Liberty Soldiers",
    type: "website",
    images: [
      {
        url: "https://libertysoldiers.com/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Liberty Soldiers Reports Desk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reports Desk | Liberty Soldiers",
    description:
      "Filed intelligence, original reports, and investigative analysis from Liberty Soldiers.",
    images: ["https://libertysoldiers.com/og-default.jpg"],
  },
};

type ReportItem = {
  slug: string;
  title: string;
  excerpt: string;
  dateISO: string;
  byline: string;
  coverImage: string;
  category?: string;
  hardCategory?: string;
  readTime?: string;
  featured?: boolean;
  priority?: number;
  kind?: string;
  routeType: "news" | "published";
};

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map((v) => Number(v));
  const dt = new Date(y || 1970, (m || 1) - 1, d || 1);
  return dt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function typeLabel(kind?: string) {
  switch (kind) {
    case "news":
      return "News";
    case "brief":
      return "Brief";
    case "analysis":
      return "Analysis";
    case "report":
    default:
      return "Report";
  }
}

function categoryLabel(item: ReportItem) {
  return item.hardCategory || item.category || "General";
}

function articleHref(item: ReportItem) {
  return item.routeType === "published"
    ? `/published/${item.slug}`
    : `/news/${item.slug}`;
}

function dedupeBySlug(items: ReportItem[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (!item.slug || seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  });
}

function getTopCategories(items: ReportItem[]) {
  const counts = new Map<string, number>();

  for (const item of items) {
    const key = categoryLabel(item);
    counts.set(key, (counts.get(key) || 0) + 1);
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
}

function getPriorityReports(items: ReportItem[]) {
  return items
    .slice()
    .sort((a, b) => {
      const aPriority = typeof a.priority === "number" ? a.priority : 0;
      const bPriority = typeof b.priority === "number" ? b.priority : 0;

      if (bPriority !== aPriority) return bPriority - aPriority;
      return (b.dateISO || "").localeCompare(a.dateISO || "");
    })
    .slice(0, 4);
}

export default async function ReportsPage() {
  const staticReports: ReportItem[] = getAllReports().map((item) => ({
    ...item,
    routeType: "news" as const,
  }));

  const publishedReports: ReportItem[] = (await getPublished()).map((item) => ({
    ...item,
    routeType: "published" as const,
  }));

  const reports: ReportItem[] = dedupeBySlug([
    ...publishedReports,
    ...staticReports,
  ])
    .slice()
    .sort((a, b) => (b.dateISO || "").localeCompare(a.dateISO || ""));

  const featured = reports[0];
  const latest = reports.slice(1, 7);
  const archive = reports.slice(7);
  const priorityReports = getPriorityReports(reports.slice(1));
  const topCategories = getTopCategories(reports);
  const latestFiled = featured?.dateISO ? formatDate(featured.dateISO) : "—";

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
          <div className="border-b border-zinc-200 bg-zinc-950 px-5 py-3 text-white sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em]">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  Reports Desk
                </span>
                <span className="text-white/30">•</span>
                <span className="text-white/75">Filed intelligence</span>
              </div>

              <div className="text-[11px] uppercase tracking-[0.18em] text-white/70">
                Last filed: {latestFiled}
              </div>
            </div>
          </div>

          <div className="px-5 py-6 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-700">
                  Liberty Soldiers Intelligence Desk
                </div>

                <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  Filed reports and
                  <span className="block">investigative analysis</span>
                </h1>

                <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-700 sm:text-lg">
                  Original Liberty Soldiers reporting tracking power, conflict,
                  ideology, financial pressure, narrative management, and emerging
                  systems shaping the world.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/news"
                    className="inline-flex items-center rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-100"
                  >
                    Latest News →
                  </Link>
                  <Link
                    href="/war-escalation"
                    className="inline-flex items-center rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-100"
                  >
                    War Radar →
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
                  >
                    ← Home
                  </Link>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    Total filed
                  </div>
                  <div className="mt-2 text-3xl font-extrabold text-zinc-900">
                    {reports.length}
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    Latest filed
                  </div>
                  <div className="mt-2 text-xl font-extrabold text-zinc-900">
                    {latestFiled}
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    Coverage
                  </div>
                  <div className="mt-2 text-sm font-semibold leading-relaxed text-zinc-900">
                    War, finance, control systems, ideology, and strategic pressure
                  </div>
                </div>
              </div>
            </div>

            {topCategories.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {topCategories.map(([name, count]) => (
                  <div
                    key={name}
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-700"
                  >
                    <span>{name}</span>
                    <span className="text-zinc-400">•</span>
                    <span>{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {reports.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-700">
            No reports filed yet.
          </div>
        ) : (
          <div className="mt-8 space-y-8">
            {featured && (
              <section className="grid gap-8 xl:grid-cols-[1.25fr_0.75fr]">
                <Link
                  href={articleHref(featured)}
                  className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:border-zinc-300 hover:shadow-md"
                >
                  <div className="border-b border-zinc-200 bg-zinc-900 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                    Lead Report
                  </div>

                  <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="p-6 sm:p-8">
                      <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                        <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 font-semibold text-zinc-700">
                          {typeLabel(featured.kind)}
                        </span>
                        <span className="text-zinc-300">•</span>
                        <span>{categoryLabel(featured)}</span>
                        <span className="text-zinc-300">•</span>
                        <span>Filed {formatDate(featured.dateISO)}</span>
                      </div>

                      <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                        {featured.title}
                      </h2>

                      <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-700">
                        {featured.excerpt}
                      </p>

                      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                        <div className="text-sm text-zinc-600">
                          By{" "}
                          <span className="font-semibold text-zinc-900">
                            {featured.byline}
                          </span>
                        </div>

                        <div className="inline-flex items-center text-sm font-semibold text-zinc-900">
                          Open Report
                          <span className="ml-1 transition-transform group-hover:translate-x-1">
                            →
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="relative min-h-[280px] border-t border-zinc-200 bg-zinc-100 lg:min-h-full lg:border-l lg:border-t-0">
<img
  src={featured.coverImage || "/og-default.jpg"}
  alt={featured.title}
  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
  loading="eager"
/>
                    </div>
                  </div>
                </Link>

                <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
                  <div className="border-b border-zinc-200 bg-zinc-50 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-700">
                    Priority Reports
                  </div>

                  <div className="divide-y divide-zinc-200">
                    {priorityReports.length > 0 ? (
                      priorityReports.map((item) => (
                        <Link
                          key={item.slug}
                          href={articleHref(item)}
                          className="block px-5 py-4 transition hover:bg-zinc-50"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                                {categoryLabel(item)} • {formatDate(item.dateISO)}
                              </div>
                              <div className="mt-2 text-base font-extrabold leading-tight text-zinc-900">
                                {item.title}
                              </div>
                            </div>

                            <div className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                              P{typeof item.priority === "number" ? item.priority : 0}
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="px-5 py-4 text-sm text-zinc-600">
                        No priority reports filed yet.
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            <section className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
              <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
                <div className="border-b border-zinc-200 bg-zinc-50 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-700">
                  Latest Filed
                </div>

                <div className="divide-y divide-zinc-200">
                  {latest.length > 0 ? (
                    latest.map((item) => (
                      <Link
                        key={item.slug}
                        href={articleHref(item)}
                        className="block px-5 py-4 transition hover:bg-zinc-50"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                              {typeLabel(item.kind)} • {categoryLabel(item)}
                            </div>
                            <div className="mt-2 text-lg font-extrabold leading-tight text-zinc-900">
                              {item.title}
                            </div>
                            <div className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-700">
                              {item.excerpt}
                            </div>
                          </div>

                          <div className="shrink-0 whitespace-nowrap text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                            {formatDate(item.dateISO)}
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="px-5 py-4 text-sm text-zinc-600">
                      No recent reports filed yet.
                    </div>
                  )}
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
                <div className="border-b border-zinc-200 bg-zinc-50 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-700">
                  Reports Archive
                </div>

                {archive.length === 0 ? (
                  <div className="px-5 py-4 text-sm text-zinc-600">
                    No archive reports yet.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
                    {archive.map((item) => (
                      <Link
                        key={item.slug}
                        href={articleHref(item)}
                        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:border-zinc-300 hover:shadow-sm"
                      >
                        <div className="relative aspect-[16/9] bg-zinc-100">
<img
  src={item.coverImage || "/og-default.jpg"}
  alt={item.title}
  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
  loading="lazy"
/>
                        </div>

                        <div className="flex h-full flex-col p-4">
                          <div className="flex items-start justify-between gap-3">
                            <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-700">
                              {typeLabel(item.kind)}
                            </span>
                            <span className="whitespace-nowrap text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                              {formatDate(item.dateISO)}
                            </span>
                          </div>

                          <h3 className="mt-4 text-lg font-extrabold leading-tight tracking-tight text-zinc-900">
                            {item.title}
                          </h3>

                          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-700">
                            {item.excerpt}
                          </p>

                          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                            <div className="text-xs text-zinc-600">
                              {categoryLabel(item)}
                            </div>

                            <span className="inline-flex items-center text-xs font-semibold tracking-wide text-zinc-900">
                              Open Report
                              <span className="ml-1 transition-transform group-hover:translate-x-1">
                                →
                              </span>
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <div className="border-t border-zinc-200 pt-4 text-xs leading-relaxed text-zinc-500">
              Reports on this page are original Liberty Soldiers analysis and
              commentary. External source reporting, when cited within a report,
              is used for reference and context.
            </div>
          </div>
        )}
      </div>
    </main>
  );
}