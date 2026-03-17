// lib/news.select.ts

import type { Headline, CanonicalCategorySlug } from "./news.types";
import { slugFromHardCategory } from "./news.taxonomy";

function hostFromUrl(u: string) {
  try {
    return new URL(u).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

function newestFirst(items: Headline[]) {
  return items
    .slice()
    .sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0));
}

function ageHours(ts?: number) {
  if (!ts) return 999999;
  return (Date.now() - ts) / 1000 / 60 / 60;
}

function categoryOf(h: Headline): CanonicalCategorySlug {
  return h.canonicalCategory || slugFromHardCategory(h.hardCategory);
}

function isMoney(h: Headline) {
  const c = categoryOf(h);
  return c === "markets-finance";
}

function isCryptoLike(h: Headline) {
  const t = `${h.title} ${h.summary || ""} ${h.category || ""}`.toLowerCase();
  return (
    t.includes("crypto") ||
    t.includes("bitcoin") ||
    t.includes("ethereum") ||
    t.includes("defi") ||
    t.includes("stablecoin")
  );
}

function categoryWeight(slug: CanonicalCategorySlug): number {
  switch (slug) {
    case "war-geopolitics":
      return 100;
    case "prophecy-watch":
      return 91;
    case "religion-ideology":
      return 87;
    case "digital-id-technocracy":
      return 84;
    case "power-control":
      return 80;
    case "markets-finance":
      return 68;
    default:
      return 70;
  }
}

function recencyWeight(h: Headline): number {
  const hrs = ageHours(h.publishedAt);
  if (hrs <= 3) return 40;
  if (hrs <= 6) return 34;
  if (hrs <= 12) return 28;
  if (hrs <= 24) return 22;
  if (hrs <= 48) return 14;
  if (hrs <= 72) return 8;
  return 0;
}

function imageWeight(h: Headline): number {
  return h.image ? 4 : 0;
}

function titleWeight(h: Headline): number {
  const t = `${h.title} ${h.summary || ""}`.toLowerCase();

  let score = 0;

  if (
    t.includes("iran") ||
    t.includes("israel") ||
    t.includes("missile") ||
    t.includes("airstrike") ||
    t.includes("drone") ||
    t.includes("hormuz") ||
    t.includes("retaliat") ||
    t.includes("ceasefire") ||
    t.includes("nato") ||
    t.includes("china") ||
    t.includes("taiwan") ||
    t.includes("russia") ||
    t.includes("ukraine")
  ) {
    score += 8;
  }

  if (
    t.includes("cbdc") ||
    t.includes("digital id") ||
    t.includes("biometric") ||
    t.includes("surveillance") ||
    t.includes("facial recognition") ||
    t.includes("social credit") ||
    t.includes("censorship")
  ) {
    score += 6;
  }

  if (
    t.includes("federal reserve") ||
    t.includes("central bank") ||
    t.includes("liquidity") ||
    t.includes("bond") ||
    t.includes("debt") ||
    t.includes("oil") ||
    t.includes("shipping")
  ) {
    score += 5;
  }

  return score;
}

function scoreHeadline(h: Headline): number {
  return (
    categoryWeight(categoryOf(h)) +
    recencyWeight(h) +
    imageWeight(h) +
    titleWeight(h)
  );
}

export function isIranRelated(h: Headline): boolean {
  const t = `${h.title} ${h.summary || ""}`.toLowerCase();

  return (
    t.includes("iran") ||
    t.includes("tehran") ||
    t.includes("israel") ||
    t.includes("hezbollah") ||
    t.includes("houthi") ||
    t.includes("strait of hormuz") ||
    t.includes("hormuz") ||
    t.includes("missile") ||
    t.includes("airstrike") ||
    t.includes("strike") ||
    t.includes("retaliat") ||
    t.includes("drone")
  );
}

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

  "tehrantimes.com": "iran",
  "mehrnews.com": "iran",
  "khamenei.ir": "iran",

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
};

function groupOfHeadline(h: Headline): SourceGroup {
  const d = hostFromUrl(h.url);

  for (const [domain, group] of Object.entries(SOURCE_GROUP_BY_DOMAIN)) {
    if (d === domain || d.endsWith(`.${domain}`)) return group;
  }

  return "other";
}

function roundRobinIran(items: Headline[], take: number) {
  const order: SourceGroup[] = [
    "antiwar",
    "regional",
    "iran",
    "western",
    "thinktank",
    "israel",
    "other",
  ];

  const buckets = new Map<SourceGroup, Headline[]>();
  for (const h of items) {
    const g = groupOfHeadline(h);
    if (!buckets.has(g)) buckets.set(g, []);
    buckets.get(g)!.push(h);
  }

  const out: Headline[] = [];
  while (out.length < take) {
    let progressed = false;

    for (const g of order) {
      const bucket = buckets.get(g);
      if (bucket && bucket.length) {
        out.push(bucket.shift()!);
        progressed = true;
        if (out.length >= take) break;
      }
    }

    if (!progressed) break;
  }

  return out;
}

export function pickIranRadarHeadlines(
  items: Headline[],
  take = 24
): Headline[] {
  const filtered = newestFirst(items.filter((h) => h.category !== "Pinned")).filter(
    isIranRelated
  );

  const seed = filtered.length >= Math.min(12, take) ? filtered : newestFirst(items);
  const mixed = roundRobinIran(seed, Math.max(take, 32));

  const perDomain = new Map<string, number>();
  const out: Headline[] = [];

  for (const h of mixed) {
    if (out.length >= take) break;
    const d = hostFromUrl(h.url);
    const count = perDomain.get(d) || 0;
    if (count >= 2) continue;
    perDomain.set(d, count + 1);
    out.push(h);
  }

  return out;
}

function freshnessLimitHours(slug: CanonicalCategorySlug): number {
  switch (slug) {
    case "war-geopolitics":
      return 72;
    case "markets-finance":
      return 72;
    case "digital-id-technocracy":
      return 120;
    case "power-control":
      return 120;
    case "religion-ideology":
      return 168;
    case "prophecy-watch":
      return 168;
    default:
      return 120;
  }
}

export function filterCategoryHeadlines(
  items: Headline[],
  slug: CanonicalCategorySlug
): Headline[] {
  const cutoff = freshnessLimitHours(slug);

  return newestFirst(
    items.filter((h) => {
      if (h.category === "Pinned") return false;
      if (categoryOf(h) !== slug) return false;

      const hrs = ageHours(h.publishedAt);
      return hrs <= cutoff;
    })
  );
}

export function pickHomepageHeadlines(
  items: Headline[],
  total = 9
): Headline[] {
  const sorted = items
    .filter((h) => h.category !== "Pinned")
    .slice()
    .sort((a, b) => scoreHeadline(b) - scoreHeadline(a));

  const perCategoryMax = total >= 9 ? 3 : 2;
  const perDomainMax = 1;
  const maxMoney = Math.min(2, Math.ceil(total / 4));
  const maxCrypto = 1;

  const picked: Headline[] = [];
  const usedUrls = new Set<string>();
  const perCategory = new Map<string, number>();
  const perDomain = new Map<string, number>();

  let moneyCount = 0;
  let cryptoCount = 0;

  for (const h of sorted) {
    if (picked.length >= total) break;
    if (usedUrls.has(h.url)) continue;

    const slug = categoryOf(h);
    const domain = hostFromUrl(h.url);

    const catCount = perCategory.get(slug) || 0;
    const domainCount = perDomain.get(domain) || 0;

    if (catCount >= perCategoryMax) continue;
    if (domain && domainCount >= perDomainMax) continue;

    if (isMoney(h)) {
      if (moneyCount >= maxMoney) continue;
      if (isCryptoLike(h) && cryptoCount >= maxCrypto) continue;
    }

    picked.push(h);
    usedUrls.add(h.url);
    perCategory.set(slug, catCount + 1);
    if (domain) perDomain.set(domain, domainCount + 1);

    if (isMoney(h)) moneyCount += 1;
    if (isCryptoLike(h)) cryptoCount += 1;
  }

  if (picked.length < total) {
    for (const h of sorted) {
      if (picked.length >= total) break;
      if (usedUrls.has(h.url)) continue;

      const domain = hostFromUrl(h.url);
      const domainCount = perDomain.get(domain) || 0;
      if (domain && domainCount >= 2) continue;

      picked.push(h);
      usedUrls.add(h.url);
      if (domain) perDomain.set(domain, domainCount + 1);
    }
  }

  return picked;
}

export function pickHomepageCarouselHeadlines(
  items: Headline[],
  total = 20
): Headline[] {
  return pickHomepageHeadlines(items, total);
}

const MAJOR_HOST_MATCH = [
  "reuters",
  "apnews",
  "aljazeera",
  "dw",
  "foxnews",
  "bbc",
  "skynews",
];

function isMajor(h: Headline) {
  const source = (h.source || "").toLowerCase();
  const host = hostFromUrl(h.url);

  return MAJOR_HOST_MATCH.some((k) => host.includes(k) || source.includes(k));
}

export function pickLiveBriefingHeadlines(
  items: Headline[],
  total = 15
): Headline[] {
  const pool = newestFirst(
    items.filter((h) => h.category !== "Pinned" && isMajor(h))
  );

  if (pool.length >= Math.min(8, total)) return pool.slice(0, total);

  return newestFirst(items.filter((h) => h.category !== "Pinned")).slice(0, total);
}

export function pickSignalHeadlines(
  items: Headline[],
  total = 10
): Headline[] {
  return newestFirst(
    items.filter((h) => h.category !== "Pinned")
  ).slice(0, total);
}
