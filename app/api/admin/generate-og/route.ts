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

function compact(input?: string) {
  return String(input || "").replace(/\s+/g, " ").trim();
}

function detectScene(title: string, excerpt?: string) {
  const text = `${title} ${excerpt || ""}`.toLowerCase();

  if (
    /sudan/.test(text) &&
    /hospital/.test(text) &&
    /(drone|strike|attack|airstrike|blast)/.test(text)
  ) {
    return `
Primary scene:
A real-world news photo from outside or just inside a damaged hospital in Sudan after a drone strike.
Show structural damage, shattered windows, smoke residue, emergency responders, civilians evacuating, or medical staff moving quickly.
If any drone is visible, it must be a realistic military-style drone far from camera, not close, not hovering indoors, not toy-like.
Do not show a calm patient posing on a bed.
Do not show a drone flying over a patient indoors.
Focus on aftermath, urgency, and realism.
`;
  }

  if (/(drone|airstrike|missile|blast|explosion|attack)/.test(text)) {
    return `
Primary scene:
A realistic aftermath image connected directly to the reported attack.
Show damage, responders, debris, smoke residue, emergency activity, or the impacted facility/location.
Avoid abstract symbolism.
Avoid staged portrait-like compositions.
`;
  }

  if (/(hospital|clinic|medical center|medical centre)/.test(text)) {
    return `
Primary scene:
A real hospital or clinic setting connected to the headline.
Prefer exterior entrance, emergency corridor, responders, staff, stretchers, or visible damage if the headline implies violence.
Avoid posed patients looking at camera.
`;
  }

  if (/(ship|shipping|port|strait|hormuz|red sea)/.test(text)) {
    return `
Primary scene:
A realistic maritime news image.
Show one cargo ship, tanker, escort vessel, port, or chokepoint waterway with believable scale and lighting.
`;
  }

  if (/(market|stocks|dow|nasdaq|s&p|bonds|yield|oil|inflation|fed)/.test(text)) {
    return `
Primary scene:
A realistic finance or macroeconomic news image.
Show trader screens, commodities infrastructure, port logistics, central bank setting, or energy infrastructure.
No fantasy trading graphics.
`;
  }

  if (/(surveillance|facial recognition|biometric|digital id|checkpoint)/.test(text)) {
    return `
Primary scene:
A realistic modern control-system image.
Show a real checkpoint, camera system, scan gate, biometric terminal, or controlled-access environment.
`;
  }

  return `
Primary scene:
Depict the most literal real-world event described by the headline and excerpt.
Prefer documentary realism over symbolism.
Show the place, damage, people, or infrastructure actually implied by the story.
`;
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
  const cleanTitle = compact(title);
  const cleanExcerpt = compact(excerpt);

  const base = `
Create a single ultra-realistic editorial news image.
Style: premium photojournalism, believable documentary realism, natural light, balanced exposure, real-world proportions.

Composition rules:
- one clear focal subject
- one supporting environment
- clean hierarchy
- simple, grounded scene
- realistic anatomy and scale
- realistic architecture and objects
- modern real-world news photography
- landscape composition suitable for website hero / OG image

Hard rules:
- no text
- no logos
- no watermark
- no infographic look
- no illustration
- no concept art
- no movie-poster style
- no surreal symbolism
- no floating symbolic objects
- no toy-like objects
- no miniature-looking vehicles or aircraft
- no exaggerated cinematic fantasy
- no staged smiling people looking at camera
- do not turn the story into metaphor
- depict the event literally and credibly
`;

  const categoryStyles: Record<string, string> = {
    "War & Geopolitics": `
Editorial breaking-news realism.
Show a believable conflict-zone, strategic site, damaged infrastructure, responders, military hardware at realistic scale, or a tense urban environment.
Avoid glamour shots.
Avoid propaganda-poster framing.
`,
    "Markets & Finance": `
Editorial financial realism.
Ground the image in real-world markets, logistics, commodities, energy, or policy environments.
Keep it restrained and credible.
`,
    "Power & Control": `
Editorial institutional realism.
Use a believable state, enforcement, checkpoint, surveillance, or controlled-access setting.
Minimal and grounded.
`,
    "Digital ID / Technocracy": `
Editorial tech-control realism.
Use a real public environment with biometric or digital access systems.
Believable, not sci-fi.
`,
    "Religion & Ideology": `
Editorial cultural or institutional realism.
Use a real-world setting tied to ideology, symbolism, protest, or religious institutions.
No fantasy elements.
`,
    "Prophecy Watch": `
Editorial world-events realism with a tense atmosphere.
Use a believable urban, military, or geopolitical setting.
No apocalyptic fantasy imagery.
`,
  };

  const style =
    categoryStyles[hardCategory || ""] ||
    "Use realistic current-events editorial photography with a literal depiction of the reported event.";

  const scene = detectScene(cleanTitle, cleanExcerpt);

  return `
${base}

${style}

${scene}

Headline:
${cleanTitle}

Supporting context:
${cleanExcerpt || "No additional excerpt provided."}

Final instruction:
Generate the most credible news-feature image a major newsroom would use for this exact story.
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
  size: "1024x1024",
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
