// app/reports/page.tsx
import Link from "next/link";
import { getAllReports } from "@/lib/reports";

export const metadata = {
  title: "Reports | Liberty Soldiers",
  description: "Original Liberty Soldiers investigative reports and analysis.",
  alternates: { canonical: "https://libertysoldiers.com/reports/" },
};

function formatDate(iso: string) {
  // expects YYYY-MM-DD
  const [y, m, d] = iso.split("-").map((v) => Number(v));
  const dt = new Date(y || 1970, (m || 1) - 1, d || 1);
  return dt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ReportsPage() {
  // Expect newest-first, but don’t rely on it
  const reports = getAllReports()
    .slice()
    .sort((a, b) => (b.dateISO || "").localeCompare(a.dateISO || ""));

  const featured = reports[0];
  const rest = reports.slice(1);

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Liberty Soldiers Reports
            </h1>
            <p className="mt-2 text-zinc-600">
              Independent reports tracking how power, belief, and perception are shaped — and
              weaponized.
            </p>

            {/* tiny “briefing” line */}
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              <span className="inline-flex items-center gap-2">
                <span className="h-[6px] w-[6px] rounded-full bg-zinc-400" />
                Filed for situational awareness
              </span>
              <span className="text-zinc-300">•</span>
              <span>Updated as new reports publish</span>
            </div>
          </div>

          <Link
            href="/"
            className="text-sm font-medium text-zinc-700 hover:text-zinc-900 whitespace-nowrap"
          >
            ← Home
          </Link>
        </div>

        {reports.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-700">
            No reports published yet.
          </div>
        ) : (
          <div className="space-y-8">
            {/* Featured */}
            {featured && (
              <section>
                <div className="mb-3 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  Featured
                </div>

                <Link
                  href={`/news/${featured.slug}`}
                  className="group block rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-zinc-300 hover:shadow-sm"
                >
                  <div className="relative pl-4">
                    {/* signal line */}
                    <div className="absolute left-0 top-0 h-full w-[3px] rounded-full bg-black/80" />

                    <div className="flex items-start justify-between gap-4">
                      <div className="inline-flex items-center gap-2">
                        <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-zinc-700">
                          Intelligence Report
                        </span>
                        <span className="text-zinc-300">•</span>
                        <span className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                          Filed: {formatDate(featured.dateISO)}
                        </span>
                      </div>

                      <span className="hidden sm:inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-700">
                        Read
                        <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </span>
                    </div>

                    <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                      {featured.title}
                    </h2>

                    <p className="mt-3 text-zinc-700 leading-relaxed">
                      {featured.excerpt}
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-4">
                      <div className="text-sm text-zinc-600">
                        By{" "}
                        <span className="font-semibold text-zinc-900">
                          {featured.byline}
                        </span>
                      </div>

                      <span className="sm:hidden inline-flex items-center text-sm font-semibold text-zinc-900">
                        Read Report
                        <span className="ml-1 transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              </section>
            )}

            {/* Grid */}
            <section>
              <div className="mb-3 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                Recent briefings
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rest.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/news/${r.slug}`}
                    className="group block rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300 hover:shadow-sm"
                  >
                    <div className="relative pl-4">
                      {/* signal line */}
                      <div className="absolute left-0 top-0 h-full w-[2px] rounded-full bg-zinc-200 transition-colors group-hover:bg-zinc-300" />

                      <div className="flex items-start justify-between gap-3">
                        <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-zinc-600">
                          Field analysis
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 whitespace-nowrap">
                          Filed: {formatDate(r.dateISO)}
                        </span>
                      </div>

                      <h3 className="mt-2 text-lg font-extrabold tracking-tight leading-tight">
                        {r.title}
                      </h3>

                      <p className="mt-2 text-sm text-zinc-700 leading-relaxed">
                        {r.excerpt}
                      </p>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div className="text-xs text-zinc-600">
                          By{" "}
                          <span className="font-semibold text-zinc-900">
                            {r.byline}
                          </span>
                        </div>

                        <span className="inline-flex items-center text-xs font-semibold tracking-wide text-zinc-900">
                          Open Brief
                          <span className="ml-1 transition-transform group-hover:translate-x-1">
                            →
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Optional: tiny footer note */}
            <div className="pt-2 text-xs text-zinc-500">
              Reports are original Liberty Soldiers analysis. External links are labeled elsewhere; this
              page is internal-only.
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
