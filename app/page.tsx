// app/page.tsx
import { Suspense } from "react";
import HomeHeadlines from "./components/Headlines";

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

function HeadlinesFallback() {
  return (
    <div className="mt-6 rounded-xl border border-white/10 p-6 text-white/70">
      Loading headlines…
    </div>
  );
}

export default async function Home() {
  const VIDEO_ID = "WeFeWyonzgc";
  const VIDEO_TITLE = "Latest Liberty Soldiers Video";
  const VIDEO_URL = `https://www.youtube.com/watch?v=${VIDEO_ID}`;

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

      {/* Hero */}
      <section className="relative h-[70vh] sm:h-[80vh] w-full flex items-center">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              LIBERTY SOLDIERS
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl">
              Independent investigative reporting and situational awareness
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/news"
                className="px-5 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90"
              >
                News Feed
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Report (your own content) */}
      <section className="py-12 sm:py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Latest Report</h2>
              <p className="mt-1 text-white/70">
                Original Liberty Soldiers investigative reports.
              </p>
            </div>

            <a href="/news" className="text-sm hover:text-white/80">
              View all →
            </a>
          </div>

          <a
            href="/news/dispensationalism-middle-east"
            className="mt-6 block w-full rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/30"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-bold">
                How Dispensationalism Scripts the Middle East
              </h3>
              <span className="text-sm text-white/70">Read →</span>
            </div>

            <p className="mt-2 max-w-3xl text-white/80">
              From Sunday sermons to congressional votes, a theology that
              reshapes foreign policy.
            </p>
          </a>
        </div>
      </section>

      {/* Featured Video */}
      <section className="py-12 sm:py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Featured Video</h2>
              <p className="mt-1 text-white/70">
                Latest release from Liberty Soldiers.
              </p>
            </div>
            <a
              href="https://www.youtube.com/@LibertySoldiers/videos"
              target="_blank"
              rel="noreferrer"
              className="text-sm hover:text-white/80"
            >
              All videos →
            </a>
          </div>

          <a
            href={VIDEO_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 block rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/30 transition"
          >
            <span className="text-[11px] uppercase tracking-wide text-white/60">
              YouTube
            </span>
            <h3 className="mt-2 text-xl font-bold leading-snug">{VIDEO_TITLE}</h3>
            <p className="mt-2 text-white/80 max-w-3xl">
              Primary video briefing. External playback.
            </p>
            <div className="mt-4 text-sm text-white/70">Watch →</div>
          </a>
        </div>
      </section>

      {/* Latest Headlines (external preview) */}
      <section className="py-12 sm:py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Latest Headlines</h2>

              <p className="mt-1 text-white/70">
                External headlines for situational awareness.
              </p>

              <p className="mt-1 text-xs text-white/40">
                External sources are not endorsements. Liberty Soldiers publishes
                original reporting above.
              </p>
            </div>

            <a href="/news" className="text-sm hover:text-white/80">
              Full feed →
            </a>
          </div>

          <Suspense fallback={<HeadlinesFallback />}>
            <HomeHeadlines />
          </Suspense>

          <div className="mt-8">
            <a
              href="/news"
              className="inline-flex items-center rounded-xl border border-white/15 px-5 py-3 text-sm hover:border-white/35 transition"
            >
              View the full News Feed →
            </a>
          </div>
        </div>
      </section>

      {/* Bottom context (optional, not redundant) */}
      <section className="py-12 sm:py-16 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Liberty Soldiers is an independent investigative media project.
          </h2>

          <p className="mt-3 text-white/90 leading-relaxed">
            We analyze geopolitics, power structures, and belief systems shaping
            modern conflict — separating narrative from reality and context from
            propaganda.
          </p>

          <p className="mt-3 text-white/80 leading-relaxed">
            Our reports connect current events to historical patterns and
            ideological frameworks to support situational awareness, not opinion.
          </p>
        </div>
      </section>
    </div>
  );
}











