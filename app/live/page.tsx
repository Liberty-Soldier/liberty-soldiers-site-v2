import type { Metadata } from "next";
import LiveFeedPanel from "../components/LiveFeedPanel";

export const metadata: Metadata = {
  title: "Live Global News Monitoring | Liberty Soldiers",
  description:
    "Live global news monitoring and continuous open-source broadcast coverage of geopolitics, conflict, markets, and breaking international developments.",
  alternates: {
    canonical: "https://libertysoldiers.com/live",
  },
  openGraph: {
    title: "Live Global News Monitoring | Liberty Soldiers",
    description:
      "Continuous live monitoring of world broadcasts, conflict signals, markets, and breaking geopolitical developments.",
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
    title: "Live Global News Monitoring | Liberty Soldiers",
    description:
      "Continuous live monitoring of world broadcasts, conflict signals, markets, and breaking geopolitical developments.",
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
      "https://www.youtube.com/embed/iEpJwprxDdk?autoplay=1&mute=1&playsinline=1&cc_load_policy=1_lang_pref=en",
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
      "https://www.youtube.com/watch?v=gCNeDWCI0vo?autoplay=1&mute=1&playsinline=1&cc_load_policy=1_lang_pref=en",
    href: "https://www.youtube.com/watch?v=gCNeDWCI0vo",
  },
  {
    title: "France 24 English Live",
    source: "France 24",
    region: "Europe / Global",
    status: "LIVE",
    description:
      "International live desk covering geopolitical shifts, world events, and policy developments.",
    embedUrl:
      "https://www.youtube.com/watch?v=Ap-UM1O9RBU?autoplay=1&mute=1&playsinline=1&cc_load_policy=1_lang_pref=en",
    href: "https://www.youtube.com/watch?v=Ap-UM1O9RBU",
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
  },
  {
    title: "Sky News Live",
    source: "Sky News",
    region: "UK / Global",
    status: "LIVE",
    description:
      "Sky News live coverage of global politics, conflict, and major international developments.",
    embedUrl:
      "https://www.youtube.com/embed/YDvsBbKfLPA?autoplay=1&mute=1&playsinline=1&cc_load_policy=1_lang_pref=en",
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
      "https://www.youtube.com/embed/E0XsFF5ySr0?autoplay=1&mute=1&playsinline=1&cc_load_policy=1_lang_pref=en",
    href: "https://www.youtube.com/watch?v=E0XsFF5ySr0",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Live Global News Monitoring | Liberty Soldiers",
    url: "https://libertysoldiers.com/live",
    description:
      "Live global news monitoring and continuous open-source broadcast coverage of geopolitics, conflict, markets, and breaking international developments.",
    isPartOf: {
      "@type": "WebSite",
      name: "Liberty Soldiers",
      url: "https://libertysoldiers.com",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BroadcastEvent",
    name: "Liberty Soldiers Live Signal Desk",
    description:
      "Continuous monitoring of global live broadcasts covering geopolitics, conflict escalation, markets, and breaking world events.",
    isLiveBroadcast: true,
    startDate: "2024-01-01T00:00:00Z",
    broadcaster: {
      "@type": "Organization",
      name: "Liberty Soldiers",
      url: "https://libertysoldiers.com",
    },
  },
];

export default function LivePage() {
  return (
    <div className="bg-zinc-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-red-700">
              <span className="inline-flex h-2 w-2 rounded-full bg-red-600 motion-safe:animate-pulse" />
              Liberty Soldiers Live
            </div>

            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900">
              Live Signal Desk
            </h1>

            <p className="mt-4 text-base sm:text-lg text-zinc-700">
              The Liberty Soldiers Live Signal Desk aggregates major international
              live news broadcasts for real-time monitoring of geopolitics,
              global conflict, financial markets, and breaking world events.
            </p>

            <p className="mt-3 text-sm sm:text-base text-zinc-600">
              Sources currently include Bloomberg, Al Jazeera English, France 24,
              Deutsche Welle, Sky News, and CBS.
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
