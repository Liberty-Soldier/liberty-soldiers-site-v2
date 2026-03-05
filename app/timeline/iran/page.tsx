import type { Metadata } from "next";
import { headers } from "next/headers";

export const revalidate = 120;

const SITE = "https://libertysoldiers.com";
const CANONICAL = `${SITE}/us-israel-iran-war-timeline`;

export const metadata: Metadata = {
  title: "US–Israel–Iran War Timeline | Liberty Soldiers",
  description:
    "A continuously updated timeline of key escalation events, signals, and developments across the US–Israel–Iran conflict.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "US–Israel–Iran War Timeline | Liberty Soldiers",
    description:
      "Key events in sequence — updated frequently to separate signal from noise.",
    url: CANONICAL,
    siteName: "Liberty Soldiers",
    type: "website",
  },
};

type TimelineEvent = {
  id: string;
  ts: number;
  title: string;
  summary?: string;
  source?: string;
  url?: string;
  tags?: string[];
  kind?: "manual" | "auto";
};

function fmt(ts: number) {
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return "";
  }
}

// ✅ Build an absolute URL for server-side fetch (fixes Vercel ERR_INVALID_URL)
function absoluteUrl(path: string) {
  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  return `${proto}://${host}${path}`;
}

export default async function TimelinePage() {
  const url = absoluteUrl("/api/timeline/iran");

  const res = await fetch(url, {
    next: { revalidate: 120 },
  });

  if (!res.ok) {
    return (
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-extrabold text-zinc-900">
          US–Israel–Iran War Timeline
        </h1>
        <p className="mt-3 text-zinc-600">
          Timeline feed is temporarily unavailable.
        </p>
      </main>
    );
  }

  const data = await res.json();
  const events: TimelineEvent[] = data?.events ?? [];

  const manual = events.filter((e) => e.kind === "manual");
  const auto = events.filter((e) => e.kind !== "manual");

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
          US–Israel–Iran War Timeline
        </h1>
        <p className="mt-2 text-zinc-600">
          Key escalation events in sequence — updated frequently to separate
          signal from noise.
        </p>
        <p className="mt-1 text-sm text-zinc-500">
          Updated: {fmt(data?.updatedAt ?? Date.now())} • Items: {events.length}
        </p>
      </header>

      {manual.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-bold text-zinc-900 mb-3">Key Events</h2>
          <div className="space-y-3">
            {manual.map((e) => (
              <EventCard key={e.id} e={e} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-lg font-bold text-zinc-900 mb-3">Live Timeline</h2>
        <div className="space-y-3">
          {auto.map((e) => (
            <EventCard key={e.id} e={e} />
          ))}
        </div>
      </section>
    </main>
  );
}

function EventCard({ e }: { e: TimelineEvent }) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs text-zinc-500">{fmt(e.ts)}</div>
          <h3 className="mt-1 font-semibold text-zinc-900">{e.title}</h3>

          {e.summary && (
            <p className="mt-1 text-sm text-zinc-700">{e.summary}</p>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-2">
            {e.kind === "manual" && (
              <span className="text-xs rounded-full border border-zinc-300 px-2 py-0.5 text-zinc-700">
                Key Event
              </span>
            )}
            {e.source && (
              <span className="text-xs rounded-full bg-zinc-100 px-2 py-0.5 text-zinc-700">
                {e.source}
              </span>
            )}
            {e.tags?.slice(0, 4).map((t) => (
              <span
                key={t}
                className="text-xs rounded-full bg-zinc-50 border border-zinc-200 px-2 py-0.5 text-zinc-600"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {e.url && (
          <a
            href={e.url}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 text-sm font-semibold text-zinc-900 underline decoration-zinc-300 hover:decoration-zinc-900"
          >
            Source
          </a>
        )}
      </div>
    </article>
  );
}
