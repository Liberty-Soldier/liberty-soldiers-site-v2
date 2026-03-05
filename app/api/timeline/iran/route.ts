import { NextResponse } from "next/server";
import { IRAN_MANUAL_TIMELINE } from "@/lib/timeline.manual.iran";
import { fetchIranTimelineAuto } from "@/lib/timeline.fetch";
import type { TimelineEvent } from "@/lib/timeline.types";

export const revalidate = 120;

function ensureManual(e: TimelineEvent): TimelineEvent {
  return { ...e, kind: "manual" };
}

export async function GET() {
  // 1) KEY EVENTS (manual) — long history
  const manual: TimelineEvent[] = IRAN_MANUAL_TIMELINE.map(ensureManual).sort(
    (a, b) => b.ts - a.ts
  );

  // 2) LIVE UPDATES (auto) — recent window + cap
  const autoAll = await fetchIranTimelineAuto();

  const days = 7; // change to 3 / 14 if you want
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;

  const auto: TimelineEvent[] = autoAll
    .filter((e) => e.ts >= cutoff)
    .map((e) => ({ ...e, kind: "auto" as const }))
    .slice(0, 40);

  // IMPORTANT: return BOTH sets separately + merged list for your current page
  const events: TimelineEvent[] = [...manual, ...auto].sort((a, b) => b.ts - a.ts);

  return NextResponse.json({
    updatedAt: Date.now(),
    keyCount: manual.length,
    liveCount: auto.length,
    events, // your page uses this
  });
}
