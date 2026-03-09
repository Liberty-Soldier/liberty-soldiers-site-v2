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
    title: "Reuters World Live",
    source: "Reuters",
    region: "Global",
    status: "LIVE",
    description:
      "Continuous world coverage focused on breaking developments, state announcements, and global flashpoints.",
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
      "Broad live coverage across conflict zones, regional power shifts, and diplomatic escalation.",
    embedUrl: "https://www.youtube.com/embed/bNyUyrR0PHo",
    href: "https://www.youtube.com/watch?v=bNyUyrR0PHo",
    featured: true,
  },
  {
    title: "France 24 English Live",
    source: "France 24",
    region: "Europe / Global",
    status: "LIVE",
    description:
      "International live desk covering geopolitical shifts, world events, and policy developments.",
    embedUrl: "https://www.youtube.com/embed/l8PMl7tUDIE",
    href: "https://www.youtube.com/watch?v=l8PMl7tUDIE",
  },
  {
    title: "DW News Live",
    source: "DW",
    region: "Europe / Global",
    status: "LIVE",
    description:
      "International live monitoring with strong Europe-facing coverage and global breaking developments.",
    embedUrl: "https://www.youtube.com/embed/NvqKZHpKs-g",
    href: "https://www.youtube.com/watch?v=NvqKZHpKs-g",
  },
  {
    title: "Sky News Live",
    source: "Sky News",
    region: "UK / Global",
    status: "LIVE",
    description:
      "Rolling world coverage with emphasis on crisis response, political developments, and war-related updates.",
    embedUrl: "https://www.youtube.com/embed/9Auq9mYxFEE",
    href: "https://www.youtube.com/watch?v=9Auq9mYxFEE",
  },
  {
    title: "NBC News Live",
    source: "NBC News",
    region: "US / Global",
    status: "LIVE",
    description:
      "US-facing live desk for major breaking developments and international spillover coverage.",
    embedUrl: "https://www.youtube.com/embed/UeP-u7C2UlM",
    href: "https://www.youtube.com/watch?v=UeP-u7C2UlM",
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
