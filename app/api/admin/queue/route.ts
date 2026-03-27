import { NextRequest, NextResponse } from "next/server";
import { getQueue, saveQueue, type QueueItem } from "@/lib/admin-store";

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

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { queue: QueueItem[] };

    if (!body.queue || !Array.isArray(body.queue)) {
      return NextResponse.json(
        { ok: false, error: "Invalid queue payload" },
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
