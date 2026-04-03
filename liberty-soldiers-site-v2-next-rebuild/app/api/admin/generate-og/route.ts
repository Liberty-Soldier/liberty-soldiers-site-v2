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
Ultra-realistic editorial news image.
Professional photojournalism.
Natural lighting.
Balanced exposure.
Real-world proportions.
Simple, believable composition.
One clear focal subject.
One supporting background element.
Clean visual hierarchy.
Visible detail in shadows and highlights.
Real-world colors.
Subtle atmosphere only.
Not too dark.
Not overly cinematic.
Not stylized.
Not illustrated.
Not dystopian art.
Not concept art.
Not a movie poster.
Avoid crowded compositions.
Avoid multiple competing subjects.
Avoid surreal symbolism.
No text.
No logos.
No watermark.
16:9 composition.
`;

  const categoryStyles: Record<string, string> = {
    "War & Geopolitics": `
Realistic breaking-news style image.
Use a believable geopolitical setting such as cargo ships, a border crossing, military hardware, a government building, a city skyline under tension, or a strategic waterway.
Keep the scene grounded and editorial.
Prefer one dominant subject and one supporting background element.
`,

    "Markets & Finance": `
Realistic financial-news image.
Use a believable setting such as a trader desk, market screens, cargo containers, oil infrastructure, refinery equipment, a port, or a central bank/government finance setting.
Keep the composition clean and simple.
`,

    "Power & Control": `
Realistic institutional image.
Use a believable setting such as a government building, surveillance camera, checkpoint, official podium, controlled-access gate, or enforcement presence.
Keep the scene restrained and grounded.
`,

    "Digital ID / Technocracy": `
Realistic modern technology image.
Use a believable setting such as a smartphone identity scan, biometric access gate, surveillance terminal, facial recognition checkpoint, or digital verification screen in a real public environment.
Keep the composition minimal and believable.
`,

    "Religion & Ideology": `
Realistic editorial image related to ideology, public symbolism, protest, religious institution, or cultural power.
Keep the setting grounded in the real world and avoid fantasy symbolism.
Prefer one clear focal point.
`,

    "Prophecy Watch": `
Realistic world-events image with a tense atmosphere.
Use a believable modern setting such as a city skyline, geopolitical flashpoint, military movement, or public unrest scene.
Keep it grounded and editorial, not fantastical.
`,
  };

  const style =
    categoryStyles[hardCategory || ""] ||
    "Realistic current-events editorial image with one clear focal subject and a believable modern setting.";

  return `${base}
${style}

Headline inspiration: ${title}
Supporting context: ${excerpt || ""}

Final guidance:
- Make it look like a real premium editorial feature image
- Keep the scene simple and believable
- Prefer realism over symbolism
- Prefer clarity over spectacle
- Avoid exaggerated drama
`;
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