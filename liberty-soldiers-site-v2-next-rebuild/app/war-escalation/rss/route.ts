import { NextResponse } from "next/server";
import { fetchAllHeadlines } from "../../../lib/rss";
export const dynamic = "force-dynamic";
export const revalidate = 0;

function hostFromUrl(u: string) {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function looksRelevant(text: string) {
  const t = text.toLowerCase();
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
    t.includes("drone") ||
    t.includes("proxy") ||
    t.includes("escalat")
  );
}

function esc(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const SITE = "https://libertysoldiers.com";
  const CANONICAL = `${SITE}/war-escalation`;

  const all = await fetchAllHeadlines();
  const items = all
    .filter((h) => looksRelevant(`${h.title} ${h.summary ?? ""}`))
    .slice(0, 100);

  const now = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc("War & Escalation Radar | Liberty Soldiers")}</title>
    <link>${CANONICAL}</link>
    <description>${esc(
      "Live Iran war escalation tracker covering strikes, proxy activity, Hormuz risk, diplomacy, and strategic signals across the Middle East."
    )}</description>
    <language>en</language>
    <lastBuildDate>${new Date(now).toUTCString()}</lastBuildDate>
    ${items
      .map((it) => {
        const src = it.source || hostFromUrl(it.url) || "External Source";
        const pub = it.publishedAt
          ? new Date(it.publishedAt).toUTCString()
          : new Date(now).toUTCString();

        return `<item>
  <title>${esc(it.title)}</title>
  <link>${esc(it.url)}</link>
  <guid isPermaLink="false">${esc(it.url)}</guid>
  <pubDate>${pub}</pubDate>
  <source>${esc(src)}</source>
  ${it.summary ? `<description>${esc(it.summary)}</description>` : ""}
</item>`;
      })
      .join("\n")}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=300",
    },
  });
}
