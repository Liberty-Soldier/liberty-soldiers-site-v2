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
  return text.replace(/\s+/g, " ").trim();
}

function trimTo(text: string, max: number) {
  const cleaned = cleanText(text);
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 3).trim()}...`;
}

function buildThreadParts(title: string, excerpt: string, slug: string) {
  const articleUrl = buildArticleUrl(slug);

  const cleanTitle = cleanText(title);
  const cleanExcerpt = cleanText(excerpt);

  // 🔥 Dynamic hook pool (rotates automatically)
  const hooks = [
    "This isn’t random.",
    "This is not what it looks like.",
    "Pay attention to this one.",
    "Most people will miss this.",
    "This is where things shift.",
    "This didn’t happen by accident.",
  ];

  const reframes = [
    "They’ll report the event. Not the pattern.",
    "The headline is the distraction.",
    "Watch how this is being framed.",
    "This is how narratives are managed.",
    "This is where perception gets shaped.",
  ];

  const closers = [
    "Most people won’t connect this.",
    "Once you see it, you can’t unsee it.",
    "This is bigger than it looks.",
    "This is where it leads.",
  ];

  const hook = hooks[Math.floor(Math.random() * hooks.length)];
  const reframe = reframes[Math.floor(Math.random() * reframes.length)];
  const closer = closers[Math.floor(Math.random() * closers.length)];

  // 🔥 PART 1 — Article-specific + hook
  const part1 = trimTo(
    `${cleanTitle}

${hook}`,
    260
  );

  // 🔥 PART 2 — Article-specific + narrative framing
  const part2 = trimTo(
    `${reframe}

${cleanExcerpt}`,
    260
  );

  // 🔥 PART 3 — Curiosity + link
  const part3 = trimTo(
    `${closer}

Full breakdown:
${articleUrl}`,
    260
  );

  return [part1, part2, part3];
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

async function postTweet(
  text: string,
  replyToTweetId?: string
) {
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
      `X post failed (${res.status}): ${typeof raw === "string" ? raw : JSON.stringify(data)}`
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

    const [part1, part2, part3] = buildThreadParts(title, excerpt, slug);

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

    const third = await postTweet(part3, secondId);

    return NextResponse.json({
      ok: true,
      mode: "thread",
      articleUrl: buildArticleUrl(slug),
      posts: [
        first?.data || null,
        second?.data || null,
        third?.data || null,
      ],
      preview: {
        part1,
        part2,
        part3,
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
