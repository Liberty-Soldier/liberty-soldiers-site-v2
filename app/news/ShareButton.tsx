"use client";

import { useState } from "react";
import { copyText } from "@/lib/copy";

export default function ShareButton({
  wrapperUrl,
  title,
  copyLabel = "Copy link",
  shareLabel = "Share",
}: {
  wrapperUrl: string;
  title?: string;
  copyLabel?: string;
  shareLabel?: string;
}) {
  const [copied, setCopied] = useState(false);

  const doCopy = async () => {
    const ok = await copyText(wrapperUrl);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } else {
      window.prompt("Copy this link:", wrapperUrl);
    }
  };

  const doNativeShare = async () => {
    // Mobile share sheet (Android/iOS). If unavailable or cancelled, fall back to copy.
    const nav: any = typeof navigator !== "undefined" ? navigator : null;

    if (nav?.share) {
      try {
        await nav.share({
          title: title || "Liberty Soldiers",
          text: title || "Shared via Liberty Soldiers",
          url: wrapperUrl,
        });
        return;
      } catch {
        // user cancelled / failed -> fall back to copy
      }
    }

    await doCopy();
  };

  const text = `${title || "Shared via Liberty Soldiers"} ${wrapperUrl}`;

  // ✅ tends to be more consistent across Android Chrome + desktop
  const xIntent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}`;

  const postToX = () => {
    // ✅ open in a new tab/window from a user gesture (prevents "bounce back")
    const w = window.open(xIntent, "_blank", "noopener,noreferrer");
    // If blocked, fall back to same-tab navigation
    if (!w) window.location.href = xIntent;
  };

  return (
    <div className="flex items-center gap-2">
      {/* Post to X (unchanged) */}
      <button
        type="button"
        onClick={postToX}
        className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-800 hover:border-zinc-300"
      >
        Post to X
      </button>

      {/* NEW: native Share sheet */}
      <button
        type="button"
        onClick={doNativeShare}
        className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-800 hover:border-zinc-300"
      >
        {shareLabel}
      </button>

      {/* Copy link (unchanged) */}
      <button
        type="button"
        onClick={doCopy}
        className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-800 hover:border-zinc-300"
      >
        {copied ? "Copied ✓" : copyLabel}
      </button>
    </div>
  );
}
