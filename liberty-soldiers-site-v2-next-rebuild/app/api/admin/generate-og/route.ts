import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { put } from "@vercel/blob";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function slugify(input: string) {
  return String(input || "")
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function buildOgPrompt({
  title,
  excerpt,
  hardCategory,
}: {
  title: string;
  excerpt?: string;
  hardCategory?: string;
}) {
  const base = `
Ultra-realistic documentary-style news image.
Professional editorial photography.
Natural lighting.
Balanced exposure.
Visible detail in shadows and highlights.
Real-world colors.
Cinematic but believable.
Not too dark.
Not dystopian.
Not illustrated.
No text.
No logos.
No watermark.
16:9 composition.
`;

  const categoryStyles: Record<string, string> = {
    "War & Geopolitics": `
Realistic geopolitical tension.
Modern shipping lanes, military presence, command center, border region, or strategic infrastructure.
Neutral daylight or soft overcast lighting.
`,
    "Markets & Finance": `
Realistic financial and energy-market environment.
Trading screens, cargo shipping, industrial infrastructure, executive briefing room.
Bright enough to read as real editorial imagery.
`,
    "Power & Control": `
Real-world institutional setting.
Surveillance systems, checkpoints, policy architecture, government or corporate control environment.
Grounded realism.
`,
    "Digital ID / Technocracy": `
Modern biometric scan, smartphone verification, controlled-access setting.
Clean devices, real human proportions, realistic environment.
`,
    "Religion & Ideology": `
Institutional symbolism, public square, media or ideological conflict setting.
Serious but realistic editorial composition.
`,
    "Prophecy Watch": `
Modern geopolitical scene with symbolic tension.
Clouds or dramatic atmosphere allowed, but keep realistic brightness and visible detail.
`,
  };

  const style =
    categoryStyles[hardCategory || ""] ||
    "Realistic current-events editorial image with natural lighting and believable detail.";

  return `${base}\n${style}\nHeadline inspiration: ${title}\nSupporting context: ${excerpt || ""}`;
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "Missing OPENAI_API_KEY" },
        { status: 500 }
      );
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { ok: false, error: "Missing BLOB_READ_WRITE_TOKEN" },
        { status: 500 }
      );
    }

    const body = await req.json();

    const title = String(body.title || "").trim();
    const excerpt = String(body.excerpt || "").trim();
    const hardCategory = String(body.hardCategory || "").trim();
    const incomingSlug = String(body.slug || "").trim();

    if (!title) {
      return NextResponse.json(
        { ok: false, error: "Missing title" },
        { status: 400 }
      );
    }

    const slug = slugify(incomingSlug || title);
    const prompt = buildOgPrompt({ title, excerpt, hardCategory });

    const imageResult = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1536x1024",
    });

    const b64 = imageResult.data?.[0]?.b64_json;
    if (!b64) {
      return NextResponse.json(
        { ok: false, error: "No image data returned from OpenAI" },
        { status: 500 }
      );
    }

    const buffer = Buffer.from(b64, "base64");

    const blob = await put(`og/${slug}.png`, buffer, {
      access: "public",
      contentType: "image/png",
      addRandomSuffix: true,
    });

    return NextResponse.json({
      ok: true,
      url: blob.url,
      pathname: blob.pathname,
      prompt,
    });
  } catch (error) {
    console.error("POST /api/admin/generate-og failed:", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "OG generation failed",
      },
      { status: 500 }
    );
  }
}