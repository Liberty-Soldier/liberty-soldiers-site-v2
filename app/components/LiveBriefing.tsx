"use client";

import { useEffect, useMemo, useState } from "react";

export type LiveBriefingItem = {
  text: string;
  url: string;
  source?: string;
};

type Props = {
  items: LiveBriefingItem[];
  intervalMs?: number;
  label?: string;
};

export default function LiveBriefing({
  items,
  intervalMs = 8500, // slower
  label = "LIVE FEED",
}: Props) {
  const list = useMemo(
    () => (items || []).filter((x) => x?.text && x?.url),
    [items]
  );
  const [i, setI] = useState(0);

  useEffect(() => {
    setI(0);
  }, [list.length]);

  useEffect(() => {
    if (list.length <= 1) return;
    const t = setInterval(() => setI((x) => (x + 1) % list.length), intervalMs);
    return () => clearInterval(t);
  }, [list.length, intervalMs]);

  if (!list.length) return null;

  const item = list[i];

  return (
    <div className="w-full border-y border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
        <div className="flex items-start gap-3">
          {/* Label */}
          <span className="shrink-0 inline-flex items-center gap-2 text-sm sm:text-base font-extrabold tracking-wider uppercase text-red-700">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-600/60 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-600" />
            </span>
            {label}
          </span>

          {/* Text (clickable, wraps on mobile) */}
          <div className="min-w-0 flex-1">
           <a
            key={item.url}
            href={item.url}
            className="block text-base sm:text-lg lg:text-xl font-bold text-red-700 hover:text-red-800 hover:underline motion-safe:animate-[fadeIn_250ms_ease-out]"
            aria-live="polite"
            title={item.text}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {item.text}
          </a>

            {item.source ? (
              <div className="mt-1 text-[11px] sm:text-xs text-zinc-500">
                {item.source}
              </div>
            ) : null}
          </div>

          <span className="hidden sm:inline shrink-0 text-xs text-zinc-500 whitespace-nowrap">
            Live updates 
          </span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(2px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
