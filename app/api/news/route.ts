export const runtime = "nodejs";       // ← switch from "edge"
export const revalidate = 600;         // seconds

import { NextResponse } from "next/server";
import { fetchAllHeadlines } from "@/lib/rss"; // if alias fails: "../../../lib/rss"

export async function GET() {
  try {
    const items = await fetchAllHeadlines();

    return NextResponse.json(
      { ok: true, count: items.length, items },
      {
        headers: {
          "Cache-Control": "s-maxage=600, stale-while-revalidate=300",
        },
      }
    );
  } catch (e: any) {
    // This will show in Vercel function logs
    console.error("API /news error:", e);
    return NextResponse.json(
      { ok: false, error: e?.message || String(e) },
      { status: 500 }
    );
  }
}
