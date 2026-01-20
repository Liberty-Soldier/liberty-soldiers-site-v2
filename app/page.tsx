// app/page.tsx
import { Suspense } from "react";
import HomeHeadlines from "./components/Headlines";
import ShareButton from "./news/ShareButton";

export const revalidate = 600;

export const metadata = {
  title: "Liberty Soldiers | Scripture-First Investigative Reports",
  description:
    "Liberty Soldiers is an independent investigative media project exposing doctrinal deception, manufactured narratives, and end-time propaganda through scripture-first analysis.",
  alternates: {
    canonical: "https://libertysoldiers.com/",
  },
  openGraph: {
    title: "Liberty Soldiers",
    description:
      "Investigative reports. Scripture-first. Exposing doctrinal deception and manufactured narratives.",
    url: "https://libertysoldiers.com/",
    siteName: "Liberty Soldiers",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Liberty Soldiers",
    description:
      "Scripture-first investigative reports exposing deception and manufactured narratives.",
  },
};

const SITE = "https://libertysoldiers.com";

const LATEST_REPORT = {
  title: "How Dispensationalism Scripts the Middle East",
  href: "/news/dispensationalism-middle-east",
  desc:
    "From Sunday sermons to congressional votes, a theology that reshapes foreign policy.",
  thumb: "/og/dispensationalism.jpg", // put file in /public/og/
};

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

  // Option A (recommended): use a local thumbnail you control
  const VIDEO_THUMB = "/og/video.jpg"; // put file in /public/og/

  // Option B (no file needed): YouTube thumbnail (swap in if you want)
  // const VIDEO_THUMB = `https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Liberty Soldiers",
    url: "https://libertysoldiers.com/",
    description:
      "Independent scripture-first investigative media exposing doctrinal deception, manufactured narratives, and religious compromise.",
    sameAs: ["https://www.youtube.com/@LibertySoldiers"],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero (keep dark overlay for readability on image) */}
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
              Independent investigative reporting and situational awareness
            </p>
          </div>
        </div>
      </section>

      {/* Latest Headlines (external preview) */}
      <section className="py-12 sm:py-16 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                Latest Headlines
              </h2>

              <p className="mt-1 text-zinc-600">
                External headlines for situational awareness.
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                External sources are not endorsements. Liberty Soldiers publishes
                original reporting above.
              </p>
            </div>

            <a href="/news" className="text-sm text-zinc-700 hover:text-zinc-900">
              Full feed →
            </a>
          </div>

          <Suspense fallback={<HeadlinesFallback />}>
            <HomeHeadlines />
          </Suspense>

          <div className="mt-8">
            <a
              href="/news"
              className="inline-flex items-center rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm text-zinc-800 hover:border-zinc-300 transition"
            >
              View the full News Feed →
            </a>
          </div>
        </div>
      </section>

      {/* Latest Report (your own content) */}
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

            <a href="/news" className="text-sm text-zinc-700 hover:text-zinc-900">
              View all →
            </a>
          </div>

          <div className="mt-6 block w-full rounded-2xl border border-zinc-200 bg-white p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <img
                  src={LATEST_REPORT.thumb}
                  alt=""
                  className="h-20 w-32 rounded-xl border border-zinc-200 object-cover bg-zinc-100"
                  loading="lazy"
                />

                <div>
                  <a href={LATEST_REPORT.href} className="block">
                    <h3 className="text-xl font-bold text-zinc-900 hover:underline">
                      {LATEST_REPORT.title}
                    </h3>
                  </a>

                  <p className="mt-2 max-w-3xl text-zinc-700">
                    {LATEST_REPORT.desc}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <a
                      href={LATEST_REPORT.href}
                      className="text-sm font-medium text-zinc-900 hover:underline"
                    >
                      Read →
                    </a>

                    {/* Native share (short URL) */}
                    <ShareButton
                      wrapperUrl={`${SITE}${LATEST_REPORT.href}`}
                      title={LATEST_REPORT.title}
                      label="Copy link"
                    />
                  </div>
                </div>
              </div>

              <div className="hidden sm:block text-sm text-zinc-600">
                Latest →
              </div>
            </div>
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

          <div className="mt-6 block rounded-2xl border border-zinc-200 bg-white p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <img
                  src={VIDEO_THUMB}
                  alt=""
                  className="h-20 w-32 rounded-xl border border-zinc-200 object-cover bg-zinc-100"
                  loading="lazy"
                />

                <div>
                  <span className="text-[11px] uppercase tracking-wide text-zinc-500">
                    YouTube
                  </span>

                  <a href={VIDEO_URL} target="_blank" rel="noreferrer" className="block">
                    <h3 className="mt-2 text-xl font-bold leading-snug text-zinc-900 hover:underline">
                      {VIDEO_TITLE}
                    </h3>
                  </a>

                  <p className="mt-2 text-zinc-700 max-w-3xl">
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

                    {/* Share your site page (recommended) OR the YouTube URL */}
                    <ShareButton
                      wrapperUrl={`${SITE}/videos`}
                      title={VIDEO_TITLE}
                      label="Copy link"
                    />
                  </div>
                </div>
              </div>

              <div className="hidden sm:block text-sm text-zinc-600">
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
            We analyze geopolitics, power structures, and belief systems shaping
            modern conflict — separating narrative from reality and context from
            propaganda.
          </p>

          <p className="mt-3 text-zinc-700 leading-relaxed">
            Our reports connect current events to historical patterns and
            ideological frameworks to support situational awareness, not opinion.
          </p>
        </div>
      </section>
    </div>
  );
}




