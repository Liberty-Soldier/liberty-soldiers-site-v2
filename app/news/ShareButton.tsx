"use client";

import { useMemo, useState } from "react";
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

  const isMobile = useMemo(() => {
    if (typeof navigator === "undefined") return false;
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }, []);

  const text = `${title || "Shared via Liberty Soldiers"} ${wrapperUrl}`;

  // ✅ Use x.com intent (often behaves better on mobile than twitter.com)
  const xIntent = `https://x.com/intent/post?text=${encodeURIComponent(text)}`;

  const doCopy = async () => {
    const ok = await copyText(wrapperUrl);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } else {
      window.prompt("Copy this link:", wrapperUrl);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <a
        href={xIntent}
        // ✅ mobile: same tab (more reliable)
        // ✅ desktop: new tab
        target={isMobile ? "_self" : "_blank"}
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
