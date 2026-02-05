"use client";

import Script from "next/script";

type Props = {
  username: string; // e.g. "LibertySoldierz"
  height?: number;  // px
};

export default function XFeed({ username, height = 520 }: Props) {
  // Use light theme because your site is light mode
  return (
    <section className="mt-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900">
            Live Intelligence
          </h2>
          <a
            href={`https://x.com/${username}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-zinc-700 hover:text-zinc-900"
          >
            View on X →
          </a>
        </div>

        <p className="mt-1 text-sm text-zinc-600">
          Real-time signals and observations from Liberty Soldiers.
        </p>

        <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          {/* X Timeline Embed */}
          <a
            className="twitter-timeline"
            href={`https://twitter.com/${username}`}
            data-height={String(height)}
            data-theme="light"
            data-chrome="noheader nofooter noborders transparent"
            data-dnt="true"
          >
            Posts by @{username}
          </a>

          {/* X Widgets Script */}
          <Script
            src="https://platform.twitter.com/widgets.js"
            strategy="afterInteractive"
          />
        </div>
      </div>
    </section>
  );
}
