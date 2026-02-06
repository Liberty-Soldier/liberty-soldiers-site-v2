"use client";

import { useMemo, useState } from "react";

type Item = {
  title: string;
  url: string;
  source: string;
  publishedAt?: number;
  image?: string;
  summary?: string;
  category?: string;
};

type Props = {
  items: Item[];
  render: (items: Item[], view: "cards" | "compact") => React.ReactNode;
};

const DEFAULT_CATEGORIES = [
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

function uniqCats(items: Item[]) {
  const set = new Set<string>();
  for (const it of items) {
    if (it.category) set.add(it.category);
  }
  const dynamic = Array.from(set).sort((a, b) => a.localeCompare(b));
  // Put your preferred ones first, then whatever else exists
  const preferred = DEFAULT_CATEGORIES.filter((c) =>
    c === "All" ? true : set.has(c)
  );
  const rest = dynamic.filter(
    (c) => !preferred.includes(c) && c !== "Pinned"
  );
  return [...preferred, ...rest];
}

export default function NewsControlsClient({ items, render }: Props) {
  const categories = useMemo(() => uniqCats(items), [items]);

  const [cat, setCat] = useState<string>("All");
  const [sort, setSort] = useState<"newest" | "signal">("newest");
  const [view, setView] = useState<"cards" | "compact">("cards");

  const filtered = useMemo(() => {
    let out = items.filter((x) => x.category !== "Pinned");

    if (cat !== "All") {
      out = out.filter((x) => (x.category || "General") === cat);
    }

    // sort
    if (sort === "newest") {
      out = out.slice().sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0));
    } else {
      // "signal-first": prioritize categories you care about, then newest
      const weight = (c?: string) => {
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
      };

      out = out
        .slice()
        .sort((a, b) => {
          const wa = weight(a.category);
          const wb = weight(b.category);
          if (wa !== wb) return wa - wb;
          return (b.publishedAt || 0) - (a.publishedAt || 0);
        });
    }

    return out;
  }, [items, cat, sort]);

  return (
    <div>
      {/* Sticky controls (works on mobile too) */}
      <div className="sticky top-0 z-20 -mx-4 sm:mx-0 px-4 sm:px-0 py-3 bg-white/90 backdrop-blur border-b border-zinc-200">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs text-zinc-600">
              Showing <span className="font-semibold text-zinc-900">{filtered.length}</span>{" "}
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

          {/* Category chips: scrollable on mobile */}
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
