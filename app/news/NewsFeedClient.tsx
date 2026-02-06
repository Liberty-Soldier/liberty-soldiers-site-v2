"use client";

import Link from "next/link";
import ShareButton from "./ShareButton";
import { useEffect, useMemo, useState } from "react";

  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState<"newest" | "signal">("newest");
  const [view, setView] = useState<"cards" | "compact">("cards");

  // ✅ Force Cards on mobile (Compact breaks on small screens)
  useEffect(() => {
    if (window.innerWidth < 640) setView("cards");
  }, []);

type Item = {
  title: string;
  url: string;
  source: string;
  publishedAt?: number;
  image?: string;
  summary?: string;
  category?: string;
};

type Report = {
  slug: string;
  title: string;
  excerpt: string;
  byline: string;
  dateISO: string; // YYYY-MM-DD
};

function humanAgo(input?: number | string | Date): string {
  if (!input) return "Just now";
  const ts = typeof input === "number" ? input : new Date(input).getTime();
  if (!Number.isFinite(ts)) return "Just now";
  const diff = Date.now() - ts;
  const sec = Math.max(1, Math.floor(diff / 1000));
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const d = Math.floor(hr / 24);
  return `${d}d ago`;
}

function faviconFromUrl(articleUrl: string): string {
  try {
    const u = new URL(articleUrl);
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
      u.hostname
    )}&sz=128`;
  } catch {
    return "/briefing-fallback.jpg";
  }
}

function bulletsFromSummary(summary?: string): string[] {
  if (!summary) return [];
  const clean = summary.replace(/\s+/g, " ").trim();
  if (!clean) return [];
  const parts = clean
    .split(/(?:\.|\!|\?)\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length >= 2) {
    return parts.slice(0, 2).map((s) => (/[.!?]$/.test(s) ? s : s + "."));
  }
  const chunk1 = clean.slice(0, 90).trim();
  const chunk2 = clean.slice(90, 180).trim();
  return [chunk1, chunk2]
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => (/[.!?]$/.test(s) ? s : s + "."));
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map((v) => Number(v));
  const dt = new Date(y, (m ?? 1) - 1, d ?? 1);
  return dt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const DEFAULT_CATS = [
  "All",
  "Control Systems",
  "Geopolitics & War",
  "Finance",
  "Biosecurity",
  "Persecution Watch",
  "Censorship & Speech",
  "Crypto",
  "World Briefing",
];

function buildCategories(items: Item[]) {
  const set = new Set<string>();
  for (const it of items) if (it.category) set.add(it.category);
  const preferred = DEFAULT_CATS.filter((c) => c === "All" || set.has(c));
  const rest = Array.from(set)
    .filter((c) => !preferred.includes(c) && c !== "Pinned")
    .sort();
  return [...preferred, ...rest];
}

function signalWeight(c?: string) {
  const k = (c || "").toLowerCase();
  if (k.includes("control")) return 1;
  if (k.includes("war") || k.includes("geopolitics")) return 2;
  if (k.includes("finance")) return 3;
  if (k.includes("bio")) return 4;
  if (k.includes("persecution")) return 5;
  if (k.includes("censor")) return 6;
  if (k.includes("crypto")) return 7;
  if (k.includes("world")) return 8;
  return 50;
}

export default function NewsFeedClient({
  items,
  latestReports,
}: {
  items: Item[];
  latestReports: Report[];
}) {
  const categories = useMemo(() => buildCategories(items), [items]);

  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState<"newest" | "signal">("newest");
  const [view, setView] = useState<"cards" | "compact">("cards");

  const list = useMemo(() => {
    let out = items.filter((x) => x.category !== "Pinned");
    if (cat !== "All") out = out.filter((x) => (x.category || "General") === cat);

    if (sort === "newest") {
      out = out
        .slice()
        .sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0));
    } else {
      out = out.slice().sort((a, b) => {
        const wa = signalWeight(a.category);
        const wb = signalWeight(b.category);
        if (wa !== wb) return wa - wb;
        return (b.publishedAt || 0) - (a.publishedAt || 0);
      });
    }

    return out;
  }, [items, cat, sort]);

  return (
    <div>
      {/* Sticky controls */}
      <div className="sticky top-0 z-20 -mx-4 sm:mx-0 px-4 sm:px-0 py-3 bg-white/90 backdrop-blur border-b border-zinc-200">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs text-zinc-600">
              Showing{" "}
              <span className="font-semibold text-zinc-900">{list.length}</span>{" "}
              headlines
            </div>

            <div className="flex items-center gap-2">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-800"
              >
                <option value="newest">Newest</option>
                <option value="signal">Signal-first</option>
              </select>

              <button
              onClick={() => setView(view === "cards" ? "compact" : "cards")}
              className="hidden sm:inline-flex rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-800 hover:bg-zinc-50"
            >
              {view === "cards" ? "Compact" : "Cards"}
            </button>
            </div>
          </div>

          {/* Category chips (scrollable on mobile) */}
          <div className="-mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto pb-1">
            <div className="flex gap-2 w-max pr-4">
              {categories.map((c) => {
                const active = c === cat;
                return (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={
                      (active
                        ? "shrink-0 rounded-full border border-zinc-900 bg-zinc-900 px-3 py-1 text-xs font-semibold text-white"
                        : "shrink-0 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-800 hover:bg-zinc-50")
                    }
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Render */}
      <div className="mt-6">
        {view === "cards" ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {list.map((h, idx) => {
              const shareHrefAbs = `https://libertysoldiers.com/news/share?u=${encodeURIComponent(
                h.url
              )}`;

              const thumb = h.image || faviconFromUrl(h.url);
              const bullets = bulletsFromSummary(h.summary);

              const INSERT_AFTER = 30;
              const shouldInsertReports = idx === INSERT_AFTER;

              return (
                <div key={`${h.url}-${idx}`} className="contents">
                  {shouldInsertReports && (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3">
                      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
                        <div className="flex items-end justify-between gap-6">
                          <div>
                            <h2 className="text-xl sm:text-2xl font-bold">
                              Liberty Soldiers Reports
                            </h2>
                            <p className="mt-1 text-zinc-600">
                              Original investigative reports and analysis.
                            </p>
                          </div>

                          <Link
                            href="/reports"
                            className="text-sm text-zinc-700 hover:text-zinc-900 whitespace-nowrap"
                          >
                            View all reports →
                          </Link>
                        </div>

                        {latestReports.length === 0 ? (
                          <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-zinc-700">
                            No reports published yet.
                          </div>
                        ) : (
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {latestReports.slice(0, 6).map((r) => (
                              <Link
                                key={r.slug}
                                href={`/news/${r.slug}`}
                                className="block rounded-xl border border-zinc-200 bg-zinc-50 p-4 transition hover:border-zinc-300"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <span className="text-[11px] uppercase tracking-wide text-zinc-500">
                                    Report
                                  </span>
                                  <span className="text-xs text-zinc-500 whitespace-nowrap">
                                    {formatDate(r.dateISO)}
                                  </span>
                                </div>

                                <h3 className="mt-1 font-semibold leading-snug hover:underline">
                                  {r.title}
                                </h3>

                                <p className="mt-2 text-sm text-zinc-700">
                                  {r.excerpt}
                                </p>

                                <div className="mt-3 text-xs text-zinc-600">
                                  By{" "}
                                  <span className="font-medium text-zinc-800">
                                    {r.byline}
                                  </span>
                                </div>

                                <span className="mt-3 inline-block text-xs text-zinc-600">
                                  Read →
                                </span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-zinc-300 transition">
                    <div className="relative mb-3 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100">
                      <img
                        src={thumb}
                        alt=""
                        className="h-32 w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    </div>

                    <div className="flex items-start justify-between gap-3">
                      <span className="text-[11px] uppercase tracking-wide text-zinc-500">
                        {h.source}
                      </span>
                      <span className="text-xs text-zinc-500 whitespace-nowrap">
                        {humanAgo(h.publishedAt)}
                      </span>
                    </div>

                    {h.category && (
                      <div className="mt-2">
                        <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700">
                          {h.category}
                        </span>
                      </div>
                    )}

                    <a
                      href={h.url}
                      className="block mt-1"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <h3 className="font-semibold leading-snug hover:underline">
                        {h.title}
                      </h3>
                    </a>

                    {bullets.length > 0 && (
                      <ul className="mt-3 space-y-1 text-sm text-zinc-700">
                        {bullets.map((b, ii) => (
                          <li key={ii} className="flex gap-2">
                            <span className="text-zinc-400">•</span>
                            <span className="leading-snug">{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-3 flex items-center justify-end">
                      <ShareButton wrapperUrl={shareHrefAbs} title={h.title} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-zinc-200 bg-white divide-y divide-zinc-100">
            {list.map((h, idx) => {
              const shareHrefAbs = `https://libertysoldiers.com/news/share?u=${encodeURIComponent(
                h.url
              )}`;

              return (
                <div
                  key={`${h.url}-${idx}`}
                  className="p-3 sm:p-4 hover:bg-zinc-50 transition"
                >
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <div className="min-w-0">
                      <div className="text-[11px] uppercase tracking-wide text-zinc-500">
                        {h.source}
                        {h.category ? (
                          <>
                            <span className="text-zinc-300"> • </span>
                            <span className="text-zinc-600">{h.category}</span>
                          </>
                        ) : null}
                      </div>

                      <a
                        href={h.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block mt-1"
                      >
                        <div className="font-semibold text-zinc-900 hover:underline line-clamp-2">
                          {h.title}
                        </div>
                      </a>

                      <div className="mt-1 text-[11px] text-zinc-500">
                        {humanAgo(h.publishedAt)}
                      </div>
                    </div>

                    <div className="shrink-0">
                      <ShareButton wrapperUrl={shareHrefAbs} title={h.title} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
