"use client";

import React, { useMemo, useState } from "react";

type Item = {
  title: string;
  url: string;
  source: string;
  publishedAt?: number;
  image?: string;
  summary?: string;
  category?: string;
  hardCategory?: string; // ✅ NEW
};

type Props = {
  items: Item[];
  render: (items: Item[], view: "cards" | "compact") => React.ReactNode;
};

const HARD_CATEGORIES = [
  "All",
  "Power & Control",
  "Markets & Finance",
  "Digital ID / Technocracy",
  "War & Geopolitics",
  "Religion & Ideology",
  "Prophecy Watch",
] as const;

function uniqHardCats(items: Item[]) {
  const set = new Set<string>();
  for (const it of items) {
    if (it.hardCategory) set.add(it.hardCategory);
  }
  // Only show categories that exist in current data (+ All)
  return HARD_CATEGORIES.filter((c) => c === "All" || set.has(c));
}

function weightHard(c?: string) {
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

export default function NewsControlsClient({ items, render }: Props) {
  const categories = useMemo(() => uniqHardCats(items), [items]);

  const [cat, setCat] = useState<(typeof HARD_CATEGORIES)[number]>("All");
  const [sort, setSort] = useState<"newest" | "signal">("newest");
  const [view, setView] = useState<"cards" | "compact">("cards");

  const filtered = useMemo(() => {
    let out = items.filter((x) => x.category !== "Pinned");

    // ✅ Filter by HARD category
    if (cat !== "All") {
      out = out.filter((x) => (x.hardCategory || "Power & Control") === cat);
    }

    // sort
    if (sort === "newest") {
      out = out.slice().sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0));
    } else {
      out = out.slice().sort((a, b) => {
        const wa = weightHard(a.hardCategory);
        const wb = weightHard(b.hardCategory);
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
              <span className="font-semibold text-zinc-900">{filtered.length}</span>{" "}
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
                className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-800 hover:bg-zinc-50"
              >
                {view === "cards" ? "Compact" : "Cards"}
              </button>
            </div>
          </div>

          {/* HARD category chips */}
          <div className="-mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto">
            <div className="flex gap-2 w-max">
              {categories.map((c) => {
                const active = c === cat;
                return (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={
                      active
                        ? "rounded-full border border-zinc-900 bg-zinc-900 px-3 py-1 text-xs font-semibold text-white"
                        : "rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-800 hover:bg-zinc-50"
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

      {/* Render list */}
      <div className="mt-6">{render(filtered, view)}</div>
    </div>
  );
}
