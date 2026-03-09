import LiveFeedPanel from "./LiveFeedPanel";

const PRIMARY_FEED = {
  title: "Sky News Live",
  source: "Sky News",
  region: "UK / Global",
  status: "LIVE",
  description:
    "Sky News live coverage of global politics, war developments, and major international events.",
  embedUrl:
    "https://www.youtube.com/embed/9Auq9mYxFEE?autoplay=1&mute=1&playsinline=1",
  href: "https://www.youtube.com/watch?v=9Auq9mYxFEE",
};

const SECONDARY_FEEDS = [
  {
    title: "France 24 English",
    source: "France 24",
    region: "Europe",
    status: "LIVE",
    embedUrl:
      "https://www.youtube.com/embed/l8PMl7tUDIE?autoplay=1&mute=1&playsinline=1",
    href: "https://www.youtube.com/watch?v=l8PMl7tUDIE",
  },
  {
    title: "Al Jazeera English",
    source: "Al Jazeera",
    region: "Middle East / Global",
    status: "LIVE",
    embedUrl:
      "https://www.youtube.com/embed/bNyUyrR0PHo?autoplay=1&mute=1&playsinline=1",
    href: "https://www.youtube.com/watch?v=bNyUyrR0PHo",
  },
];

export default function LiveSignalDesk() {
  return (
    <section className="border-t border-zinc-200 bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-red-700">
              <span className="inline-flex h-2 w-2 rounded-full bg-red-600 motion-safe:animate-pulse" />
              Live Monitoring
            </div>

            <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">
              Live Signal Desk
            </h2>

            <p className="mt-2 max-w-3xl text-sm sm:text-base text-zinc-600">
              Branded live broadcast monitoring for major global developments,
              conflict signals, and open-source world coverage.
            </p>
          </div>

          <a
            href="/live"
            className="inline-flex items-center rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            Open full live desk →
          </a>
        </div>

        {/* Large primary feed */}
        <div className="mt-8">
          <LiveFeedPanel
            title={PRIMARY_FEED.title}
            source={PRIMARY_FEED.source}
            region={PRIMARY_FEED.region}
            status={PRIMARY_FEED.status}
            description={PRIMARY_FEED.description}
            embedUrl={PRIMARY_FEED.embedUrl}
            href={PRIMARY_FEED.href}
            featured
          />
        </div>

        {/* Two smaller feeds below */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {SECONDARY_FEEDS.map((feed) => (
            <LiveFeedPanel
              key={feed.title}
              title={feed.title}
              source={feed.source}
              region={feed.region}
              status={feed.status}
              description={feed.description}
              embedUrl={feed.embedUrl}
              href={feed.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
