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

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-800 hover:border-zinc-300"
      aria-label={title ? `Copy share link for: ${title}` : "Copy share link"}
    >
      {copied ? "Copied ✓" : "Share"}
    </button>
  );
}
