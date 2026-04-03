import Parser from "rss-parser";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const parser = new Parser();

const FEEDS = [
  // Mainstream world/business
  "https://feeds.bbci.co.uk/news/world/rss.xml",
  "https://feeds.bbci.co.uk/news/business/rss.xml",
  "https://www.aljazeera.com/xml/rss/all.xml",
  "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
  "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml",
  "https://feeds.skynews.com/feeds/rss/world.xml",
  "https://feeds.skynews.com/feeds/rss/business.xml",
  "https://www.cnbc.com/id/100003114/device/rss/rss.html",

  // Added: broader Liberty Soldiers-style macro / war / control signal
  "https://cms.zerohedge.com/fullrss2.xml",
];

const KEYWORDS = [
  // War / geopolitics
  "war",
  "military",
  "iran",
  "israel",
  "gaza",
  "china",
  "russia",
  "ukraine",
  "nato",
  "missile",
  "drone",
  "strike",
  "attack",
  "troops",
  "sanctions",
  "navy",
  "carrier",
  "nuclear",
  "escalation",
  "conflict",
  "ceasefire",
  "border",
  "terror",
  "proxy",
  "shipping lane",
  "strait",
  "hormuz",

  // Markets / finance / energy
  "economy",
  "inflation",
  "recession",
  "debt",
  "market",
  "markets",
  "stocks",
  "bank",
  "banking",
  "central bank",
  "cbdc",
  "digital currency",
  "credit",
  "bond",
  "treasury",
  "tariff",
  "trade",
  "energy",
  "oil",
  "gas",
  "shipping",
  "supply chain",
  "commodity",
  "commodities",
  "dollar",
  "de-dollarization",

  // Control / technocracy / surveillance
  "ai",
  "surveillance",
  "biometric",
  "digital id",
  "digital identity",
  "facial recognition",
  "tracking",
  "cyber",
  "technocracy",
  "platform control",
  "content moderation",
  "social credit",
  "identity",
  "compliance",
  "rationing",
  "lockdown",
  "mobility restriction",
  "emergency powers",

  // Narrative / censorship / deception
  "censorship",
  "speech",
  "free speech",
  "disinformation",
  "misinformation",
  "propaganda",
  "narrative",
  "narrative management",
  "psyop",
  "psychological operations",
  "influence operation",
  "media manipulation",
  "deception",

  // Religion / ideology / persecution
  "religion",
  "ideology",
  "persecution",
  "church",
  "christianity",
  "judaism",
  "zionism",
  "globalism",
  "migration",
  "refugee",
  "ngo",
];

function isRelevant(title: string, snippet = "") {
  const lower = `${title} ${snippet}`.toLowerCase();
  return KEYWORDS.some((k) => lower.includes(k));
}

function normalizeTitle(title: string) {
  return title
    .toLowerCase()
    .replace(/['"`]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(
      /\b(the|a|an|in|on|of|for|to|and|with|over|against|amid|after|under|into|from|as|at|by)\b/g,
      ""
    )
    .replace(/\s+/g, " ")
    .trim();
}

function titleSimilarityKey(title: string) {
  return normalizeTitle(title)
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 7)
    .join(" ");
}

function domainFromUrl(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "unknown";
  }
}

export async function GET() {
  try {
    const items: Array<{
      title: string;
      link: string;
      contentSnippet?: string;
      isoDate?: string;
      source: string;
      domain: string;
    }> = [];

    for (const feedUrl of FEEDS) {
      try {
        const feed = await parser.parseURL(feedUrl);

        for (const item of feed.items.slice(0, 10)) {
          if (!item.title || !item.link) continue;

          const contentSnippet =
            typeof item.contentSnippet === "string"
              ? item.contentSnippet
              : typeof item.content === "string"
              ? item.content
              : "";

          items.push({
            title: item.title,
            link: item.link,
            contentSnippet,
            isoDate: item.isoDate,
            source: feed.title || feedUrl,
            domain: domainFromUrl(item.link),
          });
        }
      } catch (err) {
        console.error(`Failed feed: ${feedUrl}`, err);
      }
    }

    const seenTitles = new Set<string>();
    const perDomainCount = new Map<string, number>();

    const selected = items
      .filter((i) => isRelevant(i.title, i.contentSnippet || ""))
      .filter((i) => {
        const key = titleSimilarityKey(i.title);
        if (!key) return false;
        if (seenTitles.has(key)) return false;
        seenTitles.add(key);
        return true;
      })
      .filter((i) => {
        const count = perDomainCount.get(i.domain) || 0;
        if (count >= 3) return false;
        perDomainCount.set(i.domain, count + 1);
        return true;
      })
      .slice(0, 10);

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

    const results = [];

    for (const item of selected) {
      try {
        const res = await fetch(`${baseUrl}/api/admin/generate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            intakeUrl: item.link,
            intakeTitle: item.title,
            intakeNotes: item.contentSnippet || "",
          }),
          cache: "no-store",
        });

        const data = await res.json();

        results.push({
          title: item.title,
          source: item.source,
          domain: item.domain,
          status: res.status,
          ok: !!data.ok,
          skipped: data.skipped || false,
          reason: data.reason || null,
          error: data.error || null,
          details: data.details || null,
        });
      } catch (err) {
        console.error("Generate from intake failed:", err);

        results.push({
          title: item.title,
          source: item.source,
          domain: item.domain,
          status: 500,
          ok: false,
          skipped: false,
          reason: null,
          error: err instanceof Error ? err.message : "Unknown intake error",
          details: null,
        });
      }
    }

    const successful = results.filter((r) => r.ok && !r.skipped);

    return NextResponse.json(
      {
        ok: true,
        baseUrl,
        scanned: items.length,
        selected: selected.length,
        generated: successful.length,
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