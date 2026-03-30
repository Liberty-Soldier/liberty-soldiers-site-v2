import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const intakeTitle = body.intakeTitle || "Generated Draft";

    const item = {
      id: `q-${Date.now()}`,
      title: intakeTitle,
      excerpt: "Test draft created successfully.",
      source: "Test",
      dateISO: new Date().toISOString().slice(0, 10),
      byline: "Liberty Soldiers",
      coverImage: "/og-default.jpg",
      category: "Test",
      hardCategory: "Power & Control",
      readTime: "5 min",
      featured: false,
      priority: 3,
      kind: "report",
      slug: intakeTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      status: "draft",
      body: "This is a test draft.",
    };

    const queue = ((await kv.get("admin:queue")) as any[]) || [];
const nextQueue = [item, ...queue];

    await kv.set("admin:queue", nextQueue);

    return NextResponse.json({
      ok: true,
      item,
      queue: nextQueue,
    });
  } catch (err) {
    console.error("Generate error:", err);
    return NextResponse.json(
      { ok: false, error: "Generate failed" },
      { status: 500 }
    );
  }
}
