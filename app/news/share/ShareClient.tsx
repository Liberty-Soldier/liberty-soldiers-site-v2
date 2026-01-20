"use client";

import { useEffect, useState } from "react";

function safeDecode(input: string) {
  try {
    return decodeURIComponent(input);
  } catch {
    return input;
  }
}

function hostFromUrl(u: string) {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function faviconFromUrl(articleUrl: string): string {
  try {
    const u = new URL(articleUrl);
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
      u.hostname
    )}&sz=128`;
  } catch {
    return "/briefing-fallback.jpg";
  }
}

function humanWhen(publishedAt?: number) {
  if (!publishedAt || !Number.isFinite(publishedAt)) return null;
  try {
    return new Date(publishedAt).toLocaleString();
  } catch {
    return null;
  }
}

function cleanSummary(summary?: string): string {
  if (!summary) return "";
  return summary
    .replace(/<[^>]*>/g, " ")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\u00A0/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function bulletsFromSummary(summary?: string): string[] {
  const clean = cleanSummary(summary);
  if (!clean) return [];

  const preBullets = clean
    .split(/(?:•|·|\u2022|\s-\s|\s—\s)/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (preBullets.length >= 3) {
    return preBullets
      .slice(0, 2)
      .map((s) => (/[.!?]$/.test(s) ? s : s + "."));
  }

  const parts = clean
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (parts.length >= 2) return parts.slice(0, 2);

  const chunk1 = clean.slice(0, 95).trim();
  const chunk2 = clean.slice(95, 190).trim();

  return [chunk1, chunk2]
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => (/[.!?]$/.test(s) ? s : s + "."));
}

type SP = { searchParams: Record<string, string | string[] | undefined> };

export default function ShareClient({ searchParams }: SP) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const uRaw = searchParams.u;
  const tRaw = searchParams.t;
  const sRaw = searchParams.s;
  const pRaw = searchParams.p;
  const iRaw = searchParams.i; // image
  const xRaw = searchParams.x; // summary

  const url = typeof uRaw === "string" ? safeDecode(uRaw) : "";
  const title = typeof tRaw === "string" ? safeDecode(tRaw) : "Shared Headline";
  const source = typeof sRaw === "string" ? safeDecode(sRaw) : hostFromUrl(url);

  const publishedAt =
    typeof pRaw === "string" ? Number(safeDecode(pRaw)) : undefined;

  const when = humanWhen(publishedAt);

  const image = typeof iRaw === "string" ? safeDecode(iRaw) : "";
  const summary = typeof xRaw === "string" ? safeDecode(xRaw) : "";

  const thumb = image || (url ? faviconFromUrl(url) : "/briefing-fallback.jpg");
  const bullets = bulletsFromSummary(summary);

  const copyLink = async () => {
    const href = shareUrl || window.location.href;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(href);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1200);
        return;
      }
    } catch {
      // ignore and fall through to prompt
    }

    window.prompt("Copy this link:", href);
  };

  const doShare = async () => {
    const href = shareUrl || window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Shared via Liberty Soldiers",
          text: title,
          url: href,
        } as any);
        return;
      } catch {
        // user cancelled; fall back to copy
      }
    }

    await copyLink();
  };

 const postToX = () => {
  const href = window.location.href;
  const text = title || "Shared via Liberty Soldiers";
  const intent =
    "https://twitter.com/intent/tweet?text=" +
    encodeURIComponent(text) +
    "&url=" +
    encodeURIComponent(href);

  window.open(intent, "_blank", "noopener,noreferrer");
};

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between gap-4">
          <a href="/news" className="text-sm text-zinc-700 hover:text-zinc-900">
            ← Back to News
          </a>

          <a href="/" className="text-sm text-zinc-700 hover:text-zinc-900">
            Home →
          </a>
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6">
          {/* Thumbnail */}
          <div className="mb-4 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100">
            <img
              src={thumb}
              alt=""
              className="h-44 w-full object-cover"
              loading="lazy"
            />
          </div>

          <p className="text-[11px] uppercase tracking-wide text-zinc-500">
            Shared via Liberty Soldiers
          </p>

          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold leading-tight">
            {title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-600">
            {source ? (
              <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5">
                Source: {source}
              </span>
            ) : null}

            {when ? <span>• {when}</span> : null}
          </div>

          {/* Bullets */}
          {bullets.length > 0 && (
            <ul className="mt-4 space-y-1 text-sm text-zinc-700">
              {bullets.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-zinc-400">•</span>
                  <span className="leading-snug">{b}</span>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-4 text-sm text-zinc-700">
            This link is shared for situational awareness. External sources are
            not endorsements. Liberty Soldiers provides context and analysis.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={url || "#"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Open original source →
            </a>

            <button
              type="button"
              onClick={postToX}
              className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-800 hover:border-zinc-300"
            >
              Post to X
            </button>

            <button
              type="button"
              onClick={copyLink}
              className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-800 hover:border-zinc-300"
            >
              {copied ? "Copied ✓" : "Copy link"}
            </button>

            <button
              type="button"
              onClick={copyLink}
              className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-800 hover:border-zinc-300"
            >
              {copied ? "Copied ✓" : "Copy link"}
            </button>

          </div>

          {!url ? (
            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              Missing source URL. Go back and try sharing again.
            </div>
          ) : null}
        </div>

        <p className="mt-6 text-xs text-zinc-500">
          Tip: use “Open original source” for the full article. This page exists
          to preserve context when shared on social platforms.
        </p>
      </div>
    </main>
  );
}

