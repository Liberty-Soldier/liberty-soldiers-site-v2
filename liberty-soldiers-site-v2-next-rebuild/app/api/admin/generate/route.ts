import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type QueueItem = {
  id: string;
  title: string;
  excerpt: string;
  source: string;
  sourceUrl?: string;
  dateISO: string;
  byline: string;
  coverImage: string;
  category: string;
  hardCategory: string;
  readTime: string;
  featured: boolean;
  priority: number;
  kind: string;
  slug: string;
  status: string;
  body: string;
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractMessageText(content: unknown): string {
  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((part: any) => {
        if (typeof part === "string") return part;
        if (part?.type === "text" && typeof part.text === "string") return part.text;
        return "";
      })
      .join("")
      .trim();
  }

  return "";
}

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "Missing OPENAI_API_KEY in Vercel environment variables." },
        { status: 500 }
      );
    }

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
        model: "gpt-4o-mini",
        messages: [
          { role: "developer", content: "Return only valid JSON. No markdown fences." },
          { role: "user", content: prompt }
        ],
        temperature: 0.4,
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "lbs_draft",
            strict: true,
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                title: { type: "string" },
                excerpt: { type: "string" },
                category: { type: "string" },
                body: { type: "string" }
              },
              required: ["title", "excerpt", "category", "body"]
            }
          }
        }
      }),
    });

if (!openAIRes.ok) {
  const errorText = await openAIRes.text();
  console.error("OpenAI API error:", errorText);

  return NextResponse.json(
    {
      ok: false,
      error: "OpenAI request failed.",
      details: errorText,
    },
    { status: 500 }
  );
}

    const data = await openAIRes.json();
    const rawContent = data?.choices?.[0]?.message?.content;
    const text = extractMessageText(rawContent);

    console.log("RAW OPENAI CONTENT:", JSON.stringify(rawContent, null, 2));
    console.log("PARSED TEXT:", text);

    let parsed: {
      title: string;
      excerpt: string;
      category: string;
      body: string;
    };

    try {
      parsed = JSON.parse(text);
    } catch (err) {
      console.error("JSON parse failed. Raw text was:", text);

      return NextResponse.json(
        {
          ok: false,
          error: "Model returned invalid JSON.",
          rawText: text || null,
        },
        { status: 500 }
      );
    }

    const safeTitle = parsed.title?.trim() || intakeTitle || "Generated Draft";
    const safeExcerpt = parsed.excerpt?.trim() || "Auto-generated draft.";
    const safeCategory = parsed.category?.trim() || "General";
    const safeBody = parsed.body?.trim() || "No content returned.";

    const item: QueueItem = {
      id: `q-${Date.now()}`,
      title: safeTitle,
      excerpt: safeExcerpt,
      source: intakeUrl ? "AI + URL intake" : "AI + notes intake",
      sourceUrl: intakeUrl || undefined,
      dateISO: new Date().toISOString().slice(0, 10),
      byline: "Liberty Soldiers",
      coverImage: "/og-default.jpg",
      category: safeCategory,
      hardCategory: "Power & Control",
      readTime: "5 min",
      featured: false,
      priority: 3,
      kind: "report",
      slug: slugify(safeTitle),
      status: "draft",
      body: safeBody,
    };

    const queue = ((await kv.get("admin:queue")) as QueueItem[] | null) || [];
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
      { ok: false, error: err instanceof Error ? err.message : "Generate failed" },
      { status: 500 }
    );
  }
}