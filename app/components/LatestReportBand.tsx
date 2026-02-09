import Link from "next/link";
import type { Report } from "../../lib/reports";

type Props = {
  report: Report | null;
};

export default function LatestReportBand({ report }: Props) {
  if (!report) return null;

  return (
    <section className="border-b border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Latest Liberty Soldiers Report
            </p>

            <Link
              href={`/reports/${report.slug}`}
              className="mt-1 block text-lg font-semibold text-zinc-900 hover:underline"
            >
              {report.title}
            </Link>
          </div>

          <Link
            href="/reports"
            className="shrink-0 text-sm font-semibold text-zinc-900 hover:underline"
          >
            View all →
          </Link>
        </div>
      </div>
    </section>
  );
}
