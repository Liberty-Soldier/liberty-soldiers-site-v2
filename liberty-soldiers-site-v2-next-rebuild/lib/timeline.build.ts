import type { TimelineEvent } from "./timeline.types";
import type { Headline } from "./rss";

// very simple text cleanup for timeline titles
function cleanTitle(t: string) {
  return t
    .replace(/\s+/g, " ")
    .replace(/\s+\|\s+.+$/, "") // strip " | Source" patterns
    .trim();
}

function makeId(h: Headline) {
  // stable-ish id based on url or title + time
  const base = (h.url || h.title).toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const time = h.publishedAt ? String(h.publishedAt) : "no-time";
  return `${base.slice(0, 60)}-${time}`.replace(/-+/g, "-");
}

function dedupe(events: TimelineEvent[]) {
  const seen = new Set<string>();
  const out: TimelineEvent[] = [];

  for (const e of events) {
    const key = (e.url || e.title).toLowerCase().trim();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(e);
  }

  return out;
}

export function buildAutoTimelineFromHeadlines(
  headlines: Headline[],
  opts?: { requireKeyword?: string[]; max?: number }
): TimelineEvent[] {
  const requireKeyword = opts?.requireKeyword?.map(k => k.toLowerCase()) ?? [];
  const max = opts?.max ?? 150;

  const filtered = headlines.filter(h => {
    const t = (h.title || "").toLowerCase();
    const s = (h.summary || "").toLowerCase();

    // If keywords provided, require at least one match
    if (requireKeyword.length) {
      return requireKeyword.some(k => t.includes(k) || s.includes(k));
    }
    return true;
  });

  const events: TimelineEvent[] = filtered.map(h => ({
    id: makeId(h),
    ts: h.publishedAt && Number.isFinite(h.publishedAt) ? h.publishedAt : Date.now(),
    title: cleanTitle(h.title),
    summary: h.summary ? h.summary.slice(0, 180) : undefined,
    source: h.source,
    url: h.url,
    tags: h.hardCategory ? [h.hardCategory] : undefined,
    kind: "auto",
  }));

  // newest first
  const sorted = events.sort((a, b) => b.ts - a.ts);

  // dedupe + trim
  return dedupe(sorted).slice(0, max);
}
