"use client";

import { useEffect } from "react";
import Script from "next/script";

type Props = {
  username: string;
  height?: number;
};

export default function XFeed({ username, height = 520 }: Props) {
  useEffect(() => {
    // Force X widgets to re-scan after hydration
    if ((window as any).twttr?.widgets) {
      (window as any).twttr.widgets.load();
    }
  }, []);

  return (
    <section className="py-12 sm:py-16 border-t border-zinc-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900">
              Live Intelligence
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              Real-time signals and observations from Liberty Soldiers.
            </p>
          </div>

          <a
            href={`https://x.com/${username}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-zinc-700 hover:text-zinc-900"
          >
            View on X →
          </a>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
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
        </div>

        <Script
          src="https://platform.twitter.com/widgets.js"
          strategy="afterInteractive"
        />
      </div>
    </section>
  );
}
