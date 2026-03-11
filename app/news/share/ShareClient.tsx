"use client";

import { useEffect, useMemo, useState } from "react";
import { copyText } from "@/lib/copy";

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

function truncate(text: string, max = 260) {
  if (!text) return "";
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "").trim() + "…";
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
      .slice(0, 3)
      .map((s) => (/[.!?]$/.test(s) ? s : s + "."));
  }

  const parts = clean
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (parts.length >= 2) return parts.slice(0, 3);

  const chunk1 = clean.slice(0, 110).trim();
  const chunk2 = clean.slice(110, 220).trim();
  const chunk3 = clean.slice(220, 320).trim();

  return [chunk1, chunk2, chunk3]
    .filter(Boolean)
    .slice(0, 3)
    .map((s) => (/[.!?]$/.test(s) ? s : s + "."));
}

type SP = { searchParams: Record<string, string | string[] | undefined> };

export default function ShareClient({ searchParams }: SP) {
  const [copied, setCopied] = useState(false);
  const [wrapperUrl, setWrapperUrl] = useState("");

  useEffect(() => {
    setWrapperUrl(window.location.href);
  }, []);

  const uRaw = searchParams.u;
  const tRaw = searchParams.t;
  const sRaw = searchParams.s;
  const pRaw = searchParams.p;
  const iRaw = searchParams.i;
  const xRaw = searchParams.x;

  const url = typeof uRaw === "string" ? safeDecode(uRaw) : "";
  const title = typeof tRaw === "string" ? safeDecode(tRaw) : "Shared Headline";
  const source = typeof sRaw === "string" ? safeDecode(sRaw) : hostFromUrl(url);
  const publishedAt =
    typeof pRaw === "string" ? Number(safeDecode(pRaw)) : undefined;
  const image = typeof iRaw === "string" ? safeDecode(iRaw) : "";
  const rawSummary = typeof xRaw === "string" ? safeDecode(xRaw) : "";

  const when = humanWhen(publishedAt);
  const summary = cleanSummary(rawSummary);
  const summaryLead = truncate(summary, 260);
  const bullets = bulletsFromSummary(summary);

  const thumb = image || (url ? faviconFromUrl(url) : "/briefing-fallback.jpg");

  const doCopy = async () => {
    const textToCopy = window.location.href;
    const ok = await copyText(textToCopy);

    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } else {
      window.prompt("Copy this link:", textToCopy);
    }
  };

  const xIntentUrl = useMemo(() => {
    const shareLink =
      wrapperUrl || (typeof window !== "undefined" ? window.location.href : "");
    const shareText = title
      ? `${title}\n\n${shareLink}`
      : `Shared via Liberty Soldiers\n\n${shareLink}`;
    return `https://x.com/intent/post?text=${encodeURIComponent(shareText)}`;
  }, [wrapperUrl, title]);

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <a href="/news" className="text-sm text-zinc-700 hover:text-zinc-900">
            ← Back to News
          </a>

          <a href="/" className="text-sm text-zinc-700 hover:text-zinc-900">
            Home →
          </a>
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-4 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100">
            <img
              src={thumb}
              alt=""
              className="h-44 w-full object-cover"
              loading="lazy"
            />
          </div>

          <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            Liberty Soldiers Intelligence Brief
          </p>

          <h1 className="mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">
            {title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-600">
            {source ? (
              <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5">
                Source: {source}
              </span>
            ) : null}

            {when ? (
              <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5">
                Published: {when}
              </span>
            ) : null}
          </div>

          {summaryLead ? (
            <div className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-sm leading-6 text-zinc-800">{summaryLead}</p>
            </div>
          ) : null}

          {bullets.length > 0 && (
            <div className="mt-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-900">
                Quick takeaways
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                {bullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-[2px] text-zinc-400">•</span>
                    <span className="leading-snug">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-900">
              Why this is being shared
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-700">
              This report is being shared for situational awareness. External
              reporting is not an endorsement. Liberty Soldiers tracks the
              intersection of power, control, conflict, and prophecy, then adds
              context where needed.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={url || "#"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Open original source →
            </a>

            <a
              href={xIntentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-800 hover:border-zinc-300"
            >
              Post to X
            </a>

            <button
              type="button"
              onClick={doCopy}
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
          This wrapper preserves context when links are shared across social
          platforms, chats, and reposts.
        </p>
      </div>
    </main>
  );
}
