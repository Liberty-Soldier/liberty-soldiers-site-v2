"use client";

import { useState } from "react";
import { copyText } from "@/lib/copy";

export default function ShareButton({
  wrapperUrl,
  title,
  label, // legacy support
  copyLabel,
  shareLabel = "Share",
}: {
  wrapperUrl: string;
  title?: string;
  label?: string; // legacy
  copyLabel?: string; // preferred
  shareLabel?: string;
}) {
  const [copied, setCopied] = useState(false);

  const finalCopyLabel = copyLabel ?? label ?? "Copy link";

  // ✅ X text = headline only (no URL in the tweet text)
  const headline = (title && title.trim()) ? title.trim() : "Shared via Liberty Soldiers";

  // ---------- COPY ----------
  const doCopy = async () => {
    const ok = await copyText(wrapperUrl);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } else {
      window.prompt("Copy this link:", wrapperUrl);
    }
  };

  // ---------- NATIVE SHARE (mobile share sheet) ----------
  const doNativeShare = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: headline,
          text: headline,
          url: wrapperUrl,
        });
        return;
      } catch {
        // user canceled / failed -> fall back to copy
      }
    }
    await doCopy();
  };

  // ---------- X (mobile-safe intent) ----------
  // Put ONLY headline in text; X preview will come from the URL param
  const xIntent =
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(headline)}` +
    `&url=${encodeURIComponent(wrapperUrl)}`;

  const postToX = () => {
    const w = window.open(xIntent, "_blank", "noopener,noreferrer");
    if (!w) window.location.href = xIntent;
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={postToX}
        className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-800 hover:border-zinc-300"
      >
        Post to X
      </button>

      <button
        type="button"
        onClick={doNativeShare}
        className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-800 hover:border-zinc-300"
      >
        {shareLabel}
      </button>

      <button
        type="button"
        onClick={doCopy}
        className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-800 hover:border-zinc-300"
      >
        {copied ? "Copied ✓" : finalCopyLabel}
      </button>
    </div>
  );
}
