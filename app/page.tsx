// app/page.tsx
import type { Metadata } from "next";
import Carousel from "./components/Carousel";
import { Suspense } from "react";
import HomeHeadlines from "./components/Headlines";
import ShareButton from "./news/ShareButton";
import { getLatestReport } from "../lib/reports";
import LiveBriefingAuto from "./components/LiveBriefingAuto";
import LiveSignalDesk from "./components/LiveSignalDesk";
import SignalVsNoiseAuto from "./components/SignalVsNoiseAuto";
import EmailBand from "./components/EmailBand";
import LatestReportBand from "./components/LatestReportBand";
import IranWarCarousel from "./components/IranWarCarousel";
import { fetchAllHeadlines } from "../lib/rss";

export const revalidate = 600; // TEMP while testing (you can put back to 600 later)

const OG_IMAGE = "/og-default.jpg"; // must exist in /public

export const metadata: Metadata = {
  title: "Liberty Soldiers | Independent Geopolitical & Investigative Analysis",
  description:
    "Independent investigative analysis of geopolitics, global power structures, media narratives, digital control systems, and emerging technologies shaping world events.",

  alternates: {
    canonical: "https://libertysoldiers.com/",
  },

  openGraph: {
    title: "Liberty Soldiers | Independent Geopolitical & Investigative Analysis",
    description:
      "Independent investigative analysis of geopolitics, global power structures, media narratives, digital control systems, and emerging technologies shaping world events.",
    url: "https://libertysoldiers.com/",
    siteName: "Liberty Soldiers",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Liberty Soldiers - Independent Geopolitical Analysis",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Liberty Soldiers | Independent Geopolitical & Investigative Analysis",
    description:
      "Independent investigative analysis of geopolitics, global power structures, media narratives, digital control systems, and emerging technologies shaping world events.",
    images: [OG_IMAGE],
  },
};

const SITE = "https://libertysoldiers.com";

function HeadlinesFallback() {
  return (
    <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-6 text-zinc-600">
      Loading headlines…
    </div>
  );
}

export default async function Home() {
  const VIDEO_ID = "WeFeWyonzgc";
  const VIDEO_TITLE = "Latest Liberty Soldiers Video";
  const VIDEO_URL = `https://www.youtube.com/watch?v=${VIDEO_ID}`;
  const VIDEO_THUMB = "/video.jpg";

  const latestReport = (await getLatestReport()) ?? null;

  const all = await fetchAllHeadlines();

// TEMP filter (works right now even before you add feedCategory support)
const iranItems = all
  .filter((h) => {
    const t = `${h.title} ${h.summary ?? ""}`.toLowerCase();
    return (
      t.includes("iran") ||
      t.includes("tehran") ||
      t.includes("israel") ||
      t.includes("hezbollah") ||
      t.includes("houthi") ||
      t.includes("strait of hormuz") ||
      t.includes("missile") ||
      t.includes("airstrike") ||
      t.includes("strike") ||
      t.includes("retaliat")
    );
  })
  .slice(0, 24);

  const nowIso = new Date().toISOString();

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Liberty Soldiers",
    url: "https://libertysoldiers.com/",
    description:
      "Independent analysis examining power, perception, media narratives, and emerging systems shaping the world.",
    sameAs: ["https://www.youtube.com/@LibertySoldiers"],
  },
  {
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  name: "Liberty Soldiers",
  url: "https://libertysoldiers.com/",
  logo: {
    "@type": "ImageObject",
    url: "https://libertysoldiers.com/logo.png"
  },
  sameAs: [
    "https://www.youtube.com/@LibertySoldiers",
    "https://x.com/LibertySoldierz"
  ],
  publishingPrinciples: "https://libertysoldiers.com/about"
},
 {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Liberty Soldiers",
  url: "https://libertysoldiers.com/",
  dateModified: nowIso,
  publisher: {
    "@type": "Organization",
    name: "Liberty Soldiers",
    url: "https://libertysoldiers.com/"
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://libertysoldiers.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
},
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Liberty Soldiers | Geopolitics, Global Conflict & Power Analysis",
    url: "https://libertysoldiers.com/",
    dateModified: nowIso,
    isPartOf: {
      "@type": "WebSite",
      name: "Liberty Soldiers",
      url: "https://libertysoldiers.com/",
    },
  },
];

  return (
    <div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative min-h-[32vh] sm:h-[32vh] w-full flex items-center py-10 sm:py-0">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              LIBERTY SOLDIERS
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl">
              Independent analysis of geopolitical conflict, financial systems, 
              technological control structures, and emerging global narratives shaping the future.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/reports"
                className="inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100 transition"
              >
                Read Reports →
              </a>
              <a
                href="/news"
                className="inline-flex items-center rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                Live Intelligence →
              </a>
              <p className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl">
             Tracking power, conflict, and the narratives shaping the world.
            </p>
            </div>
          </div>
        </div>
      </section>

{/* War & Escalation Radar — top band */}
<section className="border-b border-zinc-200 bg-white">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div className="mb-2">
      <h2 className="text-lg font-semibold text-neutral-900">
        War & Escalation Radar
      </h2>
      <p className="text-sm text-neutral-500">
        Real-time headlines referencing Iran, regional escalation, and related conflict signals.
      </p>
    </div>

    <IranWarCarousel items={iranItems} />
  </div>
</section>

{/* Live Briefing */}
<LiveBriefingAuto />

{/* Live Signal Desk */}
<LiveSignalDesk />

{/* Email signup — desktop only (avoid mobile duplication) */}
<div className="hidden sm:block">
  <EmailBand />
</div>

         {/* Latest LS Report — desktop only */}
      <div className="hidden sm:block">
        <LatestReportBand report={latestReport} />
      </div>

      {/* Latest Headlines (mobile carousel + desktop grid) */}
      <section className="py-12 sm:py-16 border-t border-zinc-200 bg-zinc-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="mt-2 inline-flex h-2.5 w-2.5 rounded-full bg-red-600 motion-safe:animate-pulse" />
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">
                  Latest Headlines
                </h2>
                <p className="mt-1 text-sm sm:text-base text-zinc-600">
                  External signals being monitored across systems, policy,
                  conflict, and finance.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/news"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 hover:border-zinc-400 transition"
              >
                Full feed <span className="text-red-600">→</span>
              </a>
            </div>
          </div>

          {/* Mobile carousel */}
          <div className="sm:hidden">
            <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm p-3">
              <Carousel title="">
                <Suspense fallback={<HeadlinesFallback />}>
                  <HomeHeadlines variant="carousel" />
                </Suspense>
              </Carousel>
            </div>
          </div>

          {/* Desktop grid */}
          <div className="hidden sm:block">
            <Suspense fallback={<HeadlinesFallback />}>
              <HomeHeadlines variant="grid" />
            </Suspense>

            <div className="mt-6">
              <a
                href="/news"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 hover:border-zinc-400 transition"
              >
                View full News Feed <span className="text-red-600">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Signal vs Noise */}
      <SignalVsNoiseAuto />

      {/* Featured Video */}
      <section className="py-12 sm:py-16 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                Featured Video
              </h2>
              <p className="mt-1 text-zinc-600">
                Latest release from Liberty Soldiers.
              </p>
            </div>
            <a
              href="https://www.youtube.com/@LibertySoldiers/videos"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-zinc-700 hover:text-zinc-900"
            >
              All videos →
            </a>
          </div>

          <div className="mt-6 w-full rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                <img
                  src={VIDEO_THUMB}
                  alt=""
                  className="w-full sm:w-36 h-44 sm:h-24 rounded-xl border border-zinc-200 object-cover bg-zinc-100"
                  loading="lazy"
                />

                <div className="min-w-0">
                  <span className="text-[11px] uppercase tracking-wide text-zinc-500">
                    YouTube
                  </span>

                  <a
                    href={VIDEO_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                  >
                    <h3 className="mt-2 text-lg sm:text-xl font-bold leading-snug text-zinc-900 hover:underline break-words">
                      {VIDEO_TITLE}
                    </h3>
                  </a>

                  <p className="mt-2 text-sm sm:text-base text-zinc-700 break-words">
                    Primary video briefing. External playback.
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <a
                      href={VIDEO_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-zinc-900 hover:underline"
                    >
                      Watch →
                    </a>

                    <ShareButton
                      shareUrl={`${SITE}/videos`}
                      title={VIDEO_TITLE}
                      label="Copy link"
                    />
                  </div>
                </div>
              </div>

              <div className="hidden sm:block text-sm text-zinc-600 whitespace-nowrap">
                Featured →
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* Bottom context */}
<section className="py-12 sm:py-16 border-t border-zinc-200">
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Desktop: full copy */}
    <div className="hidden sm:block">
      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
        Liberty Soldiers is an independent investigative media platform for geopolitical analysis.
      </h2>

      <p className="mt-3 text-zinc-800 leading-relaxed">
        We publish investigative reporting and analytical research on global geopolitics, modern conflict,
        information warfare, psychological operations, and the power structures and belief systems that
        shape public perception and policy.
      </p>

      <p className="mt-3 text-zinc-700 leading-relaxed">
        Our reports connect breaking news and world events to historical patterns, strategic doctrine,
        and long-term ideological frameworks—separating signal from noise, fact from propaganda, and
        context from narrative—so readers gain situational awareness and clarity, not partisan opinion.
      </p>

      <p className="mt-2 text-sm text-zinc-500">
        Topics include geopolitics, global conflict, media manipulation, surveillance systems, digital identity,
        financial power, and narrative control.
      </p>
    </div>

    {/* Mobile: compressed */}
    <div className="sm:hidden">
      <h2 className="text-xl font-extrabold text-zinc-900">
        Independent analysis of power, perception, and control.
      </h2>
      <p className="mt-2 text-sm text-zinc-700 leading-relaxed">
        Reports connect headlines to historical patterns—separating signal from noise.
      </p>
      <div className="mt-3">
        <a
          href="/about"
          className="inline-flex items-center text-sm font-semibold text-zinc-900 hover:underline"
        >
          Read the mission → 
        </a>
      </div>
    </div>
  </div>
</section>

    </div>
  );
}


































