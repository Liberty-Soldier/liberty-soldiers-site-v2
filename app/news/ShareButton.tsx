"use client";

import { useState } from "react";

export default function ShareButton({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  async function onShare() {
    const nav = (globalThis as any).navigator as any;

    // Native share sheet (mobile + some desktop browsers)
    try {
      if (nav && typeof nav.share === "function") {
        await nav.share({ title, url });
        return;
      }
    } catch {
      // user cancelled share sheet; do nothing
      return;
    }

    // Fallback: copy link (runtime-safe)
    try {
      if (nav?.clipboard?.writeText) {
        await nav.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
        return;
      }
      throw new Error("clipboard not available");
    } catch {
      // Last resort prompt
      try {
        (globalThis as any).prompt?.("Copy this Liberty Soldiers link:", url);
      } catch {
        // ignore
      }
    }
  }

  return (
    <button
      type="button"
      onClick={onShare}
      className="text-xs text-white/70 hover:text-white underline-offset-4 hover:underline"
      aria-label="Share Liberty Soldiers link"
    >
      {copied ? "Copied" : "Share"}
    </button>
  );
}
