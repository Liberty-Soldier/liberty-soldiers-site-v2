import type { Metadata } from "next";
import { headers } from "next/headers";

export const revalidate = 120;

const SITE = "https://libertysoldiers.com";
const CANONICAL = `${SITE}/timeline/us-israel-iran-war-timeline`;

export const metadata: Metadata = {
  title: "US–Israel–Iran War Timeline | Liberty Soldiers",
  description:
    "Major escalation events and live conflict signals — a continuously updated US–Israel–Iran timeline.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "US–Israel–Iran War Timeline | Liberty Soldiers",
    description:
      "Major escalation events + live conflict signals — updated frequently.",
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

function absoluteUrl(path: string) {
  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  return `${proto}://${host}${path}`;
}

function classify(
  e: TimelineEvent
): "strike" | "diplomacy" | "economy" | "humanitarian" | "other" {
  const t = `${e.title ?? ""} ${e.summary ?? ""} ${(e.tags ?? []).join(" ")}`.toLowerCase();

  if (
    t.includes("strike") ||
    t.includes("missile") ||
    t.includes("drone") ||
    t.includes("bomb") ||
    t.includes("air") ||
    t.includes("attack") ||
    t.includes("irgc")
  )
    return "strike";

  if (
    t.includes("talk") ||
    t.includes("negotiat") ||
    t.includes("cease") ||
    t.includes("deal") ||
    t.includes("diplom") ||
    t.includes("oman") ||
    t.includes("geneva")
  )
    return "diplomacy";

  if (
    t.includes("sanction") ||
    t.includes("oil") ||
    t.includes("hormuz") ||
    t.includes("shipping") ||
    t.includes("market") ||
    t.includes("energy") ||
    t.includes("rial") ||
    t.includes("econom")
  )
    return "economy";

  if (
    t.includes("hospital") ||
    t.includes("who") ||
    t.includes("civilian") ||
    t.includes("health") ||
    t.includes("aid") ||
    t.includes("casualt")
  )
    return "humanitarian";

  return "other";
}

function Dot({ kind }: { kind: ReturnType<typeof classify> }) {
  const base =
    "absolute -left-[15px] top-5 h-5 w-5 rounded-full border-[4px] border-white shadow-sm";
  const color =
    kind === "strike"
      ? "bg-red-600"
      : kind === "diplomacy"
      ? "bg-blue-600"
      : kind === "economy"
      ? "bg-amber-500"
      : kind === "humanitarian"
      ? "bg-emerald-600"
      : "bg-zinc-900";

  return <span className={`${base} ${color}`} />;
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] rounded-full bg-zinc-50 border border-zinc-200 px-2 py-0.5 text-zinc-700">
      {children}
    </span>
  );
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

  const manual = events
    .filter((e) => e.kind === "manual")
    .sort((a, b) => b.ts - a.ts);

  const auto = events
    .filter((e) => e.kind === "auto")
    .sort((a, b) => b.ts - a.ts);

  const totalKey = manual.length;
  const totalLive = auto.length;

  return (
    <main className="relative">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-white to-zinc-50" />
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_20%_10%,rgba(0,0,0,0.06),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(220,38,38,0.08),transparent_40%)]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900">
                US–Israel–Iran War Timeline
              </h1>
              <p className="mt-2 max-w-2xl text-zinc-700">
                Major escalation events + live conflict signals — updated frequently to separate
                signal from noise.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  Live
                </span>
                <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-900">
                  Live Items: {totalLive}
                </span>
                <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-900">
                  Key Events: {totalKey}
                </span>
              </div>

              <p className="mt-3 text-sm text-zinc-500">
                Updated: {fmt(data?.updatedAt ?? Date.now())} • Events tracked: {events.length}
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
              <div className="mb-2 text-xs font-semibold text-zinc-900">Legend</div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-600" /> Strikes
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-600" /> Diplomacy
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Economy / Hormuz
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" /> Humanitarian
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* LIVE TIMELINE FIRST */}
        <section className="mb-12">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-zinc-900">Live Timeline</h2>
            <span className="text-xs text-zinc-500">Recent signals (auto feed)</span>
          </div>

          <div className="relative space-y-6 pl-8">
            <div className="absolute left-[10px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-zinc-200 via-zinc-200 to-transparent" />

            {auto.map((e) => (
              <EventCard key={e.id} e={e} variant="live" />
            ))}
          </div>
        </section>

        {/* KEY EVENTS SECOND */}
        {manual.length > 0 && (
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-zinc-900">Key Events</h2>
              <span className="text-xs text-zinc-500">Curated milestones (manual)</span>
            </div>

            <div className="relative space-y-6 pl-8">
              <div className="absolute left-[10px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-zinc-200 via-zinc-200 to-transparent" />

              {manual.map((e) => (
                <EventCard key={e.id} e={e} variant="key" />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function EventCard({
  e,
  variant,
}: {
  e: TimelineEvent;
  variant: "key" | "live";
}) {
  const k = classify(e);

  const tone =
    variant === "key" ? "ring-1 ring-zinc-900/10" : "ring-1 ring-red-600/10";

  const headerAccent =
    variant === "key" ? "from-zinc-900/10" : "from-red-600/10";

  return (
    <article
      className={`relative rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm ${tone}`}
    >
      <Dot kind={k} />

      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-10 rounded-t-2xl bg-gradient-to-b ${headerAccent} to-transparent`}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-zinc-500">{fmt(e.ts)}</span>

            {variant === "key" && (
              <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-[11px] font-semibold text-white">
                KEY
              </span>
            )}

            {k !== "other" && (
              <span className="rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-[11px] font-semibold text-zinc-800">
                {k === "strike"
                  ? "Strike / Kinetic"
                  : k === "diplomacy"
                  ? "Diplomacy"
                  : k === "economy"
                  ? "Economy / Shipping"
                  : "Humanitarian"}
              </span>
            )}
          </div>

          <h3 className="mt-2 text-base font-extrabold leading-snug text-zinc-900 sm:text-lg">
            {e.title}
          </h3>

          {e.summary && (
            <p className="mt-2 text-sm leading-relaxed text-zinc-700">
              {e.summary}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {e.source && <Badge>{e.source}</Badge>}
            {(e.tags ?? []).slice(0, 5).map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </div>

        {e.url && (
          <a
            href={e.url}
            className="shrink-0 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-extrabold text-zinc-900 shadow-sm hover:bg-zinc-50"
          >
            Source
          </a>
        )}
      </div>
    </article>
  );
}
