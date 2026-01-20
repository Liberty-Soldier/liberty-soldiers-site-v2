// lib/rss.ts
import { XMLParser } from "fast-xml-parser";
import { NEWS_FEEDS, PINNED_LINKS, BLACKLIST } from "./news.config";

export type Headline = {
  title: string;
  url: string;
  source: string;
  publishedAt?: number;
  image?: string;
  summary?: string;
  category?: string;
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

function categorize(title: string, summary?: string, src?: string): string {
  const t = `${title} ${summary ?? ""}`.toLowerCase();
  const s = (src ?? "").toLowerCase();

      // Strong source-based hints (safe defaults)
    if (s.includes("biometricupdate")) return "Control Systems";
    if (s.includes("reclaimthenet")) return "Censorship & Speech";
    if (s.includes("expose-news")) return "Control Systems";
    if (s.includes("endtimeheadlines")) return "Persecution Watch";
    if (s.includes("prophecynewswatch")) return "Persecution Watch";
    if (s.includes("israel365news")) return "Geopolitics & War";
    if (s.includes("timesofisrael")) return "Geopolitics & War";
    if (s.includes("reuters")) return "Geopolitics & War";
   
    let fallback: string | undefined;

    // Mainstream baseline briefing sources
    if (s.includes("bbc")) fallback = "World Briefing";
    if (s.includes("aljazeera")) fallback = "World Briefing";

  // Persecution / suppression
  if (
    t.includes("church") ||
    t.includes("christian") ||
    t.includes("jewish") ||
    t.includes("synagogue") ||
    t.includes("mosque") ||
    t.includes("pastor") ||
    t.includes("arrested") ||
    t.includes("ban") ||
    t.includes("banned") ||
    t.includes("hate speech") ||
    t.includes("blasphemy") ||
    t.includes("persecution")
  )
    return "Persecution Watch";

  // Control systems / surveillance / ID / CBDC
  if (
    t.includes("cbdc") ||
    t.includes("digital currency") ||
    t.includes("cashless") ||
    t.includes("biometric") ||
    t.includes("digital id") ||
    (t.includes("digital") && t.includes("id")) ||
    t.includes("facial recognition") ||
    t.includes("surveillance") ||
    t.includes("social credit") ||
    t.includes("vaccine passport") ||
    t.includes("qr code")
  )
    return "Control Systems";

  // Censorship / information control
  if (
    t.includes("censorship") ||
    t.includes("censor") ||
    t.includes("deplatform") ||
    t.includes("content moderation") ||
    t.includes("misinformation") ||
    t.includes("disinformation") ||
    (t.includes("speech") && t.includes("law"))
  )
    return "Censorship & Speech";

  // Biosecurity / emergency powers
  if (
    t.includes("pandemic") ||
    t.includes("outbreak") ||
    t.includes("lockdown") ||
    t.includes("quarantine") ||
    t.includes("emergency powers") ||
    t.includes("public health") ||
    t.includes("who") ||
    t.includes("bird flu")
  )
    return "Biosecurity";

  // War / geopolitics
  if (
    t.includes("gaza") ||
    t.includes("israel") ||
    t.includes("iran") ||
    t.includes("russia") ||
    t.includes("ukraine") ||
    t.includes("china") ||
    t.includes("taiwan") ||
    t.includes("missile") ||
    t.includes("strike") ||
    t.includes("ceasefire") ||
    t.includes("nato") ||
    t.includes("war")
  )
    return "Geopolitics & War";

  // Source hints (optional)
  if (s.includes("biometricupdate")) return "Control Systems";

  return "General";
}

function stripHtml(s: any): string {
  const raw = String(s ?? "");
  // remove tags + decode common entities minimally
  return raw
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<\/?[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractSummary(it: any): string {
  // Prefer short description/summary first
  const cand =
    it?.description ??
    it?.summary ??
    it?.["content:encoded"] ??
    it?.content ??
    "";

  const text = stripHtml(Array.isArray(cand) ? cand[0] : cand);
  // keep it reasonably short so cards don’t blow up
  if (!text) return "";
  return text.length > 360 ? text.slice(0, 357).trimEnd() + "…" : text;
}

function extractImage(it: any): string {
  // RSS enclosure: <enclosure url="..." type="image/jpeg" />
  const enc = it?.enclosure;
  const encUrl = enc?.["@_url"] || enc?.url;
  const encType = enc?.["@_type"] || enc?.type;
  if (encUrl && (!encType || String(encType).startsWith("image/"))) {
    const u = normalizeUrl(encUrl);
    if (u) return u;
  }

  // Media RSS: <media:thumbnail url="..." />
  const mt = it?.["media:thumbnail"];
  const mtArr = arrify(mt);
  for (const m of mtArr) {
    const u = normalizeUrl(m?.["@_url"] || m?.url);
    if (u) return u;
  }

  // Media RSS: <media:content url="..." />
  const mc = it?.["media:content"];
  const mcArr = arrify(mc);
  for (const m of mcArr) {
    const u = normalizeUrl(m?.["@_url"] || m?.url);
    const t = String(m?.["@_type"] || m?.type || "");
    if (u && (!t || t.startsWith("image/"))) return u;
  }

  // Some feeds include <image><url>…</url></image> inside item
  const img = it?.image?.url || it?.image;
  const u2 = normalizeUrl(img);
  if (u2) return u2;

  return "";
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
      
      const image = extractImage(it) || undefined;
      const summary = extractSummary(it) || undefined;
      const category = categorize(title, summary, source);

      return { title, url, source, publishedAt: pickDate(it), image, summary, category };
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

// pinned first (always stay on top)
const pinned: Headline[] = PINNED_LINKS.map((p) => ({
  title: p.title,
  url: p.url,
  source: p.source ? String(p.source) : host(p.url),
  publishedAt: undefined,
  image: undefined,
  summary: undefined,
}));

// de-dup by URL (pinned take priority)
const seen = new Set<string>();

const pinnedUnique = pinned.filter((h) => {
  const key = h.url.trim();
  if (!key || seen.has(key)) return false;
  seen.add(key);
  return true;
});

const restUnique = all.filter((h) => {
  const key = h.url.trim();
  if (!key || seen.has(key)) return false;
  seen.add(key);
  return true;
});

// sort only non-pinned items newest → oldest
restUnique.sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0));

// pinned always first, then sorted feed
return [...pinnedUnique, ...restUnique];
}
