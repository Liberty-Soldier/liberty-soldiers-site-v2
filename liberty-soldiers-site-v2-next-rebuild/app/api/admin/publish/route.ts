import { NextRequest, NextResponse } from "next/server";
import { getQueue, saveQueue } from "@/lib/admin-store";
import { getPublished, savePublished } from "@/lib/published-store";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { ok: false, error: "Missing id" },
        { status: 400 }
      );
    }

    const queue = await getQueue();
    const item = queue.find((q) => q.id === id);

    if (!item) {
      return NextResponse.json(
        { ok: false, error: "Item not found" },
        { status: 404 }
      );
    }

    // get published list
    const published = await getPublished();

    // add to published (top)
    const newPublished = [
      { ...item, status: "published" },
      ...published,
    ];

    await savePublished(newPublished);

    // remove from queue
    const newQueue = queue.filter((q) => q.id !== id);
    await saveQueue(newQueue);

    return NextResponse.json({
      ok: true,
      published: newPublished,
      queue: newQueue,
    });
  } catch (err) {
    console.error("Publish error:", err);

    return NextResponse.json(
      { ok: false, error: "Publish failed" },
      { status: 500 }
    );
  }
}