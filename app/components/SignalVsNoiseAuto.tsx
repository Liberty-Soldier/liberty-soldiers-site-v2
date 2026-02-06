import Link from "next/link";
import { fetchAllHeadlines, fetchNoiseHeadlines, Headline } from "@/lib/rss";

export const revalidate = 300;

// Tiny HTML entity cleanup (covers the common &#8216; &#8217; etc.)
function decodeEntities(s: string) {
  if (!s) return s;
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function Column({
  title,
  subtitle,
  items,
  tone,
}: {
  title: string;
  subtitle: string;
  items: Headline[];
  tone: "signal" | "noise";
}) {
  const headerTone =
    tone === "signal"
      ? "from-emerald-600 to-emerald-500"
      : "from-rose-600 to-rose-500";

  const badgeTone =
    tone === "signal"
      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
      : "bg-rose-50 text-rose-800 border-rose-200";

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
      {/* Top accent bar */}
      <div className={`h-1.5 bg-gradient-to-r ${headerTone}`} />

      {/* Sticky header so it feels like a “panel” */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-zinc-100 px-4 sm:px-5 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-extrabold tracking-tight text-zinc-900">
              {title}
            </h3>
            <p className="mt-0.5 text-[11px] sm:text-xs text-zinc-600">
              {subtitle}
            </p>
          </div>

          <span
            className={`shrink-0 text-[10px] sm:text-xs font-semibold tracking-wide rounded-full border px-2 py-1 ${badgeTone}`}
          >
            AUTO
          </span>
        </div>
      </div>

      {/* Scrollable list area so both columns “feel equal” */}
      <div className="max-h-[420px] sm:max-h-[520px] overflow-auto px-3 sm:px-4 py-3">
        <ul className="space-y-2">
          {items.slice(0, 10).map((h) => {
            const cleanTitle = decodeEntities(h.title);
            const cleanSource = decodeEntities(h.source);
            const cleanCat = h.category ? decodeEntities(h.category) : "";

            return (
              <li key={h.url} className="group">
                <Link
                  href={h.url}
                  target="_blank"
                  className="block rounded-xl border border-zinc-100 bg-white px-3 py-3 hover:border-zinc-200 hover:bg-zinc-50 transition"
                  title={cleanTitle}
                >
                  <div className="text-sm sm:text-[15px] font-semibold text-zinc-900 leading-snug">
                    {cleanTitle}
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] sm:text-xs text-zinc-500">
                    <span className="font-medium text-zinc-600">
                      {cleanSource}
                    </span>
                    {cleanCat ? <span className="text-zinc-300">•</span> : null}
                    {cleanCat ? <span>{cleanCat}</span> : null}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom hint (adds “dashboard” feel) */}
      <div className="border-t border-zinc-100 px-4 sm:px-5 py-2 text-[11px] sm:text-xs text-zinc-500">
        Showing newest items
      </div>
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
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">
              Signal vs Noise
            </h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-zinc-600">
              Two streams. One reality. Filter accordingly.
            </p>
          </div>

          <div className="hidden sm:block text-xs text-zinc-500">
            Updates every few minutes
          </div>
        </div>

        {/* IMPORTANT: force 2 columns even on mobile */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6">
          <Column
            title="SIGNAL"
            subtitle="Structural events, policy shifts, systems."
            items={signal}
            tone="signal"
          />
          <Column
            title="NOISE"
            subtitle="Distraction, churn, attention sinks."
            items={noise}
            tone="noise"
          />
        </div>

        {/* Mobile note: two columns can be tight, so we keep things compact */}
        <p className="mt-4 text-[11px] sm:hidden text-zinc-500">
          Tip: Rotate your phone for a wider view.
        </p>
      </div>
    </section>
  );
}
