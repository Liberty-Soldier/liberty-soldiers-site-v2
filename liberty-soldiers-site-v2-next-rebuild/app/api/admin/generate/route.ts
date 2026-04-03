import { NextRequest, NextResponse } from "next/server";
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
function getReadTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}

function extractMessageText(content: unknown): string {
  if (typeof content === "string") return content;

  if (Array.isArray(content)) {
    return content
      .map((part: any) => {
        if (typeof part === "string") return part;
        if (part?.type === "text" && typeof part.text === "string") {
          return part.text;
        }
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

  if (lower.includes("religion") || lower.includes("ideology")) {
    return "Religion & Ideology";
  }

  if (lower.includes("prophecy")) {
    return "Prophecy Watch";
  }

  return "Power & Control";
}

export async function POST(req: NextRequest) {
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
- bold
- hard-hitting
- sharp
- serious
- investigative
- anti-establishment
- skeptical of official narratives
- focused on power, control, manipulation, incentives, escalation, engineered perception, and second-order consequences
- never casual, soft, apologetic, corporate, sanitized, or generic
- never write like mainstream media
- never sound like Reuters, AP, CBS, or a neutral wire-service reporter
- write like an independent analyst exposing pressure points, contradictions, narrative control, and deeper system intent

Style target:
- blend the punch and edge of ZeroHedge-style framing
- with the clean, focused, investigative cadence of Greg Reese
- with the urgency and anti-narrative instinct of alternative media
- but do NOT fabricate facts
- do NOT invent motives unless clearly framed as analysis or implication
- do NOT make claims that go beyond the source material without labeling them as questions, patterns, or strategic implications

Core framing rules:
- Do not merely summarize the event.
- Explain what it signals.
- Explain why it matters.
- Explain what larger pattern it fits into.
- Explain who benefits, what gets normalized, what pressure is building, and what the public is being trained to accept.
- Focus on structural meaning, not just surface facts.
- Treat every story as part of a wider system: war escalation, narrative control, economic pressure, surveillance normalization, technocratic management, censorship, ideological conditioning, or social destabilization.
- Show how headlines can distract, soften, invert, or conceal the real significance of events.
- Highlight contradiction, hypocrisy, narrative management, institutional motive, pressure campaigns, or strategic consequences whenever supported by the material.
- Ask hard questions when justified.
- If facts are uncertain, frame them as implications, pressure points, or open strategic questions.
- Never sound timid.
- Never sound like a generic explainer.
- Avoid filler, throat-clearing, and bland scene-setting.

Headline rules:
- Headlines must be strong, sharp, and clickable without sounding fake.
- Do not use weak constructions like "X happens amid Y."
- Do not use boring newspaper headlines.
- Favor headlines that emphasize escalation, contradiction, exposure, control, pressure, manipulation, strategic risk, or narrative shifts.
- Headlines should feel like signal detection, not passive reporting.
- Keep them clean, direct, and aggressive.
- No clickbait questions.
- No all caps.

Excerpt rules:
- The excerpt must hit hard in 1-2 sentences.
- It must tell the reader why this matters now.
- It should frame the stakes, pressure, or hidden significance.
- It should not read like a summary written for a generic newsroom.
- It should sound like Liberty Soldiers.

Body rules:
- Write as if the article is exposing what the headline alone does not tell the reader.
- Open strong immediately.
- The first paragraph should frame why the development matters in a bigger sense.
- Then explain what happened.
- Then explain what stands out.
- Then explain what system, narrative, or strategic pattern it fits into.
- End with what readers should watch next.
- Keep paragraphs tight and muscular.
- Use controlled urgency.
- Be readable, forceful, and clear.
- Do not repeat the same point in different words.
- Avoid fluff.
- Avoid fake drama.
- Avoid vague emotional writing.
- Favor strong, specific language.
- This should feel like a warning flare or signal brief, not an article written to maintain neutrality.

Narrative-analysis rules:
- Consider whether the story reflects:
  - escalation management
  - public conditioning
  - narrative laundering
  - institutional panic
  - market signaling
  - censorship pressure
  - war normalization
  - economic coercion
  - technocratic expansion
  - ideological manipulation
- Do not force these themes if unsupported, but check for them.

Category rules:
- Pick the best-fitting category from:
  - Power & Control
  - War & Geopolitics
  - Markets & Finance
  - Digital ID / Technocracy
  - Religion & Ideology
  - Prophecy Watch

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
    const safeSlug = slugify(safeTitle);

    const queue = await getQueue();

    const exists = queue.find(
      (q) => q.sourceUrl && intakeUrl && q.sourceUrl === intakeUrl
    );

    if (exists) {
      return NextResponse.json({
        ok: true,
        skipped: true,
        reason: "duplicate",
      });
    }

    const skipOg = body.skipOg === true;
    
    let coverImage = "/og-default.jpg";

if (!skipOg) {
  try {
    const ogRes = await fetch(`${req.nextUrl.origin}/api/admin/generate-og`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: safeTitle,
        excerpt: safeExcerpt,
        hardCategory: safeHardCategory,
        slug: safeSlug,
      }),
    });

    const ogData = await ogRes.json();

    if (ogRes.ok && ogData?.ok && ogData?.url) {
      coverImage = ogData.url;
    } else {
      console.error("OG generation fallback used:", ogData);
    }
  } catch (error) {
    console.error("OG generation request failed:", error);
  }
}

    const item: QueueItem = {
      id: `q-${Date.now()}`,
      title: safeTitle,
      excerpt: safeExcerpt,
      source: intakeUrl ? "AI + URL intake" : "AI + notes intake",
      sourceUrl: intakeUrl || undefined,
      dateISO: new Date().toISOString().slice(0, 10),
      byline: "Liberty Soldiers",
      coverImage,
      category: safeCategory,
      hardCategory: safeHardCategory,
      readTime: getReadTime(safeBody),
      featured: false,
      priority: 3,
      kind: "report",
      slug: safeSlug,
      status: "draft",
      body: safeBody,
    };

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