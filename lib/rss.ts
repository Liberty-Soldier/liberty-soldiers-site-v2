import { XMLParser } from "fast-xml-parser";
import { NEWS_FEEDS, PINNED_LINKS, BLACKLIST } from "./news.config";
// add near the top, below the imports
function normalizeUrl(raw: any): string {
  const s0 = String(raw ?? "").trim();
  if (!s0) return "";
  // protocol-relative → add https:
  if (s0.startsWith("//")) return "https:" + s0;
  // already absolute http(s)
  if (/^https?:\/\//i.test(s0)) return s0;
  // looks like a domain/path → prepend https://
  if (/^[\w.-]+\.[a-z]{2,}([/:?#].*)?$/i.test(s0)) return "https://" + s0;
  return ""; // anything else: treat as invalid for safety
}

export type Headline = {
  title: string;
  url: string;
  source: string;
  publishedAt: number; // epoch ms
};

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  // RSS variants are messy; these help:
  isArray: (name) => name === "item" || name === "entry"
});

function getHostname(u: string) {
  try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return ""; }
}

function pickDate(item: any) {
  const d = item?.pubDate || item?.published || item?.updated || item?.["dc:date"];
  const t = Array.isArray(d) ? d[0] : d;
  const ms = Date.parse(String(t || ""));
  return Number.isFinite(ms) ? ms : 0;
}

function normalizeItems(feed: any): Headline[] {
  // RSS 2.0: rss.channel.item
  const channel = feed?.rss?.channel;
  const items = channel?.item
    // Atom: feed.entry
    || feed?.feed?.entry
    // Some weird variants just have .item
    || feed?.item
    || [];
  const arr = Array.isArray(items) ? items : [items];

  return arr.map((it: any) => {
    const link = it?.link?.["@_href"] || it?.link?.[0]?.["@_href"] || it?.link?.[0] || it?.link || it?.guid || it?.url;
    const url = Array.isArray(link) ? link[0] : link;
    const title = String(it?.title ?? "").trim();
    const source = getHostname(url || "") || String(feed?.feed?.title || channel?.title || "").trim();
    return { title, url, source, publishedAt: pickDate(it) };
  }).filter(h => h.title && h.url && !BLACKLIST.some(b => getHostname(h.url).includes(b)));
}

export async function fetchAllHeadlines(): Promise<Headline[]> {
  const results = await Promise.allSettled(
    NEWS_FEEDS.map(async (feedUrl) => {
      const res = await fetch(feedUrl, { headers: { "user-agent": "Mozilla/5.0" }, next: { revalidate: 600 } });
      const xml = await res.text();
      const json = parser.parse(xml);
      return normalizeItems(json);
    })
  );

  const merged: Headline[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") merged.push(...r.value);
  }

  // Dedupe by title+host
  const seen = new Set<string>();
  const deduped = merged.filter(h => {
    const key = `${h.title}__${getHostname(h.url)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Add pinned to the top with current timestamp if no date
  const pinned: Headline[] = PINNED_LINKS.map(p => ({
    title: p.title, url: p.url, source: p.source || getHostname(p.url), publishedAt: Date.now()
  }));

  // Sort newest first, cap to 90 items
  return [...pinned, ...deduped].sort((a, b) => b.publishedAt - a.publishedAt).slice(0, 90);
}
