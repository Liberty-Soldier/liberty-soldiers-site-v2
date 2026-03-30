import { NextRequest, NextResponse } from "next/server";
import { getQueue, saveQueue } from "@/lib/admin-store";

export async function GET() {
  try {
    const queue = await getQueue();
    return NextResponse.json({ ok: true, queue });
  } catch (error) {
    console.error("GET /api/admin/queue failed:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to load queue" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.queue) {
      return NextResponse.json(
        { ok: false, error: "Missing queue" },
        { status: 400 }
      );
    }

    await saveQueue(body.queue);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("POST /api/admin/queue failed:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to save queue" },
      { status: 500 }
    );
  }
}
