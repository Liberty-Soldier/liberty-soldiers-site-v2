import { NextResponse } from "next/server";
import { IRAN_MANUAL_TIMELINE } from "@/lib/timeline.manual.iran";
import { fetchIranTimelineAuto } from "@/lib/timeline.fetch";
import type { TimelineEvent } from "@/lib/timeline.types";

export const revalidate = 120; // refresh often

export async function GET() {
  const auto = await fetchIranTimelineAuto();

  // Put manual events at top (but still sort everything by time)
  const merged: TimelineEvent[] = [...IRAN_MANUAL_TIMELINE, ...auto];

  // dedupe by url/title (manual should win if duplicates exist)
  const seen = new Set<string>();
  const out: TimelineEvent[] = [];
  for (const e of merged.sort((a, b) => b.ts - a.ts)) {
    const key = (e.url || e.title).toLowerCase().trim();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(e);
  }

  return NextResponse.json({
    updatedAt: Date.now(),
    count: out.length,
    events: out,
  });
}
