// lib/rss.ts
import { XMLParser } from "fast-xml-parser";
import { NEWS_FEEDS, PINNED_LINKS, BLACKLIST } from "./news.config";

export type Headline = {
  title: string;
  url: string;
  source: string;
  publishedAt: number; // epoch ms (0 if unknown)
};

// ---------- helpers ----------

// Extract hostname without www.
function host(u: string): string {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

// Pick a best-effort publication date from common RSS/Atom fields
function pickDate(item: any): number {
  const d =
    item?.pubDate ||
    item?.published ||
    item?.updated ||
    item?.["dc:date"] ||
    item?.date;
  const v = Array.isArray(d) ? d[0] : d;
  const ms = Date.parse(String(v ?? ""));
  return Number.isFinite(ms) ? ms : 0;
}

// Fix URLs missing protocol or using protocol-relative
function normalizeUrl(raw: any): string {
  const s0 = String(raw ?? "").trim();
  if (!s0) return "";
  if (s0.startsWith("//")) return "https:" + s0;                // //example.com/x -> https://example.com/x
  if (/^https?:\/\//i.test(s0)) return s0;                      // already absolute
  if (/^[\w.-]+\.[a-z]{2,}([/:?#].*)?$/i.test(s0)) return "https://" + s0; // look like domain/path
  return "";
}

// Parse variants into a consistent list of headlines
function normalize(feed: any): Headline[] {
  const ch = feed?.rss?.channel;
  const items = ch?.item || feed?.feed?.entry || feed?.item || [];
  const arr = Array.isArray(items) ? items : [items];

  return arr
    .map((it: any) => {
      // Try common link shapes across RSS/Atom ecosystems
      const link =
        it?.link?.["@_href"] ||
        it?.link?.[0]?.["@_href"] ||
        it?.link?.["@href"] || // some Atom variants
        it?.link?.[0]?.["@href"] ||
        it?.link?.[0] ||
        it?.link ||
        it?.guid ||
        it?.url ||
        it?.["dc:identifier"];

      const url = normalizeUrl(Array.isArray(link) ? link[0] : link);
      const title = String(it?.title ?? "").trim();
      const source =
        host(url || "") || String(feed?.feed?.title || ch?.title || "").trim();

      return { title, url, source, publishedAt: pickDate(it) };
    })
    .filter(
      (h) =>
        h.title &&
        h.url &&
        !BLACKLIST.some((b) => host(h.url).includes(b))
    );
}

// ---------- main ----------

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  // Many feeds vary wildly; keep parsing lenient
  isArray: (name) => name === "item" || name === "entry",
});

export async function fetchAllHeadlines(): Promise<Headline[]> {
  const results = await Promise.allSettled(
    NEWS_FEEDS.map(async (feedUrl) => {
      const res = await fetch(feedUrl, {
        headers: { "user-agent": "Mozilla/5.0" },
        // Let Next/Vercel cache each feed for 10 minutes
        next: { revalidate: 600 },
      });
      const xml = await res.text();
      const json = parser.parse(xml);
      return normalize(json);
    })
  );

  // Merge successful results
  const merged: Headline[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") merged.push(...r.value);
  }

  // Add pinned items to the top (use "now" if no explicit date)
  const pinned: Headline[] = PINNED_LINKS.map((p) => ({
    title: p.title,
    url: normalizeUrl(p.url),
    source: p.source || host(p.url),
    publishedAt: Date.now(),
  }));

  // De-duplicate by (title + host) to avoid repeats across feeds
  const seen = new Set<string>();
  const deduped = [...pinned, ...merged].filter((h) => {
    const key = `${h.title}__${host(h.url)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Sort newest first and keep top N
  return deduped
    .sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0))
    .slice(0, 90);
}
