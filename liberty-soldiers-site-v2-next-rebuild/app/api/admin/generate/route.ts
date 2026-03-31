import { NextResponse } from "next/server";
import { getQueue, saveQueue } from "@/lib/admin-store";

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

function mapHardCategory(category: string): string {
  const lower = category.toLowerCase();

  if (
    lower.includes("war") ||
    lower.includes("geopolitic") ||
    lower.includes("military") ||
    lower.includes("conflict")
  ) {
    return "War & Geopolitics";
  }

  if (
    lower.includes("market") ||
    lower.includes("finance") ||
    lower.includes("economy") ||
    lower.includes("inflation") ||
    lower.includes("energy")
  ) {
    return "Markets & Finance";
  }

  if (
    lower.includes("digital") ||
    lower.includes("technocracy") ||
    lower.includes("surveillance") ||
    lower.includes("ai") ||
    lower.includes("biometric")
  ) {
    return "Digital ID / Technocracy";
  }

  if (
    lower.includes("religion") ||
    lower.includes("ideology")
  ) {
    return "Religion & Ideology";
  }

  if (
    lower.includes("prophecy")
  ) {
    return "Prophecy Watch";
  }

  return "Power & Control";
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

Liberty Soldiers voice:
- hard-hitting
- serious
- sharp
- investigative
- skeptical of official narratives
- focused on power, control, incentives, manipulation, escalation, and second-order consequences
- never casual, cheerful, soft, corporate, or generic
- never write like a neutral wire-service reporter
- write like an independent geopolitical and systems analyst cutting through noise

Core framing rules:
- Do not just describe the event. Explain what it signals.
- Focus on what is changing, who benefits, what system is being normalized, and what readers should watch next.
- Highlight contradiction, escalation risk, narrative management, institutional motive, or structural consequence where relevant.
- Ask hard questions when justified, but do not make unsupported claims.
- If facts are uncertain, frame them as implications, pressure points, or open questions.
- Avoid fluff, filler, generic scene-setting, and empty transitions.
- Do not use emojis.
- Do not use sensational tabloid phrasing.
- Do not invent facts, quotes, motives, or events.

Headline rules:
- Headlines must be strong, sharp, and clickable without sounding fake.
- Avoid bland headlines like "X happens amid Y."
- Favor headlines that emphasize escalation, contradiction, pressure, exposure, control, strategic risk, or systemic consequences.
- Use tension and consequence.
- Keep the headline clean, direct, and punchy.
- Do not use clickbait questions.
- Do not use all caps.
- Prefer strong Liberty Soldiers-style headline patterns that expose pressure, contradiction, escalation, normalization, or narrative shifts.

Excerpt rules:
- The excerpt should hit hard in 1-2 sentences.
- It should tell the reader why this matters now.
- It should sound like Liberty Soldiers, not a generic news summary.
- It should frame the stakes, not just summarize the event.

Body rules:
- Open strong. Do not waste the first paragraph.
- Paragraph 1 should immediately frame why the development matters.
- Then explain what happened.
- Then explain what stands out.
- Then explain the deeper pattern or structural meaning.
- End with what to watch next and why it matters.
- Keep the writing tight, muscular, and readable.
- Use short-to-medium paragraphs.
- Avoid repeating the same point in slightly different words.
- Write with authority and controlled urgency.
- The article should feel like signal detection, not passive reporting.
- Where appropriate, contrast the official narrative with the visible strategic reality.

Category rules:
- Pick the most fitting category based on the story.
- Favor categories like:
  Power & Control
  War & Geopolitics
  Markets & Finance
  Digital ID / Technocracy
  Religion & Ideology
  Prophecy Watch

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
        model: "gpt-4.1",
        messages: [
          {
            role: "developer",
            content: "Return only valid JSON. No markdown fences.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.5,
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
                body: { type: "string" },
              },
              required: ["title", "excerpt", "category", "body"],
            },
          },
        },
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
    const safeCategory = parsed.category?.trim() || "Power & Control";
    const safeBody = parsed.body?.trim() || "No content returned.";
    const safeHardCategory = mapHardCategory(safeCategory);

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
      hardCategory: safeHardCategory,
      readTime: "5 min",
      featured: false,
      priority: 3,
      kind: "report",
      slug: slugify(safeTitle),
      status: "draft",
      body: safeBody,
    };

    const queue = await getQueue();

    const exists = queue.find(
      (q) =>
        q.sourceUrl &&
        item.sourceUrl &&
        q.sourceUrl === item.sourceUrl
    );

    if (exists) {
      return NextResponse.json({
        ok: true,
        skipped: true,
        reason: "duplicate",
      });
    }

    const nextQueue = [item, ...queue];

    await saveQueue(nextQueue);

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