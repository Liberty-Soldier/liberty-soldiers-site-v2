import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const intakeUrl = body.intakeUrl || "";
    const intakeTitle = body.intakeTitle || "";
    const intakeNotes = body.intakeNotes || "";

    if (!intakeUrl && !intakeTitle && !intakeNotes) {
      return NextResponse.json(
        { ok: false, error: "Missing intake content." },
        { status: 400 }
      );
    }

    const prompt = `
You are writing a FIRST-PASS draft for Liberty Soldiers.

Liberty Soldiers tone and style:
- Serious, investigative, sharp, and direct
- Focus on signal over noise
- Always look at structural meaning, incentives, control systems, narrative management, and end-game implications
- Explain why the development matters, not just what happened
- Ask hard questions when appropriate, but do not make unsupported claims
- Do not sound casual, cheerful, corporate, or generic
- Do not use emojis
- Do not use sensational tabloid phrasing
- Do not invent facts, quotes, or events
- If something is uncertain, frame it as a question or implication, not a fact
- The output should feel like Liberty Soldiers analysis: what is changing, who benefits, what system is being normalized, and where this could lead

Write in this structure:
1. Strong headline
2. Sharp excerpt
3. Multi-paragraph article body
4. Body should include:
   - what happened
   - what stands out
   - why it matters
   - what deeper pattern may be emerging
   - what readers should watch next

Return JSON only in this exact format:
{
  "title": "...",
  "excerpt": "...",
  "category": "...",
  "body": "..."
}

Intake title:
${intakeTitle}

Source URL:
${intakeUrl}

Source notes:
${intakeNotes}
`;

    const openAIRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5.4-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
      }),
    });

    const data = await openAIRes.json();

    const text = data?.choices?.[0]?.message?.content;

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = {
        title: intakeTitle || "Generated Draft",
        excerpt: "Auto-generated draft.",
        category: "General",
        body: text || "No content returned.",
      };
    }

    const safeTitle = parsed.title || intakeTitle || "Generated Draft";

    const item = {
      id: `q-${Date.now()}`,
      title: safeTitle,
      excerpt: parsed.excerpt || "Auto-generated draft.",
      source: intakeUrl ? "AI + URL intake" : "AI + notes intake",
      sourceUrl: intakeUrl || undefined,
      dateISO: new Date().toISOString().slice(0, 10),
      byline: "Liberty Soldiers",
      coverImage: "/og-default.jpg",
      category: parsed.category || "General",
      hardCategory: "Power & Control",
      readTime: "5 min",
      featured: false,
      priority: 3,
      kind: "report",
      slug: safeTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      status: "draft",
      body: parsed.body || "No content returned.",
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
