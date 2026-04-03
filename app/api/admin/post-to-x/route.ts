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

function buildPostText(title: string, excerpt: string, slug: string) {
  const url = `${getBaseUrl()}/published/${slug}`;
  const trimmedExcerpt =
    excerpt.length > 180 ? `${excerpt.slice(0, 177).trim()}...` : excerpt.trim();

  return `${title}

${trimmedExcerpt}

${url}`;
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

    const oauth = new OAuth({
      consumer: {
        key: process.env.X_API_KEY,
        secret: process.env.X_API_KEY_SECRET,
      },
      signature_method: "HMAC-SHA1",
      hash_function(baseString, key) {
        return crypto.createHmac("sha1", key).update(baseString).digest("base64");
      },
    });

    const url = "https://api.x.com/2/tweets";
    const body = {
      text: buildPostText(title, excerpt, slug),
    };

    const authHeader = oauth.toHeader(
      oauth.authorize(
        { url, method: "POST" },
        {
          key: process.env.X_ACCESS_TOKEN,
          secret: process.env.X_ACCESS_TOKEN_SECRET,
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
      return NextResponse.json(
        {
          ok: false,
          error: "X post failed",
          status: res.status,
          details: data,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      status: res.status,
      data,
    });
  } catch (error) {
    console.error("POST /api/admin/post-to-x failed:", error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Failed to post to X",
      },
      { status: 500 }
    );
  }
}