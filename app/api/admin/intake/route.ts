import Parser from "rss-parser";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const parser = new Parser({
  timeout: 15000,
  headers: {
    "User-Agent": "LibertySoldiersBot/1.0 (+https://libertysoldiers.com)",
    Accept:
      "application/rss+xml, application/xml, text/xml, application/atom+xml, text/html;q=0.8",
  },
});

type FeedKind =
  | "war"
  | "markets"
  | "control"
  | "religion"
  | "macro"
  | "general";

type FeedTier = "signal" | "validation" | "alt" | "noise-risk";

type FeedConfig = {
  url: string;
  label: string;
  kind: FeedKind;
  tier: FeedTier;
  maxItems: number;
  weight: number;
  enabled?: boolean;
};

type IntakeItem = {
  title: string;
  link: string;
  contentSnippet: string;
  isoDate?: string;
  source: string;
  feedLabel: string;
  feedKind: FeedKind;
  feedTier: FeedTier;
  feedWeight: number;
  domain: string;
  minutesOld: number;
  score: number;
  reasonTags: string[];
};

type GenerateResult = {
  title: string;
  source: string;
  domain: string;
  status: number;
  ok: boolean;
  skipped: boolean;
  reason: string | null;
  error: string | null;
  details: unknown;
  score?: number;
  reasonTags?: string[];
};

const FEEDS: FeedConfig[] = [
  {
    url: "https://news.antiwar.com/feed/",
    label: "Antiwar",
    kind: "war",
    tier: "signal",
    maxItems: 12,
    weight: 2.7,
  },
  {
    url: "https://cms.zerohedge.com/fullrss2.xml",
    label: "ZeroHedge",
    kind: "macro",
    tier: "signal",
    maxItems: 12,
    weight: 2.6,
  },
  {
    url: "https://www.middleeasteye.net/rss",
    label: "Middle East Eye",
    kind: "war",
    tier: "signal",
    maxItems: 10,
    weight: 2.2,
  },
  {
  url: "https://www.reuters.com/world/rss",
  label: "Reuters World",
  kind: "general",
  tier: "validation",
  maxItems: 10,
  weight: 1.7,
},
{
  url: "https://www.reuters.com/markets/rss",
  label: "Reuters Markets",
  kind: "markets",
  tier: "validation",
  maxItems: 8,
  weight: 1.6,
},
  {
    url: "https://www.aljazeera.com/xml/rss/all.xml",
    label: "Al Jazeera",
    kind: "general",
    tier: "alt",
    maxItems: 12,
    weight: 1.7,
  },
  {
    url: "https://rss.dw.com/xml/rss-en-all",
    label: "Deutsche Welle",
    kind: "general",
    tier: "validation",
    maxItems: 10,
    weight: 1.4,
  },
  {
    url: "https://www.france24.com/en/rss",
    label: "France 24",
    kind: "general",
    tier: "validation",
    maxItems: 10,
    weight: 1.4,
  },
  {
  url: "https://thecradle.co/rss",
  label: "The Cradle",
  kind: "war",
  tier: "signal",
  maxItems: 10,
  weight: 2.2,
},
  {
  url: "https://apnews.com/rss/apf-topnews",
  label: "AP News",
  kind: "general",
  tier: "validation",
  maxItems: 12,
  weight: 1.8,
},
  {
  url: "https://www.scmp.com/rss/91/feed",
  label: "SCMP",
  kind: "general",
  tier: "validation",
  maxItems: 8,
  weight: 1.5,
},
  {
  url: "https://www.defenseone.com/rss/all/",
  label: "Defense One",
  kind: "war",
  tier: "validation",
  maxItems: 8,
  weight: 1.6,
},
  {
  url: "https://thegrayzone.com/feed/",
  label: "Grayzone",
  kind: "macro",
  tier: "alt",
  maxItems: 6,
  weight: 1.1,
},
  {
  url: "https://www.ft.com/rss/home",
  label: "Financial Times",
  kind: "markets",
  tier: "validation",
  maxItems: 8,
  weight: 1.5,
},
];

const MAX_SELECTED = 8;
const MIN_SELECTED = 6;
const MAX_PER_DOMAIN = 2;
const MAX_PER_FEED = 3;

// Tighter than before, but not so tight the queue starves
const HARD_MAX_AGE_HOURS = 6;
const SOFT_BONUS_HOURS = 2;
const BREAKING_BONUS_MINUTES = 90;

// Strong pass thresholds
const STRICT_MIN_SCORE = 2.8;
// Fallback pass thresholds to keep queue alive
const RELAXED_MIN_SCORE = 1.4;

const PRIMARY_SIGNAL_TERMS = [
  "strike",
  "airstrike",
  "attack",
  "drone",
  "missile",
  "rocket",
  "war",
  "troops",
  "carrier",
  "destroyer",
  "nuclear",
  "ceasefire",
  "retaliation",
  "escalation",
  "mobilization",
  "killed",
  "dead",
  "wounded",
  "explosion",
  "blast",
  "blasts",
  "shootdown",
  "downed",
  "intercepted",
  "sanctions",
  "embargo",
  "blockade",
  "shipping",
  "strait",
  "hormuz",
  "red sea",
  "black sea",
  "cyberattack",
  "cyber attack",
  "blackout",
  "emergency",
  "martial law",
  "surveillance",
  "digital id",
  "biometric",
  "facial recognition",
  "censorship",
  "misinformation",
  "disinformation",
  "propaganda",
  "psyop",
  "central bank",
  "debt",
  "liquidity",
  "bank run",
  "bond market",
  "oil",
  "gas",
  "pipeline",
  "grid",
  "outage",
  "power cut",
];

const SECONDARY_SIGNAL_TERMS = [
  "iran",
  "israel",
  "gaza",
  "lebanon",
  "syria",
  "yemen",
  "russia",
  "ukraine",
  "china",
  "taiwan",
  "nato",
  "pentagon",
  "tehran",
  "washington",
  "moscow",
  "beijing",
  "jerusalem",
  "globalism",
  "technocracy",
  "identity",
  "compliance",
  "control",
  "refugee",
  "migration",
  "tariff",
  "trade",
  "commodity",
  "commodities",
  "inflation",
  "recession",
  "de-dollarization",
];

const REJECT_TERMS = [
  "sport",
  "sports",
  "soccer",
  "football",
  "baseball",
  "basketball",
  "tennis",
  "golf",
  "movie",
  "movies",
  "tv",
  "television",
  "celebrity",
  "fashion",
  "lifestyle",
  "recipe",
  "travel tips",
  "horoscope",
  "lottery",
  "crossword",
  "weather forecast",
];

const NOISE_PATTERNS: RegExp[] = [
  /\blive updates?\b/i,
  /\bminute by minute\b/i,
  /\bhow to watch\b/i,
  /\bphotos\b/i,
  /\bvideo\b/i,
  /\bquiz\b/i,
  /\bopinion\b/i,
  /\beditorial\b/i,
];

function normalizeWhitespace(input: string) {
  return input.replace(/\s+/g, " ").trim();
}

function stripHtml(input: string) {
  return input.replace(/<[^>]*>/g, " ");
}

function normalizeText(input: string) {
  return normalizeWhitespace(stripHtml(input || "").toLowerCase());
}

function canonicalUrl(url: string) {
  try {
    const u = new URL(url);
    u.hash = "";
    const paramsToDelete = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "utm_name",
      "smid",
      "s",
      "sr_share",
      "ocid",
      "taid",
      "fbclid",
      "gclid",
      "igshid",
      "mc_cid",
      "mc_eid",
    ];
    for (const p of paramsToDelete) {
      u.searchParams.delete(p);
    }
    return u.toString();
  } catch {
    return url;
  }
}

function domainFromUrl(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "unknown";
  }
}

function parseDateToMinutesOld(isoDate?: string) {
  if (!isoDate) return Number.POSITIVE_INFINITY;
  const ts = new Date(isoDate).getTime();
  if (!Number.isFinite(ts)) return Number.POSITIVE_INFINITY;
  return Math.max(0, Math.floor((Date.now() - ts) / 60000));
}

function isFreshEnough(minutesOld: number) {
  return minutesOld <= HARD_MAX_AGE_HOURS * 60;
}

function looksNoisy(title: string, snippet: string) {
  const text = `${title} ${snippet}`;
  const lower = text.toLowerCase();

  if (REJECT_TERMS.some((term) => lower.includes(term))) return true;
  if (NOISE_PATTERNS.some((rx) => rx.test(text))) return true;

  return false;
}

function normalizeTitle(title: string) {
  return title
    .toLowerCase()
    .replace(/['"`’]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(
      /\b(the|a|an|in|on|of|for|to|and|with|over|against|amid|after|under|into|from|as|at|by|is|are)\b/g,
      " "
    )
    .replace(/\s+/g, " ")
    .trim();
}

function titleSimilarityKey(title: string) {
  return normalizeTitle(title)
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 8)
    .join(" ");
}

function countHits(text: string, terms: string[]) {
  let count = 0;
  for (const term of terms) {
    if (text.includes(term)) count += 1;
  }
  return count;
}

function scoreItem(item: Omit<IntakeItem, "score" | "reasonTags">) {
  const combined = normalizeText(`${item.title} ${item.contentSnippet}`);
  const reasonTags: string[] = [];
  let score = 0;

  const primaryHits = countHits(combined, PRIMARY_SIGNAL_TERMS);
  const secondaryHits = countHits(combined, SECONDARY_SIGNAL_TERMS);

  if (primaryHits > 0) {
    score += primaryHits * 2.7;
    reasonTags.push(`primary:${primaryHits}`);
  }

  if (secondaryHits > 0) {
    score += secondaryHits * 1.1;
    reasonTags.push(`secondary:${secondaryHits}`);
  }

  if (item.minutesOld <= BREAKING_BONUS_MINUTES) {
    score += 4.2;
    reasonTags.push("fresh:breaking");
  } else if (item.minutesOld <= SOFT_BONUS_HOURS * 60) {
    score += 3.0;
    reasonTags.push("fresh:under2h");
  } else if (item.minutesOld <= 4 * 60) {
    score += 1.7;
    reasonTags.push("fresh:under4h");
  } else if (item.minutesOld <= 6 * 60) {
    score += 0.8;
    reasonTags.push("fresh:under6h");
  }

  score += item.feedWeight;
  reasonTags.push(`tier:${item.feedTier}`);
  reasonTags.push(`kind:${item.feedKind}`);

  const titleLower = item.title.toLowerCase();
  if (
    [
      "breaking",
      "urgent",
      "missile",
      "drone",
      "strike",
      "attack",
      "retaliation",
      "explosion",
      "sanctions",
      "emergency",
      "blackout",
      "cyberattack",
      "cyber attack",
    ].some((t) => titleLower.includes(t))
  ) {
    score += 2.4;
    reasonTags.push("urgent-title");
  }

  if (item.contentSnippet.length < 40) {
    score -= 0.6;
    reasonTags.push("thin-snippet");
  }

  if (item.feedTier === "validation") {
    score -= 0.4;
  }

  if (looksNoisy(item.title, item.contentSnippet)) {
    score -= 4;
    reasonTags.push("noise-penalty");
  }

  return {
    score,
    reasonTags,
  };
}

function inferHardCategory(
  title: string,
  snippet: string
):
  | "War & Geopolitics"
  | "Markets & Finance"
  | "Digital ID / Technocracy"
  | "Religion & Ideology"
  | "Power & Control" {
  const text = normalizeText(`${title} ${snippet}`);

  if (
    [
      "missile",
      "drone",
      "strike",
      "war",
      "carrier",
      "troops",
      "ceasefire",
      "retaliation",
      "nato",
      "border",
      "hormuz",
      "shipping lane",
      "red sea",
      "black sea",
    ].some((t) => text.includes(t))
  ) {
    return "War & Geopolitics";
  }

  if (
    [
      "bank",
      "bond",
      "debt",
      "inflation",
      "recession",
      "market",
      "stocks",
      "oil",
      "gas",
      "treasury",
      "trade",
      "tariff",
      "liquidity",
      "de-dollarization",
    ].some((t) => text.includes(t))
  ) {
    return "Markets & Finance";
  }

  if (
    [
      "digital id",
      "digital identity",
      "biometric",
      "facial recognition",
      "surveillance",
      "tracking",
      "technocracy",
      "social credit",
      "compliance",
      "identity",
      "cyberattack",
      "cyber attack",
      "platform control",
    ].some((t) => text.includes(t))
  ) {
    return "Digital ID / Technocracy";
  }

  if (
    [
      "religion",
      "church",
      "judaism",
      "christianity",
      "zionism",
      "ideology",
      "persecution",
      "blasphemy",
      "sectarian",
    ].some((t) => text.includes(t))
  ) {
    return "Religion & Ideology";
  }

  return "Power & Control";
}

async function parseFeed(feedConfig: FeedConfig) {
  const feed = await parser.parseURL(feedConfig.url);
  const feedTitle = feed.title || feedConfig.label;

  return (feed.items || []).slice(0, feedConfig.maxItems).map((raw) => {
    const title =
      typeof raw.title === "string" ? normalizeWhitespace(raw.title) : "";
    const link = typeof raw.link === "string" ? canonicalUrl(raw.link) : "";
    const contentSnippet = normalizeWhitespace(
      stripHtml(
        typeof raw.contentSnippet === "string"
          ? raw.contentSnippet
          : typeof raw.content === "string"
          ? raw.content
          : typeof raw.summary === "string"
          ? raw.summary
          : ""
      )
    );

    let isoDate: string | undefined;

    if (typeof raw.isoDate === "string") {
      isoDate = raw.isoDate;
    } else if (typeof raw.pubDate === "string") {
      const parsed = new Date(raw.pubDate);
      if (Number.isFinite(parsed.getTime())) {
        isoDate = parsed.toISOString();
      }
    }

    return {
      title,
      link,
      contentSnippet,
      isoDate,
      source: feedTitle,
      feedLabel: feedConfig.label,
      feedKind: feedConfig.kind,
      feedTier: feedConfig.tier,
      feedWeight: feedConfig.weight,
      domain: domainFromUrl(link),
    };
  });
}

function buildSignalStats(item: IntakeItem) {
  const combined = normalizeText(`${item.title} ${item.contentSnippet}`);
  const primaryHits = countHits(combined, PRIMARY_SIGNAL_TERMS);
  const secondaryHits = countHits(combined, SECONDARY_SIGNAL_TERMS);

  return {
    primaryHits,
    secondaryHits,
    hasStrongSignal: primaryHits > 0 || secondaryHits >= 2,
    hasAnySignal: primaryHits > 0 || secondaryHits > 0,
  };
}

function pickItems(
  strictPool: IntakeItem[],
  relaxedPool: IntakeItem[]
): IntakeItem[] {
  const selected: IntakeItem[] = [];
  const seenLinks = new Set<string>();
  const seenTitles = new Set<string>();
  const perDomainCount = new Map<string, number>();
  const perFeedCount = new Map<string, number>();

  const tryAdd = (item: IntakeItem) => {
    const canonical = canonicalUrl(item.link);
    const titleKey = titleSimilarityKey(item.title);

    if (!canonical || !titleKey) return false;
    if (seenLinks.has(canonical)) return false;
    if (seenTitles.has(titleKey)) return false;

    const domainCount = perDomainCount.get(item.domain) || 0;
    if (domainCount >= MAX_PER_DOMAIN) return false;

    const feedCount = perFeedCount.get(item.feedLabel) || 0;
    if (feedCount >= MAX_PER_FEED) return false;

    seenLinks.add(canonical);
    seenTitles.add(titleKey);
    perDomainCount.set(item.domain, domainCount + 1);
    perFeedCount.set(item.feedLabel, feedCount + 1);
    selected.push(item);
    return true;
  };

  for (const item of strictPool) {
    if (selected.length >= MAX_SELECTED) break;
    tryAdd(item);
  }

  if (selected.length < MIN_SELECTED) {
    for (const item of relaxedPool) {
      if (selected.length >= MAX_SELECTED) break;
      tryAdd(item);
    }
  }

  return selected;
}

export async function GET() {
  try {
    const collected: Omit<IntakeItem, "score" | "reasonTags" | "minutesOld">[] =
      [];
    const feedDiagnostics: Array<{
      label: string;
      url: string;
      ok: boolean;
      count: number;
      error?: string;
    }> = [];

    await Promise.all(
      FEEDS.filter((f) => f.enabled !== false).map(async (feedConfig) => {
        try {
          const parsed = await parseFeed(feedConfig);
          const valid = parsed.filter((item) => item.title && item.link);

          for (const item of valid) {
            collected.push(item);
          }

          feedDiagnostics.push({
            label: feedConfig.label,
            url: feedConfig.url,
            ok: true,
            count: valid.length,
          });
        } catch (error) {
          console.error(`Failed feed: ${feedConfig.label}`, error);
          feedDiagnostics.push({
            label: feedConfig.label,
            url: feedConfig.url,
            ok: false,
            count: 0,
            error: error instanceof Error ? error.message : "Feed parse failed",
          });
        }
      })
    );

    const enriched: IntakeItem[] = collected
      .map((item) => {
        const minutesOld = parseDateToMinutesOld(item.isoDate);
        const prelim = { ...item, minutesOld };
        const { score, reasonTags } = scoreItem(prelim);
        return { ...prelim, score, reasonTags };
      })
      .filter((item) => item.title && item.link)
      .filter((item) => isFreshEnough(item.minutesOld))
      .filter((item) => !looksNoisy(item.title, item.contentSnippet))
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.minutesOld - b.minutesOld;
      });

    const strictPool = enriched.filter((item) => {
      const stats = buildSignalStats(item);
      if (!stats.hasStrongSignal) return false;
      if (item.score < STRICT_MIN_SCORE) return false;
      return true;
    });

    const relaxedPool = enriched.filter((item) => {
      const stats = buildSignalStats(item);
      if (!stats.hasAnySignal) return false;
      if (item.score < RELAXED_MIN_SCORE) return false;
      return true;
    });

    const selectedItems = pickItems(strictPool, relaxedPool);

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

    const results: GenerateResult[] = [];

return NextResponse.json(
  {
    ok: true,
    mode: "scan-only",
    baseUrl,
    scanned: collected.length,
    eligible: enriched.length,
    strictCandidates: strictPool.length,
    relaxedCandidates: relaxedPool.length,
    selected: selectedItems.length,

    // 👇 THIS is what you actually need now
    stories: selectedItems.map((item) => ({
      title: item.title,
      link: item.link,
      source: item.source,
      domain: item.domain,
      isoDate: item.isoDate,
      minutesOld: item.minutesOld,
      score: Number(item.score.toFixed(2)),
      reasonTags: item.reasonTags,
      hardCategory: inferHardCategory(item.title, item.contentSnippet),
      snippet: item.contentSnippet,
    })),
  },
  {
    headers: {
      "Cache-Control":
        "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  }
);

        let data: any = null;

        try {
          data = await res.json();
        } catch {
          data = null;
        }

        results.push({
          title: item.title,
          source: item.source,
          domain: item.domain,
          status: res.status,
          ok: !!data?.ok,
          skipped: !!data?.skipped,
          reason: data?.reason || null,
          error: data?.error || null,
          details: data?.details || null,
          score: Number(item.score.toFixed(2)),
          reasonTags: item.reasonTags,
        });
      } catch (error) {
        console.error("Generate from intake failed:", error);

        results.push({
          title: item.title,
          source: item.source,
          domain: item.domain,
          status: 500,
          ok: false,
          skipped: false,
          reason: null,
          error:
            error instanceof Error ? error.message : "Unknown intake error",
          details: null,
          score: Number(item.score.toFixed(2)),
          reasonTags: item.reasonTags,
        });
      }
    }

    const successful = results.filter((r) => r.ok && !r.skipped);
    const skipped = results.filter((r) => r.skipped);
    const failed = results.filter((r) => !r.ok && !r.skipped);

    return NextResponse.json(
      {
        ok: true,
        baseUrl,
        scanned: collected.length,
        eligible: enriched.length,
        strictCandidates: strictPool.length,
        relaxedCandidates: relaxedPool.length,
        selected: selectedItems.length,
        generated: successful.length,
        skipped: skipped.length,
        failed: failed.length,
        feedDiagnostics,
        topSelected: selectedItems.map((item) => ({
          title: item.title,
          domain: item.domain,
          source: item.source,
          isoDate: item.isoDate,
          minutesOld: item.minutesOld,
          score: Number(item.score.toFixed(2)),
          reasonTags: item.reasonTags,
          link: item.link,
        })),
        results,
      },
      {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error) {
    console.error("Intake route failed:", error);

    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Intake failed",
      },
      { status: 500 }
    );
  }
}
