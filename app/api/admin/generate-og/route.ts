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

  // Very specific hospital / Sudan attack safeguard
  if (
    /sudan/.test(text) &&
    /hospital/.test(text) &&
    /(drone|strike|attack|airstrike|blast|explosion|shelling)/.test(text)
  ) {
    return `
Primary scene:
A real-world breaking-news image from outside or just inside a damaged hospital in Sudan after a drone strike or attack.

Show:
- structural damage to a real hospital building
- shattered windows, smoke residue, dust, debris, emergency response
- medical staff, responders, civilians evacuating, stretchers, urgency
- believable architecture, daylight or natural low-light news conditions

Avoid:
- calm patients posing on beds
- a drone hovering indoors
- toy-like drones near camera
- surreal symbolism
- staged portrait composition

If any drone is visible, it must be realistic, distant, and secondary to the aftermath.
The focus is the real site, the damage, and emergency activity.
`;
  }

  // General war / strike / attack / explosion logic
  if (/(drone|airstrike|missile|rocket|blast|explosion|attack|strike|shelling|bombing|raid)/.test(text)) {
    return `
Primary scene:
A literal breaking-news aftermath or active-response image tied directly to the reported attack.

Show one specific moment of consequence:
- damaged building, hit infrastructure, street impact zone, smoke residue, debris
- responders, medics, civilians moving, evacuation, military or emergency activity
- believable vehicles, realistic scale, documentary perspective

The frame should feel like a real photo taken during a developing event, not a generic war wallpaper.

Avoid:
- abstract fireballs with no context
- clean untouched streets
- posed soldiers staring at camera
- movie-poster framing
- fantasy destruction
`;
  }

  // Hospital / medical without explicit strike language
  if (/(hospital|clinic|medical center|medical centre|emergency ward)/.test(text)) {
    return `
Primary scene:
A real hospital or emergency medical setting tied directly to the headline.

Prefer:
- exterior entrance with responders
- emergency corridor with urgency
- triage movement, stretchers, staff in motion
- visible structural damage only if implied by the story

Avoid:
- posed patients
- smiling staff looking at camera
- symbolic medicine objects as the main subject
`;
  }

  // Maritime / Hormuz / shipping / chokepoint
  if (/(ship|shipping|port|strait|hormuz|red sea|tanker|cargo vessel|shipping lane|escort vessel|merchant vessel)/.test(text)) {
    return `
Primary scene:
A real breaking-news maritime incident tied directly to the headline.

Show a specific moment of tension or consequence:
- tanker or cargo vessel visibly damaged, burning, disabled, diverted, or under escort
- naval escort ship maneuvering nearby under alert conditions
- helicopter, response crew, patrol craft, blocked passage, or emergency maritime activity
- visible chokepoint geography, port disruption, or tense transit environment when appropriate

The image must feel like a real news event, not a generic stock maritime photo.

Avoid:
- calm untouched ships in open water
- perfectly clean postcard-like vessels
- isolated ship portraits with no visible context
- symmetrical staged composition
- cinematic fantasy smoke with no event logic
`;
  }

  // Energy / oil / gas / pipeline / grid
  if (/(oil|gas|pipeline|refinery|energy security|power grid|grid|outage|blackout|terminal|lng|electricity)/.test(text)) {
    return `
Primary scene:
A realistic current-events energy or infrastructure image tied to the headline.

Show:
- refinery, pipeline corridor, tanker terminal, port energy infrastructure, substation, power facility, or grid damage
- visible consequence, operational tension, smoke, repair activity, emergency lighting, or shutdown conditions if implied
- workers, responders, or security presence only if natural to the scene

Avoid:
- generic stock flare stacks with no context
- fantasy industrial lighting
- infographic-like power symbols
`;
  }

  // Finance / macro / markets
  if (/(market|stocks|dow|nasdaq|s&p|bonds|yield|treasury|inflation|fed|central bank|debt|tariff|trade|liquidity|bank run|recession)/.test(text)) {
    return `
Primary scene:
A realistic macroeconomic or financial-news image connected directly to the story.

Prefer a literal real-world setting:
- central bank exterior or policy setting
- trading floor or institutional desk under stress
- commodities logistics, shipping containers, energy terminals, bond or currency context
- people working in a believable newsroom or finance environment
- signs of pressure, disruption, or policy seriousness if the headline implies it

Avoid:
- glowing fake stock charts floating in the air
- crypto-style neon graphics
- cartoon money imagery
- generic business handshake photos
- personal-finance advice scenes
`;
  }

  // Surveillance / digital identity / control systems
  if (/(surveillance|facial recognition|biometric|digital id|checkpoint|scan gate|tracking|compliance|access control|identity system)/.test(text)) {
    return `
Primary scene:
A realistic modern control-system environment tied to the headline.

Show:
- checkpoint, scan gate, surveillance corridor, biometric terminal, controlled-access entrance, camera array, border crossing, or institutional security area
- real people moving naturally through the setting
- the system should feel believable, modern, and present-day

Avoid:
- sci-fi holograms
- glowing face grids floating in space
- cyberpunk fantasy aesthetics
`;
  }

  // Religion / ideology / protest / institution
  if (/(religion|church|synagogue|mosque|temple|ideology|sectarian|persecution|protest|blasphemy|zionism)/.test(text)) {
    return `
Primary scene:
A literal real-world ideological, religious, or institutional setting tied directly to the story.

Prefer:
- protest scene, security presence, institutional exterior, congregation movement, damaged religious site, or public demonstration
- visible tension, consequence, or public reaction if implied by the headline

Avoid:
- fantasy religious symbolism
- floating sacred objects
- theatrical poster-style imagery
`;
  }

  // Political / diplomatic / leadership stories
  if (/(trump|white house|pentagon|state department|ceasefire|deadline|proposal|talks|summit|leader|president|prime minister|diplomatic)/.test(text)) {
    return `
Primary scene:
A realistic political or diplomatic news image tied directly to the event.

Show:
- press movement outside a government building
- motorcade, briefing room environment, summit venue, convoy arrival, guarded institutional entrance, or high-level meeting setting
- visible urgency, security, and event context when implied

Avoid:
- generic podium with no context
- posed smiling politicians
- campaign-poster framing
`;
  }

  // Default fallback
  return `
Primary scene:
Depict the most literal real-world event described by the headline and excerpt.

The image must capture a specific moment, not a generic setting.
Show visible consequence, activity, tension, infrastructure, people, or location actually implied by the story.
Prefer documentary realism over symbolism.

Avoid:
- stock-photo emptiness
- isolated objects with no context
- surreal metaphor
- cinematic fantasy
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

Style:
premium photojournalism, believable documentary realism, natural light, balanced exposure, accurate textures, real-world scale, modern current-events photography.

Composition rules:
- landscape-aware composition that crops well for wide website hero use
- one clear focal subject
- one supporting environment
- simple hierarchy
- realistic anatomy, architecture, vehicles, ships, aircraft, and infrastructure
- grounded scene with real-world proportions
- the image must capture a specific moment of action, consequence, or tension
- the scene must feel tied to this exact headline, not a generic stock photo
- visual storytelling should be immediate and legible at a glance

Hard rules:
- no text
- no logos
- no watermark
- no infographic look
- no illustration
- no concept art
- no comic-book style
- no movie-poster style
- no surreal symbolism
- no floating symbolic objects
- no toy-like vehicles, ships, aircraft, or drones
- no miniature-looking scenes
- no exaggerated cinematic fantasy
- no staged smiling people looking at camera
- do not turn the story into metaphor
- depict the event literally and credibly
`;

  const categoryStyles: Record<string, string> = {
    "War & Geopolitics": `
Editorial breaking-news realism.
Show a believable conflict-zone, strategic site, damaged infrastructure, military movement, public danger, responders, or a tense security environment.
Prioritize consequence and event-specific realism over spectacle.
Avoid glamour shots.
Avoid propaganda-poster framing.
`,
    "Markets & Finance": `
Editorial financial realism.
Ground the image in policy, markets, logistics, commodities, trade, energy, debt, or institutional financial settings.
Keep it restrained, literal, and credible.
`,
    "Power & Control": `
Editorial institutional realism.
Use a believable state, enforcement, checkpoint, intelligence, access-control, or authority environment.
Minimal, tense, and grounded.
`,
    "Digital ID / Technocracy": `
Editorial tech-control realism.
Use a real public or institutional environment with biometric, identity, or controlled-access systems.
Believable and present-day, not futuristic sci-fi.
`,
    "Religion & Ideology": `
Editorial cultural and institutional realism.
Use a real-world setting tied to public ideology, protest, persecution, or religious institutions.
No fantasy elements.
`,
    "Prophecy Watch": `
Editorial world-events realism with tense atmosphere.
Use a believable urban, geopolitical, military, or institutional setting tied to the reported event.
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
Generate the most credible, literal, newsroom-quality image for this exact story.
It should look like a strong editorial hero image chosen by a major current-events publication, with visible specificity, consequence, and realism.
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
