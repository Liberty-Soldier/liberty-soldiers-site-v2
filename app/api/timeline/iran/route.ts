import { NextResponse } from "next/server";
import { IRAN_MANUAL_TIMELINE } from "@/lib/timeline.manual.iran";
import { fetchIranTimelineAuto } from "@/lib/timeline.fetch";
import type { TimelineEvent } from "@/lib/timeline.types";

export const revalidate = 120;

export async function GET() {
  // Key events (manual) — long history
  const manual = [...IRAN_MANUAL_TIMELINE].sort((a, b) => b.ts - a.ts);

  // Live updates (auto) — recent window + cap
  const autoAll = await fetchIranTimelineAuto();

  const days = 7; // ✅ change to 3, 7, 14 if you want
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;

  const auto = autoAll
    .filter((e) => e.ts >= cutoff)
    .slice(0, 40); // ✅ cap the noise

  // merge for backwards compatibility with your page
  const events: TimelineEvent[] = [...manual, ...auto].sort((a, b) => b.ts - a.ts);

  return NextResponse.json({
    updatedAt: Date.now(),
    count: events.length,
    events,
  });
}
