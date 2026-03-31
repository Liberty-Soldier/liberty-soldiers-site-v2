import Parser from "rss-parser";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const parser = new Parser();

const FEEDS = [
  "https://feeds.reuters.com/reuters/worldNews",
  "https://feeds.bbci.co.uk/news/world/rss.xml",
  "https://www.aljazeera.com/xml/rss/all.xml",
];

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

        for (const item of feed.items.slice(0, 5)) {
          if (!item.title || !item.link) continue;

          items.push({
            title: item.title,
            link: item.link,
            contentSnippet: item.contentSnippet || item.content || "",
            isoDate: item.isoDate,
            source: feed.title || feedUrl,
          });
        }
      } catch (err) {
        console.error(`Failed feed: ${feedUrl}`, err);
      }
    }

    const selected = items.slice(0, 5);

    const results = [];

    for (const item of selected) {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_SITE_URL ||
          process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "http://localhost:3000";

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
          ok: data.ok,
        });
      } catch (err) {
        console.error("Generate from intake failed:", err);
        results.push({
          title: item.title,
          ok: false,
        });
      }
    }

    return NextResponse.json({
      ok: true,
      scanned: items.length,
      generated: results,
    });
  } catch (error) {
    console.error("Intake route failed:", error);

    return NextResponse.json(
      { ok: false, error: "Intake failed" },
      { status: 500 }
    );
  }
}