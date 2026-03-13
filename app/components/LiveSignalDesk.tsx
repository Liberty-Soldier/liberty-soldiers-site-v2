import LiveFeedPanel from "./LiveFeedPanel";

const PRIMARY_FEED = {
  title: "Sky News Live",
  source: "Sky News",
  region: "UK / Global",
  status: "LIVE",
  description:
    "Sky News live coverage of global politics, conflict, and major international developments.",
  embedUrl:
    "https://www.youtube.com/embed/YDvsBbKfLPA?autoplay=1&mute=1&playsinline=1&cc_load_policy=1_lang_pref=en",
  href: "https://www.youtube.com/watch?v=YDvsBbKfLPA",
}

const SECONDARY_FEEDS = [
  {
    title: "CBS Live",
  source: "CBS",
  region: "Global",
  status: "LIVE",
  description:
    "Bloomberg Television live coverage of global markets, geopolitics, and economic developments.",
  embedUrl:
    "https://www.youtube.com/watch?v=uDDoQFKVaas?autoplay=1&mute=1&playsinline=1&cc_load_policy=1_lang_pref=en",
  href: "https://www.youtube.com/watch?v=uDDoQFKVaas",
},
  {
  title: "DW News Live",
  source: "Deutsche Welle",
  region: "Europe / Global",
  status: "LIVE",
  description:
    "DW News live coverage from Europe with global reporting on geopolitics, economics, and international developments.",
  embedUrl:
    "https://www.youtube.com/embed/LuKwFajn37U?autoplay=1&mute=1&playsinline=1&cc_load_policy=1_lang_pref=en",
  href: "https://www.youtube.com/watch?v=LuKwFajn37U",
}
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
             Real-time monitoring of major global broadcasts tracking geopolitics, 
             conflict escalation, markets, and emerging world events.
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
