"use client";

import { useState } from "react";
import { copyText } from "@/lib/copy";

export default function ShareButton({
  wrapperUrl,
  sourceUrl,
  title,
}: {
  wrapperUrl: string; // Liberty Soldiers wrapper link
  sourceUrl: string;  // Original article link
  title?: string;
}) {
  const [copied, setCopied] = useState<"source" | null>(null);

  const copySource = async () => {
    const ok = await copyText(sourceUrl);
    if (ok) {
      setCopied("source");
      window.setTimeout(() => setCopied(null), 1200);
    } else {
      window.prompt("Copy this link:", sourceUrl);
    }
  };

  // Mobile-friendly X intent:
  // Put the URL inside text for best compatibility.
  const xIntent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `${title || "Shared via Liberty Soldiers"} ${wrapperUrl}`
  )}`;

  return (
    <div className="flex items-center gap-2">
      <a
        href={xIntent}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-800 hover:border-zinc-300"
      >
        Post to X
      </a>

      <button
        type="button"
        onClick={copySource}
        className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-800 hover:border-zinc-300"
      >
        {copied === "source" ? "Copied ✓" : "Copy source"}
      </button>
    </div>
  );
}
