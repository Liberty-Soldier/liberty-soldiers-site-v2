"use client";

import { useState } from "react";
import { copyText } from "@/lib/copy";

export default function ShareButton({
  shareUrl,
  title,
  summary,
  label,
  copyLabel,
  shareLabel = "Share",
}: {
  shareUrl: string;
  title?: string;
  summary?: string;
  label?: string;
  copyLabel?: string;
  shareLabel?: string;
}) {
  const [copied, setCopied] = useState(false);

  const finalCopyLabel = copyLabel ?? label ?? "Copy link";
  const headline = title?.trim() || "Shared via Liberty Soldiers";

  const trimmedSummary = summary?.trim() || "";
  const shortSummary =
    trimmedSummary.length > 180
      ? trimmedSummary.slice(0, 177).replace(/\s+\S*$/, "").trim() + "..."
      : trimmedSummary;

  const doCopy = async () => {
    const ok = await copyText(shareUrl);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } else {
      window.prompt("Copy this link:", shareUrl);
    }
  };

  const doNativeShare = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: headline,
          text: shortSummary || headline,
          url: shareUrl,
        });
        return;
      } catch {
        // user canceled or share failed
      }
    }
    await doCopy();
  };

  const xText = shortSummary
    ? `${headline}\n\n${shortSummary}`
    : headline;

  const xIntent =
    `https://x.com/intent/post?text=${encodeURIComponent(xText)}` +
    `&url=${encodeURIComponent(shareUrl)}`;

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
