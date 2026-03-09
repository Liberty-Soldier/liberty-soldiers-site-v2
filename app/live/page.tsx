import type { Metadata } from "next";
import LiveFeedPanel from "../components/LiveFeedPanel";

export const metadata: Metadata = {
  title: "Live Desk | Liberty Soldiers",
  description:
    "Live Signal Desk for continuous open-source monitoring of global broadcasts, geopolitics, and breaking developments.",
  alternates: {
    canonical: "https://libertysoldiers.com/live",
  },
  openGraph: {
    title: "Live Desk | Liberty Soldiers",
    description:
      "Continuous live monitoring of world broadcasts, conflict signals, and breaking geopolitical developments.",
    url: "https://libertysoldiers.com/live",
    siteName: "Liberty Soldiers",
    type: "website",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Liberty Soldiers Live Desk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Desk | Liberty Soldiers",
    description:
      "Continuous live monitoring of world broadcasts, conflict signals, and breaking geopolitical developments.",
    images: ["/og-default.jpg"],
  },
};

const FEEDS = [
  {
    title: "Bloomberg Live",
    source: "Bloomberg",
    region: "Global Markets",
    status: "LIVE",
    description:
      "Bloomberg Television live coverage of global markets, geopolitics, and economic developments.",
    embedUrl:
      "https://www.youtube.com/embed/iEpJwprxDdk?autoplay=1&mute=1&playsinline=1",
    href: "https://www.youtube.com/watch?v=iEpJwprxDdk",
    featured: true,
  },
  {
    title: "Al Jazeera English Live",
    source: "Al Jazeera English",
    region: "Middle East / Global",
    status: "LIVE",
    description:
      "Broad live coverage across conflict zones, regional power shifts, and diplomatic escalation.",
    embedUrl:
      "https://www.youtube.com/embed/bNyUyrR0PHo?autoplay=1&mute=1&playsinline=1",
    href: "https://www.youtube.com/watch?v=bNyUyrR0PHo",
  },
  {
    title: "France 24 English Live",
    source: "France 24",
    region: "Europe / Global",
    status: "LIVE",
    description:
      "International live desk covering geopolitical shifts, world events, and policy developments.",
    embedUrl:
      "https://www.youtube.com/embed/l8PMl7tUDIE?autoplay=1&mute=1&playsinline=1",
    href: "https://www.youtube.com/watch?v=l8PMl7tUDIE",
  },
  {
    title: "DW News Live",
    source: "Deutsche Welle",
    region: "Europe / Global",
    status: "LIVE",
    description:
      "DW News live coverage from Europe with global reporting on geopolitics, economics, and international developments.",
    embedUrl:
      "https://www.youtube.com/embed/LuKwFajn37U?autoplay=1&mute=1&playsinline=1",
    href: "https://www.youtube.com/watch?v=LuKwFajn37U",
  },
  {
    title: "Sky News Live",
    source: "Sky News",
    region: "UK / Global",
    status: "LIVE",
    description:
      "Sky News live coverage of global politics, conflict, and major international developments.",
    embedUrl:
      "https://www.youtube.com/embed/YDvsBbKfLPA?autoplay=1&mute=1&playsinline=1",
    href: "https://www.youtube.com/watch?v=YDvsBbKfLPA",
  },
  {
    title: "CBS News Live",
    source: "CBS News",
    region: "United States / Global",
    status: "LIVE",
    description:
      "CBS News live coverage of breaking global events and major geopolitical developments.",
    embedUrl:
      "https://www.youtube.com/embed/E0XsFF5ySr0?autoplay=1&mute=1&playsinline=1",
    href: "https://www.youtube.com/watch?v=E0XsFF5ySr0",
  },
];

export default function LivePage() {
  return (
    <div className="bg-zinc-50">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-red-700">
              <span className="inline-flex h-2 w-2 rounded-full bg-red-600 motion-safe:animate-pulse" />
              Liberty Soldiers Live
            </div>

            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900">
              Live Signal Desk
            </h1>

            <p className="mt-4 text-base sm:text-lg text-zinc-700">
              Continuous monitoring of major open-source live broadcasts for
              geopolitics, conflict escalation, and breaking international developments.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
    </div>
  );
}
