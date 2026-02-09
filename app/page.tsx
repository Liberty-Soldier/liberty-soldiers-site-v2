// app/page.tsx
import Carousel from "./components/Carousel";
import { Suspense } from "react";
import HomeHeadlines from "./components/Headlines";
import ShareButton from "./news/ShareButton";
import { getLatestReport } from "../lib/reports";
import LiveBriefingAuto from "./components/LiveBriefingAuto";
import SignalVsNoiseAuto from "./components/SignalVsNoiseAuto";

export const revalidate = 600;

export const metadata = {
  title: "Liberty Soldiers | Independent analysis of power, perception, and control",
  description:
    "Independent situational awareness and investigative analysis examining power, perception, media narratives, and emerging systems shaping the world.",
  alternates: {
    canonical: "https://libertysoldiers.com/",
  },
  openGraph: {
    title: "Liberty Soldiers",
    description:
      "Independent analysis of power, perception, and emerging systems shaping the world.",
    url: "https://libertysoldiers.com/",
    siteName: "Liberty Soldiers",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Liberty Soldiers",
    description:
      "Independent analysis of power, perception, and emerging systems shaping the world.",
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

  // Put file in /public/video.jpg (or change to /og/video.jpg if stored in /public/og/)
  const VIDEO_THUMB = "/video.jpg";

  // Latest report (auto)
  const latest = getLatestReport();
  const latestHref = latest ? `/news/${latest.slug}` : "/reports";
  const latestThumb = latest?.coverImage ?? "/briefing-fallback.jpg";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Liberty Soldiers",
    url: "https://libertysoldiers.com/",
    description:
      "Independent situational awareness and investigative analysis examining power, perception, media narratives, and emerging systems shaping the world.",
    sameAs: ["https://www.youtube.com/@LibertySoldiers"],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative h-[25vh] sm:h-[32vh] w-full flex items-center">
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
              Independent analysis of power and control as global events converge
              on the prophetic timeline
            </p>
          </div>
        </div>
      </section>

      {/* Live Briefing */}
      <LiveBriefingAuto />

      {/* Latest Headlines (mobile carousel + desktop grid) */}
      <section className="py-12 sm:py-16 border-t border-zinc-200 bg-zinc-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header band */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="mt-2 inline-flex h-2.5 w-2.5 rounded-full bg-red-600 motion-safe:animate-pulse" />
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">
                  Latest Headlines
                </h2>
                <p className="mt-1 text-sm sm:text-base text-zinc-600">
                  External signals being monitored across systems, policy, conflict, and finance.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700">
                Live feed
              </span>
              <a
                href="/news"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 hover:border-zinc-400 transition"
              >
                View full News Feed <span className="text-red-600">→</span>
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

      {/* Latest Report */}
      <section className="py-12 sm:py-16 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                Latest Report
              </h2>
              <p className="mt-1 text-zinc-600">
                Original Liberty Soldiers investigative reports.
              </p>
            </div>

            <a href="/reports" className="text-sm text-zinc-700 hover:text-zinc-900">
              View all →
            </a>
          </div>

          <div className="mt-6 w-full rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
            {latest ? (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                  <img
                    src={latestThumb}
                    alt=""
                    className="w-full sm:w-36 h-44 sm:h-24 rounded-xl border border-zinc-200 object-cover bg-zinc-100"
                    loading="lazy"
                  />

                  <div className="min-w-0">
                    <a href={latestHref} className="block">
                      <h3 className="text-lg sm:text-xl font-bold text-zinc-900 hover:underline break-words">
                        {latest.title}
                      </h3>
                    </a>

                    <p className="mt-2 text-sm sm:text-base text-zinc-700 break-words">
                      {latest.excerpt}
                    </p>

                    <p className="mt-2 text-xs text-zinc-600">
                      By{" "}
                      <span className="font-medium text-zinc-800">
                        {latest.byline}
                      </span>
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <a
                        href={latestHref}
                        className="text-sm font-medium text-zinc-900 hover:underline"
                      >
                        Read →
                      </a>

                      <ShareButton
                        wrapperUrl={`${SITE}${latestHref}`}
                        title={latest.title}
                        label="Copy link"
                      />
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block text-sm text-zinc-600 whitespace-nowrap">
                  Latest →
                </div>
              </div>
            ) : (
              <div className="text-zinc-700">
                No reports published yet.{" "}
                <a href="/reports" className="font-medium text-zinc-900 hover:underline">
                  View reports →
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

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
                      wrapperUrl={`${SITE}/videos`}
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
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
            Liberty Soldiers is an independent investigative media project.
          </h2>

          <p className="mt-3 text-zinc-800 leading-relaxed">
            We analyze geopolitics, power structures, and belief systems shaping modern conflict — separating narrative from reality and context from propaganda.
          </p>

          <p className="mt-3 text-zinc-700 leading-relaxed">
            Our reports connect current events to historical patterns and ideological frameworks to support situational awareness, not opinion.
          </p>
        </div>
      </section>
    </div>
  );
}

