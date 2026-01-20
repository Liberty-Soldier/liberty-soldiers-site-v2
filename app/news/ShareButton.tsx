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

  // Mobile-safe X share: use twitter.com intent + put URL in text
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
        onClick={doCopy}
        className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-800 hover:border-zinc-300"
      >
        {copied ? "Copied ✓" : label}
      </button>
    </div>
  );
}
