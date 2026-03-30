import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ReportKind = "report" | "analysis" | "brief" | "news";
type QueueStatus = "draft" | "review" | "approved" | "rejected";

type HardCategory =
  | "Power & Control"
  | "Markets & Finance"
  | "Digital ID / Technocracy"
  | "War & Geopolitics"
  | "Religion & Ideology"
  | "Prophecy Watch";

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
  hardCategory: HardCategory;
  readTime: string;
  featured: boolean;
  priority: number;
  kind: ReportKind;
  slug: string;
  status: QueueStatus;
  body: string;
};

type GenerateBody = {
  intakeUrl?: string;
  intakeTitle?: string;
  intakeNotes?: string;
  category?: string;
  hardCategory?: HardCategory;
  source?: string;
};

type GeneratedDraft = {
  title: string;
  excerpt: string;
  category: string;
  hardCategory: HardCategory;
  readTime: string;
  kind: ReportKind;
  body: string;
};

const HARD_CATEGORIES: HardCategory[] = [
  "Power & Control",
  "Markets & Finance",
  "Digital ID / Technocracy",
  "War & Geopolitics",
  "Religion & Ideology",
  "Prophecy Watch",
];

const REPORT_KINDS: ReportKind[] = ["report", "analysis", "brief", "news"];

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getHardCategoryDefaultImage(hardCategory: HardCategory) {
  switch (hardCategory) {
    case "Power & Control":
      return "/og-power-control.jpg";
    case "Markets & Finance":
      return "/og-markets-finance.jpg";
    case "Digital ID / Technocracy":
      return "/og-digital-id.jpg";
    case "War & Geopolitics":
      return "/og-war-geopolitics.jpg";
    case "Religion & Ideology":
      return "/og-religion-ideology.jpg";
    case "Prophecy Watch":
      return "/og-prophecy-watch.jpg";
    default:
      return "/og-default.jpg";
  }
}

function normalizeHardCategory(value: unknown, fallback: HardCategory): HardCategory {
  return HARD_CATEGORIES.includes(value as HardCategory)
    ? (value as HardCategory)
    : fallback;
}

function normalizeKind(value: unknown): ReportKind {
  return REPORT_KINDS.includes(value as ReportKind)
    ? (value as ReportKind)
    : "report";
}

function normalizeReadTime(value: unknown): string {
  if (typeof value !== "string") return "5 min";
  const trimmed = value.trim();
  return trimmed || "5 min";
}

function validateGeneratedDraft(
  input: unknown,
  fallbackHardCategory: HardCategory
): GeneratedDraft {
  if (!input || typeof input !== "object") {
    throw new Error("Model returned invalid draft payload.");
  }

  const data = input as Record<string, unknown>;

  const title =
    typeof data.title === "string" && data.title.trim()
      ? data.title.trim()
      : "Untitled Draft";

  const excerpt =
    typeof data.excerpt === "string" && data.excerpt.trim()
      ? data.excerpt.trim()
      : "Draft generated from intake.";

  const category =
    typeof data.category === "string" && data.category.trim()
      ? data.category.trim()
      : "General";

  const body =
    typeof data.body === "string" && data.body.trim()
      ? data.body.trim()
      : "No body returned.";

  return {
    title,
    excerpt,
    category,
    hardCategory: normalizeHardCategory(data.hardCategory, fallbackHardCategory),
    readTime: normalizeReadTime(data.readTime),
    kind: normalizeKind(data.kind),
    body,
  };
}

function extractMessageContent(payload: any): string {
  const content = payload?.choices?.[0]?.message?.content;

  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    const textPart = content.find((part) => part?.type === "text" && typeof part.text === "string");
    if (textPart?.text) return textPart.text;
  }

  throw new Error("No model content returned.");
}

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "Missing OPENAI_API_KEY." },
        { status: 500 }
      );
    }

    const body = (await req.json()) as GenerateBody;

    const intakeUrl = body.intakeUrl?.trim() || "";
    const intakeTitle = body.intakeTitle?.trim() || "";
    const intakeNotes = body.intakeNotes?.trim() || "";
    const source = body.source?.trim() || (intakeUrl ? "Manual URL intake" : "Manual notes intake");
    const fallbackHardCategory = normalizeHardCategory(
      body.hardCategory,
      "Power & Control"
    );

    if (!intakeUrl && !intakeTitle && !intakeNotes) {
      return NextResponse.json(
        { ok: false, error: "Missing intake content." },
        { status: 400 }
      );
    }

    const developerPrompt = `
You are generating a FIRST-PASS Liberty Soldiers article draft for an internal CMS.

Writing rules:
- Serious, direct, investigative tone.
- Clear, concrete, readable.
- No fluff, no emojis, no hype language.
- Do not invent facts, quotes, dates, or sources.
- Use only the intake provided by the user.
- If details are missing, write cautiously and signal uncertainty plainly.
- Keep the body self-contained and publication-ready as a draft.
- The article should feel like a Liberty Soldiers report: signal over noise, structural analysis, implications, and narrative scrutiny.
- Return JSON only.
- The hardCategory must be one of:
  "Power & Control"
  "Markets & Finance"
  "Digital ID / Technocracy"
  "War & Geopolitics"
  "Religion & Ideology"
  "Prophecy Watch"

Field rules:
- title: strong, clean headline
- excerpt: 1-2 sentence summary
- category: short label like "Energy", "War Risk", "Censorship", "Markets"
- hardCategory: choose the best fit
- readTime: like "5 min"
- kind: one of "report", "analysis", "brief", "news"
- body: full multi-paragraph article draft in plain text, no markdown heading syntax
`.trim();

    const userPrompt = `
Create a Liberty Soldiers draft from this intake.

Intake title:
${intakeTitle || "(none provided)"}

Intake URL:
${intakeUrl || "(none provided)"}

Preferred hard category:
${fallbackHardCategory}

Optional category hint:
${body.category?.trim() || "(none provided)"}

Source label:
${source}

Source notes:
${intakeNotes || "(none provided)"}
`.trim();

    const openAIRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5.4-mini",
        temperature: 0.4,
        messages: [
          { role: "developer", content: developerPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "liberty_soldiers_generated_draft",
            strict: true,
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                title: { type: "string" },
                excerpt: { type: "string" },
                category: { type: "string" },
                hardCategory: {
                  type: "string",
                  enum: HARD_CATEGORIES,
                },
                readTime: { type: "string" },
                kind: {
                  type: "string",
                  enum: REPORT_KINDS,
                },
                body: { type: "string" },
              },
              required: [
                "title",
                "excerpt",
                "category",
                "hardCategory",
                "readTime",
                "kind",
                "body",
              ],
            },
          },
        },
      }),
    });

    if (!openAIRes.ok) {
      const errorText = await openAIRes.text();
      return NextResponse.json(
        { ok: false, error: "OpenAI request failed.", details: errorText },
        { status: 500 }
      );
    }

    const completion = await openAIRes.json();
    const rawText = extractMessageContent(completion);
    const parsed = JSON.parse(rawText);
    const generated = validateGeneratedDraft(parsed, fallbackHardCategory);

    const queue = ((await kv.get("admin:queue")) as QueueItem[] | null) || [];

    const item: QueueItem = {
      id: `q-${Date.now()}`,
      title: generated.title,
      excerpt: generated.excerpt,
      source,
      sourceUrl: intakeUrl || undefined,
      dateISO: new Date().toISOString().slice(0, 10),
      byline: "Liberty Soldiers",
      coverImage: getHardCategoryDefaultImage(generated.hardCategory),
      category: generated.category,
      hardCategory: generated.hardCategory,
      readTime: generated.readTime,
      featured: false,
      priority: 3,
      kind: generated.kind,
      slug: slugify(generated.title),
      status: "draft",
      body: generated.body,
    };

    const nextQueue = [item, ...queue];
    await kv.set("admin:queue", nextQueue);

    return NextResponse.json({
      ok: true,
      item,
      queue: nextQueue,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown generate route error.";

    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}
