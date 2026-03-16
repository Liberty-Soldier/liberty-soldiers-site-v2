// lib/rss.ts
import { XMLParser } from "fast-xml-parser";
import {
  NEWS_FEEDS,
  NOISE_FEEDS,
  PINNED_LINKS,
  BLACKLIST,
} from "./news.config";
import { toHardCategory } from "./hardCategories";

export type Headline = {
  title: string;
  url: string;
  source: string;
  publishedAt?: number;
  image?: string;
  summary?: string;
  category?: string;
  hardCategory?: string;
};

type FeedInput =
  | string
  | {
      url: string;
      category?: string;
    };

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  trimValues: true,
});

/* -------------------------------------------------- */
/* utils                                              */
/* -------------------------------------------------- */

async function fetchOgImageFromArticle(url: string): Promise<string | undefined> {
  try {
    const res = await fetch(url, {
      headers: {
        "user-agent": "Mozilla/5.0 (LibertySoldiersBot)",
        accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
      },
      next: { revalidate: 1800 },
    });

    if (!res.ok) return undefined;

    const html = await res.text();
    if (!html) return undefined;

    const patterns = [
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
      /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i,
      /<meta[^>]+name=["']twitter:image:src["'][^>]+content=["']([^"']+)["']/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image:src["']/i,
      /<link[^>]+rel=["']image_src["'][^>]+href=["']([^"']+)["']/i,
    ];

    for (const rx of patterns) {
      const m = html.match(rx);
      if (!m?.[1]) continue;

      const candidate = resolveUrl(m[1], url);
      if (isGoodImage(candidate)) return candidate;
    }

    return undefined;
  } catch {
    return undefined;
  }
}

const ARTICLE_OG_FALLBACK_DOMAINS = [
  "schneier.com",
  "christianpost.com",
  "realclearreligion.org",
  "endtimeheadlines.org",
  "religionnews.com",
  "tass.com",
  "europeanconservative.com",
  "middleeasteye.net",
  "aljazeera.com",
  "warontherocks.com",
  
];

function shouldTryArticleOgFallback(url: string): boolean {
  const d = host(url).toLowerCase();
  return ARTICLE_OG_FALLBACK_DOMAINS.some(
    (domain) => d === domain || d.endsWith(`.${domain}`)
  );
}
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
  if (s0.startsWith("//")) return "https:" + s0;
  if (/^https?:\/\//i.test(s0)) return s0;
  if (/^[\w.-]+\.[a-z]{2,}([/:?#].*)?$/i.test(s0)) return "https://" + s0;
  return "";
}

function resolveUrl(raw: any, base?: string): string {
  const s = String(raw ?? "").trim();
  if (!s) return "";

  if (s.startsWith("//")) return "https:" + s;
  if (/^https?:\/\//i.test(s)) return s;
  if (/^[\w.-]+\.[a-z]{2,}([/:?#].*)?$/i.test(s)) return "https://" + s;

  if (base) {
    try {
      return new URL(s, base).toString();
    } catch {}
  }

  return "";
}

function canonicalUrl(raw: string): string {
  try {
    const u = new URL(raw);
    u.hash = "";

    const dropParams = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "utm_name",
      "utm_cid",
      "utm_reader",
      "utm_referrer",
      "utm_social",
      "utm_social-type",
      "src",
      "source",
      "feature",
      "features",
      "ref",
      "ref_src",
      "ref_url",
      "rss",
      "output",
      "spm",
      "fbclid",
      "gclid",
      "mc_cid",
      "mc_eid",
    ];

    for (const p of dropParams) u.searchParams.delete(p);

    if (
      (u.protocol === "https:" && u.port === "443") ||
      (u.protocol === "http:" && u.port === "80")
    ) {
      u.port = "";
    }

    u.hostname = u.hostname.toLowerCase();
    u.pathname = u.pathname.replace(/\/+$/, "") || "/";

    return u.toString();
  } catch {
    return raw.trim();
  }
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

function isIranRelated(title: string, summary?: string): boolean {
  const t = `${title} ${summary ?? ""}`.toLowerCase();

  const iranTerms = [
    "iran",
    "tehran",
    "islamic republic",
    "irgc",
    "revolutionary guard",
    "quds force",
    "ayatollah",
    "khamenei",
    "natanz",
    "isfahan",
    "fordow",
    "arak",
    "bushehr",
    "hormuz",
    "strait of hormuz",
    "persian gulf",
    "iranian drone",
    "shahed",
  ];

  const proxyTerms = [
    "hezbollah",
    "houthi",
    "hamas",
    "axis of resistance",
  ];

  const hasIranCore = iranTerms.some((k) => t.includes(k));
  if (hasIranCore) return true;

  const hasProxy = proxyTerms.some((k) => t.includes(k));
  if (
    hasProxy &&
    (t.includes("iran") || t.includes("tehran") || t.includes("irgc"))
  ) {
    return true;
  }

  return false;
}

/* -------------------------------------------------- */
/* iran page balancing                                */
/* -------------------------------------------------- */

type SourceGroup =
  | "antiwar"
  | "regional"
  | "iran"
  | "western"
  | "thinktank"
  | "israel"
  | "other";

const SOURCE_GROUP_BY_DOMAIN: Record<string, SourceGroup> = {
  "antiwar.com": "antiwar",
  "responsiblestatecraft.org": "antiwar",

  "aljazeera.com": "regional",
  "middleeasteye.net": "regional",
  "trtworld.com": "regional",
  "france24.com": "regional",
  "alarabiya.net": "regional",

  "presstv.ir": "iran",
  "tehrantimes.com": "iran",
  "mehrnews.com": "iran",
  "irna.ir": "iran",
  "tasnimnews.com": "iran",

  "reuters.com": "western",
  "apnews.com": "western",
  "bbc.com": "western",
  "bbc.co.uk": "western",
  "theguardian.com": "western",
  "cnn.com": "western",
  "nbcnews.com": "western",
  "cbsnews.com": "western",
  "abcnews.go.com": "western",
  "dw.com": "western",
  "skynews.com": "western",
  "foxnews.com": "western",

  "warontherocks.com": "thinktank",
  "foreignpolicy.com": "thinktank",
  "crisisgroup.org": "thinktank",

  "jpost.com": "israel",
  "timesofisrael.com": "israel",
  "allisrael.com": "israel",
  "israel365news.com": "israel",
  "israeltoday.co.il": "israel",
  "olivetreeviews.org": "israel",
};

function groupOfHeadline(h: Headline): SourceGroup {
  const d = host(h.url).toLowerCase();

  for (const [domain, group] of Object.entries(SOURCE_GROUP_BY_DOMAIN)) {
    if (d === domain || d.endsWith(`.${domain}`)) return group;
  }

  return "other";
}

function limitByDomain(items: Headline[], maxPerDomain = 2): Headline[] {
  const counts = new Map<string, number>();
  const out: Headline[] = [];

  for (const it of items) {
    const d = host(it.url);
    const n = counts.get(d) ?? 0;
    if (n >= maxPerDomain) continue;
    counts.set(d, n + 1);
    out.push(it);
  }

  return out;
}

function roundRobinByGroup(items: Headline[], take = 40): Headline[] {
  const buckets = new Map<SourceGroup, Headline[]>();

  for (const it of items) {
    const g = groupOfHeadline(it);
    if (!buckets.has(g)) buckets.set(g, []);
    buckets.get(g)!.push(it);
  }

  const order: SourceGroup[] = [
    "antiwar",
    "regional",
    "iran",
    "western",
    "thinktank",
    "israel",
    "other",
  ];

  const out: Headline[] = [];
  while (out.length < take) {
    let progressed = false;

    for (const g of order) {
      const b = buckets.get(g);
      if (b && b.length) {
        out.push(b.shift()!);
        progressed = true;
        if (out.length >= take) break;
      }
    }

    if (!progressed) break;
  }

  return out;
}

export function balanceIranHeadlines(items: Headline[], take = 30): Headline[] {
  const newestFirst = items
    .slice()
    .sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0));

  const relevant = newestFirst.filter((it) =>
    isIranRelated(it.title, it.summary)
  );
  const fallback = relevant.length >= Math.min(12, take) ? relevant : newestFirst;

  let out = roundRobinByGroup(fallback, Math.max(take, 40));
  out = limitByDomain(out, 2);

  return out.slice(0, take);
}

function toFeedInput(x: FeedInput): { url: string; category?: string } {
  if (typeof x === "string") return { url: x };
  return { url: x.url, category: x.category };
}

function feedCategoryLabel(cat?: string): string | undefined {
  if (!cat) return undefined;
  const c = String(cat).toLowerCase().trim();

  if (c === "crypto") return "Crypto";
  if (c === "finance") return "Finance";
  if (c === "world") return "World Briefing";
  if (c === "middle-east" || c === "middleeast") return "Middle East";
  if (c === "tech") return "Control Systems";
  if (c === "health") return "Health";
  if (c === "prophecy") return "Prophecy Watch";
  if (c === "iran-war") return "Iran War";
  if (c === "religion") return "Religion";

  return undefined;
}

function categorize(
  title: string,
  summary?: string,
  src?: string,
  feedFallback?: string
): string {
  const t = `${title} ${summary ?? ""}`.toLowerCase();
  const s = (src ?? "").toLowerCase();

  if (s.includes("marketwatch")) return "Finance";
  if (s.includes("bloomberg")) return "Finance";
  if (s.includes("wsj")) return "Finance";
  if (s.includes("ft.com")) return "Finance";

  if (
    s.includes("coindesk") ||
    s.includes("cointelegraph") ||
    s.includes("cryptopotato") ||
    s.includes("thedefiant")
  ) {
    return "Crypto";
  }

  let fallback: string | undefined;
  if (s.includes("bbc")) fallback = "World Briefing";
  if (s.includes("aljazeera")) fallback = "World Briefing";

  const hasReligion =
    t.includes("church") ||
    t.includes("christian") ||
    t.includes("jewish") ||
    t.includes("synagogue") ||
    t.includes("mosque") ||
    t.includes("pastor") ||
    t.includes("imam") ||
    t.includes("religion");

  const hasPressure =
    t.includes("persecution") ||
    t.includes("arrest") ||
    t.includes("arrested") ||
    t.includes("detained") ||
    t.includes("raid") ||
    t.includes("ban") ||
    t.includes("banned") ||
    t.includes("charged") ||
    t.includes("sentenced") ||
    t.includes("hate speech") ||
    t.includes("blasphemy") ||
    t.includes("religious freedom") ||
    t.includes("closed down");

  if (hasPressure && hasReligion) {
    return "Persecution Watch";
  }

  const isProphecy =
    t.includes("prophecy") ||
    t.includes("end time") ||
    t.includes("end-time") ||
    t.includes("endtime") ||
    t.includes("rapture") ||
    t.includes("tribulation") ||
    t.includes("antichrist") ||
    t.includes("mark of the beast") ||
    t.includes("revelation") ||
    t.includes("daniel") ||
    t.includes("eschatology");

  const isProphecySource =
    s.includes("olivetreeviews") || s.includes("olivetreeviews.org");

  if (isProphecy || isProphecySource) {
    return "Prophecy Watch";
  }

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
  ) {
    return "Control Systems";
  }

  if (
    t.includes("censorship") ||
    t.includes("censor") ||
    t.includes("deplatform") ||
    t.includes("content moderation") ||
    t.includes("misinformation") ||
    t.includes("disinformation") ||
    (t.includes("speech") && t.includes("law"))
  ) {
    return "Censorship & Speech";
  }

  if (
    t.includes("pandemic") ||
    t.includes("outbreak") ||
    t.includes("lockdown") ||
    t.includes("quarantine") ||
    t.includes("emergency powers") ||
    t.includes("public health") ||
    t.includes(" who ") ||
    t.startsWith("who ") ||
    t.includes(" bird flu") ||
    t.includes("bird flu")
  ) {
    return "Biosecurity";
  }

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
    t.includes("war") ||
    t.includes("houthi") ||
    t.includes("hezbollah") ||
    t.includes("hormuz")
  ) {
    return "Geopolitics & War";
  }

  if (s.includes("biometricupdate")) return "Control Systems";

  if (s.includes("reclaimthenet")) {
    if (
      t.includes("ai") ||
      t.includes("artificial intelligence") ||
      t.includes("medical") ||
      t.includes("health") ||
      t.includes("records") ||
      t.includes("privacy") ||
      t.includes("surveillance") ||
      t.includes("biometric") ||
      t.includes("digital id")
    ) {
      return "Control Systems";
    }
    return "Censorship & Speech";
  }

  if (s.includes("endtimeheadlines")) return "Prophecy Watch";
  if (s.includes("prophecynewswatch")) return "Prophecy Watch";
  if (s.includes("israel365news")) return "Geopolitics & War";
  if (s.includes("timesofisrael")) return "Geopolitics & War";
  if (s.includes("tehrantimes")) return "Geopolitics & War";
  if (s.includes("presstv")) return "Geopolitics & War";
  if (s.includes("reuters")) return "Geopolitics & War";

  return fallback || feedFallback || "General";
}

function stripHtml(s: any): string {
  const raw = String(s ?? "");
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

const BAD_IMAGE_HINTS = [
  "1x1",
  "spacer",
  "tracking",
  "tracker",
  "pixel",
];

function isGoodImage(url?: string): boolean {
  if (!url) return false;

  const u = url.trim();
  if (!u) return false;

  const lower = u.toLowerCase();

  // reject inline junk
  if (lower.startsWith("data:")) return false;

  // must be absolute
  if (!/^https?:\/\//i.test(u)) return false;

  // reject tracking pixels / spacers
  if (BAD_IMAGE_HINTS.some((hint) => lower.includes(hint))) return false;

  // allow common real image patterns OR CDN transforms
  const looksLikeImage =
    /\.(jpg|jpeg|png|webp|gif|avif)(\?|$)/i.test(lower) ||
    lower.includes("/wp-content/uploads/") ||
    lower.includes("/uploads/") ||
    lower.includes("/media/") ||
    lower.includes("/image/") ||
    lower.includes("/images/") ||
    lower.includes("cloudfront") ||
    lower.includes("cdn") ||
    lower.includes("img");

  return looksLikeImage;
}

function pickImage(extracted?: string, base?: string): string | undefined {
  const u = resolveUrl(extracted, base);
  return isGoodImage(u) ? u.trim() : undefined;
}

function extractSummary(it: any): string {
  const cand =
    it?.description ??
    it?.summary ??
    it?.["content:encoded"] ??
    it?.content ??
    "";

  const text = stripHtml(Array.isArray(cand) ? cand[0] : cand);
  if (!text) return "";
  return text.length > 360 ? text.slice(0, 357).trimEnd() + "…" : text;
}

function firstImgFromHtml(html: any, base?: string): string {
  const raw = String(Array.isArray(html) ? html[0] : html ?? "");
  if (!raw) return "";

  const patterns = [
    /<img[^>]+src=["']([^"' >]+)["']/i,
    /<img[^>]+data-src=["']([^"' >]+)["']/i,
    /<img[^>]+data-lazy-src=["']([^"' >]+)["']/i,
    /<img[^>]+srcset=["']([^"']+)["']/i,
  ];

  for (const rx of patterns) {
    const m = raw.match(rx);
    if (!m?.[1]) continue;

    let candidate = m[1];

    if (rx.source.includes("srcset")) {
      candidate = candidate.split(",")[0]?.trim().split(" ")[0]?.trim() || "";
    }

    const resolved = resolveUrl(candidate, base);
    if (resolved) return resolved;
  }

  return "";
}

function extractImage(it: any, base?: string): string {
  const enc = it?.enclosure;
  const encArr = arrify(enc);
  for (const e of encArr) {
    const encUrl = e?.["@_url"] || e?.url;
    const encType = e?.["@_type"] || e?.type;
    if (encUrl && (!encType || String(encType).startsWith("image/"))) {
      const u = normalizeUrl(encUrl);
      if (u) return u;
    }
  }

  const mt = it?.["media:thumbnail"];
  const mtArr = arrify(mt);
  for (const m of mtArr) {
    const u = normalizeUrl(m?.["@_url"] || m?.url);
    if (u) return u;
  }

  const mc = it?.["media:content"];
  const mcArr = arrify(mc);
  for (const m of mcArr) {
    const u = normalizeUrl(m?.["@_url"] || m?.url);
    const t = String(m?.["@_type"] || m?.type || "");
    if (u && (!t || t.startsWith("image/"))) return u;
  }

  const mediaGroup = it?.["media:group"];
  const mediaGroupContent = arrify(mediaGroup?.["media:content"]);
  for (const m of mediaGroupContent) {
    const u = normalizeUrl(m?.["@_url"] || m?.url);
    const t = String(m?.["@_type"] || m?.type || "");
    if (u && (!t || t.startsWith("image/"))) return u;
  }

  const imageFields = [
    it?.image?.url,
    it?.image,
    it?.thumbnail,
    it?.thumb,
    it?.["itunes:image"]?.["@_href"],
    it?.["media:credit"],
  ];

  for (const field of imageFields) {
    const u = normalizeUrl(field);
    if (u) return u;
  }

  const fromContent = firstImgFromHtml(it?.["content:encoded"], base);
  if (fromContent) return fromContent;

  const fromDescription = firstImgFromHtml(it?.description, base);
  if (fromDescription) return fromDescription;

  const fromSummary = firstImgFromHtml(it?.summary, base);
  if (fromSummary) return fromSummary;

  return "";
}

/* -------------------------------------------------- */
/* extraction                                         */
/* -------------------------------------------------- */

function extractItems(feedJson: any): any[] {
  const rssItems = feedJson?.rss?.channel?.item;
  if (rssItems) return arrify(rssItems);

  const atomItems = feedJson?.feed?.entry;
  if (atomItems) return arrify(atomItems);

  if (Array.isArray(feedJson?.item)) return feedJson.item;
  if (Array.isArray(feedJson?.entries)) return feedJson.entries;

  return [];
}

function extractLink(it: any, feedUrl?: string): string {
  let raw = "";

  if (typeof it?.link === "string") raw = it.link;
  else if (it?.link?.["@_href"]) raw = it.link["@_href"];
  else if (Array.isArray(it?.link)) {
    const alt = it.link.find(
      (l: any) => (l?.rel || l?.["@_rel"]) === "alternate"
    );
    if (alt?.["@_href"]) raw = alt["@_href"];
    else {
      const first = it.link[0];
      if (first?.["@_href"]) raw = first["@_href"];
      else if (typeof first === "string") raw = first;
    }
  } else if (typeof it?.guid === "string" && /^https?:\/\//i.test(it.guid)) {
    raw = it.guid;
  } else if (typeof it?.url === "string") {
    raw = it.url;
  } else if (typeof it?.["dc:identifier"] === "string") {
    raw = it["dc:identifier"];
  }

  return canonicalUrl(resolveUrl(raw, feedUrl));
}

function extractSource(feedJson: any, url: string): string {
  const title = feedJson?.rss?.channel?.title || feedJson?.feed?.title || "";
  const fromUrl = host(url);
  return String(title || fromUrl || "").trim();
}

/* -------------------------------------------------- */
/* normalize                                          */
/* -------------------------------------------------- */

async function normalizeFeed(
  feedJson: any,
  feedUrl: string,
  feedCategory?: string
): Promise<Headline[]> {
 const items = extractItems(feedJson).slice(0, 12);
  const sourceFallback = extractSource(feedJson, feedUrl);
  const feedFallbackLabel = feedCategoryLabel(feedCategory);

  const mapped = await Promise.all(
  items.map(async (it: any) => {
      const title = stripHtml(it?.title ?? "").trim();
      const url = extractLink(it, feedUrl);
      const source = host(url) || sourceFallback;

     const extractedImage = extractImage(it, url || feedUrl) || undefined;
let image = pickImage(extractedImage, url || feedUrl);

if (!image && url && shouldTryArticleOgFallback(url)) {
  image = await fetchOgImageFromArticle(url);
}
      const summary = extractSummary(it) || undefined;

      const category = categorize(title, summary, source, feedFallbackLabel);
      let hardCategory = toHardCategory(category);

      const domain = host(url).toLowerCase();
      const src = (source || "").toLowerCase();
      const text = `${title} ${summary ?? ""}`.toLowerCase();

      const isOliveTree =
        domain.includes("olivetreeviews") || src.includes("olivetreeviews");

      const looksProphetic =
        text.includes("prophecy") ||
        text.includes("end time") ||
        text.includes("end-time") ||
        text.includes("endtime") ||
        text.includes("rapture") ||
        text.includes("tribulation") ||
        text.includes("antichrist") ||
        text.includes("mark of the beast") ||
        text.includes("revelation") ||
        text.includes("daniel");

      if (isOliveTree && looksProphetic) {
        hardCategory = "Prophecy Watch";
      }

      return {
        title,
        url,
        source,
        publishedAt: pickDate(it),
        image,
        summary,
        category,
        hardCategory,
      };
})
);

return mapped.filter((h) => {
      if (!h.title || !h.url) return false;
      const d = host(h.url).toLowerCase();
      return !BLACKLIST.some((b) => d.includes(String(b).toLowerCase()));
    });
}

/* -------------------------------------------------- */
/* fetch + parse                                      */
/* -------------------------------------------------- */

async function fetchOneFeed(feedIn: FeedInput): Promise<Headline[]> {
  const feed = toFeedInput(feedIn);

  try {
    const res = await fetch(feed.url, {
      headers: {
        "user-agent": "Mozilla/5.0 (LibertySoldiersBot)",
        accept: "application/rss+xml, application/xml;q=0.9, */*;q=0.8",
      },
      next: { revalidate: 180 },
    });

    const xml = await res.text();
    if (!res.ok || !xml) return [];

    const json = parser.parse(xml);
   return await normalizeFeed(json, feed.url, feed.category);
  } catch {
    return [];
  }
}

/* -------------------------------------------------- */
/* caps + dedupe                                      */
/* -------------------------------------------------- */

/* -------------------------------------------------- */
/* caps + smarter narrative dedupe                    */
/* -------------------------------------------------- */

const MAX_PER_SOURCE = 12;
const MAX_TOTAL = 500;

const STOPWORDS = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "to",
  "of",
  "in",
  "on",
  "for",
  "with",
  "as",
  "at",
  "by",
  "from",
  "after",
  "before",
  "over",
  "under",
  "into",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "it",
  "its",
  "this",
  "that",
  "these",
  "those",
  "their",
  "his",
  "her",
  "our",
  "your",
  "but",
  "not",
  "than",
  "then",
  "amid",
  "during",
  "about",
  "around",
  "new",
  "latest",
  "live",
  "update",
  "updates",
  "says",
  "say",
  "report",
  "reports",
  "reported",
  "reportedly",
  "video",
  "photos",
  "photo",
  "watch",
  "analysis",
  "opinion",
  "why",
  "what",
  "how",
]);

const NOISE_TOKENS = new Set([
  "breaking",
  "exclusive",
  "urgent",
  "developing",
  "alert",
  "news",
  "headline",
]);

const CANONICAL_TOKEN_MAP: Array<[RegExp, string]> = [
  [/\bu\.?s\.?\b/g, "us"],
  [/\bunited states\b/g, "us"],
  [/\bu\.?k\.?\b/g, "uk"],
  [/\bunited kingdom\b/g, "uk"],
  [/\bisraeli\b/g, "israel"],
  [/\biranian\b/g, "iran"],
  [/\brussian\b/g, "russia"],
  [/\bukrainian\b/g, "ukraine"],
  [/\bchinese\b/g, "china"],
  [/\bhouthis\b/g, "houthi"],
  [/\bhezbollah\b/g, "hezbollah"],
  [/\bhamas\b/g, "hamas"],
  [/\bstrait of hormuz\b/g, "hormuz"],
  [/\bpersian gulf\b/g, "gulf"],
  [/\btehran\b/g, "iran tehran"],
  [/\bwashington\b/g, "us washington"],
  [/\bmoscow\b/g, "russia moscow"],
  [/\bkyiv\b/g, "ukraine kyiv"],
  [/\bjerusalem\b/g, "israel jerusalem"],
  [/\bmissile(s)?\b/g, "missile"],
  [/\bdrone(s)?\b/g, "drone"],
  [/\bstrike(s|d|ing)?\b/g, "strike"],
  [/\bsanction(s|ed|ing)?\b/g, "sanctions"],
  [/\btariff(s)?\b/g, "tariff"],
  [/\bcease-fire\b/g, "ceasefire"],
  [/\bcease fire\b/g, "ceasefire"],
];

function normalizeForDedupeText(s: string): string {
  let out = String(s || "").toLowerCase();

  out = out
    .replace(/&amp;/g, " and ")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, " ")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[-–—/:|]/g, " ");

  for (const [rx, repl] of CANONICAL_TOKEN_MAP) {
    out = out.replace(rx, repl);
  }

  out = out
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return out;
}

function tokenizeSignificant(s: string): string[] {
  return normalizeForDedupeText(s)
    .split(" ")
    .map((x) => x.trim())
    .filter(Boolean)
    .filter((t) => !STOPWORDS.has(t))
    .filter((t) => !NOISE_TOKENS.has(t))
    .filter((t) => t.length > 2 || /^\d+$/.test(t));
}

function tokenSet(s: string): Set<string> {
  return new Set(tokenizeSignificant(s));
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (!a.size || !b.size) return 0;

  let inter = 0;
  for (const x of a) {
    if (b.has(x)) inter++;
  }

  const union = a.size + b.size - inter;
  return union ? inter / union : 0;
}

function intersects(a: Set<string>, b: Set<string>): boolean {
  for (const x of a) {
    if (b.has(x)) return true;
  }
  return false;
}

function pickTopTokens(tokens: string[], max = 6): string[] {
  const counts = new Map<string, number>();

  for (const t of tokens) {
    counts.set(t, (counts.get(t) || 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];
      if (b[0].length !== a[0].length) return b[0].length - a[0].length;
      return a[0].localeCompare(b[0]);
    })
    .slice(0, max)
    .map(([t]) => t);
}

function storySignature(h: Headline): string {
  const combined = `${h.title} ${h.summary ?? ""}`;
  const toks = tokenizeSignificant(combined).filter(
    (t) => !["said", "says", "warns", "warning", "told"].includes(t)
  );

  return pickTopTokens(toks, 5).sort().join("|");
}

function extractEntityHints(h: Headline): Set<string> {
  const text = normalizeForDedupeText(`${h.title} ${h.summary ?? ""}`);
  const found = new Set<string>();

  const entities = [
    "iran",
    "israel",
    "us",
    "uk",
    "russia",
    "ukraine",
    "china",
    "taiwan",
    "gaza",
    "hormuz",
    "houthi",
    "hezbollah",
    "hamas",
    "trump",
    "biden",
    "putin",
    "xi",
    "khamenei",
    "nato",
    "eu",
    "fed",
    "bitcoin",
    "ethereum",
    "oil",
    "gold",
  ];

  for (const e of entities) {
    if (text.includes(e)) found.add(e);
  }

  return found;
}

function extractThemeHints(h: Headline): Set<string> {
  const text = normalizeForDedupeText(`${h.title} ${h.summary ?? ""}`);
  const found = new Set<string>();

  const themes: Array<[string, string[]]> = [
    ["military", ["missile", "drone", "strike", "attack", "troops", "airstrike"]],
    ["shipping", ["shipping", "tanker", "maritime", "vessel", "port", "hormuz"]],
    ["energy", ["oil", "gas", "crude", "refinery", "energy"]],
    ["markets", ["stocks", "market", "bond", "yield", "trader", "futures"]],
    ["sanctions", ["sanctions", "embargo", "restriction"]],
    ["diplomacy", ["talks", "deal", "ceasefire", "negotiation", "summit"]],
    ["religion", ["church", "christian", "jewish", "mosque", "religion", "pastor"]],
    ["control", ["digital", "surveillance", "biometric", "censorship", "speech", "id"]],
    ["biosecurity", ["pandemic", "outbreak", "quarantine", "bird flu", "health"]],
  ];

  for (const [label, words] of themes) {
    if (words.some((w) => text.includes(w))) found.add(label);
  }

  return found;
}

function hoursApart(a?: number, b?: number): number {
  if (!a || !b) return Number.POSITIVE_INFINITY;
  return Math.abs(a - b) / (1000 * 60 * 60);
}

function qualityScore(h: Headline): number {
  let score = 0;

  if (h.publishedAt) score += 8;
  if (h.image) score += 3;
  if (h.summary && h.summary.length > 80) score += 4;
  if (h.title) score += Math.min(6, Math.floor(h.title.length / 24));

  const domain = host(h.url).toLowerCase();
  if (
    domain.includes("reuters") ||
    domain.includes("apnews") ||
    domain.includes("bbc") ||
    domain.includes("ft.com") ||
    domain.includes("bloomberg")
  ) {
    score += 2;
  }

  return score;
}

function compareHeadlinesForDedupe(a: Headline, b: Headline): boolean {
  const aTitle = tokenSet(a.title);
  const bTitle = tokenSet(b.title);

  const aFull = tokenSet(`${a.title} ${a.summary ?? ""}`);
  const bFull = tokenSet(`${b.title} ${b.summary ?? ""}`);

  const titleSim = jaccard(aTitle, bTitle);
  const fullSim = jaccard(aFull, bFull);

  const aEnt = extractEntityHints(a);
  const bEnt = extractEntityHints(b);

  const aTheme = extractThemeHints(a);
  const bTheme = extractThemeHints(b);

  const sameEntity = intersects(aEnt, bEnt);
  const sameTheme = intersects(aTheme, bTheme);
  const sameHardCategory =
    (a.hardCategory || "").toLowerCase() === (b.hardCategory || "").toLowerCase();

  const sigA = storySignature(a);
  const sigB = storySignature(b);

  const hrs = hoursApart(a.publishedAt, b.publishedAt);

  if (titleSim >= 0.86) return true;

  if (sigA && sigA === sigB && hrs <= 30) return true;

  if (titleSim >= 0.68 && sameEntity && sameTheme && hrs <= 24) return true;

  if (titleSim >= 0.6 && fullSim >= 0.55 && sameEntity && hrs <= 18) return true;

  if (fullSim >= 0.72 && sameEntity && sameHardCategory && hrs <= 16) return true;

  return false;
}

function dedupeByNarrative(items: Headline[]): Headline[] {
  const WINDOW = 120;
  const kept: Headline[] = [];

  for (const it of items) {
    let duplicateIndex = -1;
    const start = Math.max(0, kept.length - WINDOW);

    for (let i = kept.length - 1; i >= start; i--) {
      if (compareHeadlinesForDedupe(it, kept[i])) {
        duplicateIndex = i;
        break;
      }
    }

    if (duplicateIndex === -1) {
      kept.push(it);
      continue;
    }

    const existing = kept[duplicateIndex];
    const challengerScore = qualityScore(it);
    const existingScore = qualityScore(existing);

    if (challengerScore > existingScore) {
      kept[duplicateIndex] = it;
    }
  }

  return kept;
}

function capBySource(items: Headline[]): Headline[] {
  const perSource = new Map<string, number>();
  const out: Headline[] = [];

  for (const it of items) {
    const s = (it.source || host(it.url) || "unknown").toLowerCase().trim();
    const c = perSource.get(s) || 0;
    if (c >= MAX_PER_SOURCE) continue;

    perSource.set(s, c + 1);
    out.push(it);

    if (out.length >= MAX_TOTAL) break;
  }

  return out;
}

/* -------------------------------------------------- */
/* public API                                         */
/* -------------------------------------------------- */

async function fetchHeadlinesFromFeeds(feedsIn: FeedInput[]): Promise<Headline[]> {
  const settled = await Promise.allSettled(feedsIn.map(fetchOneFeed));

  const all: Headline[] = [];
  for (const r of settled) {
    if (r.status === "fulfilled" && Array.isArray(r.value)) {
      all.push(...r.value);
    }
  }

  const seen = new Set<string>();
  const uniqueByUrl = all.filter((h) => {
    const key = canonicalUrl(h.url.trim());
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const newestFirst = uniqueByUrl
    .slice()
    .sort((a, b) => {
      const ta = a.publishedAt || 0;
      const tb = b.publishedAt || 0;

      if (tb !== ta) return tb - ta;

      return qualityScore(b) - qualityScore(a);
    });

  const narrativeDeduped = dedupeByNarrative(newestFirst);
  const capped = capBySource(narrativeDeduped);

  return capped;
}

export async function fetchAllHeadlines(): Promise<Headline[]> {
  const feeds = (NEWS_FEEDS as unknown as FeedInput[]) ?? [];
  const headlines = await fetchHeadlinesFromFeeds(feeds);

  const pinned: Headline[] = PINNED_LINKS.map((p) => ({
    title: p.title,
    url: canonicalUrl(p.url),
    source: p.source ? String(p.source) : host(p.url),
    publishedAt: undefined,
    image: undefined,
    summary: undefined,
    category: "Pinned",
    hardCategory: undefined,
  }));

  const seen = new Set<string>();

  const pinnedUnique = pinned.filter((h) => {
    const key = canonicalUrl(h.url.trim());
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const restUnique = headlines.filter((h) => {
    const key = canonicalUrl(h.url.trim());
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return [...pinnedUnique, ...restUnique];
}

export async function fetchNoiseHeadlines(): Promise<Headline[]> {
  const feeds = (NOISE_FEEDS as unknown as FeedInput[]) ?? [];
  return fetchHeadlinesFromFeeds(feeds);
}
