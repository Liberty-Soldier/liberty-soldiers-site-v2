// app/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";

import Carousel from "./components/Carousel";
import HomeHeadlines from "./components/Headlines";
import LiveBriefingAuto from "./components/LiveBriefingAuto";
import SignalVsNoiseAuto from "./components/SignalVsNoiseAuto";
import EmailBand from "./components/EmailBand";
import IranWarCarousel from "./components/IranWarCarousel";

import { getLatestReports } from "./lib/reports";
import { fetchAllHeadlines } from "./lib/rss";
import { pickIranRadarHeadlines } from "./lib/news.select";

export const revalidate = 600;

const OG_IMAGE = "/og-default.jpg";

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

function HeadlinesFallback() {
  return (
    <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-6 text-zinc-600">
      Loading…
    </div>
  );
}

function ReportCard({
  report,
}: {
  report: {
    slug: string;
    title: string;
    excerpt: string;
    dateISO: string;
    coverImage: string;
    readTime?: string;
    category?: string;
  };
}) {
  return (
    <a
      href={`/news/${report.slug}`}
      className="group block min-w-[300px] max-w-[300px] shrink-0 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:min-w-[340px] sm:max-w-[340px]"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-100">
        <img
          src={report.coverImage}
          alt={report.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-red-200 bg-white/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-red-700">
          <span className="inline-flex h-2 w-2 rounded-full bg-red-600 motion-safe:animate-pulse" />
          Latest Intelligence
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wide text-zinc-500">
          <span>{report.dateISO}</span>
          {report.readTime ? <span>• {report.readTime}</span> : null}
          {report.category ? <span>• {report.category}</span> : null}
        </div>

        <h3 className="line-clamp-3 text-base font-extrabold leading-tight text-zinc-900 group-hover:text-red-700">
          {report.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-600">
          {report.excerpt}
        </p>

        <div className="mt-4 text-sm font-semibold text-zinc-900 group-hover:text-red-700">
          Read report →
        </div>
      </div>
    </a>
  );
}

export default async function Home() {
  const all = await fetchAllHeadlines();

  const latestReports = [...reports]
    .sort(
      (a, b) =>
        new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
    )
    .slice(0, 10);

const latestReports = getLatestReports(10);
const latestHeadlines = [...all]
  .sort((a, b) => (b.publishedAt ?? 0) - (a.publishedAt ?? 0))
  .slice(0, 10);
const iranItems = pickIranRadarHeadlines(all, 12);

  const nowIso = new Date().toISOString();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Liberty Soldiers",
      url: "https://libertysoldiers.com/",
      description:
        "Independent analysis examining power, perception, media narratives, and emerging systems shaping the world.",
      sameAs: ["https://x.com/LibertySoldierz"],
    },
    {
      "@context": "https://schema.org",
      "@type": "NewsMediaOrganization",
      name: "Liberty Soldiers",
      url: "https://libertysoldiers.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://libertysoldiers.com/logo.png",
      },
      sameAs: ["https://x.com/LibertySoldierz"],
      publishingPrinciples: "https://libertysoldiers.com/about",
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
        url: "https://libertysoldiers.com/",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://libertysoldiers.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
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

      {/* Live Signal ticker directly under header */}
      <LiveBriefingAuto />

      {/* Hero */}
      <section className="relative flex min-h-[38vh] w-full items-center py-12 sm:min-h-[42vh] sm:py-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/55 to-black" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 text-white sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-black/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-red-200 backdrop-blur-sm">
              <span className="inline-flex h-2 w-2 rounded-full bg-red-500 motion-safe:animate-pulse" />
              Live Signals • Active Monitoring
            </div>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              LIBERTY SOLDIERS
            </h1>

            <p className="mt-4 max-w-2xl text-xl font-semibold text-white/95 sm:text-2xl">
              Global escalation is accelerating. Most people are missing it.
            </p>

            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              Energy, war, and control systems are converging — and the
              consequences are already unfolding.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/reports"
                className="inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
              >
                Read Latest Intelligence →
              </a>

              <a
                href="/war-escalation"
                className="inline-flex items-center rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Escalation Tracker →
              </a>
            </div>

            <p className="mt-5 max-w-2xl text-sm text-white/70 sm:text-base">
              Independent situational awareness on conflict, systems, narrative
              warfare, and the structures shaping world events.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Liberty Soldiers Reports */}
      <section className="border-b border-zinc-200 bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="mt-2 inline-flex h-2.5 w-2.5 rounded-full bg-red-600 motion-safe:animate-pulse" />
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
                  Latest Intelligence
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-zinc-600 sm:text-base">
                  Original Liberty Soldiers reporting and analysis. Newest 10.
                </p>
              </div>
            </div>

            <a
              href="/reports"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-50"
            >
              View all reports <span className="text-red-600">→</span>
            </a>
          </div>

          <Carousel
            title=""
            subtitle=""
          >
            {latestReports.map((report) => (
              <ReportCard key={report.slug} report={report} />
            ))}
          </Carousel>
        </div>
      </section>

      {/* War & Escalation Radar */}
      <section className="border-b border-zinc-200 bg-zinc-50/50 py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-start gap-3">
            <span className="mt-2 inline-flex h-2.5 w-2.5 rounded-full bg-red-600 motion-safe:animate-pulse" />
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
                Escalation Tracker
              </h2>
              <p className="mt-1 text-sm text-zinc-600 sm:text-base">
                Real-time headlines tied to Iran, regional conflict, shipping
                risk, and military escalation signals.
              </p>
            </div>
          </div>

          <IranWarCarousel items={iranItems} />
        </div>
      </section>

      {/* Email signup */}
      <EmailBand />

      {/* Latest Headlines */}
      <section className="border-t border-zinc-200 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="mt-2 inline-flex h-2.5 w-2.5 rounded-full bg-red-600 motion-safe:animate-pulse" />
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
                  Active Developments
                </h2>
                <p className="mt-1 text-sm text-zinc-600 sm:text-base">
                  Newest external signals being monitored across war, markets,
                  policy, and systems. Newest 10.
                </p>
              </div>
            </div>

            <a
              href="/news"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-50"
            >
              Full feed <span className="text-red-600">→</span>
            </a>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50/60 p-3 sm:p-4 shadow-sm">
            <Carousel title="">
              <Suspense fallback={<HeadlinesFallback />}>
                <HomeHeadlines
                  variant="carousel"
                  items={latestHeadlines}
                  limit={10}
                />
              </Suspense>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Signal vs Noise */}
      <SignalVsNoiseAuto />

      {/* Bottom context */}
      <section className="border-t border-zinc-200 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="hidden sm:block">
            <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
              Liberty Soldiers is an independent investigative media platform
              for geopolitical analysis.
            </h2>

            <p className="mt-3 leading-relaxed text-zinc-800">
              We publish investigative reporting and analytical research on
              global geopolitics, modern conflict, information warfare,
              psychological operations, and the power structures and belief
              systems that shape public perception and policy.
            </p>

            <p className="mt-3 leading-relaxed text-zinc-700">
              Our reports connect breaking news and world events to historical
              patterns, strategic doctrine, and long-term ideological
              frameworks — separating signal from noise, fact from propaganda,
              and context from narrative — so readers gain situational
              awareness and clarity, not partisan opinion.
            </p>

            <p className="mt-2 text-sm text-zinc-500">
              Topics include geopolitics, global conflict, media manipulation,
              surveillance systems, digital identity, financial power, and
              narrative control.
            </p>
          </div>

          <div className="sm:hidden">
            <h2 className="text-xl font-extrabold text-zinc-900">
              Independent analysis of power, perception, and control.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700">
              Liberty Soldiers tracks conflict, systems, narratives, and the
              emerging signals shaping world events.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
