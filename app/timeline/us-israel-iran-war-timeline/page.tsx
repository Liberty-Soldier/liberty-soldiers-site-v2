import type { Metadata } from "next";
import { headers } from "next/headers";
import type { ReactNode } from "react";

export const revalidate = 120;

const SITE = "https://libertysoldiers.com";
const CANONICAL = `${SITE}/timeline/us-israel-iran-war-timeline`;

export const metadata: Metadata = {
  title: "US–Israel–Iran War Timeline | Liberty Soldiers",
  description:
    "Major escalation events, live conflict signals, and key milestones in one continuously updated US–Israel–Iran timeline.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "US–Israel–Iran War Timeline | Liberty Soldiers",
    description:
      "Major escalation events, live conflict signals, and key milestones — updated frequently.",
    url: CANONICAL,
    siteName: "Liberty Soldiers",
    type: "website",
    images: [
      {
        url: `${SITE}/og-iran-war.jpg`,
        width: 1200,
        height: 630,
        alt: "US–Israel–Iran War Timeline",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "US–Israel–Iran War Timeline | Liberty Soldiers",
    description:
      "Major escalation events, live conflict signals, and key milestones — updated frequently.",
    images: [`${SITE}/og-iran-war.jpg`],
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

type EventKind = "strike" | "diplomacy" | "economy" | "humanitarian" | "other";

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

function classify(e: TimelineEvent): EventKind {
  const t =
    `${e.title ?? ""} ${e.summary ?? ""} ${(e.tags ?? []).join(" ")}`.toLowerCase();

  if (
    t.includes("strike") ||
    t.includes("missile") ||
    t.includes("drone") ||
    t.includes("bomb") ||
    t.includes("attack") ||
    t.includes("airstrike") ||
    t.includes("air strike") ||
    t.includes("air raid") ||
    t.includes("rocket") ||
    t.includes("intercept") ||
    t.includes("explosion") ||
    t.includes("irgc")
  ) {
    return "strike";
  }

  if (
    t.includes("talk") ||
    t.includes("negotiat") ||
    t.includes("cease") ||
    t.includes("deal") ||
    t.includes("diplom") ||
    t.includes("oman") ||
    t.includes("geneva") ||
    t.includes("summit") ||
    t.includes("truce")
  ) {
    return "diplomacy";
  }

  if (
    t.includes("sanction") ||
    t.includes("oil") ||
    t.includes("hormuz") ||
    t.includes("shipping") ||
    t.includes("market") ||
    t.includes("energy") ||
    t.includes("rial") ||
    t.includes("econom") ||
    t.includes("inflation") ||
    t.includes("supply") ||
    t.includes("trade")
  ) {
    return "economy";
  }

  if (
    t.includes("hospital") ||
    t.includes("civilian") ||
    t.includes("health") ||
    t.includes("aid") ||
    t.includes("casualt") ||
    t.includes("refugee") ||
    t.includes("wounded") ||
    t.includes("killed") ||
    t.includes("injured") ||
    t.includes("humanitarian")
  ) {
    return "humanitarian";
  }

  return "other";
}

function Dot({ kind }: { kind: EventKind }) {
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

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px] text-zinc-700">
      {children}
    </span>
  );
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
        {label}
      </div>
      <div className="mt-1 text-2xl font-extrabold text-zinc-900">{value}</div>
      {hint && <div className="mt-1 text-xs text-zinc-500">{hint}</div>}
    </div>
  );
}

function EmptyState({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-center shadow-sm">
      <h3 className="text-base font-extrabold text-zinc-900">{title}</h3>
      <p className="mt-2 text-sm text-zinc-600">{body}</p>
    </div>
  );
}

export default async function TimelinePage() {
  const url = absoluteUrl("/api/timeline/iran");

  const res = await fetch(url, {
    next: { revalidate: 120 },
  });

  if (!res.ok) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
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
  const events: TimelineEvent[] = Array.isArray(data?.events) ? data.events : [];

  const sortedEvents = [...events].sort((a, b) => b.ts - a.ts);
  const manual = sortedEvents.filter((e) => e.kind === "manual");
  const auto = sortedEvents
  .filter((e) => e.kind === "auto")
  .filter((e) => classify(e) !== "economy");

  const totalKey = manual.length;
  const totalLive = auto.length;
  const totalEvents = events.length;
  const latestTs = sortedEvents[0]?.ts ?? data?.updatedAt ?? Date.now();

  return (
    <main>
      <section className="relative h-[420px] overflow-hidden sm:h-[520px]">
        <img
          src="/og-iran-war.jpg"
          alt="US–Israel–Iran conflict map"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/35" />

        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow">
            <span className="h-2 w-2 rounded-full bg-white" />
            LIVE CONFLICT TRACKING
          </span>

          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            US–Israel–Iran Escalation Timeline
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            Real-time escalation signals, military developments, economic pressure points,
            and humanitarian fallout — structured into one continuously updated timeline.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href="#live-timeline"
              className="rounded-xl bg-white px-4 py-2 text-sm font-extrabold text-zinc-900 shadow-sm hover:bg-zinc-100"
            >
              Jump to Live Timeline
            </a>
            <a
              href="#key-events"
              className="rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-sm font-extrabold text-white backdrop-blur hover:bg-white/15"
            >
              Jump to Key Events
            </a>
          </div>

          <p className="mt-4 text-sm text-white/80">
            Latest update: {fmt(latestTs)} • Feed refreshed frequently • Total tracked items:{" "}
            {totalEvents}
          </p>
        </div>
      </section>

      <section className="relative">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-white to-zinc-50" />
        <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_20%_10%,rgba(0,0,0,0.05),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(220,38,38,0.08),transparent_40%)]" />

        <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <header className="mb-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  Live Tracking
                </div>

                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
                  Track the escalation in one place
                </h2>

                <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-700 sm:text-lg">
                  A continuously updated conflict timeline built to separate
                  <span className="font-semibold text-zinc-900"> signal from noise</span> —
                  combining real-time feed items with curated key milestones so readers can
                  see both the latest developments and the bigger picture fast.
                </p>

                <p className="mt-4 text-sm text-zinc-500">
                  Latest update: {fmt(latestTs)} • Feed refreshed frequently • Total tracked
                  items: {totalEvents}
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white/95 p-4 shadow-sm backdrop-blur lg:max-w-sm">
                <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  What this page tracks
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                  Strikes, retaliatory signals, military movements, diplomatic developments,
                  shipping and energy pressure, and humanitarian fallout tied to the current
                  US–Israel–Iran escalation.
                </p>

                <div className="mt-4 border-t border-zinc-100 pt-4">
                  <div className="mb-2 text-xs font-semibold text-zinc-900">Legend</div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-600" /> Strikes
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-blue-600" /> Diplomacy
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Economy /
                      Shipping
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" /> Humanitarian
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard
              label="Live Feed Items"
              value={totalLive}
              hint="Automatic incoming signals"
            />
            <StatCard
              label="Key Events"
              value={totalKey}
              hint="Curated milestones and major turns"
            />
            <StatCard
              label="Last Signal"
              value={<span className="text-lg sm:text-xl">{fmt(latestTs)}</span>}
              hint="Most recent tracked update"
            />
          </section>

          <section className="mb-12">
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
              <div className="text-sm font-extrabold text-zinc-900">Why this page matters</div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                Most coverage either overwhelms readers with fragmented updates or strips away
                the sequence that makes developments meaningful. This page is structured to
                show both the live signal flow and the larger escalation pattern in one place.
              </p>
            </div>
          </section>

          <section id="live-timeline" className="mb-12 scroll-mt-24">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-extrabold text-zinc-900">Live Timeline</h2>
                <p className="text-xs text-zinc-500">
                  Recent incoming signals from the auto feed
                </p>
              </div>
              <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700">
                {totalLive} items
              </span>
            </div>

            {auto.length === 0 ? (
              <EmptyState
                title="No live feed items yet"
                body="Automatic updates have not populated yet. Check back shortly for incoming signals."
              />
            ) : (
              <div className="relative space-y-6 pl-8">
                <div className="absolute bottom-0 left-[10px] top-0 w-[2px] bg-gradient-to-b from-zinc-200 via-zinc-200 to-transparent" />
                {auto.map((e) => (
                  <EventCard key={e.id} e={e} variant="live" />
                ))}
              </div>
            )}
          </section>

          <section id="key-events" className="scroll-mt-24">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-extrabold text-zinc-900">Key Events</h2>
                <p className="text-xs text-zinc-500">
                  Curated milestones that define the escalation arc
                </p>
              </div>
              <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700">
                {totalKey} items
              </span>
            </div>

            {manual.length === 0 ? (
              <EmptyState
                title="No key events added yet"
                body="Curated milestone entries have not been added yet. Live feed updates are still being tracked above."
              />
            ) : (
              <div className="relative space-y-6 pl-8">
                <div className="absolute bottom-0 left-[10px] top-0 w-[2px] bg-gradient-to-b from-zinc-200 via-zinc-200 to-transparent" />
                {manual.map((e) => (
                  <EventCard key={e.id} e={e} variant="key" />
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
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

            {variant === "live" && (
              <span className="rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[11px] font-semibold text-red-700">
                LIVE
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
            <p className="mt-2 text-sm leading-relaxed text-zinc-700">{e.summary}</p>
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
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-extrabold text-zinc-900 shadow-sm hover:bg-zinc-50"
            aria-label={`Open source for ${e.title}`}
          >
            Source
          </a>
        )}
      </div>
    </article>
  );
}
