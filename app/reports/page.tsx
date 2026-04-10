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

type ReportsPageProps = {
  searchParams?: {
    q?: string;
    category?: string;
    type?: string;
    sort?: string;
  };
};

const CATEGORY_STYLES: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  "War & Geopolitics": {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
  },
  "Markets & Finance": {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
  },
  "Power & Control": {
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
  },
  "Strategic Signals": {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
  },
  "Digital ID / Technocracy": {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  "Religion & Ideology": {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  "Prophecy Watch": {
    bg: "bg-zinc-100",
    text: "text-zinc-700",
    border: "border-zinc-300",
  },
  General: {
    bg: "bg-zinc-100",
    text: "text-zinc-700",
    border: "border-zinc-300",
  },
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

function getCategoryStyle(category?: string) {
  return CATEGORY_STYLES[category || "General"] || CATEGORY_STYLES.General;
}

function normalizeText(value?: string) {
  return (value || "").trim().toLowerCase();
}

function matchesSearch(item: ReportItem, q: string) {
  if (!q) return true;
  const haystack = [
    item.title,
    item.excerpt,
    item.byline,
    item.category,
    item.hardCategory,
    typeLabel(item.kind),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(q.toLowerCase());
}

function compareBySort(a: ReportItem, b: ReportItem, sort: string) {
  if (sort === "oldest") {
    return (a.dateISO || "").localeCompare(b.dateISO || "");
  }

  if (sort === "priority") {
    const aPriority = typeof a.priority === "number" ? a.priority : 0;
    const bPriority = typeof b.priority === "number" ? b.priority : 0;

    if (bPriority !== aPriority) return bPriority - aPriority;
    return (b.dateISO || "").localeCompare(a.dateISO || "");
  }

  return (b.dateISO || "").localeCompare(a.dateISO || "");
}

function getAvailableCategories(items: ReportItem[]) {
  const counts = new Map<string, number>();

  for (const item of items) {
    const key = categoryLabel(item);
    counts.set(key, (counts.get(key) || 0) + 1);
  }

  return Array.from(counts.entries()).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return a[0].localeCompare(b[0]);
  });
}

function getAvailableTypes(items: ReportItem[]) {
  const counts = new Map<string, number>();

  for (const item of items) {
    const key = typeLabel(item.kind);
    counts.set(key, (counts.get(key) || 0) + 1);
  }

  return Array.from(counts.entries()).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return a[0].localeCompare(b[0]);
  });
}

function buildReportsUrl(params: {
  q?: string;
  category?: string;
  type?: string;
  sort?: string;
}) {
  const sp = new URLSearchParams();

  if (params.q) sp.set("q", params.q);
  if (params.category && params.category !== "all") sp.set("category", params.category);
  if (params.type && params.type !== "all") sp.set("type", params.type);
  if (params.sort && params.sort !== "newest") sp.set("sort", params.sort);

  const query = sp.toString();
  return query ? `/reports?${query}` : "/reports";
}

function FilterChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition",
        active
          ? "border-zinc-900 bg-zinc-900 text-white"
          : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

function ResultCard({ item }: { item: ReportItem }) {
  const category = categoryLabel(item);
  const categoryStyle = getCategoryStyle(category);
  const type = typeLabel(item.kind);

  return (
    <Link
      href={articleHref(item)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
    >
      <div className="relative aspect-[16/9] bg-zinc-100">
        <img
          src={item.coverImage || "/og-default.jpg"}
          alt={item.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div
          className={`absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}
        >
          <span className="inline-flex h-2 w-2 rounded-full bg-current" />
          {category}
        </div>
      </div>

      <div className="flex h-full flex-col p-4">
        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-zinc-500">
          <span>{type}</span>
          <span>•</span>
          <span>{formatDate(item.dateISO)}</span>
          {item.readTime ? (
            <>
              <span>•</span>
              <span>{item.readTime}</span>
            </>
          ) : null}
        </div>

        <h3 className="mt-3 text-xl font-extrabold leading-tight tracking-tight text-zinc-900 group-hover:text-red-700">
          {item.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-700">
          {item.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <div className="text-xs text-zinc-600">
            By <span className="font-semibold text-zinc-900">{item.byline}</span>
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
  );
}

export default async function ReportsPage({ searchParams }: ReportsPageProps) {
  const staticReports: ReportItem[] = getAllReports().map((item) => ({
    ...item,
    routeType: "news" as const,
  }));

  const publishedReports: ReportItem[] = (await getPublished()).map((item) => ({
    ...item,
    routeType: "published" as const,
  }));

  const allReports: ReportItem[] = dedupeBySlug([
    ...publishedReports,
    ...staticReports,
  ]);

  const q = normalizeText(searchParams?.q);
  const selectedCategory = searchParams?.category || "all";
  const selectedType = searchParams?.type || "all";
  const selectedSort = searchParams?.sort || "newest";

  const reports = allReports
    .filter((item) => matchesSearch(item, q))
    .filter((item) =>
      selectedCategory === "all" ? true : categoryLabel(item) === selectedCategory
    )
    .filter((item) =>
      selectedType === "all" ? true : typeLabel(item.kind) === selectedType
    )
    .slice()
    .sort((a, b) => compareBySort(a, b, selectedSort));

  const availableCategories = getAvailableCategories(allReports);
  const availableTypes = getAvailableTypes(allReports);

  const featured = reports[0];
  const latest = reports.slice(1, 5);
  const archive = reports.slice(5);
  const latestFiled = reports[0]?.dateISO ? formatDate(reports[0].dateISO) : "—";
  const hasActiveFilters =
    !!q || selectedCategory !== "all" || selectedType !== "all" || selectedSort !== "newest";

  const totalUnfiltered = allReports.length;

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
                Showing {reports.length} of {totalUnfiltered}
              </div>
            </div>
          </div>

          <div className="px-5 py-6 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
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
                    {totalUnfiltered}
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

            <form method="GET" action="/reports" className="mt-8">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5">
                <div className="grid gap-3 lg:grid-cols-[1.4fr_0.7fr_0.7fr_0.7fr_auto]">
                  <div>
                    <label
                      htmlFor="reports-search"
                      className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                    >
                      Search reports
                    </label>
                    <input
                      id="reports-search"
                      name="q"
                      defaultValue={searchParams?.q || ""}
                      placeholder="Search title, excerpt, byline, category..."
                      className="h-11 w-full rounded-xl border border-zinc-300 bg-white px-4 text-sm text-zinc-900 outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="reports-category"
                      className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                    >
                      Category
                    </label>
                    <select
                      id="reports-category"
                      name="category"
                      defaultValue={selectedCategory}
                      className="h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-zinc-500"
                    >
                      <option value="all">All categories</option>
                      {availableCategories.map(([name, count]) => (
                        <option key={name} value={name}>
                          {name} ({count})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="reports-type"
                      className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                    >
                      Type
                    </label>
                    <select
                      id="reports-type"
                      name="type"
                      defaultValue={selectedType}
                      className="h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-zinc-500"
                    >
                      <option value="all">All types</option>
                      {availableTypes.map(([name, count]) => (
                        <option key={name} value={name}>
                          {name} ({count})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="reports-sort"
                      className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                    >
                      Sort
                    </label>
                    <select
                      id="reports-sort"
                      name="sort"
                      defaultValue={selectedSort}
                      className="h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-zinc-500"
                    >
                      <option value="newest">Newest first</option>
                      <option value="oldest">Oldest first</option>
                      <option value="priority">Priority first</option>
                    </select>
                  </div>

                  <div className="flex items-end gap-2">
                    <button
                      type="submit"
                      className="inline-flex h-11 items-center rounded-xl bg-zinc-900 px-4 text-sm font-semibold text-white transition hover:bg-black"
                    >
                      Apply
                    </button>

                    <Link
                      href="/reports"
                      className="inline-flex h-11 items-center rounded-xl border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
                    >
                      Reset
                    </Link>
                  </div>
                </div>

                {availableCategories.length > 0 && (
                  <div className="mt-4">
                    <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      Top categories
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <FilterChip
                        href={buildReportsUrl({
                          q: searchParams?.q,
                          category: "all",
                          type: searchParams?.type,
                          sort: searchParams?.sort,
                        })}
                        active={selectedCategory === "all"}
                      >
                        All
                      </FilterChip>

                      {availableCategories.map(([name, count]) => (
                        <FilterChip
                          key={name}
                          href={buildReportsUrl({
                            q: searchParams?.q,
                            category: name,
                            type: searchParams?.type,
                            sort: searchParams?.sort,
                          })}
                          active={selectedCategory === name}
                        >
                          {name}
                          <span className="opacity-60">{count}</span>
                        </FilterChip>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </section>

        {reports.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-700 shadow-sm">
            <div className="text-lg font-bold text-zinc-900">No matching reports found.</div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Try clearing filters or using a broader search term.
            </p>
            {hasActiveFilters ? (
              <div className="mt-4">
                <Link
                  href="/reports"
                  className="inline-flex items-center rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-100"
                >
                  Reset filters
                </Link>
              </div>
            ) : null}
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
                                {typeLabel(item.kind)} • {categoryLabel(item)} •{" "}
                                {formatDate(item.dateISO)}
                              </div>
                              <div className="mt-2 text-base font-extrabold leading-tight text-zinc-900">
                                {item.title}
                              </div>
                            </div>

                            <div className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                              Open
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="px-5 py-4 text-sm text-zinc-600">
                        No additional reports available.
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {hasActiveFilters && (
              <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Active filters
                  </span>

                  {q ? (
                    <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-700">
                      Search: {q}
                    </span>
                  ) : null}

                  {selectedCategory !== "all" ? (
                    <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-700">
                      Category: {selectedCategory}
                    </span>
                  ) : null}

                  {selectedType !== "all" ? (
                    <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-700">
                      Type: {selectedType}
                    </span>
                  ) : null}

                  {selectedSort !== "newest" ? (
                    <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-700">
                      Sort: {selectedSort}
                    </span>
                  ) : null}

                  <Link
                    href="/reports"
                    className="ml-auto inline-flex items-center rounded-xl border border-zinc-300 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-900 hover:bg-zinc-100"
                  >
                    Clear all
                  </Link>
                </div>
              </section>
            )}

            <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
              <div className="border-b border-zinc-200 bg-zinc-50 px-5 py-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-700">
                    Reports Archive
                  </div>

                  <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    {reports.length} results
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
                {reports.map((item) => (
                  <ResultCard key={`${item.routeType}-${item.slug}`} item={item} />
                ))}
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
