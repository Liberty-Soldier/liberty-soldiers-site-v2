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

  const isAndroid = useMemo(() => {
    if (typeof navigator === "undefined") return false;
    return /Android/i.test(navigator.userAgent);
  }, []);

  const text = `${title || "Shared via Liberty Soldiers"} ${wrapperUrl}`;

  // Web compose (desktop + iOS + many mobiles)
  const xWeb = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}`;

  // Android deep-link that often forces the compose screen
  // If the X app is installed, this usually goes straight to posting UI.
  const xAndroidIntent =
    `intent://post?text=${encodeURIComponent(text)}` +
    `#Intent;package=com.twitter.android;scheme=x;end`;

  const doCopy = async () => {
    const ok = await copyText(wrapperUrl);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } else {
      window.prompt("Copy this link:", wrapperUrl);
    }
  };

  const onPostToX = async () => {
    // ✅ What desktop is effectively doing is opening the web intent URL.
    // On Android, we try a deep link first to avoid being dumped on the home feed.
    if (isAndroid) {
      // Try deep-link compose
      window.location.href = xAndroidIntent;

      // Fallback to web intent if deep link doesn't resolve quickly
      window.setTimeout(() => {
        window.location.href = xWeb;
      }, 700);

      return;
    }

    // Non-Android: open the web intent
    window.open(xWeb, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onPostToX}
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
