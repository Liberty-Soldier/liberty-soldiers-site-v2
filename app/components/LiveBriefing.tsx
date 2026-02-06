"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  items: string[];
  intervalMs?: number;
  label?: string;
};

export default function LiveBriefing({
  items,
  intervalMs = 5500,
  label = "LIVE BRIEFING",
}: Props) {
  const list = useMemo(() => (items || []).filter(Boolean), [items]);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (list.length <= 1) return;
    const t = setInterval(() => setI((x) => (x + 1) % list.length), intervalMs);
    return () => clearInterval(t);
  }, [list.length, intervalMs]);

  if (!list.length) return null;

  return (
    <div className="w-full border-y border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-zinc-900">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-900/60 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-zinc-900" />
            </span>
            {label}
          </span>

          <div className="min-w-0 flex-1 overflow-hidden">
            <p
              key={i}
              className="truncate text-sm text-zinc-700 motion-safe:animate-[fadeIn_250ms_ease-out]"
              aria-live="polite"
            >
              {list[i]}
            </p>
          </div>

          <span className="hidden sm:inline text-xs text-zinc-500">
            Auto-updated
          </span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(2px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
