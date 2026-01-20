"use client";

import { useState } from "react";

export default function ShareButton({
  url,
  title,
}: {
  url: string;
  title?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1200);
        return;
      }
    } catch {
      // ignore
    }
    window.prompt("Copy this link:", url);
  };

  const share = async () => {
    // Desktop: don't use share sheet (Windows targets are flaky)
    // Detect "desktop-ish" by the lack of touch.
    const isDesktop =
      typeof window !== "undefined" &&
      !("ontouchstart" in window) &&
      (navigator.maxTouchPoints ?? 0) === 0;

    if (isDesktop) {
      await copy();
      return;
    }

    // Mobile: try native share sheet
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || "Liberty Soldiers",
          text: title || "Shared for situational awareness",
          url,
        } as any);
        return;
      } catch {
        // user cancelled or share failed → fall back to copy
      }
    }

    await copy();
  };

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex items-center rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-800 hover:border-zinc-300"
      aria-label={title ? `Share: ${title}` : "Share"}
    >
      {copied ? "Copied ✓" : "Share"}
    </button>
  );
}

