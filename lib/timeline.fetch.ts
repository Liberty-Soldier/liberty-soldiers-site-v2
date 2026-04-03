import { fetchAllHeadlines } from "./rss";
import { buildAutoTimelineFromHeadlines } from "./timeline.build";
import type { TimelineEvent } from "./timeline.types";

export async function fetchIranTimelineAuto(): Promise<TimelineEvent[]> {
  const all = await fetchAllHeadlines();

  // Only include items that likely relate to Iran escalation
  return buildAutoTimelineFromHeadlines(all, {
    requireKeyword: [
      "iran",
      "tehran",
      "hormuz",
      "strait of hormuz",
      "irgc",
      "isfahan",
      "tabriz",
      "shiraz",
      "bandar abbas",
      "missile",
      "uav",
      "drone",
      "strike",
      "airstrike",
      "base",
    ],
    max: 200,
  });
}
