import { NextRequest, NextResponse } from "next/server";
import { getQueue, saveQueue } from "@/lib/admin-store";
import { getPublished } from "@/lib/published-store";

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

type IntakeMeta = {
  source?: string;
  domain?: string;
  isoDate?: string;
  score?: number;
  reasonTags?: string[];
  feedLabel?: string;
  feedKind?: string;
  feedTier?: string;
  hardCategory?: string;
};

type DraftPayload = {
  title: string;
  excerpt: string;
  category: string;
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

function normalizeText(input: string): string {
  return input.toLowerCase().replace(/\s+/g, " ").trim();
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

function inferHardCategoryFromText(title: string, notes: string): string {
  const text = normalizeText(`${title} ${notes}`);

  if (
    [
      "war",
      "strike",
      "airstrike",
      "drone",
      "missile",
      "troops",
      "carrier",
      "retaliation",
      "ceasefire",
      "military",
      "border",
      "hormuz",
      "red sea",
      "black sea",
      "nato",
      "iran",
      "israel",
      "ukraine",
      "russia",
      "china",
      "taiwan",
    ].some((term) => text.includes(term))
  ) {
    return "War & Geopolitics";
  }

  if (
    [
      "market",
      "stocks",
      "bond",
      "bank",
      "banking",
      "debt",
      "liquidity",
      "inflation",
      "recession",
      "oil",
      "gas",
      "pipeline",
      "treasury",
      "tariff",
      "trade",
      "economy",
    ].some((term) => text.includes(term))
  ) {
    return "Markets & Finance";
  }

  if (
    [
      "digital id",
      "digital identity",
      "biometric",
      "facial recognition",
      "surveillance",
      "tracking",
      "cyberattack",
      "censorship",
      "technocracy",
      "identity",
      "compliance",
      "platform control",
      "ai",
    ].some((term) => text.includes(term))
  ) {
    return "Digital ID / Technocracy";
  }

  if (
    [
      "religion",
      "church",
      "christian",
      "judaism",
      "zionism",
      "ideology",
      "persecution",
      "sectarian",
      "blasphemy",
    ].some((term) => text.includes(term))
  ) {
    return "Religion & Ideology";
  }

  return "Power & Control";
}

function scoreToPriority(score?: number): number {
  if (!score || !Number.isFinite(score)) return 3;
  if (score >= 10) return 1;
  if (score >= 7) return 2;
  if (score >= 4.5) return 3;
  return 4;
}

function shouldReject(meta: IntakeMeta, title: string, notes: string): string | null {
  const text = normalizeText(`${title} ${notes}`);
  const score = typeof meta?.score === "number" ? meta.score : undefined;

  if (score !== undefined && score < 2.8) {
    return "low-score";
  }

  const hardRejectTerms = [
    "live updates",
    "minute by minute",
    "how to watch",
    "photos",
    "video",
    "quiz",
    "opinion",
    "editorial",
    "recipe",
    "sports",
    "soccer",
    "baseball",
    "basketball",
    "celebrity",
    "fashion",
    "lifestyle",
    "lottery",
    "crossword",
  ];

  if (hardRejectTerms.some((term) => text.includes(term))) {
    return "noise";
  }

  const weakBusinessTerms = [
    "quarterly results",
    "earnings beat",
    "earnings miss",
    "shares rose",
    "shares fell",
    "stock rises",
    "stock falls",
  ];

  if (weakBusinessTerms.some((term) => text.includes(term)) && (!score || score < 6)) {
    return "market-noise";
  }

  if (title.trim().length < 12 && (!notes || notes.trim().length < 40)) {
    return "thin-input";
  }

  return null;
}

function validateDraftPayload(parsed: any): parsed is DraftPayload {
  return !!parsed &&
    typeof parsed.title === "string" &&
    typeof parsed.excerpt === "string" &&
    typeof parsed.category === "string" &&
    typeof parsed.body === "string";
}

function sanitizeExcerpt(input: string): string {
  return input.replace(/\s+/g, " ").trim().slice(0, 260);
}

function sanitizeBody(input: string): string {
  return input
    .replace(/\r/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function buildPrompt(params: {
  intakeTitle: string;
  intakeUrl: string;
  intakeNotes: string;
  meta: IntakeMeta;
  preferredHardCategory: string;
}) {
  const { intakeTitle, intakeUrl, intakeNotes, meta, preferredHardCategory } = params;

  return `
You are writing a FIRST-PASS DRAFT for Liberty Soldiers.

This is not generic journalism.
This is a hard-hitting pressure report designed to expose what the headline hides, attack the sanitized framing, and force the reader to feel the stakes.

VOICE:
- aggressive
- sharp
- elite
- confrontational
- hard-hitting
- anti-establishment
- suspicious of official framing
- fast, clean, and relentless
- written like someone who sees the pressure pattern before everyone else does
- emotionally charged but still fact-grounded
- unapologetic
- not goofy, not sloppy, not tabloid-dumb

CORE STYLE:
- hit hard from line one
- write with force, not softness
- expose, don’t politely describe
- frame developments as pressure, coercion, escalation, manipulation, corruption, narrative management, or system failure
- sound dangerous, controlled, and high-agency
- every paragraph should feel like it lands a punch
- the writing should feel too alive to be mistaken for wire copy

NEVER:
- write like Reuters, AP, CNN, BBC, Axios, or a generic policy newsletter
- sound balanced just for the sake of sounding balanced
- use bland transitions like "this comes amid," "raises questions," "underscores concerns," or "in a rapidly evolving situation"
- summarize the event like a passive observer
- sound corporate, academic, timid, sanitized, or committee-edited
- use filler
- repeat the same point with different wording
- overdramatize with fake facts
- invent motives as fact
- sound like social media slang, memes, parody, or amateur rage-posting

ALWAYS:
- explain immediately why the event matters in a bigger and more dangerous sense
- identify the pressure point beneath the headline
- expose what is being normalized
- identify who gains leverage, who absorbs risk, and what system is being reshaped
- use hard, memorable lines
- make the reader feel that something real is moving beneath the surface
- end with a sharp watch-next implication, not a weak wrap-up

OPENING RULE:
The first paragraph must hit immediately.
No warm-up.
No background throat-clearing.
No neutral summary.
Open with consequence, coercion, escalation, exposure, contradiction, or a line that makes the stakes unmistakable.

MANDATORY STRUCTURE:
1. Opening strike:
   Explain why this matters in blunt terms immediately.
2. What happened:
   Briefly explain the event without dragging.
3. What stands out:
   Explain what is exposed, escalated, normalized, or strategically revealing.
4. Pattern:
   Explain what larger pattern of control, pressure, narrative management, war posture, system failure, or institutional corruption this fits into.
5. Why it matters next:
   Explain what readers should watch, what may come next, or what line may be crossed next.

HEADLINE RULES:
- hard-hitting
- clean
- memorable
- no questions
- no generic newspaper style
- should sound like exposure, escalation, or a pressure event
- avoid dead wording like "amid tensions" or "as conflict continues"

EXCERPT RULES:
- 1-2 sentences
- should feel like a punch, not a summary
- explain why this matters right now
- should make someone want to read immediately
- no bland recap language

BODY RULES:
- plain text only
- paragraph breaks
- no markdown
- no bullet points
- no fake certainty
- use strong declarative sentences
- vary sentence length for rhythm and force
- include at least 3 lines that feel quotable or highly shareable
- keep it sharp, not bloated

CATEGORY RULES:
Choose the best-fitting category from exactly one of:
- Power & Control
- War & Geopolitics
- Markets & Finance
- Digital ID / Technocracy
- Religion & Ideology
- Prophecy Watch

OUTPUT GOAL:
This should read like elite independent media that is trying to wake people up, not inform them politely.
It should feel dangerous, focused, and impossible to confuse with establishment news copy.

INTAKE TITLE:
${intakeTitle}

SOURCE URL:
${intakeUrl || "N/A"}

SOURCE NOTES:
${intakeNotes}

INTAKE META:
- source: ${meta.source || "unknown"}
- domain: ${meta.domain || "unknown"}
- isoDate: ${meta.isoDate || "unknown"}
- score: ${typeof meta.score === "number" ? meta.score : "unknown"}
- reasonTags: ${Array.isArray(meta.reasonTags) ? meta.reasonTags.join(", ") : "none"}
- feedLabel: ${meta.feedLabel || "unknown"}
- feedKind: ${meta.feedKind || "unknown"}
- feedTier: ${meta.feedTier || "unknown"}
- preferred hard category: ${preferredHardCategory}

Return JSON in exactly this shape:
{
  "title": "...",
  "excerpt": "...",
  "category": "...",
  "body": "..."
}
`.trim();
}

async function generateOgImage(params: {
  req: NextRequest;
  title: string;
  excerpt: string;
  hardCategory: string;
  slug: string;
}) {
  const { req, title, excerpt, hardCategory, slug } = params;

  try {
    const ogRes = await fetch(`${req.nextUrl.origin}/api/admin/generate-og`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        excerpt,
        hardCategory,
        slug,
      }),
    });

    let ogData: any = null;
    try {
      ogData = await ogRes.json();
    } catch {
      ogData = null;
    }

    if (ogRes.ok && ogData?.ok && ogData?.url) {
      return ogData.url as string;
    }

    console.error("OG generation fallback used:", ogData);
    return "/og-default.jpg";
  } catch (error) {
    console.error("OG generation request failed:", error);
    return "/og-default.jpg";
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          ok: false,
          error: "Missing OPENAI_API_KEY in Vercel environment variables.",
        },
        { status: 500 }
      );
    }

const body = await req.json();

const mode = body.mode || "auto";
const id = body.id || "";
const intakeUrl = body.intakeUrl || "";
const intakeTitle = body.intakeTitle || "";
const intakeNotes = body.intakeNotes || "";
const meta = body.intakeMeta || {};

    if (!intakeUrl && !intakeTitle && !intakeNotes) {
      return NextResponse.json(
        { ok: false, error: "Missing intake content." },
        { status: 400 }
      );
    }

    const queue = await getQueue();
    const published = await getPublished();

const existsInQueue = queue.find(
  (q) =>
    q.sourceUrl &&
    intakeUrl &&
    q.sourceUrl === intakeUrl &&
    q.id !== id
);

const existsInPublished = published.find(
  (p) => p.sourceUrl && intakeUrl && p.sourceUrl === intakeUrl
);

if (existsInQueue || existsInPublished) {
  return NextResponse.json({
    ok: true,
    skipped: true,
    reason: "duplicate",
  });
}
    if (mode === "auto") {
  const inferredHardCategory =
    meta?.hardCategory || "Power & Control";

  const item: QueueItem = {
    id: `q-${Date.now()}`,
    title: intakeTitle || "Untitled",
    excerpt: (intakeNotes || "").replace(/\s+/g, " ").trim().slice(0, 220),
    source: meta?.source || "AI + URL intake",
    sourceUrl: intakeUrl || undefined,
    dateISO: new Date().toISOString().slice(0, 10),
    byline: "Liberty Soldiers",
    coverImage: "/og-default.jpg",
    category: inferredHardCategory,
    hardCategory: inferredHardCategory,
    readTime: "1 min",
    featured: false,
    priority: scoreToPriority(meta?.score),
    kind: "report",
    slug: slugify(intakeTitle || `draft-${Date.now()}`),
    status: "pending",
    body: "",
  };

  const nextQueue = [item, ...queue];
  await saveQueue(nextQueue);

  return NextResponse.json({
    ok: true,
    queued: true,
    skippedGeneration: true,
    mode: "auto",
    item,
    queue: nextQueue,
  });
}

    if (mode === "auto") {
  const inferredHardCategory =
    meta?.hardCategory ||
    mapHardCategory(body.category || "") ||
    "Power & Control";

  const item: QueueItem = {
    id: `q-${Date.now()}`,
    title: intakeTitle || "Untitled",
    excerpt: (intakeNotes || "").replace(/\s+/g, " ").trim().slice(0, 220),
    source: meta?.source || meta?.feedLabel || "AI + URL intake",
    sourceUrl: intakeUrl || undefined,
    dateISO: new Date().toISOString().slice(0, 10),
    byline: "Liberty Soldiers",
    coverImage: "/og-default.jpg",
    category: inferredHardCategory,
    hardCategory: inferredHardCategory,
    readTime: "1 min",
    featured: false,
    priority: scoreToPriority(meta?.score),
    kind: "report",
    slug: slugify(intakeTitle || `draft-${Date.now()}`),
    status: "pending",
    body: "",
  };

  const nextQueue = [item, ...queue];
  await saveQueue(nextQueue);

  return NextResponse.json({
    ok: true,
    queued: true,
    skippedGeneration: true,
    mode: "auto",
    item,
  });
}

const rejectReason = shouldReject(meta, intakeTitle, intakeNotes);
if (mode === "auto" && rejectReason) {
  return NextResponse.json({
    ok: true,
    skipped: true,
    reason: rejectReason,
  });
}

    const preferredHardCategory =
      meta.hardCategory ||
      inferHardCategoryFromText(intakeTitle, intakeNotes);

    const prompt = buildPrompt({
      intakeTitle,
      intakeUrl,
      intakeNotes,
      meta,
      preferredHardCategory,
    });

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
            content:
  "Return only valid JSON. No markdown fences. No commentary outside the JSON object. The writing must be hard-hitting, elite, confrontational, and unmistakably non-establishment while remaining fact-grounded."
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.8,
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

    let parsed: DraftPayload;

    try {
      const json = JSON.parse(text);
      if (!validateDraftPayload(json)) {
        throw new Error("Draft payload failed validation");
      }
      parsed = json;
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
    const safeExcerpt =
      sanitizeExcerpt(parsed.excerpt) || "Auto-generated draft.";
    const safeCategory = parsed.category?.trim() || "Power & Control";
    const safeBody = sanitizeBody(parsed.body) || "No content returned.";
    const safeHardCategory = mapHardCategory(safeCategory) || preferredHardCategory;
    const safeSlug = slugify(safeTitle);

    const skipOg = body.skipOg === true;
    let coverImage = "/og-default.jpg";

    if (!skipOg) {
      coverImage = await generateOgImage({
        req,
        title: safeTitle,
        excerpt: safeExcerpt,
        hardCategory: safeHardCategory,
        slug: safeSlug,
      });
    }

const generatedItem: QueueItem = {
  id: id || `q-${Date.now()}`,
  title: safeTitle,
  excerpt: safeExcerpt,
  source: intakeUrl
    ? meta.source || meta.feedLabel || "AI + URL intake"
    : "AI + notes intake",
  sourceUrl: intakeUrl || undefined,
  dateISO: new Date().toISOString().slice(0, 10),
  byline: "Liberty Soldiers",
  coverImage,
  category: safeCategory,
  hardCategory: safeHardCategory,
  readTime: getReadTime(safeBody),
  featured: false,
  priority: scoreToPriority(meta.score),
  kind: "report",
  slug: safeSlug,
  status: "draft",
  body: safeBody,
};

let nextQueue: QueueItem[];

if (id) {
  // 🔥 UPDATE EXISTING ITEM (NO DUPLICATE)
  nextQueue = queue.map((q) =>
    q.id === id
      ? {
          ...q,
          ...generatedItem,
          id: q.id, // preserve original id
        }
      : q
  );
} else {
  // fallback (manual intake new draft)
  nextQueue = [generatedItem, ...queue];
}

await saveQueue(nextQueue);

return NextResponse.json({
  ok: true,
  item: generatedItem,
  queueCount: nextQueue.length,
  metaUsed: {
    score: meta.score ?? null,
    reasonTags: meta.reasonTags ?? [],
    preferredHardCategory,
  },
});
  } catch (err) {
    console.error("Generate error:", err);

    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : "Generate failed",
      },
      { status: 500 }
    );
  }
}
