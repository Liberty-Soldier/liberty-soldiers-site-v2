// lib/rss.ts
import { XMLParser } from "fast-xml-parser";
import { NEWS_FEEDS, PINNED_LINKS, BLACKLIST } from "./news.config";

export type Headline = {
  title: string;
  url: string;
  source: string;
  publishedAt?: number;
};

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  trimValues: true,
  // do NOT force arrays globally; we’ll normalize below
});

/* -------------------------------------------------- */
/* utils                                              */
/* -------------------------------------------------- */

function arrify<T>(x: T | T[] | undefined | null): T[] {
  return x == null ? [] : Array.isArray(x) ? x : [x];
}

function host(u: string): string {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function normalizeUrl(raw: any): string {
  const s0 = String(raw ?? "").trim();
  if (!s0) return "";
  if (s0.startsWith("//")) return "https:" + s0; // protocol-relative → https
  if (/^https?:\/\//i.test(s0)) return s0;      // already http/https
  if (/^[\w.-]+\.[a-z]{2,}([/:?#].*)?$/i.test(s0)) return "https://" + s0;
  return "";
}

function pickDate(it: any): number | undefined {
  const d =
    it?.pubDate ||
    it?.published ||
    it?.updated ||
    it?.["dc:date"] ||
    it?.["dcterms:modified"] ||
    it?.date;

  const t = Array.isArray(d) ? d[0] : d;
  if (!t) return undefined;
  const ms = Date.parse(String(t));
  return Number.isFinite(ms) ? ms : undefined;
}

/* -------------------------------------------------- */
/* extraction                                         */
/* -------------------------------------------------- */

function extractItems(feedJson: any): any[] {
  // RSS 2.0
  const rssItems = feedJson?.rss?.channel?.item;
  if (rssItems) return arrify(rssItems);

  // Atom
  const atomItems = feedJson?.feed?.entry;
  if (atomItems) return arrify(atomItems);

  // Some “flat” variants
  if (Array.isArray(feedJson?.item)) return feedJson.item;
  if (Array.isArray(feedJson?.entries)) return feedJson.entries;

  return [];
}

function extractLink(it: any): string {
  // Common simple RSS
  if (typeof it?.link === "string") return it.link;

  // Atom and mixed forms:
  //  - link: { "@_href": "…" }
  if (it?.link?.["@_href"]) return it.link["@_href"];

  //  - link: [{ rel, "@_href" }, …] → prefer rel="alternate", else first
  if (Array.isArray(it?.link)) {
    const alt = it.link.find((l: any) => (l?.rel || l?.["@_rel"]) === "alternate");
    if (alt?.["@_href"]) return alt["@_href"];
    const first = it.link[0];
    if (first?.["@_href"]) return first["@_href"];
    if (typeof first === "string") return first;
  }

  // Fall back to guid/url-like fields if they look like URLs
  if (typeof it?.guid === "string" && /^https?:\/\//i.test(it.guid)) return it.guid;
  if (typeof it?.url === "string") return it.url;
  if (typeof it?.["dc:identifier"] === "string") return it["dc:identifier"];

  return "";
}

function extractSource(feedJson: any, url: string): string {
  const title =
    feedJson?.rss?.channel?.title ||
    feedJson?.feed?.title ||
    "";
  const fromUrl = host(url);
  return String(title || fromUrl || "").trim();
}

/* -------------------------------------------------- */
/* normalize                                          */
/* -------------------------------------------------- */

function normalizeFeed(feedJson: any, feedUrl: string): Headline[] {
  const items = extractItems(feedJson);
  const sourceFallback = extractSource(feedJson, feedUrl);

  return items
    .map((it: any) => {
      const title = String(it?.title ?? "").trim();
      const rawLink = extractLink(it);
      const url = normalizeUrl(rawLink);
      const source = host(url) || sourceFallback;
      return { title, url, source, publishedAt: pickDate(it) };
    })
    .filter(
      (h) =>
        h.title &&
        h.url &&
        !BLACKLIST.some((b) => host(h.url).includes(b))
    );
}

/* -------------------------------------------------- */
/* fetch + parse                                      */
/* -------------------------------------------------- */

async function fetchOneFeed(feedUrl: string): Promise<Headline[]> {
  try {
    const res = await fetch(feedUrl, {
  headers: {
    "user-agent": "Mozilla/5.0 (LibertySoldiersBot)",
    "accept": "application/rss+xml, application/xml;q=0.9, */*;q=0.8",
  },
  next: { revalidate: 600 },
});
    });
    const xml = await res.text();
    if (!res.ok || !xml) return [];

    const json = parser.parse(xml);
    return normalizeFeed(json, feedUrl);
  } catch {
    return [];
  }
}

/* -------------------------------------------------- */
/* public API                                         */
/* -------------------------------------------------- */

export async function fetchAllHeadlines(): Promise<Headline[]> {
  const settled = await Promise.allSettled(NEWS_FEEDS.map(fetchOneFeed));
  const all: Headline[] = [];
  for (const r of settled) {
    if (r.status === "fulfilled" && Array.isArray(r.value)) {
      all.push(...r.value);
    }
  }

  // pinned first
  const pinned: Headline[] = PINNED_LINKS.map((p) => ({
    title: p.title,
    url: p.url,
    source: p.source ? String(p.source) : host(p.url),
    publishedAt: undefined,
  }));

  // de-dup by URL
  const seen = new Set<string>();
  const unique = [...pinned, ...all].filter((h) => {
    const key = h.url.trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // sort newest → oldest (pinned without dates remain at top)
  unique.sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0));

  return unique;
}
