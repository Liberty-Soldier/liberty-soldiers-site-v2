import Parser from "rss-parser";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const parser = new Parser();

const FEEDS = [
  "https://feeds.reuters.com/reuters/worldNews",
  "https://feeds.bbci.co.uk/news/world/rss.xml",
  "https://www.aljazeera.com/xml/rss/all.xml",
];

const KEYWORDS = [
  "war",
  "military",
  "iran",
  "israel",
  "china",
  "russia",
  "nato",
  "missile",
  "drone",
  "ai",
  "surveillance",
  "economy",
  "inflation",
  "energy",
  "oil",
  "cyber",
];

function isRelevant(title: string) {
  const lower = title.toLowerCase();
  return KEYWORDS.some((k) => lower.includes(k));
}

function normalizeTitle(title: string) {
  return title
    .toLowerCase()
    .replace(/['"`]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\b(the|a|an|in|on|of|for|to|and|with|over|against|amid|after|under|into|from)\b/g, "")
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

export async function GET() {
  try {
    const items: Array<{
      title: string;
      link: string;
      contentSnippet?: string;
      isoDate?: string;
      source: string;
    }> = [];

    for (const feedUrl of FEEDS) {
      try {
        const feed = await parser.parseURL(feedUrl);

        for (const item of feed.items.slice(0, 4)) {
          if (!item.title || !item.link) continue;

          items.push({
            title: item.title,
            link: item.link,
            contentSnippet:
              typeof item.contentSnippet === "string"
                ? item.contentSnippet
                : typeof item.content === "string"
                ? item.content
                : "",
            isoDate: item.isoDate,
            source: feed.title || feedUrl,
          });
        }
      } catch (err) {
        console.error(`Failed feed: ${feedUrl}`, err);
      }
    }

    const seen = new Set<string>();

    const selected = items
      .filter((i) => isRelevant(i.title))
      .filter((i) => {
        const key = titleSimilarityKey(i.title);
        if (!key) return false;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 2);

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
        });

        const data = await res.json();

        results.push({
          title: item.title,
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
          status: 500,
          ok: false,
          skipped: false,
          reason: null,
          error: err instanceof Error ? err.message : "Unknown intake error",
          details: null,
        });
      }
    }

    return NextResponse.json({
      ok: true,
      baseUrl,
      scanned: items.length,
      selected: selected.length,
      generated: results,
    });
  } catch (error) {
    console.error("Intake route failed:", error);

    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Intake failed" },
      { status: 500 }
    );
  }
}