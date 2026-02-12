// lib/rss.ts
import { XMLParser } from "fast-xml-parser";
import { NEWS_FEEDS, NOISE_FEEDS, PINNED_LINKS, BLACKLIST } from "./news.config";
import { toHardCategory } from "./hardCategories";


export type Headline = {
  title: string;
  url: string;
  source: string;
  publishedAt?: number;
  image?: string;
  summary?: string;
  category?: string;      // current badge label (Finance, Biosecurity, etc.)
  hardCategory?: string;  // new: 5-bucket taxonomy for filters
};

type FeedInput =
  | string
  | {
      url: string;
      category?: string; // e.g. "crypto" | "finance" | "world" | ...
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
  if (/^https?:\/\//i.test(s0)) return s0; // already http/https
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

function toFeedInput(x: FeedInput): { url: string; category?: string } {
  if (typeof x === "string") return { url: x };
  return { url: x.url, category: x.category };
}

function feedCategoryLabel(cat?: string): string | undefined {
  if (!cat) return undefined;
  const c = String(cat).toLowerCase().trim();

  // IMPORTANT: These labels are what shows in the badge (pill)
  if (c === "crypto") return "Crypto";
  if (c === "finance") return "Finance";
  if (c === "world") return "World Briefing";
  if (c === "middle-east" || c === "middleeast") return "Middle East";
  if (c === "tech") return "Control Systems";
  if (c === "health") return "Health";
  if (c === "prophecy") return "Prophecy Watch";

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
// --------------------------------------------------
// HARD DOMAIN OVERRIDES (prevent obvious mislabels)
// --------------------------------------------------
if (s.includes("marketwatch")) return "Finance";
if (s.includes("bloomberg")) return "Finance";
if (s.includes("wsj")) return "Finance";
if (s.includes("ft.com")) return "Finance";

if (
  s.includes("coindesk") ||
  s.includes("cointelegraph") ||
  s.includes("cryptopotato")
) {
  return "Crypto";
}

  // --------------------------------------------------
  // Source-based fallback (NOT a return)
  // --------------------------------------------------
  let fallback: string | undefined;

  if (s.includes("bbc")) fallback = "World Briefing";
  if (s.includes("aljazeera")) fallback = "World Briefing";

  // --------------------------------------------------
  // High-signal categories (ALWAYS win)
  // --------------------------------------------------

// Persecution Watch (requires coercion + religion)
const hasReligion =
  t.includes("church") ||
  t.includes("christian") ||
  t.includes("jewish") ||
  t.includes("synagogue") ||
  t.includes("mosque") ||
  t.includes("pastor") ||
  t.includes("imam");

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

if (hasPressure && (hasReligion || t.includes("religion"))) {
  return "Persecution Watch";
}
    // --------------------------------------------------
  // Prophecy (HIGH-signal)
  // --------------------------------------------------
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

  // Source/domain assist (OliveTreeReviews)
  const isProphecySource =
    s.includes("olivetreeviews") || s.includes("olivetreeviews.org");

  if (isProphecy || isProphecySource) {
    return "Prophecy Watch";
  }

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
  ) {
    return "Control Systems";
  }

  // Censorship / information control
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

  // Biosecurity / emergency powers
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
  ) {
    return "Geopolitics & War";
  }

  // --------------------------------------------------
  // Source-only defaults (low-signal)
  // --------------------------------------------------
  if (s.includes("biometricupdate")) return "Control Systems";
  if (s.includes("reclaimthenet")) return "Censorship & Speech";
  if (s.includes("expose-news")) return "Control Systems";
  if (s.includes("endtimeheadlines")) return "Persecution Watch";
  if (s.includes("prophecynewswatch")) return "Persecution Watch";
  if (s.includes("israel365news")) return "Geopolitics & War";
  if (s.includes("timesofisrael")) return "Geopolitics & War";
  if (s.includes("reuters")) return "Geopolitics & War";

  // --------------------------------------------------
  // Final fallback (feed category beats "General")
  // --------------------------------------------------
  return fallback || feedFallback || "General";
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

const DEFAULT_OG = "/og-default.jpg";

// Tune these over time
const BAD_IMAGE_HINTS = [
  "1x1",
  "pixel",
  "spacer",
  "blank",
  "tracking",
  "tracker",
];

const BAD_IMAGE_EXTS: string[] = []; // don't block svg/gif here (too aggressive)

function isGoodImage(url?: string): boolean {
  if (!url) return false;

  const u = url.trim();
  if (!u) return false;

  const lower = u.toLowerCase();

  // data URIs are usually junk for our use
  if (lower.startsWith("data:")) return false;

  // must be http(s)
  if (!/^https?:\/\//i.test(u)) return false;

  // only block obvious tracker-ish hints
  if (BAD_IMAGE_HINTS.some((hint) => lower.includes(hint))) return false;

  return true;
}

function pickImage(extracted?: string): string | undefined {
  return isGoodImage(extracted) ? extracted!.trim() : undefined;
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
    const alt = it.link.find(
      (l: any) => (l?.rel || l?.["@_rel"]) === "alternate"
    );
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
  const title = feedJson?.rss?.channel?.title || feedJson?.feed?.title || "";
  const fromUrl = host(url);
  return String(title || fromUrl || "").trim();
}

/* -------------------------------------------------- */
/* normalize                                          */
/* -------------------------------------------------- */

function normalizeFeed(
  feedJson: any,
  feedUrl: string,
  feedCategory?: string
): Headline[] {
  const items = extractItems(feedJson);
  const sourceFallback = extractSource(feedJson, feedUrl);
  const feedFallbackLabel = feedCategoryLabel(feedCategory);

  return items
    .map((it: any) => {
      const title = String(it?.title ?? "").trim();
      const rawLink = extractLink(it);
      const url = normalizeUrl(rawLink);
      const source = host(url) || sourceFallback;

     const extractedImage = extractImage(it) || undefined;
const image = pickImage(extractedImage);
const summary = extractSummary(it) || undefined;

const category = categorize(title, summary, source, feedFallbackLabel);

let hardCategory = toHardCategory(feedCategory);

// ✅ OliveTreeReviews: only move to Prophecy Watch when prophecy-like
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
    .filter(
      (h) => h.title && h.url && !BLACKLIST.some((b) => host(h.url).includes(b))
    );
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
      next: { revalidate: 600 },
    });

    const xml = await res.text();
    if (!res.ok || !xml) return [];

    const json = parser.parse(xml);
    return normalizeFeed(json, feed.url, feed.category);
  } catch {
    return [];
  }
}

/* -------------------------------------------------- */
/* caps + dedupe (safe, conservative)                  */
/* -------------------------------------------------- */

const MAX_PER_SOURCE = 10; // cap per source
const MAX_TOTAL = 220; // cap total returned (excluding pinned)

function normalizeForDedupeTitle(s: string): string {
  return String(s || "")
    .toLowerCase()
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function titleTokens(s: string): Set<string> {
  const stop = new Set([
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
    "it",
    "this",
    "that",
  ]);

  const cleaned = normalizeForDedupeTitle(s);
  const toks = cleaned.split(" ").filter(Boolean).filter((t) => !stop.has(t));
  return new Set(toks);
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  const union = a.size + b.size - inter;
  return union ? inter / union : 0;
}

/**
 * Conservative fuzzy dedupe:
 * - only compares against a small rolling window of recently kept items
 * - high similarity threshold to avoid wrong merges
 */
function dedupeBySimilarTitle(items: Headline[]): Headline[] {
  const FUZZY_THRESHOLD = 0.9;
  const WINDOW = 80; // limits comparisons so performance stays safe

  const kept: Headline[] = [];
  const keptTokens: Set<string>[] = [];

  for (const it of items) {
    const ts = titleTokens(it.title);
    let dup = false;

    // compare against recent kept window only
    const start = Math.max(0, kept.length - WINDOW);
    for (let i = kept.length - 1; i >= start; i--) {
      if (jaccard(ts, keptTokens[i]) >= FUZZY_THRESHOLD) {
        dup = true;
        break;
      }
    }

    if (!dup) {
      kept.push(it);
      keptTokens.push(ts);
    }
  }

  return kept;
}

function capBySource(items: Headline[]): Headline[] {
  const perSource = new Map<string, number>();
  const out: Headline[] = [];

  for (const it of items) {
    const s = (it.source || "unknown").toLowerCase().trim();
    const c = perSource.get(s) || 0;
    if (c >= MAX_PER_SOURCE) continue;

    perSource.set(s, c + 1);
    out.push(it);

    if (out.length >= MAX_TOTAL) break;
  }

  return out;
}

const MIN_PER_CATEGORY = 9; // ✅ your request

function selectWithCategoryMins(items: Headline[]): Headline[] {
  const perSource = new Map<string, number>();
  const perCat = new Map<string, number>();
  const selected: Headline[] = [];

  const catOf = (h: Headline) => (h.hardCategory || "Power & Control").trim();

  // Categories we do NOT force-minimum for
  const EXCLUDE = new Set(["Pinned"]);

  // Determine which categories are eligible (present + not excluded)
  const eligibleCats = Array.from(
    new Set(items.map(catOf).filter((c) => c && !EXCLUDE.has(c)))
  );

  const needMore = (c: string) => (perCat.get(c) || 0) < MIN_PER_CATEGORY;

  const canTake = (h: Headline) => {
    const s = (h.source || "unknown").toLowerCase().trim();
    const sc = perSource.get(s) || 0;
    return sc < MAX_PER_SOURCE;
  };

  const take = (h: Headline) => {
    const s = (h.source || "unknown").toLowerCase().trim();
    const c = catOf(h);
    perSource.set(s, (perSource.get(s) || 0) + 1);
    perCat.set(c, (perCat.get(c) || 0) + 1);
    selected.push(h);
  };

  // PASS 1: satisfy category minimums (newest-first), respecting per-source cap
  // We loop a few rounds so categories don't starve if early items hit source caps.
  const alreadyPicked = new Set<string>();
  const maxRounds = 4;

  for (let round = 0; round < maxRounds; round++) {
    let progressed = false;

    for (const h of items) {
      if (selected.length >= MAX_TOTAL) break;

      const key = h.url.trim();
      if (!key || alreadyPicked.has(key)) continue;

      const c = catOf(h);
      if (EXCLUDE.has(c)) continue;
      if (!eligibleCats.includes(c)) continue;

      if (needMore(c) && canTake(h)) {
        take(h);
        alreadyPicked.add(key);
        progressed = true;
      }
    }

    // stop early if all eligible categories met mins or no progress possible
    const allMet = eligibleCats.every((c) => !needMore(c));
    if (allMet || !progressed) break;
  }

  // PASS 2: fill remaining slots by recency, still respecting per-source cap
  for (const h of items) {
    if (selected.length >= MAX_TOTAL) break;

    const key = h.url.trim();
    if (!key || alreadyPicked.has(key)) continue;

    if (!canTake(h)) continue;

    take(h);
    alreadyPicked.add(key);
  }

  return selected;
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

  // de-dup by URL
  const seen = new Set<string>();
  const unique = all.filter((h) => {
    const key = h.url.trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // sort newest → oldest
  unique.sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0));

  // ✅ conservative fuzzy title de-dupe
const fuzzyUnique = dedupeBySimilarTitle(unique);

// ✅ NEW: enforce 6-min per category (when available) + caps
const balanced = selectWithCategoryMins(fuzzyUnique);

return balanced;
}

export async function fetchAllHeadlines(): Promise<Headline[]> {
  // SIGNAL (your existing feeds)
  const feeds = (NEWS_FEEDS as unknown as FeedInput[]) ?? [];

  const headlines = await fetchHeadlinesFromFeeds(feeds);

  // pinned first (always stay on top)
  const pinned: Headline[] = PINNED_LINKS.map((p) => ({
    title: p.title,
    url: p.url,
    source: p.source ? String(p.source) : host(p.url),
    publishedAt: undefined,
    image: undefined,
    summary: undefined,
    category: "Pinned",
  }));

  // pinned take priority in de-dup
  const seen = new Set<string>();

  const pinnedUnique = pinned.filter((h) => {
    const key = h.url.trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const restUnique = headlines.filter((h) => {
    const key = h.url.trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return [...pinnedUnique, ...restUnique];
}

// ✅ New: fetch NOISE headlines (no pinned)
export async function fetchNoiseHeadlines(): Promise<Headline[]> {
  const feeds = (NOISE_FEEDS as unknown as FeedInput[]) ?? [];
  return fetchHeadlinesFromFeeds(feeds);
}
