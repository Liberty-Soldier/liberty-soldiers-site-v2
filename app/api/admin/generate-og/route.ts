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

  if (text.includes("xi jinping") || /\bxi\b/.test(text)) {
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

function getStaticTopicFallback(title: string, excerpt?: string) {
  const text = `${title} ${excerpt || ""}`.toLowerCase();

  if (
    text.includes("hormuz") ||
    text.includes("strait of hormuz") ||
    text.includes("oil chokepoint") ||
    text.includes("shipping lane") ||
    text.includes("tanker")
  ) {
    return "/og-hormuz.jpg";
  }

  if (
    text.includes("iran") ||
    text.includes("missile") ||
    text.includes("drone") ||
    text.includes("strike") ||
    text.includes("air defense") ||
    text.includes("military escalation")
  ) {
    return "/og-war.jpg";
  }

  if (
    text.includes("power grid") ||
    text.includes("bridge") ||
    text.includes("dam") ||
    text.includes("substation") ||
    text.includes("infrastructure") ||
    text.includes("blackout")
  ) {
    return "/og-infrastructure.jpg";
  }

  if (
    text.includes("market") ||
    text.includes("stocks") ||
    text.includes("bonds") ||
    text.includes("dollar") ||
    text.includes("crash") ||
    text.includes("recession") ||
    text.includes("inflation")
  ) {
    return "/og-markets.jpg";
  }

  if (
    text.includes("un") ||
    text.includes("security council") ||
    text.includes("diplomacy") ||
    text.includes("resolution") ||
    text.includes("veto")
  ) {
    return "/og-diplomacy.jpg";
  }

  return "/og-default.jpg";
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
  const text = `${cleanTitle} ${cleanExcerpt}`.toLowerCase();

  let sceneHint = `
Depict a realistic news scene centered on places, infrastructure, equipment, terrain, shipping lanes, energy facilities, government buildings, or military hardware relevant to the headline.
`;

  if (text.includes("hormuz") || text.includes("strait")) {
    sceneHint = `
Depict a realistic maritime chokepoint scene near the Strait of Hormuz: oil tankers, cargo vessels, narrow shipping lanes, coastal industrial infrastructure, distant naval presence, tension without fantasy.
`;
  } else if (
    text.includes("un") ||
    text.includes("security council") ||
    text.includes("resolution") ||
    text.includes("veto")
  ) {
    sceneHint = `
Depict a realistic geopolitical setting: UN-style chamber exterior or interior environment, diplomatic setting, flags, desks, microphones, documents, architectural seriousness, but no clearly visible people.
`;
  } else if (
    text.includes("bridge") ||
    text.includes("power") ||
    text.includes("grid") ||
    text.includes("substation") ||
    text.includes("infrastructure")
  ) {
    sceneHint = `
Depict a realistic infrastructure-focused scene: power lines, substations, bridges, industrial facilities, transport links, smoke or disruption if appropriate, with no people visible.
`;
  } else if (
    text.includes("missile") ||
    text.includes("drone") ||
    text.includes("strike") ||
    text.includes("war")
  ) {
    sceneHint = `
Depict a realistic military-news environment: launch sites, radar, air defense systems, damaged terrain, industrial zones, naval assets, or equipment in place, but no soldiers, officials, or civilians visible.
`;
  }

  return `
Create a single ultra-realistic editorial news image.

Style:
professional photojournalism, documentary realism, natural lighting, believable scale, grounded textures, realistic lens perspective.

Hard rules:
- no people
- no faces
- no human figures
- no crowds
- no officials
- no soldiers
- no civilians
- no hands holding objects
- no staged posing
- no symbolism
- no allegory
- no metaphorical imagery
- no text
- no logos
- no propaganda poster style
- no cinematic movie-poster look
- no collage
- no split-screen
- no surreal or exaggerated elements
- no objects being displayed to the camera

Composition:
- one clear focal point
- simple strong editorial composition
- horizontal-friendly subject placement
- suitable for a news website OG image
- realistic empty-space balance for headline cropping if needed

Scene guidance:
${sceneHint}

Headline:
${cleanTitle}

Context:
${cleanExcerpt || "No extra context provided."}
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

    // 1) Real image preset for named leaders
    const preset = getLeaderPreset(title, excerpt);
    if (preset) {
      return NextResponse.json({
        ok: true,
        url: preset,
        pathname: preset,
        preset: true,
        source: "leader-preset",
      });
    }

    // 2) Validate env
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

    // 3) Generate non-human editorial image
    const imageResult = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    const b64 = imageResult.data?.[0]?.b64_json;

    // 4) If generation gives nothing, use safe static fallback
    if (!b64) {
      const fallback = getStaticTopicFallback(title, excerpt);

      return NextResponse.json({
        ok: true,
        url: fallback,
        pathname: fallback,
        preset: true,
        source: "topic-fallback-no-image-returned",
      });
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
      source: "generated",
    });
  } catch (error) {
    console.error("OG generation failed:", error);

    // 5) Final hard fallback so the article still gets an OG
    return NextResponse.json({
      ok: true,
      url: "/og-default.jpg",
      pathname: "/og-default.jpg",
      preset: true,
      source: "error-fallback",
      error: error instanceof Error ? error.message : "Failed",
    });
  }
}
