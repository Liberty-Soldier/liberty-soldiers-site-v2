import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import OAuth from "oauth-1.0a";

export const runtime = "nodejs";

function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000")
  );
}

function buildArticleUrl(slug: string) {
  return `${getBaseUrl()}/published/${slug}`;
}

function cleanText(text: string) {
  return String(text || "")
    .replace(/\r/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function trimTo(text: string, max: number) {
  const cleaned = cleanText(text);
  if (cleaned.length <= max) return cleaned;

  const sliced = cleaned.slice(0, max - 3);
  const lastBreak = Math.max(
    sliced.lastIndexOf(". "),
    sliced.lastIndexOf("; "),
    sliced.lastIndexOf(", "),
    sliced.lastIndexOf(" ")
  );

  if (lastBreak > Math.floor(max * 0.6)) {
    return `${sliced.slice(0, lastBreak).trim()}...`;
  }

  return `${sliced.trim()}...`;
}

function splitSentences(text: string): string[] {
  return cleanText(text)
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function dedupeSentences(sentences: string[]) {
  const seen = new Set<string>();

  return sentences.filter((sentence) => {
    const key = sentence
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function normalizeClause(text: string) {
  return cleanText(text)
    .replace(/\s+/g, " ")
    .replace(/\bthis comes amid\b/gi, "")
    .replace(/\braises questions\b/gi, "")
    .replace(/\bunderscores concerns\b/gi, "")
    .replace(/\bin a rapidly evolving situation\b/gi, "")
    .replace(/\s+,/g, ",")
    .replace(/\s+\./g, ".")
    .trim();
}

function sentenceCase(text: string) {
  const cleaned = normalizeClause(text);
  if (!cleaned) return "";
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function stripLeadLabel(title: string) {
  return title
    .replace(/^[A-Z][A-Z\s&/-]{2,20}:\s*/, "")
    .replace(/^[A-Z][a-z]+ \| /, "")
    .trim();
}

function topicProfile(title: string, excerpt: string) {
  const text = `${title} ${excerpt}`.toLowerCase();

  return {
    war:
      /\b(strike|airstrike|attack|drone|missile|rocket|troops|carrier|retaliation|ceasefire|military|war)\b/.test(
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
    censorship:
      /\b(censorship|speech|platform|surveillance|digital id|biometric|tracking|compliance|technocracy|cyberattack|cyber attack)\b/.test(
        text
      ),
    diplomacy:
      /\b(un|security council|talks|ceasefire|deal|truce|resolution|summit|negotiation|veto)\b/.test(
        text
      ),
    trump: /\btrump\b/.test(text),
    israel: /\bisrael\b/.test(text),
    iran: /\biran\b/.test(text),
    china: /\bchina|beijing|xi\b/.test(text),
    russia: /\brussia|moscow|putin\b/.test(text),
  };
}

function buildAngle(title: string, excerpt: string) {
  const profile = topicProfile(title, excerpt);

  if (profile.war && profile.infrastructure) {
    return "The target is not just the enemy. The target set is expanding toward the systems civilians depend on.";
  }

  if (profile.war && profile.diplomacy) {
    return "The language of de-escalation is being used while the pressure architecture stays fully intact.";
  }

  if (profile.finance) {
    return "The market headline matters less than the leverage underneath it: pressure is moving through energy, debt, trade, and system confidence.";
  }

  if (profile.censorship) {
    return "This is not just a policy shift. It is another step in normalizing control over access, speech, identity, or movement.";
  }

  if (profile.trump && profile.iran) {
    return "This is not routine rhetoric. It is public escalation language designed to move the threshold of what people will accept.";
  }

  if (profile.israel && profile.iran) {
    return "This is bigger than one strike cycle. It is pressure being managed across the region with selective restraint and selective force.";
  }

  if (profile.china) {
    return "The visible headline is only the surface. The deeper story is pressure, positioning, and long-horizon control.";
  }

  if (profile.russia) {
    return "The real story is not the quote or the strike by itself. It is the steady normalization of harder positions and wider consequences.";
  }

  return "The headline is not the whole story. The real shift is in what is being normalized, pressured, or quietly moved into public view.";
}

function buildFirstPost(title: string, excerpt: string) {
  const cleanTitle = sentenceCase(stripLeadLabel(title));
  const excerptSentences = dedupeSentences(splitSentences(excerpt));
  const firstExcerpt = excerptSentences[0] || "";
  const secondExcerpt = excerptSentences[1] || "";

  const lines: string[] = [];

  if (cleanTitle) {
    lines.push(trimTo(cleanTitle, 220));
  }

  if (firstExcerpt) {
    const first = sentenceCase(firstExcerpt);
    if (
      first &&
      !cleanTitle.toLowerCase().includes(first.toLowerCase().slice(0, 24))
    ) {
      lines.push(first);
    }
  }

  if (!firstExcerpt && secondExcerpt) {
    lines.push(sentenceCase(secondExcerpt));
  }

  return trimTo(lines.filter(Boolean).join("\n\n"), 260);
}

function buildSecondPost(title: string, excerpt: string, slug: string) {
  const articleUrl = buildArticleUrl(slug);
  const angle = buildAngle(title, excerpt);

  const excerptSentences = dedupeSentences(splitSentences(excerpt));
  const usable = excerptSentences
    .slice(0, 3)
    .map((s) => sentenceCase(s))
    .filter(Boolean);

  let support = usable.find((s) => {
    const lower = s.toLowerCase();
    return (
      !lower.includes("read more") &&
      !lower.includes("full article") &&
      !lower.includes("click here")
    );
  });

  if (support && support.toLowerCase() === sentenceCase(stripLeadLabel(title)).toLowerCase()) {
    support = "";
  }

  const body = [angle, support].filter(Boolean).join("\n\n");
  const linkBlock = `Read more:\n${articleUrl}`;
  const maxBody = 260 - linkBlock.length - 2;

  const trimmedBody = trimTo(body, maxBody);

  return `${trimmedBody}\n\n${linkBlock}`;
}

function buildThreadParts(title: string, excerpt: string, slug: string) {
  const part1 = buildFirstPost(title, excerpt);
  const part2 = buildSecondPost(title, excerpt, slug);

  return [part1, part2];
}

function createOauth() {
  return new OAuth({
    consumer: {
      key: process.env.X_API_KEY!,
      secret: process.env.X_API_KEY_SECRET!,
    },
    signature_method: "HMAC-SHA1",
    hash_function(baseString, key) {
      return crypto.createHmac("sha1", key).update(baseString).digest("base64");
    },
  });
}

async function postTweet(text: string, replyToTweetId?: string) {
  const oauth = createOauth();
  const url = "https://api.x.com/2/tweets";

  const body = replyToTweetId
    ? {
        text,
        reply: {
          in_reply_to_tweet_id: replyToTweetId,
        },
      }
    : {
        text,
      };

  const authHeader = oauth.toHeader(
    oauth.authorize(
      { url, method: "POST" },
      {
        key: process.env.X_ACCESS_TOKEN!,
        secret: process.env.X_ACCESS_TOKEN_SECRET!,
      }
    )
  );

  const res = await fetch(url, {
    method: "POST",
    headers: {
      ...authHeader,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const raw = await res.text();

  let data: any;
  try {
    data = JSON.parse(raw);
  } catch {
    data = { raw };
  }

  if (!res.ok) {
    console.error("X post failed:", res.status, data);
    throw new Error(
      `X post failed (${res.status}): ${
        typeof raw === "string" ? raw : JSON.stringify(data)
      }`
    );
  }

  return data;
}

export async function POST(req: NextRequest) {
  try {
    const {
      title,
      excerpt,
      slug,
    }: { title?: string; excerpt?: string; slug?: string } = await req.json();

    if (!title || !excerpt || !slug) {
      return NextResponse.json(
        { ok: false, error: "Missing title, excerpt, or slug" },
        { status: 400 }
      );
    }

    if (
      !process.env.X_API_KEY ||
      !process.env.X_API_KEY_SECRET ||
      !process.env.X_ACCESS_TOKEN ||
      !process.env.X_ACCESS_TOKEN_SECRET
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "Missing X API environment variables",
          checks: {
            X_API_KEY: !!process.env.X_API_KEY,
            X_API_KEY_SECRET: !!process.env.X_API_KEY_SECRET,
            X_ACCESS_TOKEN: !!process.env.X_ACCESS_TOKEN,
            X_ACCESS_TOKEN_SECRET: !!process.env.X_ACCESS_TOKEN_SECRET,
          },
        },
        { status: 500 }
      );
    }

    const [part1, part2] = buildThreadParts(title, excerpt, slug);

    const first = await postTweet(part1);
    const firstId = first?.data?.id;

    if (!firstId) {
      return NextResponse.json(
        {
          ok: false,
          error: "First X post succeeded but no post ID was returned",
          details: first,
        },
        { status: 500 }
      );
    }

    const second = await postTweet(part2, firstId);
    const secondId = second?.data?.id;

    if (!secondId) {
      return NextResponse.json(
        {
          ok: false,
          error: "Second X post succeeded but no post ID was returned",
          details: second,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      mode: "thread",
      articleUrl: buildArticleUrl(slug),
      posts: [first?.data || null, second?.data || null],
      preview: {
        part1,
        part2,
      },
    });
  } catch (error) {
    console.error("POST /api/admin/post-to-x failed:", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Failed to post thread to X",
      },
      { status: 500 }
    );
  }
}
