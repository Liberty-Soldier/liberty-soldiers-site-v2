// app/war-escalation/page.tsx
import type { Metadata } from "next";
import { fetchAllHeadlines } from "../../lib/rss";

export const revalidate = 300; // refresh often (good for "live" pages)

const SITE = "https://libertysoldiers.com";
const CANONICAL = `${SITE}/war-escalation`;
const OG_IMAGE = "/og-iran-war.jpg";

export const metadata: Metadata = {
  title: "War & Escalation Radar | Liberty Soldiers",
  description:
    "Real-time monitoring of Iran-related escalation signals, regional conflict, proxy activity, maritime risk, and strategic messaging across key geopolitical flashpoints.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "War & Escalation Radar | Liberty Soldiers",
    description:
      "Live conflict intelligence signals across Iran-related escalation, proxy activity, maritime risk, and regional flashpoints.",
    url: CANONICAL,
    siteName: "Liberty Soldiers",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "War & Escalation Radar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "War & Escalation Radar | Liberty Soldiers",
    description:
      "Live conflict intelligence signals across Iran-related escalation, proxy activity, maritime risk, and regional flashpoints.",
    images: [OG_IMAGE],
  },
};

function hostFromUrl(u: string) {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function displayTime(ms?: number) {
  if (!ms) return "";
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString(undefined, {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * IMPORTANT: avoid spaces in public asset filenames. Use hyphens.
 * Make sure these files exist under /public.
 */
const SOURCE_OG_MAP: Record<string, string> = {
  "aljazeera.com": "/og-aljazeera.jpg",
  "worthynews.com": "/og-worthy news.jpg",
  "realclearreligion.org": "/og-real clear religion.jpg",
  "cbn.com": "/og-cbn.jpg",
  "olivetreeviews.org": "/og-olive tree ministries.jpg",
  "zerohedge.com": "/og-zerohedge.jpg",
  "endtimeheadlines.org": "/og-endtimesheadlines.jpg",
};

function sourceFallbackOg(url: string): string | undefined {
  const h = hostFromUrl(url).toLowerCase();
  const key = Object.keys(SOURCE_OG_MAP).find((k) => h.includes(k));
  return key ? SOURCE_OG_MAP[key] : undefined;
}

function looksRelevant(text: string) {
  const t = text.toLowerCase();
  return (
    t.includes("iran") ||
    t.includes("tehran") ||
    t.includes("israel") ||
    t.includes("hezbollah") ||
    t.includes("houthi") ||
    t.includes("strait of hormuz") ||
    t.includes("hormuz") ||
    t.includes("missile") ||
    t.includes("airstrike") ||
    t.includes("strike") ||
    t.includes("retaliat") ||
    t.includes("drone") ||
    t.includes("proxy") ||
    t.includes("escalat")
  );
}

// Build a link to your existing /news/share wrapper page that accepts searchParams:
// u, t, s, p, i, x
function shareWrapperHref(args: {
  url: string;
  title: string;
  source?: string;
  publishedAt?: number;
  image?: string;
  summary?: string;
}) {
  const sp = new URLSearchParams();

  // ✅ DO NOT pre-encode; URLSearchParams will handle encoding.
  sp.set("u", args.url);
  sp.set("t", args.title);

  const src = args.source || hostFromUrl(args.url);
  if (src) sp.set("s", src);

  if (typeof args.publishedAt === "number" && Number.isFinite(args.publishedAt)) {
    sp.set("p", String(args.publishedAt));
  }

  if (args.image) sp.set("i", args.image);
  if (args.summary) sp.set("x", args.summary);

  // ✅ IMPORTANT: your share page route is /news/share (NOT /share)
  return `/news/share?${sp.toString()}`;
}

export default async function WarEscalationPage() {
  const all = await fetchAllHeadlines();

  const items = all
    .filter((h) => looksRelevant(`${h.title} ${h.summary ?? ""}`))
    .slice(0, 120);

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "War & Escalation Radar",
    description:
      "Real-time monitoring of Iran-related escalation signals, regional conflict, proxy activity, maritime risk, and strategic messaging across key geopolitical flashpoints.",
    url: CANONICAL,
    isPartOf: {
      "@type": "WebSite",
      name: "Liberty Soldiers",
      url: SITE,
    },
  };

  const feedJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "War & Escalation Radar Feed",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "NewsArticle",
      position: index + 1,
      headline: item.title,
      url: item.url,
      datePublished: item.publishedAt ? new Date(item.publishedAt).toISOString() : undefined,
      publisher: {
        "@type": "Organization",
        name: item.source || hostFromUrl(item.url) || "External Source",
      },
    })),
  };

  // Optional: share link for the page itself (uses your wrapper too)
  const shareThisPage = shareWrapperHref({
    url: CANONICAL,
    title: "War & Escalation Radar | Liberty Soldiers",
    source: "Liberty Soldiers",
    image: `${SITE}${OG_IMAGE}`,
    summary:
      "Live monitoring of Iran-related escalation signals, proxy activity, maritime risk, and regional flashpoints.",
  });

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(feedJsonLd) }}
      />

      {/* Header / intro */}
      <section className="border-b border-zinc-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-start justify-between gap-6">
            <div className="max-w-3xl">
              <div className="text-xs uppercase tracking-wider text-zinc-500">Live Monitor</div>

              <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
                War &amp; Escalation Radar
              </h1>

              <p className="mt-3 text-base sm:text-lg text-zinc-700 leading-relaxed">
                Real-time monitoring of Iran-related escalation signals across the Middle East —
                including regional conflict, proxy activity, maritime risk, and strategic messaging that
                can shift the trajectory of war. This page aggregates breaking headlines and provides a
                single place to track escalation momentum as it develops.
              </p>

              <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                <h2 className="text-lg font-bold text-zinc-900">What this radar tracks</h2>
                <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                  <li>
                    <span className="font-semibold text-zinc-900">Iran &amp; Tehran:</span>{" "}
                    leadership statements, military posture, retaliation cycles, and doctrine.
                  </li>
                  <li>
                    <span className="font-semibold text-zinc-900">Proxy networks:</span>{" "}
                    Hezbollah, Houthis, militias, and cross-border escalation indicators.
                  </li>
                  <li>
                    <span className="font-semibold text-zinc-900">Maritime chokepoints:</span>{" "}
                    Strait of Hormuz risk, shipping disruptions, drones, and missile threats.
                  </li>
                  <li>
                    <span className="font-semibold text-zinc-900">Regional spillover:</span>{" "}
                    Israel, Lebanon, Syria, Iraq, Yemen and wider Middle East dynamics.
                  </li>
                  <li>
                    <span className="font-semibold text-zinc-900">Markets &amp; policy:</span>{" "}
                    energy impacts, sanctions, diplomatic moves, and US/UK/EU positioning.
                  </li>
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/news"
                  className="inline-flex items-center rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 hover:border-zinc-400 transition"
                >
                  Full news feed →
                </a>
                <a
                  href="/reports"
                  className="inline-flex items-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black transition"
                >
                  Read reports →
                </a>
                <a
                  href="/"
                  className="inline-flex items-center rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 transition"
                >
                  ← Home
                </a>

                {/* Share the War Escalation page via your wrapper */}
                <a
                  href={shareThisPage}
                  className="inline-flex items-center rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 transition"
                >
                  Share this page →
                </a>
              </div>

              <p className="mt-6 text-xs text-zinc-500 leading-relaxed">
                Note: Links below point to external sources. Liberty Soldiers monitors narrative shifts and
                escalation patterns for situational awareness — not financial advice or operational guidance.
              </p>

              <div className="mt-3 text-xs text-zinc-500">
                Updated frequently. Items link to original sources.
              </div>
            </div>

            <div className="hidden sm:block text-right text-xs text-zinc-500 whitespace-nowrap">
              {items.length ? <>Showing {items.length} signals</> : <>No signals found</>}
            </div>
          </div>
        </div>
      </section>

      {/* Feed */}
      <section className="bg-zinc-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {items.length === 0 ? (
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-600">
              No matching items yet. Check back shortly.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((it) => {
                const og = it.image || sourceFallbackOg(it.url) || OG_IMAGE;
                const src = it.source || hostFromUrl(it.url);
                const time = displayTime(it.publishedAt);

                // Build share wrapper link for THIS item
                const shareHref = shareWrapperHref({
                  url: it.url,
                  title: it.title,
                  source: src,
                  publishedAt: it.publishedAt,
                  // share wrapper can show thumb; if og is relative, make it absolute
                  image: og.startsWith("http") ? og : `${SITE}${og}`,
                  summary: it.summary ?? "",
                });

                return (
                  <div
                    key={it.url}
                    className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition"
                  >
                    {/* Main clickable area to source */}
                    <a href={it.url} target="_blank" rel="noopener noreferrer" className="block">
                      <div className="relative">
                        <div className="h-40 w-full bg-zinc-100">
                          <img
                            src={og}
                            alt={it.title}
                            className="h-full w-full object-cover"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-black/0 to-black/0" />
                      </div>

                      <div className="p-4">
                        <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                          <span className="truncate">{src}</span>
                          {time ? <span className="text-zinc-300">•</span> : null}
                          {time ? <span className="truncate">{time}</span> : null}
                        </div>

                        <div className="mt-2 text-sm font-semibold text-zinc-900 group-hover:underline underline-offset-4 line-clamp-3">
                          {it.title}
                        </div>

                        {it.summary ? (
                          <div className="mt-2 text-sm text-zinc-600 line-clamp-3">
                            {it.summary}
                          </div>
                        ) : null}
                      </div>
                    </a>

                    {/* Footer actions */}
                    <div className="px-4 pb-4 pt-0 flex items-center justify-between">
                      <a
                        href={it.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-zinc-900 hover:underline"
                      >
                        Open source →
                      </a>

                      {/* Share via your existing /news/share wrapper */}
                      <a
                        href={shareHref}
                        className="text-sm font-semibold text-zinc-900 hover:underline"
                      >
                        Share →
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
