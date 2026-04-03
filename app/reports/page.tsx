// app/reports/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllReports } from "@/lib/reports";

export const metadata: Metadata = {
  title: "Reports | Liberty Soldiers",
  description:
    "Original Liberty Soldiers investigative reports, intelligence briefings, and long-form analysis.",
  alternates: { canonical: "https://libertysoldiers.com/reports/" },
  openGraph: {
    title: "Reports | Liberty Soldiers",
    description:
      "Original Liberty Soldiers investigative reports, intelligence briefings, and long-form analysis.",
    url: "https://libertysoldiers.com/reports/",
    siteName: "Liberty Soldiers",
    type: "website",
    images: [
      {
        url: "https://libertysoldiers.com/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Liberty Soldiers Reports",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reports | Liberty Soldiers",
    description:
      "Original Liberty Soldiers investigative reports, intelligence briefings, and long-form analysis.",
    images: ["https://libertysoldiers.com/og-default.jpg"],
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
      return "News Article";
    case "brief":
      return "Briefing";
    case "analysis":
      return "Field Analysis";
    case "report":
    default:
      return "Investigative Brief";
  }
}

function bottomLabel(kind?: string) {
  switch (kind) {
    case "news":
      return "Original news";
    case "brief":
      return "Original briefing";
    case "analysis":
      return "Original analysis";
    case "report":
    default:
      return "Original report";
  }
}

export default function ReportsPage() {
  const reports = getAllReports()
    .slice()
    .sort((a, b) => (b.dateISO || "").localeCompare(a.dateISO || ""));

  const featured = reports[0];
  const rest = reports.slice(1);
  const latestFiled = reports[0]?.dateISO ? formatDate(reports[0].dateISO) : null;

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="flex items-start justify-between gap-6">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-700">
                <span className="h-2 w-2 rounded-full bg-black" />
                Liberty Soldiers Reports Desk
              </div>

              <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Original reports and
                <span className="block">investigative analysis</span>
              </h1>

              <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-700 sm:text-lg">
                Original Liberty Soldiers investigations tracking the convergence
                of power, conflict, ideology, narrative control, and emerging
                systems shaping the world.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                <span className="inline-flex items-center gap-2">
                  <span className="h-[6px] w-[6px] rounded-full bg-zinc-400" />
                  Original analysis
                </span>
                <span className="text-zinc-300">•</span>
                <span>Long-form briefings</span>
                <span className="text-zinc-300">•</span>
                <span>Filed for situational awareness</span>
              </div>

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

            <Link
              href="/"
              className="hidden whitespace-nowrap text-sm font-medium text-zinc-700 hover:text-zinc-900 sm:inline"
            >
              ← Home
            </Link>
          </div>

          {reports.length > 0 && (
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  Total reports
                </div>
                <div className="mt-2 text-2xl font-extrabold text-zinc-900">
                  {reports.length}
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  Latest filed
                </div>
                <div className="mt-2 text-2xl font-extrabold text-zinc-900">
                  {latestFiled || "—"}
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  Coverage
                </div>
                <div className="mt-2 text-sm font-semibold leading-relaxed text-zinc-900">
                  Power, conflict, ideology, finance, systems, and narrative control
                </div>
              </div>
            </div>
          )}
        </div>

        {reports.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-700">
            No reports published yet.
          </div>
        ) : (
          <div className="space-y-10">
            {featured && (
              <section>
                <div className="mb-3 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  Lead report
                </div>

                <Link
                  href={`/news/${featured.slug}`}
                  className="group block overflow-hidden rounded-3xl border border-zinc-200 bg-white transition hover:border-zinc-300 hover:shadow-md"
                >
                  <div className="border-b border-zinc-200 bg-zinc-900 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                    Featured intelligence report
                  </div>

                  <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="p-6 sm:p-8">
                      <div className="flex items-start justify-between gap-4">
                        <div className="inline-flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-700">
                            {typeLabel(featured.kind)}
                          </span>
                          <span className="text-zinc-300">•</span>
                          <span className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                            Filed: {formatDate(featured.dateISO)}
                          </span>
                        </div>

                        <span className="hidden sm:inline-flex items-center text-sm font-semibold text-zinc-900">
                          Read Report
                          <span className="ml-1 transition-transform group-hover:translate-x-1">
                            →
                          </span>
                        </span>
                      </div>

                      <h2 className="mt-5 max-w-4xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
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

                        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-700">
                          {bottomLabel(featured.kind)}
                        </div>
                      </div>
                    </div>

                    <div className="relative min-h-[260px] border-t border-zinc-200 bg-zinc-100 lg:min-h-full lg:border-l lg:border-t-0">
                      <Image
                        src={featured.coverImage || "/og-default.jpg"}
                        alt={featured.title}
                        fill
                        priority
                        className="object-cover transition duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                    </div>
                  </div>
                </Link>
              </section>
            )}

            <section>
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  Recent briefings
                </div>
                <div className="text-xs text-zinc-500">
                  Newest reports first
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/news/${r.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:border-zinc-300 hover:shadow-sm"
                  >
                    <div className="relative aspect-[16/9] bg-zinc-100">
                      <Image
                        src={r.coverImage || "/og-default.jpg"}
                        alt={r.title}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>

                    <div className="flex h-full flex-col p-5">
                      <div className="flex items-start justify-between gap-3">
                        <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-700">
                          {typeLabel(r.kind)}
                        </span>
                        <span className="whitespace-nowrap text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                          {formatDate(r.dateISO)}
                        </span>
                      </div>

                      <h3 className="mt-4 text-lg font-extrabold leading-tight tracking-tight text-zinc-900">
                        {r.title}
                      </h3>

                      <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-zinc-700">
                        {r.excerpt}
                      </p>

                      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
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
