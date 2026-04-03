type LiveFeedPanelProps = {
  title: string;
  source: string;
  region?: string;
  status?: string;
  description?: string;
  embedUrl?: string;
  href: string;
  featured?: boolean;
};

export default function LiveFeedPanel({
  title,
  source,
  region = "Global",
  status = "LIVE",
  description = "Continuous monitoring of breaking developments and open-source live coverage.",
  embedUrl,
  href,
  featured = false,
}: LiveFeedPanelProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-950 px-4 py-3 text-white">
        <div className="min-w-0">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/75">
            Liberty Soldiers // Live Signal
          </p>
          <h3 className="mt-1 truncate text-xl sm:text-2xl font-extrabold text-white">
            {title}
          </h3>
        </div>

        <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-red-600/90 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-white" />
          {status}
        </span>
      </div>

      <div className="hidden md:flex flex-wrap items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-600">
        <span className="rounded-full border border-zinc-200 bg-white px-2.5 py-1">
          Source: {source}
        </span>
        <span className="rounded-full border border-zinc-200 bg-white px-2.5 py-1">
          Region: {region}
        </span>
        <span className="rounded-full border border-zinc-200 bg-white px-2.5 py-1">
          Open-source feed
        </span>
      </div>

      <div className="px-4 pt-3 md:pt-4">
        <div
          className={[
            "overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100",
            featured ? "aspect-video" : "aspect-video",
          ].join(" ")}
        >
          {embedUrl ? (
            <iframe
              className="h-full w-full"
              src={embedUrl}
              title={title}
              loading="lazy"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center text-sm text-zinc-600">
              Live playback is not embedded for this source. Open the feed below.
            </div>
          )}
        </div>
      </div>

      <div className="px-4 pb-4 pt-3 md:pt-4">
        <p className="text-base sm:text-lg leading-relaxed text-zinc-700">
          {description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-xl bg-zinc-900 px-4 py-2.5 text-base font-semibold text-white transition hover:bg-zinc-800"
          >
            Open source feed →
          </a>

          <span className="text-xs text-zinc-500">
            External stream • May vary by source
          </span>
        </div>
      </div>
    </article>
  );
}
