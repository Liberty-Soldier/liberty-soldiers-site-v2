"use client";

import { useEffect, useState } from "react";

type Item = {
  text: string;
  url: string;
  source?: string;
};

export default function LiveBriefingAuto() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetch("/api/news") // uses your existing feed
      .then((res) => res.json())
      .then((data) => {
        const mapped = (data || []).slice(0, 10).map((h: any) => ({
          text: h.title,
          url: h.url,
          source: h.category || "Signal",
        }));
        setItems(mapped);
      })
      .catch(() => {});
  }, []);

  const row = [...items, ...items];

  return (
    <div className="border-b border-white/10 bg-black text-white overflow-hidden">
      <div className="flex items-center">

        <div className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-red-400">
          LIVE
        </div>

        <div className="overflow-hidden flex-1">
          <div className="flex gap-8 whitespace-nowrap animate-[scroll_22s_linear_infinite] hover:[animation-play-state:paused]">

            {row.map((item, i) => (
              <a
                key={i}
                href={item.url}
                className="text-sm text-white/80 hover:text-white"
              >
                ● {item.text}
              </a>
            ))}

          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
