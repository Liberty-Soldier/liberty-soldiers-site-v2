export const runtime = "edge";
export const revalidate = 600; // seconds

import { NextResponse } from "next/server";
import { fetchAllHeadlines } from "../../../lib/rss";

export async function GET() {
  try {
    const items = await fetchAllHeadlines();
    // Simple shape for the client
    return NextResponse.json(
      { ok: true, items },
      {
        headers: {
          "Cache-Control": "s-maxage=600, stale-while-revalidate=300",
        },
      }
    );
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Failed to load feeds" },
      { status: 500 }
    );
  }
}
