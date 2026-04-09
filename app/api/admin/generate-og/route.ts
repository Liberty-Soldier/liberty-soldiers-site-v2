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

  if (text.includes("putin")) {
    return pickOne([
      "/Putin_1.jpg",
      "/Putin_2.jpg",
      "/Putin_3.jpg",
    ]);
  }

  if (text.includes("zelensky")) {
    return pickOne([
      "/zelensky.jpg",
      "/zelensky_01.jpg",
    ]);
  }

  return null;
}

function analyzeStory(title: string, excerpt?: string) {
  const text = `${title} ${excerpt || ""}`.toLowerCase();

  return {
    hasLeader:
      /\b(trump|netanyahu|xi|xi jinping|putin|zelensky|biden|macron|erdogan|khamenei)\b/.test(
        text
      ),
    war:
      /\b(strike|airstrike|attack|drone|missile|rocket|war|troops|carrier|retaliation|ceasefire|military)\b/.test(
        text
      ),
    diplomacy:
      /\b(un|security council|resolution|veto|summit|talks|truce|deal|negotiation|ceasefire)\b/.test(
        text
      ),
    infrastructure:
      /\b(power|grid|bridge|substation|pipeline|port|shipping|strait|hormuz|infrastructure|blackout|outage)\b/.test(
        text
      ),
    finance:
      /\b(markets|stocks|bonds|treasury|debt|inflation|oil|gas|tariff|trade|economy|recession)\b/.test(
        text
      ),
    cyber:
      /\b(cyberattack|cyber attack|hack|breach|surveillance|digital id|biometric|tracking|technocracy)\b/.test(
        text
      ),
    middleEast:
      /\b(iran|israel|gaza|lebanon|syria|hormuz|tehran|jerusalem)\b/.test(text),
    maritime:
      /\b(hormuz|strait|shipping|tanker|cargo vessel|naval|carrier|red sea|black sea)\b/.test(text),
  };
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
  const story = analyzeStory(cleanTitle, cleanExcerpt);

  let scene = "";
  let humanRules = "";
  let composition = "";

  if (story.hasLeader) {
    scene = `
Create a realistic editorial breaking-news image centered on the principal political figure connected to the headline.
Use a documentary photojournalism look: real podiums, press conferences, official buildings, microphones, briefing rooms, tarmacs, summit arrivals, or public remarks.
If other people appear, they must be secondary and natural to the scene: aides, security, press, or blurred background figures only.
No stylization, no propaganda poster feel, no surrealism.
`;
    humanRules = `
Human presence is allowed and should look natural, candid, and editorial.
Do not create cartoonish expressions, distorted hands, staged posing, or theatrical gestures.
One clear subject. No crowds dominating the image.
`;
    composition = `
Composition:
- strong central subject
- realistic news-photo framing
- premium editorial feel
- suitable for a homepage hero or OG card
- horizontal composition preferred
`;
  } else if (story.war && story.infrastructure) {
    scene = `
Create a realistic hard-news image showing the consequences or threat of war on civilian infrastructure.
Possible elements: power lines, substations, bridges, port cranes, damaged roads, smoke, emergency vehicles, distant responders, industrial facilities, shipping terminals, blackout conditions, or transport chokepoints.
Human presence is allowed only if secondary and realistic: responders, silhouettes, crews, or distant personnel.
No cinematic battlefield fantasy.
`;
    humanRules = `
People may appear only as secondary, natural background activity.
No hero shots, no posed soldiers, no action-movie framing.
`;
    composition = `
Composition:
- one dominant focal point
- tangible real-world consequences
- believable scale and geography
- documentary realism, not spectacle
`;
  } else if (story.maritime || (story.middleEast && story.infrastructure)) {
    scene = `
Create a realistic geopolitical maritime or infrastructure news image.
Possible elements: tankers, cargo ships, chokepoints, coastal industry, ports, fuel terminals, cranes, radar, distant naval presence, smoke, shoreline infrastructure, electrical disruption, emergency activity.
Human presence may be minimal and distant if needed for realism.
`;
    humanRules = `
Do not make the scene empty just for the sake of emptiness.
If people appear, keep them secondary and natural.
`;
    composition = `
Composition:
- wide editorial composition
- strong depth
- realistic environmental tension
- suitable for horizontal crop
`;
  } else if (story.diplomacy) {
    scene = `
Create a realistic diplomatic or institutional breaking-news image.
Show the exterior or interior of government buildings, summit venues, UN-style chambers, motorcades, briefing podiums, press risers, delegates arriving, or official meeting environments.
Human presence is allowed when realistic and secondary to the institutional setting.
Avoid empty-chair clichés unless the headline specifically implies absence.
`;
    humanRules = `
Natural press and delegate activity is allowed.
No exaggerated gestures or fake symbolic theater.
`;
    composition = `
Composition:
- institutional setting with visual weight
- clean editorial hierarchy
- believable documentary realism
`;
  } else if (story.finance) {
    scene = `
Create a realistic financial or economic breaking-news image.
Possible elements: stock exchange exteriors, financial district skylines, trading screens, shipping terminals, oil infrastructure, cargo yards, ports, industrial logistics, currency or market visuals grounded in real environments.
Human presence may be minimal and secondary if appropriate.
`;
    humanRules = `
Avoid sterile empty rooms and generic abstract charts.
Keep it grounded in real-world economic infrastructure.
`;
    composition = `
Composition:
- clear focal point
- realistic financial-news aesthetic
- clean, sharp, editorial
`;
  } else if (story.cyber) {
    scene = `
Create a realistic surveillance, cyber, or technocracy news image.
Possible elements: data centers, CCTV systems, biometric scanners, server racks, checkpoint hardware, urban surveillance infrastructure, digital identity terminals, control rooms, restricted-access systems.
Human presence may be minimal and secondary if needed for realism.
`;
    humanRules = `
No glowing sci-fi nonsense, no holograms, no fantasy interfaces.
Keep it real and grounded in actual modern infrastructure.
`;
    composition = `
Composition:
- strong central system or device
- realistic modern setting
- editorial clarity, no gimmicks
`;
  } else {
    scene = `
Create a realistic editorial breaking-news image grounded in the actual subject of the headline.
Use real environments, institutions, infrastructure, public spaces, transport, or industry connected to the story.
Human presence is allowed if natural and secondary.
`;
    humanRules = `
Do not force an empty scene.
Do not force a crowd either.
Use whatever level of human presence best serves realism.
`;
    composition = `
Composition:
- one clear focal point
- believable documentary realism
- horizontal-friendly framing
`;
  }

  return `
Create a single ultra-realistic editorial breaking-news image.

Style:
premium photojournalism, documentary realism, believable scale, natural light, grounded textures, real-world detail, sharp but not stylized.

Hard rules:
- no text
- no logos
- no watermarks
- no split-screen
- no collage
- no poster style
- no surreal imagery
- no fantasy technology
- no symbolic allegory
- no meme-like staging
- no exaggerated cinematic blockbuster look
- no malformed faces or hands
- no cartoonish expressions
- no objects unrealistically displayed toward the camera

${scene}

${humanRules}

${composition}

Headline:
${cleanTitle}

Context:
${cleanExcerpt || "No extra context provided."}
`.trim();
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
        source: "leader-preset",
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
      size: "1536x1024",
    });

    const b64 = imageResult.data?.[0]?.b64_json;

    if (!b64) {
      return NextResponse.json({
        ok: true,
        url: "/og-default.jpg",
        pathname: "/og-default.jpg",
        preset: true,
        source: "default-fallback-no-image-returned",
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

    return NextResponse.json({
      ok: true,
      url: "/og-default.jpg",
      pathname: "/og-default.jpg",
      source: "default-fallback-error",
    });
  }
}
