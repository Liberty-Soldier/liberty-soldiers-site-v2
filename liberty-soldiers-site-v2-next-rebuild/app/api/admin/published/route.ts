import { NextResponse } from "next/server";
import { getPublished } from "@/lib/published-store";

export async function GET() {
  try {
    const published = await getPublished();
    return NextResponse.json({ ok: true, published });
  } catch (error) {
    console.error("GET /api/admin/published failed:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to load published articles" },
      { status: 500 }
    );
  }
}