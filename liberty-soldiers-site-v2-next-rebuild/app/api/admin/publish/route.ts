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

// try auto-post to X, but do not fail publishing if X fails
const base =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

let xPostResult: any = null;

try {
  const xRes = await fetch(`${base}/api/admin/post-to-x`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: item.title,
      excerpt: item.excerpt,
      slug: item.slug,
    }),
  });

  xPostResult = await xRes.json();
} catch (err) {
  console.error("Auto-post to X failed:", err);
}

// remove from queue
const newQueue = queue.filter((q) => q.id !== id);
await saveQueue(newQueue);

return NextResponse.json({
  ok: true,
  published: newPublished,
  queue: newQueue,
  xPost: xPostResult,
});
  } catch (err) {
    console.error("Publish error:", err);

    return NextResponse.json(
      { ok: false, error: "Publish failed" },
      { status: 500 }
    );
  }
}