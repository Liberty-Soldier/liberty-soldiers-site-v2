import Link from "next/link";
import { fetchAllHeadlines, fetchNoiseHeadlines, Headline } from "@/lib/rss";

export const revalidate = 300;

function Column({ title, items }: { title: string; items: Headline[] }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-zinc-900">{title}</h3>
        <span className="text-xs font-semibold tracking-wide text-zinc-500">AUTO</span>
      </div>

      <ul className="mt-4 space-y-3">
        {items.slice(0, 7).map((h) => (
          <li key={h.url} className="rounded-xl border border-zinc-100 p-3">
            <Link href={h.url} target="_blank" className="font-semibold text-zinc-900 hover:underline">
              {h.title}
            </Link>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
              <span>{h.source}</span>
              {h.category ? <span className="text-zinc-400">•</span> : null}
              {h.category ? <span>{h.category}</span> : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function SignalVsNoiseAuto() {
  const signalAll = await fetchAllHeadlines();
  const signal = (signalAll || []).filter((h) => h.category !== "Pinned");

  const noise = await fetchNoiseHeadlines();

  return (
    <section className="py-12 sm:py-16 border-t border-zinc-200 bg-zinc-50/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">
          Signal vs Noise
        </h2>
        <p className="mt-2 max-w-2xl text-sm sm:text-base text-zinc-600">
          Two streams. One reality. Filter accordingly.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Column title="SIGNAL" items={signal} />
          <Column title="NOISE" items={noise} />
        </div>
      </div>
    </section>
  );
}
