"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

type Props = {
  username: string;
  height?: number; // px
};

export default function XFeed({ username, height = 520 }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const loadWidgets = () => {
    const w = window as any;
    if (w?.twttr?.widgets && containerRef.current) {
      w.twttr.widgets.load(containerRef.current);
    }
  };

  useEffect(() => {
    loadWidgets();
    const t = setTimeout(loadWidgets, 600);
    return () => clearTimeout(t);
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

        {/* IMPORTANT:
            Do NOT use overflow-hidden here. It can clip the injected iframe.
            We also give the container a minHeight so the embed has room to render.
        */}
        <div
          ref={containerRef}
          className="mt-6 rounded-2xl border border-zinc-200 bg-white"
          style={{ minHeight: height }}
        >
          <a
            className="twitter-timeline"
            href={`https://x.com/${username}`}
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
          onLoad={loadWidgets}
        />
      </div>
    </section>
  );
}
