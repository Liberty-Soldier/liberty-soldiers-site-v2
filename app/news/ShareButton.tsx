"use client";

import { useState } from "react";
import { copyText } from "@/lib/copy";

export default function ShareButton({
  wrapperUrl,
  title,
  label = "Copy link",
}: {
  wrapperUrl: string;
  title?: string;
  label?: string;
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
      <button
        type="button"
        onClick={postToX}
        className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-800 hover:border-zinc-300"
      >
        Post to X
      </button>

      <button
        type="button"
        onClick={doCopy}
        className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-800 hover:border-zinc-300"
      >
        {copied ? "Copied ✓" : label}
      </button>
    </div>
  );
}
