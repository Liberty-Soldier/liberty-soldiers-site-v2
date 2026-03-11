"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import FallbackImg from "@/app/components/FallbackImg";

type Item = {
  title: string;
  url: string;
  source: string;
  publishedAt?: number;
  image?: string;
  summary?: string;
  category?: string;
  hardCategory?: string;
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

function fallbackForCategory(cat?: string) {
  const c = (cat || "").toLowerCase().trim();

  if (c === "power & control") return "/og-power-control.jpg";
  if (c === "markets & finance") return "/og-markets-finance.jpg";
  if (c === "digital id / technocracy") return "/og-digital-id.jpg";
  if (c === "war & geopolitics") return "/og-war-geopolitics.jpg";
  if (c === "religion & ideology") return "/og-religion-ideology.jpg";
  if (c === "prophecy watch") return "/og-prophecy-watch.jpg";

  if (c.includes("finance") || c.includes("crypto") || c.includes("markets")) {
    return "/og-markets-finance.jpg";
  }

  if (
    c.includes("digital") ||
    c.includes("technocracy") ||
    c.includes("control systems") ||
    c.includes("surveillance") ||
    c.includes("censorship") ||
    c.includes("speech") ||
    c.includes("ai") ||
    c.includes("tech")
  ) {
    return "/og-digital-id.jpg";
  }

  if (
    c.includes("war") ||
    c.includes("geopolitics") ||
    c.includes("world") ||
    c.includes("middle east") ||
    c.includes("israel") ||
    c.includes("iran") ||
    c.includes("ukraine") ||
    c.includes("russia") ||
    c.includes("china")
  ) {
    return "/og-war-geopolitics.jpg";
  }

  if (
    c.includes("religion") ||
    c.includes("ideology") ||
    c.includes("persecution") ||
    c.includes("church") ||
    c.includes("christian")
  ) {
    return "/og-religion-ideology.jpg";
  }

  if (c.includes("prophecy") || c.includes("end time") || c.includes("endtime")) {
    return "/og-prophecy-watch.jpg";
  }

  return "/og-power-control.jpg";
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

const HARD_ORDER = [
  "All",
  "Markets & Finance",
  "Power & Control",
  "Digital ID / Technocracy",
  "War & Geopolitics",
  "Religion & Ideology",
  "Prophecy Watch",
] as const;

function buildCategories(_: Item[]) {
  return HARD_ORDER;
}

function signalWeightHard(c?: string) {
  switch ((c || "").toLowerCase()) {
    case "markets & finance":
      return 0;
    case "digital id / technocracy":
      return 1;
    case "war & geopolitics":
      return 2;
    case "power & control":
      return 3;
    case "religion & ideology":
      return 4;
    case "prophecy watch":
      return 5;
    default:
      return 50;
  }
}

function hostFromUrl(u: string) {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function cleanSummary(summary?: string): string {
  if (!summary) return "";
  return summary
    .replace(/<[^>]*>/g, " ")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\u00A0/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function buildNewsShareAbs(args: {
  url: string;
  title: string;
  source?: string;
  publishedAt?: number;
  image?: string;
  summary?: string;
}) {
  const sp = new URLSearchParams();

  sp.set("u", args.url);
  sp.set("t", args.title);

  const src = args.source || hostFromUrl(args.url);
  if (src) sp.set("s", src);

  if (
    typeof args.publishedAt === "number" &&
    Number.isFinite(args.publishedAt)
  ) {
    sp.set("p", String(args.publishedAt));
  }

  if (args.image) sp.set("i", args.image);

  const cleaned = cleanSummary(args.summary);
  if (cleaned) sp.set("x", cleaned);

  return `https://libertysoldiers.com/news/share?${sp.toString()}`;
}

export default function NewsFeedClient({
  items,
}: {
  items: Item[];
}) {
  const categories = useMemo(() => buildCategories(items), [items]);

  const [cat, setCat] = useState<(typeof HARD_ORDER)[number]>("All");
  const [sort, setSort] = useState<"newest" | "signal">("newest");
  const [view, setView] = useState<"cards" | "compact">("cards");

  useEffect(() => {
    const apply = () => {
      if (window.innerWidth < 640) setView("cards");
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  const list = useMemo(() => {
    let out = items.filter((x) => x.category !== "Pinned");

    if (cat !== "All") {
      out = out.filter((x) => (x.hardCategory || "Power & Control") === cat);
    }

    if (sort === "newest") {
      out = out
        .slice()
        .sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0));
    } else {
      out = out.slice().sort((a, b) => {
        const wa = signalWeightHard(a.hardCategory);
        const wb = signalWeightHard(b.hardCategory);
        if (wa !== wb) return wa - wb;
        return (b.publishedAt || 0) - (a.publishedAt || 0);
      });
    }

    return out;
  }, [items, cat, sort]);

  return (
    <div>
      <div className="sticky top-0 z-20 -mx-4 border-b border-zinc-200 bg-white/90 px-4 py-3 backdrop-blur sm:mx-0 sm:px-0">
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
                onChange={(e) => setSort(e.target.value as "newest" | "signal")}
                className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-800"
              >
                <option value="newest">Newest</option>
                <option value="signal">Signal (priority)</option>
              </select>

              {sort === "signal" && (
                <span className="ml-2 inline-flex items-center rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[11px] font-semibold text-red-700">
                  Signal mode
                </span>
              )}

              <button
                onClick={() => setView(view === "cards" ? "compact" : "cards")}
                className="hidden rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-800 hover:bg-zinc-50 sm:inline-flex"
              >
                {view === "cards" ? "Compact" : "Cards"}
              </button>
            </div>
          </div>

          <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
            <div className="flex w-max gap-2 pr-4">
              {categories.map((c) => {
                const active = c === cat;
                return (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={
                      active
                        ? "shrink-0 rounded-full border border-zinc-900 bg-zinc-900 px-3 py-1 text-xs font-semibold text-white"
                        : "shrink-0 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-800 hover:bg-zinc-50"
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

      <div className="mt-6 pb-6">
        {view === "cards" ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {list.map((h, idx) => {
              const fallback = fallbackForCategory(h.hardCategory || h.category);
              const raw = (h.image || "").trim();

              const isGenericDefault =
                raw === "/og-default.jpg" ||
                raw === "/og-default.jpeg" ||
                raw === "/default-og.jpg" ||
                raw === "/default-og.jpeg" ||
                raw.includes("og-default") ||
                raw.includes("default-og");

              const thumb = raw && !isGenericDefault ? raw : fallback;

              const shareHrefAbs = buildNewsShareAbs({
                url: h.url,
                title: h.title,
                source: h.source,
                publishedAt: h.publishedAt,
                image: thumb.startsWith("http")
                  ? thumb
                  : `https://libertysoldiers.com${thumb}`,
                summary: h.summary,
              });

              const isFallbackThumb =
                thumb.startsWith("/og-") ||
                thumb === "/og-default.jpg" ||
                thumb === "/default-og.jpg";

              const bullets = bulletsFromSummary(h.summary);

              return (
                <div key={`${h.url}-${idx}`} className="contents">
                  <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-zinc-300 hover:shadow-md">
                    <div className="relative mb-3 aspect-[16/9] overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100">
                      <FallbackImg
                        src={thumb}
                        alt=""
                        loading="lazy"
                        fallback={fallback}
                        className={`absolute inset-0 h-full w-full object-cover object-[50%_12%] ${
                          isFallbackThumb ? "opacity-45 saturate-50 contrast-90" : ""
                        }`}
                      />

                      {isFallbackThumb && (
                        <div className="absolute inset-0 bg-white/25" />
                      )}

                      {!isFallbackThumb && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-3">
                      <span className="text-[11px] uppercase tracking-wide text-zinc-500">
                        {h.source}
                      </span>
                      <span className="whitespace-nowrap text-xs text-zinc-500">
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

                    <a href={h.url} className="mt-1 block" target="_blank" rel="noreferrer">
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

                    <div className="mt-4 pb-1 flex items-center justify-end">
                      <a
                        href={shareHrefAbs}
                        className="text-sm font-semibold text-zinc-900 hover:underline"
                      >
                        Share →
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="divide-y divide-zinc-100 rounded-2xl border border-zinc-200 bg-white">
            {list.map((h, idx) => {
              const fallback = fallbackForCategory(h.hardCategory || h.category);
              const raw = (h.image || "").trim();

              const isGenericDefault =
                raw === "/og-default.jpg" ||
                raw === "/og-default.jpeg" ||
                raw === "/default-og.jpg" ||
                raw === "/default-og.jpeg" ||
                raw.includes("og-default") ||
                raw.includes("default-og");

              const thumb = raw && !isGenericDefault ? raw : fallback;

              const shareHrefAbs = buildNewsShareAbs({
                url: h.url,
                title: h.title,
                source: h.source,
                publishedAt: h.publishedAt,
                image: thumb.startsWith("http")
                  ? thumb
                  : `https://libertysoldiers.com${thumb}`,
                summary: h.summary,
              });

              return (
                <div
                  key={`${h.url}-${idx}`}
                  className="p-3 transition hover:bg-zinc-50 sm:p-4"
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
                        className="mt-1 block"
                      >
                        <div className="break-words font-semibold text-zinc-900 hover:underline">
                          {h.title}
                        </div>
                      </a>

                      <div className="mt-1 text-[11px] text-zinc-500">
                        {humanAgo(h.publishedAt)}
                      </div>
                    </div>

                    <div className="shrink-0">
                      <a
                        href={shareHrefAbs}
                        className="text-sm font-semibold text-zinc-900 hover:underline"
                      >
                        Share →
                      </a>
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
