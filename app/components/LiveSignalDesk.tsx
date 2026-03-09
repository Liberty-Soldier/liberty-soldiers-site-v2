import LiveFeedPanel from "./LiveFeedPanel";

const FEEDS = [
  {
    title: "Reuters World Live",
    source: "Reuters",
    region: "Global",
    status: "LIVE",
    description:
      "Continuous world coverage focused on breaking developments, government statements, and major international events.",
    embedUrl: "https://www.youtube.com/embed/gM8dUPHv2HY",
    href: "https://www.youtube.com/watch?v=gM8dUPHv2HY",
    featured: true,
  },
  {
    title: "Al Jazeera English Live",
    source: "Al Jazeera English",
    region: "Middle East / Global",
    status: "LIVE",
    description:
      "Broad live coverage across the Middle East, diplomacy, conflict zones, and international breaking news.",
    embedUrl: "https://www.youtube.com/embed/bNyUyrR0PHo",
    href: "https://www.youtube.com/watch?v=bNyUyrR0PHo",
  },
  {
    title: "France 24 English Live",
    source: "France 24",
    region: "Europe / Global",
    status: "LIVE",
    description:
      "International live desk coverage tracking geopolitical developments, conflict, and global policy shifts.",
    embedUrl: "https://www.youtube.com/embed/l8PMl7tUDIE",
    href: "https://www.youtube.com/watch?v=l8PMl7tUDIE",
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

          <div className="flex items-center gap-3">
            <a
              href="/live"
              className="inline-flex items-center rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Open full live desk →
            </a>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {FEEDS.map((feed) => (
            <LiveFeedPanel
              key={feed.title}
              title={feed.title}
              source={feed.source}
              region={feed.region}
              status={feed.status}
              description={feed.description}
              embedUrl={feed.embedUrl}
              href={feed.href}
              featured={feed.featured}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
