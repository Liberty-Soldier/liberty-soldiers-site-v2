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

function truncate(text: string, max = 220) {
  if (!text) return "";
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "").trim() + "…";
}

function buildBriefingLead(summary?: string): string {
  const clean = cleanSummary(summary);
  if (!clean) return "";
  return truncate(clean, 220);
}

function takeawaysFromSummary(summary?: string): string[] {
  const clean = cleanSummary(summary);
  if (!clean) return [];

  const sentences = clean
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const normalized = sentences.map((s) =>
    /[.!?]$/.test(s) ? s : s + "."
  );

  if (normalized.length >= 3) {
    return normalized
      .filter((s) => s.length > 35)
      .slice(0, 3);
  }

  if (normalized.length === 2) {
    return normalized;
  }

  const chunk1 = clean.slice(0, 160).trim();
  const chunk2 = clean.slice(160, 320).trim();

  return [chunk1, chunk2]
    .filter(Boolean)
    .map((s) => (/[.!?]$/.test(s) ? s : s + "."))
    .filter((s) => s.length > 30);
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
  const briefingLead = buildBriefingLead(summary);
  const takeaways = takeawaysFromSummary(summary);

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

          {briefingLead ? (
            <div className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-zinc-700">
                Briefing Snapshot
              </div>
              <p className="mt-2 text-sm leading-6 text-zinc-800">
                {briefingLead}
              </p>
            </div>
          ) : null}

          {takeaways.length > 0 && (
            <div className="mt-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-900">
                Quick Takeaways
              </h2>

              <ul className="mt-3 space-y-3 text-sm text-zinc-700">
                {takeaways.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-[3px] text-zinc-400">•</span>
                    <span className="leading-relaxed">{item}</span>
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
              This article is being shared for situational awareness. External
              reporting is not an endorsement. Liberty Soldiers tracks the
              intersection of power, control, conflict, finance, ideology, and
              prophecy, then adds context where needed.
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
