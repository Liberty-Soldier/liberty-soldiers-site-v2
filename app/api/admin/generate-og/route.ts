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

function pickOne<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function getLeaderPreset(title: string, excerpt?: string) {
  const text = `${title} ${excerpt || ""}`.toLowerCase();

  if (text.includes("trump")) {
    return pickOne([
      "/Donald_Trump_1.jpg",
      "/Donald_Trump_2.jpg",
      "/Donald_Trump_3.jpg",
      "/Donald_Trump_4.jpg",
    ]);
  }

  if (text.includes("netanyahu")) {
    return pickOne([
      "/Netanyahu_1.jpg",
      "/Netanyahu_2.jpg",
      "/Netanyahu_3.jpg",
    ]);
  }

  if (text.includes("xi")) {
    return pickOne([
      "/Xi_Jinping_1.jpg",
      "/Xi_Jinping_2.jpg",
      "/Xi_Jinping_3.jpg",
    ]);
  }

  if (text.includes("zelensky")) {
    return pickOne([
      "/zelensky.jpg",
      "/zelensky_01.jpg",
    ]);
  }

  if (text.includes("putin")) {
    return pickOne([
      "/Putin_1.jpg",
      "/Putin_2.jpg",
      "/Putin_3.jpg",
    ]);
  }

  return null;
}

function buildOgPrompt({
  title,
  excerpt,
}: {
  title: string;
  excerpt?: string;
}) {
  const cleanTitle = compact(title);
  const cleanExcerpt = compact(excerpt);

  return `
Create a single ultra-realistic editorial news image.

Style:
professional photojournalism, documentary realism, natural lighting.

Rules:
- must depict the real-world event described
- one clear focal subject
- no symbolism or abstract interpretation
- no text or logos
- no cinematic or movie-poster style

Scene:
Depict the real-world situation described in this headline.

Headline:
${cleanTitle}

Context:
${cleanExcerpt || ""}
`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const title = String(body.title || "").trim();
    const excerpt = String(body.excerpt || "").trim();
    const incomingSlug = String(body.slug || "").trim();

    if (!title) {
      return NextResponse.json(
        { ok: false, error: "Missing title" },
        { status: 400 }
      );
    }

    const preset = getLeaderPreset(title, excerpt);

    if (preset) {
      return NextResponse.json({
        ok: true,
        url: preset,
        pathname: preset,
        preset: true,
      });
    }

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

    const slug = slugify(incomingSlug || title);
    const prompt = buildOgPrompt({ title, excerpt });

    const imageResult = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    const b64 = imageResult.data?.[0]?.b64_json;

    if (!b64) {
      return NextResponse.json(
        { ok: false, error: "No image returned" },
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
    console.error("OG generation failed:", error);

    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Failed",
      },
      { status: 500 }
    );
  }
}
