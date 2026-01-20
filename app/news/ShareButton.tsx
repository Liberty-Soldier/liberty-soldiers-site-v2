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

  const share = async () => {
    // Try native share first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || "Liberty Soldiers",
          text: title || "Shared for situational awareness",
          url,
        });
        return;
      } catch {
        // user cancelled or share failed — fall through to copy
      }
    }

    // Fallback: copy link
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

    // Last fallback
    window.prompt("Copy this link:", url);
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
