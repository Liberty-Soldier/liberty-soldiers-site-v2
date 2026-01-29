// app/reports/page.tsx
import Link from "next/link";
import { getAllReports } from "@/lib/reports";

export const metadata = {
  title: "Reports | Liberty Soldiers",
  description: "Original Liberty Soldiers investigative reports and analysis.",
  alternates: { canonical: "https://libertysoldiers.com/reports" },
};

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map((v) => Number(v));
  const dt = new Date(y, (m ?? 1) - 1, d ?? 1);
  return dt.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function ReportsPage() {
  const reports = getAllReports();

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Liberty Soldiers Reports
            </h1>
            <p className="mt-1 text-zinc-600">
              Original investigative reports and analysis.
            </p>
          </div>

          <Link
            href="/"
            className="text-sm text-zinc-700 hover:text-zinc-900 whitespace-nowrap"
          >
            ← Home
          </Link>
        </div>

        {reports.length === 0 ? (
          <div className="rounded-xl border border-zinc-200 bg-white p-6 text-zinc-700">
            No reports published yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map((r) => (
              <Link
                key={r.slug}
                href={`/news/${r.slug}`}
                className="block rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-zinc-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[11px] uppercase tracking-wide text-zinc-500">
                    Report
                  </span>
                  <span className="text-xs text-zinc-500 whitespace-nowrap">
                    {formatDate(r.dateISO)}
                  </span>
                </div>

                <h2 className="mt-1 font-semibold leading-snug hover:underline">
                  {r.title}
                </h2>

                <p className="mt-2 text-sm text-zinc-700">{r.excerpt}</p>

                <div className="mt-3 text-xs text-zinc-600">
                  By <span className="font-medium text-zinc-800">{r.byline}</span>
                </div>

                <span className="mt-3 inline-block text-xs text-zinc-600">
                  Read →
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
