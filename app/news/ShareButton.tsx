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
    // Native share sheet (mobile, some desktop browsers)
    try {
      if (typeof navigator !== "undefined" && "share" in navigator) {
        // @ts-ignore
        await navigator.share({ title, url });
        return;
      }
    } catch {
      // user canceled share sheet; do nothing
      return;
    }

    // Fallback: copy link
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // Last resort prompt
      window.prompt("Copy this Liberty Soldiers link:", url);
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
